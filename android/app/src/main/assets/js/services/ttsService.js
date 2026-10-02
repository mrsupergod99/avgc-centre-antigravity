/**
 * KONKANIGO MODULAR TTS SERVICE
 * Provides realistic speech synthesis with support for:
 * 1. Gemini 3.8 Flash TTS (`gemini-3.8-flash-tts`) when API key is provided
 * 2. High-fidelity Web Speech API with Indic/phonetic tuning
 * 3. Web Audio procedural chime & phonetic synthesizer fallback
 * 4. Reactive audio playback states for UI soundwaves
 */

import { progressService } from "./progressService.js";

class TTSService {
  constructor() {
    this.isSpeaking = false;
    this.currentText = "";
    this.listeners = [];
    this.audioContext = null;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    } catch (e) {
      console.warn("Web Audio not supported in this browser context", e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(state) {
    this.listeners.forEach(fn => fn(state));
  }

  /**
   * Speak a Konkani phrase
   * @param {string} text - Roman or Devanagari phrase
   * @param {object} options - { phonetic, onStart, onEnd, onError }
   */
  async speak(text, options = {}) {
    if (this.isSpeaking) {
      this.stop();
    }

    this.isSpeaking = true;
    this.currentText = text;
    this.notify({ isSpeaking: true, text });
    if (options.onStart) options.onStart();

    const apiKey = progressService.getApiKey();

    // 1. Try Gemini 3.8 Flash TTS if API key is present
    if (apiKey) {
      try {
        const played = await this.tryGeminiTTS(text, apiKey);
        if (played) {
          this.finishSpeaking(options.onEnd);
          return;
        }
      } catch (err) {
        console.warn("Gemini TTS endpoint call deferred to Web Speech fallback:", err);
      }
    }

    // 2. Client-side Web Speech API fallback
    if ("speechSynthesis" in window) {
      this.speakViaWebSpeech(text, options);
    } else {
      // 3. Procedural Audio chime fallback
      this.playAudioCue();
      setTimeout(() => this.finishSpeaking(options.onEnd), 1200);
    }
  }

  stop() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.finishSpeaking();
  }

  finishSpeaking(callback) {
    this.isSpeaking = false;
    this.currentText = "";
    this.notify({ isSpeaking: false, text: "" });
    if (callback) callback();
  }

  /**
   * Attempts to synthesize via Gemini 3.8 Flash TTS
   */
  async tryGeminiTTS(text, apiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: `Pronounce clearly in authentic Goan Konkani: ${text}` }] }],
        generationConfig: {
          responseMimeType: "audio/wav",
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Puck" }
            }
          }
        }
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Gemini TTS API returned status ${res.status}`);
      }

      const data = await res.json();
      const base64Audio = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
        await audio.play();
        return true;
      }
    } catch (e) {
      console.warn("Direct Gemini TTS fetch did not return audio stream; using local audio engine:", e.message);
    }
    return false;
  }

  /**
   * Uses browser native Web Speech API with tuned phonetic pronunciation
   */
  speakViaWebSpeech(text, options = {}) {
    // If phonetic guide is provided, it sounds far more natural in Romanized Konkani
    const speechText = options.phonetic || text;
    const utterance = new SpeechSynthesisUtterance(speechText);
    
    utterance.rate = 0.88; // Slightly slower for clarity in children's language learning
    utterance.pitch = 1.05; // Friendly, warm tone

    // Try finding an Indian English or Hindi voice for optimal phonetic cadence
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.lang.includes("en-IN") || v.lang.includes("hi-IN") || v.name.includes("India")
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      this.finishSpeaking(options.onEnd);
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis error:", e);
      this.playAudioCue();
      this.finishSpeaking(options.onEnd);
    };

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Procedural audio chime using Web Audio API when speech synthesis is restricted
   */
  playAudioCue() {
    if (!this.audioContext) return;
    try {
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, this.audioContext.currentTime + 0.15); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, this.audioContext.currentTime + 0.3); // G5

      gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start();
      osc.stop(this.audioContext.currentTime + 0.5);
    } catch (e) {
      console.warn("Web Audio chime failed", e);
    }
  }

  /**
   * Success celebration fanfare
   */
  playSuccessSound() {
    if (!this.audioContext) return;
    try {
      if (this.audioContext.state === "suspended") this.audioContext.resume();
      const ctx = this.audioContext;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.3);
      });
    } catch (e) {
      // Ignore audio chime restrictions
    }
  }
}

export const ttsService = new TTSService();
