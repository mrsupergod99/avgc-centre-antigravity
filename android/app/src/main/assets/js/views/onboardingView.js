/**
 * KONKANIGO ONBOARDING VIEW
 * Multi-step welcoming onboarding experience for children, youth, and travelers.
 * Screen 1: Brand Introduction
 * Screen 2: What brings you here?
 * Screen 3: Konkani proficiency level
 * Screen 4: Daily learning commitment
 */

import { progressService } from "../services/progressService.js";
import { TorliMascot } from "../mascot.js";

export function renderOnboardingView(onComplete) {
  const container = document.createElement("div");
  container.className = "onboarding-container";

  let currentStep = 1;
  const userChoices = {
    reason: "Learn Konkani",
    level: "Beginner",
    dailyGoal: 10
  };

  function renderStep() {
    if (currentStep === 1) {
      container.innerHTML = `
        <div class="onboarding-step step-1 card-shadow">
          <div class="onboard-icon-preview" style="margin-bottom: 8px;">
            <img src="./assets/icons/app-icon.jpg" alt="KonkaniGO Icon" style="width: 84px; height: 84px; border-radius: 20px; box-shadow: 0 8px 18px rgba(12, 35, 64, 0.18);" />
          </div>

          <div class="onboard-brand">
            <h1 class="brand-title-huge">KONKANIGO</h1>
            <p class="brand-tagline-huge">“Amchi Bhaas, Amche Goem”</p>
          </div>

          <div class="onboard-mascot">
            ${TorliMascot.render("greeting", "Devo boro dis dium! I am Torli.", 140)}
          </div>

          <div class="onboard-body">
            <h3>Learn Konkani. Discover Goa. Experience Your Culture.</h3>
            <p>The AI-powered language-learning & Goan cultural discovery platform.</p>
          </div>

          <button class="btn btn-primary btn-block btn-lg" id="btnNext1">Get Started →</button>
        </div>
      `;
      container.querySelector("#btnNext1").addEventListener("click", () => {
        currentStep = 2;
        renderStep();
      });
    } else if (currentStep === 2) {
      container.innerHTML = `
        <div class="onboarding-step step-2 card-shadow">
          <div class="step-progress-dots">
            <span class="dot done"></span><span class="dot active"></span><span class="dot"></span><span class="dot"></span>
          </div>

          <h2 class="step-title">What brings you here?</h2>
          <p class="step-sub">We’ll personalize your Goan experience.</p>

          <div class="onboard-options-list">
            <button class="onboard-choice-btn active" data-choice="Learn Konkani">
              <span class="choice-icon">🟢</span>
              <div class="choice-text">
                <strong>Learn Konkani</strong>
                <small>Fun games, speaking practice, and daily quests</small>
              </div>
            </button>
            <button class="onboard-choice-btn" data-choice="Explore Goa">
              <span class="choice-icon">🔵</span>
              <div class="choice-text">
                <strong>Explore Goa</strong>
                <small>Food, 3D heritage artifacts, festivals & history</small>
              </div>
            </button>
            <button class="onboard-choice-btn" data-choice="Visit Goa">
              <span class="choice-icon">🟠</span>
              <div class="choice-text">
                <strong>Visit Goa (Tourist Mode)</strong>
                <small>Practical phrases for beach shacks, taxis, and markets</small>
              </div>
            </button>
          </div>

          <button class="btn btn-primary btn-block" id="btnNext2">Continue →</button>
        </div>
      `;

      container.querySelectorAll(".onboard-choice-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          container.querySelectorAll(".onboard-choice-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          userChoices.reason = btn.getAttribute("data-choice");
        });
      });

      container.querySelector("#btnNext2").addEventListener("click", () => {
        currentStep = 3;
        renderStep();
      });
    } else if (currentStep === 3) {
      container.innerHTML = `
        <div class="onboarding-step step-3 card-shadow">
          <div class="step-progress-dots">
            <span class="dot done"></span><span class="dot done"></span><span class="dot active"></span><span class="dot"></span>
          </div>

          <h2 class="step-title">What is your Konkani level?</h2>
          <p class="step-sub">Pick where you feel most comfortable.</p>

          <div class="onboard-options-list">
            <button class="onboard-choice-btn active" data-level="Beginner">
              <span class="choice-icon">🌱</span>
              <div class="choice-text">
                <strong>Complete Beginner</strong>
                <small>New to Konkani words and sounds</small>
              </div>
            </button>
            <button class="onboard-choice-btn" data-level="Some Konkani">
              <span class="choice-icon">🌊</span>
              <div class="choice-text">
                <strong>Know Some Words</strong>
                <small>Can recognize common greetings and food items</small>
              </div>
            </button>
            <button class="onboard-choice-btn" data-level="Comfortable">
              <span class="choice-icon">👑</span>
              <div class="choice-text">
                <strong>Conversational / Heritage Speaker</strong>
                <small>Want to practice, read Devanagari, and deepen culture</small>
              </div>
            </button>
          </div>

          <button class="btn btn-primary btn-block" id="btnNext3">Continue →</button>
        </div>
      `;

      container.querySelectorAll(".onboard-choice-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          container.querySelectorAll(".onboard-choice-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          userChoices.level = btn.getAttribute("data-level");
        });
      });

      container.querySelector("#btnNext3").addEventListener("click", () => {
        currentStep = 4;
        renderStep();
      });
    } else if (currentStep === 4) {
      container.innerHTML = `
        <div class="onboarding-step step-4 card-shadow">
          <div class="step-progress-dots">
            <span class="dot done"></span><span class="dot done"></span><span class="dot done"></span><span class="dot active"></span>
          </div>

          <h2 class="step-title">Set your daily learning goal</h2>
          <p class="step-sub">Just a few minutes a day keeps your streak burning 🔥</p>

          <div class="onboard-options-list">
            <button class="onboard-choice-btn" data-goal="5">
              <span class="choice-icon">⚡</span>
              <div class="choice-text">
                <strong>5 Minutes / day</strong>
                <small>Casual & relaxed</small>
              </div>
            </button>
            <button class="onboard-choice-btn active" data-goal="10">
              <span class="choice-icon">🎯</span>
              <div class="choice-text">
                <strong>10 Minutes / day (Recommended)</strong>
                <small>Steady progress & badge rewards</small>
              </div>
            </button>
            <button class="onboard-choice-btn" data-goal="15">
              <span class="choice-icon">🚀</span>
              <div class="choice-text">
                <strong>15 Minutes / day</strong>
                <small>Rapid Goan language immersion</small>
              </div>
            </button>
          </div>

          <button class="btn btn-success btn-block btn-lg" id="btnFinishOnboard">
            Enter KonkaniGO 🚀
          </button>
        </div>
      `;

      container.querySelectorAll(".onboard-choice-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          container.querySelectorAll(".onboard-choice-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          userChoices.dailyGoal = parseInt(btn.getAttribute("data-goal"));
        });
      });

      container.querySelector("#btnFinishOnboard").addEventListener("click", () => {
        progressService.state.userProfile.reason = userChoices.reason;
        progressService.state.userProfile.levelChoice = userChoices.level;
        progressService.state.dailyGoalMinutes = userChoices.dailyGoal;
        progressService.saveState();
        localStorage.setItem("konkanigo_onboarded", "true");
        onComplete(userChoices.reason);
      });
    }
  }

  renderStep();
  return container;
}
