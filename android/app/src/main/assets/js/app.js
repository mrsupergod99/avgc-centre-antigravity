/**
 * KONKANIGO MAIN APPLICATION CONTROLLER
 * “Amchi Bhaas, Amche Goem”
 * 
 * Orchestrates navigation, views, bottom nav bar, state subscriptions, and PWA integration.
 */

import { renderHomeView } from "./views/homeView.js";
import { renderLearnView } from "./views/learnView.js";
import { renderExploreView } from "./views/exploreView.js";
import { renderAiView } from "./views/aiView.js";
import { renderTouristView } from "./views/touristView.js";
import { renderQrView } from "./views/qrView.js";
import { renderProfileView } from "./views/profileView.js";
import { renderOnboardingView } from "./views/onboardingView.js";
import { progressService } from "./services/progressService.js";

class KonkaniGoApp {
  constructor() {
    this.appRoot = document.getElementById("app");
    this.mainContent = document.getElementById("mainContent");
    this.bottomNav = document.getElementById("bottomNav");
    this.currentView = "home";
    this.viewOptions = {};

    this.init();
  }

  init() {
    // Check if onboarded
    const onboarded = localStorage.getItem("konkanigo_onboarded");
    if (!onboarded) {
      this.showOnboarding();
    } else {
      this.handleHashChange();
    }

    // Hash change routing
    window.addEventListener("hashchange", () => this.handleHashChange());

    // Setup bottom nav listeners
    this.bottomNav.querySelectorAll(".nav-item").forEach(item => {
      item.addEventListener("click", () => {
        const view = item.getAttribute("data-view");
        this.navigateTo(view);
      });
    });

    // Subscribe to progress changes
    progressService.subscribe((state) => {
      this.updateGlobalBadges(state);
    });

    // Register Service Worker for PWA
    this.registerServiceWorker();
  }

  showOnboarding() {
    this.bottomNav.classList.add("hidden");
    this.mainContent.innerHTML = "";
    const onboardEl = renderOnboardingView((reason) => {
      this.bottomNav.classList.remove("hidden");
      if (reason === "Explore Goa") {
        this.navigateTo("explore");
      } else if (reason === "Visit Goa") {
        this.navigateTo("tourist");
      } else {
        this.navigateTo("home");
      }
    });
    this.mainContent.appendChild(onboardEl);
  }

  handleHashChange() {
    const rawHash = window.location.hash.replace("#", "").trim();
    if (!rawHash) {
      this.navigateTo("home", {}, false);
      return;
    }

    const parts = rawHash.split("/");
    const view = parts[0];
    const subParam = parts[1] || null;

    if (["home", "learn", "explore", "ai", "tourist", "qr", "profile"].includes(view)) {
      this.navigateTo(view, subParam ? { itemId: subParam, lessonId: subParam } : {}, false);
    } else {
      this.navigateTo("home", {}, false);
    }
  }

  navigateTo(viewName, options = {}, updateHash = true) {
    this.currentView = viewName;
    this.viewOptions = options;

    if (updateHash) {
      window.location.hash = viewName;
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Update bottom nav active state
    this.bottomNav.querySelectorAll(".nav-item").forEach(item => {
      const v = item.getAttribute("data-view");
      item.classList.toggle("active", v === viewName);
    });

    // Hide bottom nav on QR scanner or deep exercise view if needed
    if (viewName === "qr") {
      this.bottomNav.classList.add("hidden");
    } else {
      this.bottomNav.classList.remove("hidden");
    }

    // Render corresponding view
    this.mainContent.innerHTML = "";
    let viewElement = null;

    switch (viewName) {
      case "home":
        viewElement = renderHomeView((v, opts) => this.navigateTo(v, opts));
        break;
      case "learn":
        viewElement = renderLearnView((v, opts) => this.navigateTo(v, opts), options.lessonId);
        break;
      case "explore":
        viewElement = renderExploreView((v, opts) => this.navigateTo(v, opts), options.itemId);
        break;
      case "ai":
        viewElement = renderAiView((v, opts) => this.navigateTo(v, opts), options);
        break;
      case "tourist":
        viewElement = renderTouristView((v, opts) => this.navigateTo(v, opts));
        break;
      case "qr":
        viewElement = renderQrView((v, opts) => this.navigateTo(v, opts));
        break;
      case "profile":
        viewElement = renderProfileView((v, opts) => this.navigateTo(v, opts));
        break;
      default:
        viewElement = renderHomeView((v, opts) => this.navigateTo(v, opts));
        break;
    }

    if (viewElement) {
      this.mainContent.appendChild(viewElement);
    }
  }

  updateGlobalBadges(state) {
    // Reactive sync if needed
  }

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").catch(err => {
          console.info("Service worker registration skipped in local sandbox:", err.message);
        });
      });
    }
  }
}

// Bootstrap on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.konkaniGoApp = new KonkaniGoApp();
});
