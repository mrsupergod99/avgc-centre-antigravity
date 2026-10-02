/**
 * KONKANIGO AI TUTOR SERVICE
 * Dedicated conversational companion for children, youth, and tourists.
 * Integrates with Gemini API with strict beginner guardrails, or runs via
 * a verified local pedagogical Konkani dialogue engine.
 */

import { progressService } from "./progressService.js";
import { KONKANI_KNOWLEDGE_BASE } from "../data/knowledgeBase.js";

const SYSTEM_PROMPT = `
You are Torli, the friendly Goan AI language tutor for KonkaniGO ("Amchi Bhaas, Amche Goem").
Target audience: Children, Gen Alpha, Gen Z, and friendly tourists visiting Goa.

STRICT PEDAGOGICAL RULES:
1. Always structure Konkani responses clearly with:
   - Devanagari script
   - Roman transliteration (Goan Romi Konkani)
   - English translation
   - Phonetic pronunciation guide
2. Stay strictly at beginner to early-intermediate Goan Konkani.
3. NEVER fabricate or hallucinate obscure Konkani words. If unsure, explicitly mention:
   "This phrase is currently under review by our native Goan linguistic council."
4. Be enthusiastic, culturally respectful, warm, and encourage speaking practice.
5. Emphasize Goan culture, fish, food, festivals, and warm community vibes.
`;

export const AI_PRESET_SCENARIOS = [
  {
    id: "scen_order_food",
    title: "Ordering Food at a Beach Shack",
    icon: "🍛",
    prompt: "Let's practise ordering fish thali and cold drinks at a beach shack in Konkani!"
  },
  {
    id: "scen_meet_friend",
    title: "Greeting a Goan Friend",
    icon: "👋",
    prompt: "How do I greet a friend and say 'What's up?' in Konkani?"
  },
  {
    id: "scen_bargain_market",
    title: "Bargaining at Mapusa Market",
    icon: "🛍️",
    prompt: "Teach me how to ask for prices and fresh cashews in the market."
  },
  {
    id: "scen_ask_directions",
    title: "Finding the Beach / Old Goa",
    icon: "🗺️",
    prompt: "How do I ask locals for directions to the beach in Konkani?"
  }
];

class AITutorService {
  constructor() {
    this.conversationHistory = [
      {
        sender: "ai",
        text: "Mogachea shikaarpea! (Dear learner!) I'm Torli, your Goan AI Coach. What would you like to speak about today?",
        konkaniDevanagari: "देव बरें दीस दिवं! कितें शिकपाक जाय?",
        konkaniRoman: "Devo boro dis dium! Kitem xikpak zai?",
        english: "Good day! What would you like to learn?",
        phonetic: "day-voh boh-roh dees dee-oom! kee-tehm sheek-pahk zah-ee?",
        suggestions: ["How to say 'I love Goa'?", "Order fish thali", "Say Thank you", "Numbers 1 to 5"]
      }
    ];
  }

  getHistory() {
    return this.conversationHistory;
  }

  async sendMessage(userMessage) {
    // Record user message
    this.conversationHistory.push({
      sender: "user",
      text: userMessage
    });

    const apiKey = progressService.getApiKey();

    if (apiKey) {
      try {
        const aiResponse = await this.callGeminiAPI(userMessage, apiKey);
        if (aiResponse) {
          this.conversationHistory.push(aiResponse);
          progressService.addXP(15, "AI Speaking Practice");
          return aiResponse;
        }
      } catch (err) {
        console.warn("Gemini API call failed, falling back to local knowledge engine:", err);
      }
    }

    // Fallback: Local verified pedagogical dialogue engine
    const localResponse = this.generateLocalResponse(userMessage);
    this.conversationHistory.push(localResponse);
    progressService.addXP(15, "AI Speaking Practice");
    return localResponse;
  }

  async callGeminiAPI(userMessage, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const promptText = `
${SYSTEM_PROMPT}

User message: "${userMessage}"

Respond in JSON format:
{
  "text": "friendly conversational opening",
  "konkaniDevanagari": "Konkani in Devanagari",
  "konkaniRoman": "Konkani in Roman script",
  "english": "English translation",
  "phonetic": "easy phonetic pronunciation guide",
  "suggestions": ["suggested next quick reply 1", "suggested next quick reply 2"]
}
`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!res.ok) throw new Error(`Gemini API returned status ${res.status}`);

    const data = await res.json();
    const rawJson = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (rawJson) {
      const parsed = JSON.parse(rawJson);
      return {
        sender: "ai",
        text: parsed.text || "Here is how to say that in Konkani:",
        konkaniDevanagari: parsed.konkaniDevanagari || "",
        konkaniRoman: parsed.konkaniRoman || "",
        english: parsed.english || "",
        phonetic: parsed.phonetic || "",
        suggestions: parsed.suggestions || ["Try another sentence", "How do I say thank you?"]
      };
    }
    return null;
  }

  generateLocalResponse(input) {
    const text = input.toLowerCase().trim();

    // 1. Food / Fish
    if (text.includes("fish") || text.includes("nuste") || text.includes("order") || text.includes("thali") || text.includes("food")) {
      return {
        sender: "ai",
        text: "Wah! You're thinking like a true Goan! Here is the classic phrase to order fresh fish thali:",
        konkaniDevanagari: "म्हाका एक ताज्या नुस्त्याचें थाळी दियात.",
        konkaniRoman: "Mhaka ek tajea nustyachem thali diyat.",
        english: "Please give me one fresh fish thali.",
        phonetic: "mah-kah ayk tah-zhyah noos-thyah-chehm thah-lee dee-yaht",
        suggestions: ["How to ask for water?", "Is it spicy?", "Bill kitlem zalem?"]
      };
    }

    // 2. Love Goa / I like Goa
    if (text.includes("love goa") || text.includes("like goa") || text.includes("goa")) {
      return {
        sender: "ai",
        text: "A true Goan feeling! Here is how to express your love for Goa with pride:",
        konkaniDevanagari: "म्हाका गोंय खूब आवडटा!",
        konkaniRoman: "Mhaka Goem khub aavodta!",
        english: "I love Goa very much!",
        phonetic: "mah-kah goh-ehm khoob ah-vuhd-tah",
        suggestions: ["How are you?", "My name is...", "Where is the beach?"]
      };
    }

    // 3. Thank you / Grateful
    if (text.includes("thank") || text.includes("thanks")) {
      return {
        sender: "ai",
        text: "The traditional Goan way of thanking someone invokes blessings:",
        konkaniDevanagari: "देव बरें करूं!",
        konkaniRoman: "Dev borem korum!",
        english: "Thank you (May God do good to you!)",
        phonetic: "day-v boh-rehm koh-room",
        suggestions: ["You're welcome", "See you again", "Good night"]
      };
    }

    // 4. Greetings / How are you
    if (text.includes("hello") || text.includes("hi") || text.includes("how are you") || text.includes("kitem")) {
      return {
        sender: "ai",
        text: "Ekdam borem! Here is the warmest everyday greeting used in Goan neighborhoods:",
        konkaniDevanagari: "कितें चल्लां? हांव मजेत आसां!",
        konkaniRoman: "Kitem chollam? Haav mojet aasam!",
        english: "What's up? I am having fun / doing great!",
        phonetic: "kee-tehm chuhl-laam? hah-aav muh-zheht ah-sahm!",
        suggestions: ["Mhojem naav...", "I want to eat", "How much does it cost?"]
      };
    }

    // 5. Name / Introductions
    if (text.includes("name") || text.includes("who are you")) {
      return {
        sender: "ai",
        text: "To tell people your name in Konkani, simply say:",
        konkaniDevanagari: "म्होजें नांव टोरली. तुजें नांव कितें?",
        konkaniRoman: "Mhojem naav Torli. Tujem naav kitem?",
        english: "My name is Torli. What is your name?",
        phonetic: "mhoh-zhehm nah-aav tohr-lee. too-zhehm nah-aav kee-tehm?",
        suggestions: ["I am from Goa", "How old are you?", "Order food"]
      };
    }

    // Default polite pedagogical fallback
    return {
      sender: "ai",
      text: "Shabash for practicing! Let's build your vocabulary step by step with this verified Goan phrase:",
      konkaniDevanagari: "आमी सद्दां कोंकणी शिकूंक जाय.",
      konkaniRoman: "Ami soddam Konkani xikunk zai.",
      english: "We must learn Konkani every day.",
      phonetic: "ah-mee suhd-dahm kohn-kuh-nee shee-koonk zah-ee",
      suggestions: ["Order fish thali", "Good morning", "Count 1 to 5", "Say Thank you"]
    };
  }
}

export const aiTutorService = new AITutorService();
