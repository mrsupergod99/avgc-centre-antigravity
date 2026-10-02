/**
 * KONKANIGO TOURIST MODE VIEW
 * Mature, high-contrast, practical travel companion for visitors to Goa.
 * Offers 1-Day, 3-Day, and 7-Day curated phrase packs and contextual scenarios.
 */

import { TOURIST_PACKS, TOURIST_SCENARIOS, getTouristScenario } from "../data/tourist.js";
import { ttsService } from "../services/ttsService.js";
import { progressService } from "../services/progressService.js";

export function renderTouristView(navigateTo) {
  const container = document.createElement("div");
  container.className = "view-container tourist-view";

  let selectedPackId = "3day"; // Default: 3-day weekend traveler
  let activeScenarioId = "scen_restaurant";

  function render() {
    const pack = TOURIST_PACKS[selectedPackId];
    const scenario = getTouristScenario(activeScenarioId);
    const state = progressService.state;

    container.innerHTML = `
      <!-- Tourist Header -->
      <div class="tourist-header">
        <div class="tourist-badge">GOA TRAVEL COMPANION</div>
        <h2 class="tourist-title">Practical Goan Konkani</h2>
        <p class="tourist-subtitle">Essential phrases to connect with locals, order fresh food, and travel smoothly.</p>

        <!-- Itinerary Duration Selector -->
        <div class="duration-selector">
          <button class="duration-btn ${selectedPackId === '1day' ? 'active' : ''}" data-pack="1day">
            1 Day Express
          </button>
          <button class="duration-btn ${selectedPackId === '3day' ? 'active' : ''}" data-pack="3day">
            3 Days Trip ⭐
          </button>
          <button class="duration-btn ${selectedPackId === '7day' ? 'active' : ''}" data-pack="7day">
            7 Days Explorer
          </button>
        </div>

        <div class="pack-info-strip">
          <span>${pack.badge} • ${pack.targetTime}</span>
          <p>${pack.subtitle}</p>
        </div>
      </div>

      <!-- Scenarios Horizontal Scroll -->
      <div class="scenarios-tabs-row">
        ${pack.scenarios.map(sId => {
          const sc = getTouristScenario(sId);
          if (!sc) return "";
          const isMastered = state.completedTourist.includes(sc.id);
          return `
            <button class="scenario-tab-btn ${activeScenarioId === sc.id ? 'active' : ''} ${isMastered ? 'mastered' : ''}" data-scen="${sc.id}">
              <span class="sc-icon">${sc.icon}</span>
              <span class="sc-name">${sc.title.split("/")[0]}</span>
              ${isMastered ? `<span class="check-icon">✓</span>` : ''}
            </button>
          `;
        }).join("")}
      </div>

      <!-- Active Scenario Container -->
      <div class="active-scenario-card card-shadow" id="scenarioCard">
        <div class="scenario-card-top">
          <div class="scen-icon-big">${scenario.icon}</div>
          <div>
            <span class="scenario-label">SCENARIO</span>
            <h3 class="scenario-heading">${scenario.title}</h3>
            <p class="scenario-desc">${scenario.description}</p>
          </div>
        </div>

        <!-- Phrases in Scenario -->
        <div class="scenario-phrases-list">
          ${scenario.phrases.map((p, idx) => `
            <div class="tourist-phrase-card" data-phrase-id="${p.id}">
              <div class="phrase-number">#${idx + 1}</div>
              <div class="phrase-main-content">
                <div class="phrase-dev">${p.devanagari}</div>
                <div class="phrase-rom">“${p.roman}”</div>
                <div class="phrase-eng">${p.english}</div>
                <div class="phrase-phon">🗣️ Pronounced: "<em>${p.phonetic}</em>"</div>
                <div class="phrase-context">💡 <em>When to use:</em> ${p.context}</div>
              </div>
              <div class="phrase-actions">
                <button class="btn-tourist-audio" data-speech="${p.roman}" data-phon="${p.phonetic}" title="Listen to pronunciation">
                  🔊 Listen
                </button>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Scenario Bottom Actions -->
        <div class="scenario-footer-actions">
          <button class="btn btn-secondary btn-sm" id="btnRoleplayScenario">
            Practise Scenario with AI Coach 💬
          </button>
          <button class="btn btn-primary btn-sm" id="btnMarkScenarioMastered">
            ${state.completedTourist.includes(scenario.id) ? "✓ Mastered (+30 XP)" : "Mark as Mastered (+30 XP)"}
          </button>
        </div>
      </div>
    `;

    // Duration buttons
    container.querySelectorAll(".duration-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedPackId = btn.getAttribute("data-pack");
        activeScenarioId = TOURIST_PACKS[selectedPackId].scenarios[0];
        render();
      });
    });

    // Scenario tabs
    container.querySelectorAll(".scenario-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        activeScenarioId = btn.getAttribute("data-scen");
        render();
      });
    });

    // Audio buttons
    container.querySelectorAll(".btn-tourist-audio").forEach(btn => {
      btn.addEventListener("click", () => {
        const speech = btn.getAttribute("data-speech");
        const phon = btn.getAttribute("data-phon");
        ttsService.speak(speech, { phonetic: phon });
      });
    });

    // Roleplay with AI
    container.querySelector("#btnRoleplayScenario").addEventListener("click", () => {
      const prompt = `Let's roleplay this travel scenario: "${scenario.title}" in Konkani.`;
      navigateTo("ai", { initialQuery: prompt });
    });

    // Mark as mastered
    container.querySelector("#btnMarkScenarioMastered").addEventListener("click", (e) => {
      progressService.completeTouristScenario(scenario.id);
      ttsService.playSuccessSound();
      e.target.innerText = "✓ Mastered (+30 XP)";
      e.target.classList.add("btn-disabled");
    });
  }

  render();
  return container;
}
