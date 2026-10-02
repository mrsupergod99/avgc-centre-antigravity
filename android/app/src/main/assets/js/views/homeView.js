/**
 * KONKANIGO HOME DASHBOARD VIEW
 * Clean, mobile-first, vibrant cultural hub.
 */

import { progressService } from "../services/progressService.js";
import { TorliMascot } from "../mascot.js";
import { GOAN_CULTURE_CATALOG } from "../data/culture.js";

export function renderHomeView(navigateTo) {
  const state = progressService.state;
  const levelInfo = progressService.getCurrentLevel();
  const featuredCulture = GOAN_CULTURE_CATALOG[0]; // Mangane or Balcao

  const container = document.createElement("div");
  container.className = "view-container home-view";

  container.innerHTML = `
    <!-- Top Brand & Gamification Bar -->
    <header class="home-header">
      <div class="brand-row">
        <div>
          <h1 class="brand-title">KONKANIGO</h1>
          <p class="brand-tagline">Amchi Bhaas, Amche Goem</p>
        </div>
        <div class="user-avatar-badge" title="View Profile" style="overflow: hidden; padding: 0;">
          <img src="./assets/icons/app-icon.jpg" alt="KonkaniGO" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;" />
        </div>
      </div>

      <!-- Quick Stats Tracker -->
      <div class="stats-pills-row">
        <div class="stat-pill streak-pill" title="Daily Streak">
          <span class="stat-emoji">🔥</span>
          <span class="stat-value">${state.streak}</span>
          <span class="stat-label">Days</span>
        </div>
        <div class="stat-pill xp-pill" title="Total Experience Points">
          <span class="stat-emoji">⭐</span>
          <span class="stat-value">${state.xp}</span>
          <span class="stat-label">XP</span>
        </div>
        <div class="stat-pill hearts-pill" title="Hearts remaining">
          <span class="stat-emoji">❤️</span>
          <span class="stat-value">${state.hearts}/${state.maxHearts}</span>
        </div>
      </div>
    </header>

    <!-- Welcome & Mascot Greeting Banner -->
    <section class="welcome-card card-shadow">
      <div class="welcome-content">
        <span class="badge-pill">Devo Boro Dis Dium 👋</span>
        <h2 class="welcome-title">Ready to speak Goan Konkani today?</h2>
        <div class="level-indicator">
          <div class="level-meta">
            <span class="level-name">LEVEL ${levelInfo.level}: ${levelInfo.title}</span>
            <span class="level-pct">${levelInfo.progressPercent}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${levelInfo.progressPercent}%"></div>
          </div>
        </div>
      </div>
      <div class="welcome-mascot">
        ${TorliMascot.render("greeting", "Kitem chollam?", 110)}
      </div>
    </section>

    <!-- Today's Daily Quest -->
    <section class="quest-card card-shadow">
      <div class="quest-header">
        <div class="quest-icon-wrap">🎯</div>
        <div class="quest-info">
          <span class="quest-label">TODAY'S QUEST</span>
          <h3 class="quest-title">${state.todayQuest.title}</h3>
          <div class="quest-progress-text">Progress: ${state.todayQuest.progress} / ${state.todayQuest.target}</div>
        </div>
      </div>
      <button class="btn btn-primary btn-sm btn-quest" id="btnContinueQuest">
        ${state.todayQuest.completed ? "✓ Quest Completed" : "Continue Quest →"}
      </button>
    </section>

    <!-- Three Primary Experiences Section -->
    <section class="section-block">
      <h3 class="section-heading">Choose Your Experience</h3>
      
      <div class="experience-cards-grid">
        <!-- 1. Learn Konkani (Primary Gen Alpha Mode) -->
        <div class="exp-card learn-card" id="cardLearnMode">
          <div class="exp-badge">Gen Alpha & Youth</div>
          <div class="exp-icon">🎮</div>
          <h4 class="exp-title">Learn Konkani</h4>
          <p class="exp-desc">5 bite-sized interactive units with games, speaking, and XP rewards.</p>
          <div class="exp-action">Start Learning →</div>
        </div>

        <!-- 2. Explore Goa (Cultural Discovery) -->
        <div class="exp-card explore-card" id="cardExploreMode">
          <div class="exp-badge">Cultural Layer</div>
          <div class="exp-icon">🏛️</div>
          <h4 class="exp-title">Explore Goa</h4>
          <p class="exp-desc">Discover Goan food, fish, 3D heritage artifacts, and festivals.</p>
          <div class="exp-action">Discover Culture →</div>
        </div>

        <!-- 3. Tourist Mode (Practical Survival) -->
        <div class="exp-card tourist-card" id="cardTouristMode">
          <div class="exp-badge">Travel Practical</div>
          <div class="exp-icon">🏖️</div>
          <h4 class="exp-title">Tourist Mode</h4>
          <p class="exp-desc">1, 3, or 7-day practical Konkani for beach shacks, taxis, and markets.</p>
          <div class="exp-action">Enter Tourist Mode →</div>
        </div>
      </div>
    </section>

    <!-- Today's Cultural Discovery Highlight -->
    <section class="section-block">
      <div class="section-header-flex">
        <h3 class="section-heading">Today's Discovery</h3>
        <span class="section-link" id="linkViewAllCulture">View All →</span>
      </div>

      <div class="discovery-card card-shadow" id="cardTodayDiscovery">
        <div class="discovery-emoji-badge">${featuredCulture.imageEmoji}</div>
        <div class="discovery-info">
          <span class="discovery-tag">${featuredCulture.categoryLabel}</span>
          <h4 class="discovery-title">${featuredCulture.title}</h4>
          <p class="discovery-desc">${featuredCulture.tagline}</p>
          <div class="discovery-footer">
            <span class="discovery-location">📍 ${featuredCulture.location}</span>
            <span class="badge-3d">👓 3D Artifact</span>
          </div>
        </div>
      </div>
    </section>

    <!-- AI Coach Quick Launch -->
    <section class="ai-banner card-shadow" id="bannerAiCoach">
      <div class="ai-banner-content">
        <span class="ai-pill">✨ Powered by Torli AI</span>
        <h4>Want to practise ordering fish thali in Konkani?</h4>
        <p>Chat with Torli for instant roleplay and voice feedback.</p>
        <button class="btn btn-secondary btn-sm" id="btnChatAiCoach">Start AI Practice 💬</button>
      </div>
      <div class="ai-banner-mascot">
        ${TorliMascot.render("speaking", "", 95)}
      </div>
    </section>

    <!-- Quick QR & 3D Scanner Action -->
    <section class="qr-banner-strip" id="stripQrScanner">
      <div class="qr-strip-icon">📷</div>
      <div class="qr-strip-text">
        <strong>At a Goan Museum or Heritage Site?</strong>
        <span>Scan QR tags to launch 3D models & Konkani words</span>
      </div>
      <button class="btn btn-outline btn-xs" id="btnOpenQr">Scan QR</button>
    </section>
  `;

  // Attach event listeners
  container.querySelector("#cardLearnMode").addEventListener("click", () => navigateTo("learn"));
  container.querySelector("#cardExploreMode").addEventListener("click", () => navigateTo("explore"));
  container.querySelector("#cardTouristMode").addEventListener("click", () => navigateTo("tourist"));
  container.querySelector("#btnContinueQuest").addEventListener("click", () => navigateTo("learn"));
  container.querySelector("#cardTodayDiscovery").addEventListener("click", () => navigateTo("explore", { itemId: featuredCulture.id }));
  container.querySelector("#linkViewAllCulture").addEventListener("click", () => navigateTo("explore"));
  container.querySelector("#bannerAiCoach").addEventListener("click", () => navigateTo("ai"));
  container.querySelector("#btnChatAiCoach").addEventListener("click", (e) => {
    e.stopPropagation();
    navigateTo("ai");
  });
  container.querySelector("#stripQrScanner").addEventListener("click", () => navigateTo("qr"));
  container.querySelector(".user-avatar-badge").addEventListener("click", () => navigateTo("profile"));

  return container;
}
