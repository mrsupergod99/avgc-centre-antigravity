/**
 * KONKANIGO AI COACH VIEW
 * Conversational companion for Goan Konkani practice, roleplay, and pronunciation guidance.
 */

import { aiTutorService, AI_PRESET_SCENARIOS } from "../services/aiTutorService.js";
import { ttsService } from "../services/ttsService.js";
import { progressService } from "../services/progressService.js";
import { TorliMascot } from "../mascot.js";

export function renderAiView(navigateTo, options = {}) {
  const container = document.createElement("div");
  container.className = "view-container ai-view";

  const history = aiTutorService.getHistory();

  container.innerHTML = `
    <!-- Top AI Header with Torli Avatar -->
    <header class="ai-header">
      <div class="ai-mascot-head">
        ${TorliMascot.render("speaking", "", 70)}
      </div>
      <div class="ai-coach-meta">
        <h2 class="ai-title">Torli AI Coach</h2>
        <span class="ai-status-indicator">
          <span class="pulse-dot"></span> Online • Goan Konkani Tutor
        </span>
      </div>
      <button class="btn btn-xs btn-outline btn-api-config" id="btnConfigKey" title="Configure Gemini API Key">
        🔑 Key
      </button>
    </header>

    <!-- Roleplay Scenarios Pills -->
    <div class="scenarios-carousel">
      <span class="scen-label">Quick Scenarios:</span>
      ${AI_PRESET_SCENARIOS.map(scen => `
        <button class="scen-chip" data-prompt="${scen.prompt}">
          ${scen.icon} ${scen.title}
        </button>
      `).join("")}
    </div>

    <!-- Messages Container -->
    <div class="ai-messages-scroll" id="messagesScroll">
      ${history.map(msg => renderMessageBubble(msg)).join("")}
    </div>

    <!-- Input Bar -->
    <div class="ai-input-bar">
      <button class="btn-input-mic" id="btnMicInput" title="Simulate voice input">🎤</button>
      <input type="text" class="ai-text-field" id="aiInputText" placeholder="Ask Torli or reply in English / Konkani..." />
      <button class="btn btn-primary btn-send-ai" id="btnSendAi">Send</button>
    </div>
  `;

  const scrollContainer = container.querySelector("#messagesScroll");
  const inputField = container.querySelector("#aiInputText");
  const sendBtn = container.querySelector("#btnSendAi");
  const micBtn = container.querySelector("#btnMicInput");

  // Scroll to bottom
  setTimeout(() => {
    scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }, 50);

  // Send message handler
  async function handleSend(textToSend) {
    const text = textToSend || inputField.value.trim();
    if (!text) return;

    inputField.value = "";
    inputField.focus();

    // Append user message immediately
    const userBubble = document.createElement("div");
    userBubble.className = "msg-wrapper user-msg-wrapper";
    userBubble.innerHTML = `<div class="msg-bubble user-bubble">${escapeHtml(text)}</div>`;
    scrollContainer.appendChild(userBubble);
    scrollContainer.scrollTop = scrollContainer.scrollHeight;

    // Show typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "msg-wrapper ai-msg-wrapper typing-wrapper";
    typingIndicator.innerHTML = `
      <div class="typing-bubble">
        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
      </div>
    `;
    scrollContainer.appendChild(typingIndicator);
    scrollContainer.scrollTop = scrollContainer.scrollHeight;

    // Call AI Tutor service
    const response = await aiTutorService.sendMessage(text);
    typingIndicator.remove();

    // Render response
    const aiBubble = document.createElement("div");
    aiBubble.innerHTML = renderMessageBubble(response);
    scrollContainer.appendChild(aiBubble.firstElementChild);
    scrollContainer.scrollTop = scrollContainer.scrollHeight;

    attachAudioListeners(scrollContainer);
  }

  sendBtn.addEventListener("click", () => handleSend());
  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });

  // Roleplay scenario chips
  container.querySelectorAll(".scen-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const prompt = chip.getAttribute("data-prompt");
      handleSend(prompt);
    });
  });

  // Mic simulation
  micBtn.addEventListener("click", () => {
    inputField.value = "How do I order fish in Konkani?";
    handleSend();
  });

  // API Key config modal prompt
  container.querySelector("#btnConfigKey").addEventListener("click", () => {
    const currentKey = progressService.getApiKey();
    const entered = prompt(
      "Enter your Google Gemini API Key for direct Gemini 3.8 / 2.5 AI Tutor.\n(Leave empty to use the built-in verified Konkani dialogue engine):",
      currentKey
    );
    if (entered !== null) {
      progressService.setApiKey(entered);
      alert(entered ? "API Key saved in local storage!" : "Using built-in verified Konkani dialogue engine.");
    }
  });

  attachAudioListeners(scrollContainer);

  if (options.initialQuery) {
    setTimeout(() => handleSend(options.initialQuery), 300);
  }

  function renderMessageBubble(msg) {
    if (msg.sender === "user") {
      return `
        <div class="msg-wrapper user-msg-wrapper">
          <div class="msg-bubble user-bubble">${escapeHtml(msg.text)}</div>
        </div>
      `;
    }

    return `
      <div class="msg-wrapper ai-msg-wrapper">
        <div class="msg-bubble ai-bubble card-shadow">
          <p class="ai-intro-text">${escapeHtml(msg.text)}</p>

          ${msg.konkaniDevanagari ? `
            <div class="konkani-learning-card">
              <div class="klc-devanagari">${msg.konkaniDevanagari}</div>
              <div class="klc-roman">“${msg.konkaniRoman}”</div>
              <div class="klc-english">English: ${msg.english}</div>
              ${msg.phonetic ? `<div class="klc-phonetic">🗣️ Phonetic: "<em>${msg.phonetic}</em>"</div>` : ''}

              <!-- Pronunciation Action Bar -->
              <div class="klc-actions-bar">
                <button class="btn btn-xs btn-audio btn-play-msg-audio" data-speech="${msg.konkaniRoman}" data-phonetic="${msg.phonetic || ''}">
                  🔊 Listen
                </button>
                <button class="btn btn-xs btn-outline btn-try-saying" data-phrase="${msg.konkaniRoman}">
                  🎤 Try Saying It
                </button>
              </div>
            </div>
          ` : ''}

          <!-- Suggestion pills -->
          ${msg.suggestions && msg.suggestions.length > 0 ? `
            <div class="ai-suggestions-row">
              ${msg.suggestions.map(s => `
                <button class="suggestion-pill" data-text="${s}">
                  ${s}
                </button>
              `).join("")}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function attachAudioListeners(scope) {
    scope.querySelectorAll(".btn-play-msg-audio").forEach(btn => {
      btn.onclick = () => {
        const speech = btn.getAttribute("data-speech");
        const phonetic = btn.getAttribute("data-phonetic");
        ttsService.speak(speech, { phonetic });
      };
    });

    scope.querySelectorAll(".btn-try-saying").forEach(btn => {
      btn.onclick = () => {
        const phrase = btn.getAttribute("data-phrase");
        ttsService.speak(phrase);
        alert(`Shabash! Repeat clearly: "${phrase}"`);
      };
    });

    scope.querySelectorAll(".suggestion-pill").forEach(pill => {
      pill.onclick = () => {
        const txt = pill.getAttribute("data-text");
        handleSend(txt);
      };
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.innerText = str || "";
    return div.innerHTML;
  }

  return container;
}
