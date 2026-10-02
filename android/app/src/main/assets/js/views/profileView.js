/**
 * KONKANIGO USER PROFILE & SETTINGS VIEW
 * Displays player level, XP, badges wall, streak, learning stats, and Gemini API settings.
 */

import { progressService, ALL_BADGES } from "../services/progressService.js";
import { TorliMascot } from "../mascot.js";

export function renderProfileView(navigateTo) {
  const container = document.createElement("div");
  container.className = "view-container profile-view";

  const state = progressService.state;
  const levelInfo = progressService.getCurrentLevel();

  container.innerHTML = `
    <!-- Profile Header Card -->
    <div class="profile-header-card card-shadow">
      <div class="profile-avatar-wrap">
        ${TorliMascot.render("happy", "", 80)}
      </div>
      <div class="profile-user-info">
        <h2 class="profile-username">${state.userProfile.name}</h2>
        <span class="profile-level-badge">⭐ LEVEL ${levelInfo.level}: ${levelInfo.title}</span>
        <p class="profile-tagline">“Amchi Bhaas, Amche Goem”</p>
      </div>
    </div>

    <!-- Gamification Stats Grid -->
    <div class="profile-stats-grid">
      <div class="p-stat-box card-shadow">
        <span class="ps-icon">🔥</span>
        <div class="ps-val">${state.streak} Days</div>
        <div class="ps-lbl">Daily Streak</div>
      </div>
      <div class="p-stat-box card-shadow">
        <span class="ps-icon">⭐</span>
        <div class="ps-val">${state.xp}</div>
        <div class="ps-lbl">Total XP</div>
      </div>
      <div class="p-stat-box card-shadow">
        <span class="ps-icon">📚</span>
        <div class="ps-val">${state.completedLessons.length}</div>
        <div class="ps-lbl">Lessons Completed</div>
      </div>
      <div class="p-stat-box card-shadow">
        <span class="ps-icon">🏛️</span>
        <div class="ps-val">${state.discoveredCulture.length}</div>
        <div class="ps-lbl">Culture Discovered</div>
      </div>
      <div class="p-stat-box card-shadow">
        <span class="ps-icon">🗣️</span>
        <div class="ps-val">${state.learnedWords.length}</div>
        <div class="ps-lbl">Words Mastered</div>
      </div>
      <div class="p-stat-box card-shadow">
        <span class="ps-icon">🏖️</span>
        <div class="ps-val">${state.completedTourist.length}</div>
        <div class="ps-lbl">Tourist Scenarios</div>
      </div>
    </div>

    <!-- Badges Showcase -->
    <div class="badges-showcase-section">
      <h3 class="section-heading">Cultural Badges Unlocked</h3>
      <div class="badges-wall-grid">
        ${ALL_BADGES.map(b => {
          const unlocked = state.unlockedBadges.includes(b.id);
          return `
            <div class="badge-item-card ${unlocked ? 'unlocked' : 'locked'} card-shadow">
              <div class="badge-icon-bubble">${b.icon}</div>
              <h4 class="badge-title">${b.title}</h4>
              <p class="badge-desc">${b.description}</p>
              <span class="badge-status-pill">${unlocked ? '✓ Unlocked' : '🔒 Locked'}</span>
            </div>
          `;
        }).join("")}
      </div>
    </div>

    <!-- Settings & API Credentials -->
    <div class="settings-card card-shadow">
      <h3 class="settings-title">⚙️ App Settings & AI Configuration</h3>

      <div class="setting-item">
        <label for="inputApiKey">Google Gemini API Key (Optional):</label>
        <p class="setting-help">
          Unlock live Gemini 3.8 Flash TTS & conversational AI Tutor. If omitted, KonkaniGO runs on the verified pedagogical dialogue engine.
        </p>
        <div class="input-with-btn">
          <input type="password" id="inputApiKey" class="setting-input" value="${state.geminiApiKey}" placeholder="AIzaSy..." />
          <button class="btn btn-sm btn-primary" id="btnSaveKey">Save Key</button>
        </div>
      </div>

      <div class="setting-item">
        <button class="btn btn-outline btn-sm btn-block" id="btnRefillHearts">
          ❤️ Refill Hearts (${state.hearts}/${state.maxHearts})
        </button>
      </div>

      <div class="setting-item">
        <button class="btn btn-secondary btn-sm btn-block" id="btnResetProgress">
          🔄 Reset Demo Progress
        </button>
      </div>
    </div>
  `;

  // Save API Key
  container.querySelector("#btnSaveKey").addEventListener("click", () => {
    const key = container.querySelector("#inputApiKey").value;
    progressService.setApiKey(key);
    alert(key ? "Gemini API key saved securely in your browser's local storage!" : "API key cleared. Using verified Konkani engine.");
  });

  // Refill Hearts
  container.querySelector("#btnRefillHearts").addEventListener("click", () => {
    progressService.refillHearts();
    alert("Hearts refilled to 5! Ready to continue learning.");
    navigateTo("profile");
  });

  // Reset Progress
  container.querySelector("#btnResetProgress").addEventListener("click", () => {
    if (confirm("Reset all progress back to initial state?")) {
      localStorage.removeItem("konkanigo_state_v1");
      location.reload();
    }
  });

  return container;
}
