/**
 * KONKANIGO PROGRESS & GAMIFICATION SERVICE
 * Manages XP, Hearts/Lives, Streaks, Levels, Badges, and LocalStorage persistence.
 */

const STORAGE_KEY = "konkanigo_state_v1";

export const LEVELS = [
  { level: 1, title: "Konkani Explorer", minXp: 0, maxXp: 150, icon: "🌱" },
  { level: 2, title: "Goem Learner", minXp: 151, maxXp: 400, icon: "🌊" },
  { level: 3, title: "Bhaas Buddy", minXp: 401, maxXp: 800, icon: "🐟" },
  { level: 4, title: "Goan Storyteller", minXp: 801, maxXp: 1500, icon: "👑" },
  { level: 5, title: "Asal Goenkar Guru", minXp: 1501, maxXp: 9999, icon: "⭐" }
];

export const ALL_BADGES = [
  {
    id: "badge_first_step",
    title: "First Splash 💦",
    description: "Completed your very first Konkani lesson!",
    icon: "🐟"
  },
  {
    id: "badge_foodie",
    title: "Nuste Lover 🍛",
    description: "Discovered 3 Goan food & fish culture entries.",
    icon: "🦐"
  },
  {
    id: "badge_streak_3",
    title: "Goan Flame 🔥",
    description: "Maintained a 3-day learning streak!",
    icon: "🔥"
  },
  {
    id: "badge_tourist_ready",
    title: "Shack Diplomat 🏖️",
    description: "Mastered the Beach Shack Tourist scenario.",
    icon: "🍹"
  },
  {
    id: "badge_heritage_sleuth",
    title: "Balcão Detective 🏛️",
    description: "Rotated a 3D Goan cultural artifact or scanned a QR code.",
    icon: "🔍"
  }
];

class ProgressService {
  constructor() {
    this.state = this.loadState();
    this.listeners = [];
    this.checkStreak();
  }

  getDefaultState() {
    return {
      xp: 45,
      hearts: 5,
      maxHearts: 5,
      streak: 5, // Welcoming initial streak for demo delight
      lastActiveDate: new Date().toISOString().split("T")[0],
      completedLessons: ["u1_l1"], // Unit 1 lesson 1 pre-unlocked/demo ready
      discoveredCulture: ["cult_food_mangane"],
      completedTourist: [],
      learnedWords: ["kb_greet_01", "kb_greet_02", "kb_food_01"],
      unlockedBadges: ["badge_first_step"],
      dailyGoalMinutes: 10,
      todayQuest: {
        id: "quest_food",
        title: "Learn 3 Konkani words about food",
        progress: 1,
        target: 3,
        completed: false,
        xpReward: 50
      },
      userProfile: {
        name: "Goenkar Learner",
        levelChoice: "Beginner",
        reason: "Learn Konkani"
      },
      geminiApiKey: ""
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...this.getDefaultState(), ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Storage access failed, using in-memory state", e);
    }
    return this.getDefaultState();
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Failed to persist to localStorage", e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  checkStreak() {
    const today = new Date().toISOString().split("T")[0];
    const lastActive = this.state.lastActiveDate;
    if (lastActive !== today) {
      // If active today, keep streak.
      this.state.lastActiveDate = today;
      this.saveState();
    }
  }

  getCurrentLevel() {
    const xp = this.state.xp;
    const current = LEVELS.find(l => xp >= l.minXp && xp <= l.maxXp) || LEVELS[LEVELS.length - 1];
    const next = LEVELS.find(l => l.level === current.level + 1) || null;
    const levelRange = next ? (next.minXp - current.minXp) : 1000;
    const xpInLevel = xp - current.minXp;
    const progressPercent = next ? Math.min(100, Math.round((xpInLevel / levelRange) * 100)) : 100;

    return {
      ...current,
      progressPercent,
      nextLevel: next
    };
  }

  addXP(amount, reason = "") {
    this.state.xp += amount;
    this.checkBadges();
    this.saveState();
    return { xp: this.state.xp, added: amount, reason };
  }

  loseHeart() {
    if (this.state.hearts > 0) {
      this.state.hearts -= 1;
      this.saveState();
    }
    return this.state.hearts;
  }

  refillHearts() {
    this.state.hearts = this.state.maxHearts;
    this.saveState();
  }

  completeLesson(lessonId, score = 100) {
    if (!this.state.completedLessons.includes(lessonId)) {
      this.state.completedLessons.push(lessonId);
    }
    const xpGain = 40 + (score === 100 ? 15 : 0);
    this.addXP(xpGain, "Lesson completed");
    this.updateDailyQuest("lesson");
    this.checkBadges();
    this.saveState();
    return xpGain;
  }

  discoverCulture(cultureId) {
    if (!this.state.discoveredCulture.includes(cultureId)) {
      this.state.discoveredCulture.push(cultureId);
      this.addXP(25, "Goan Culture Discovered");
      this.updateDailyQuest("culture");
      this.checkBadges();
      this.saveState();
      return true;
    }
    return false;
  }

  completeTouristScenario(scenarioId) {
    if (!this.state.completedTourist.includes(scenarioId)) {
      this.state.completedTourist.push(scenarioId);
      this.addXP(30, "Tourist Scenario Mastered");
      this.checkBadges();
      this.saveState();
    }
  }

  markWordLearned(wordId) {
    if (!this.state.learnedWords.includes(wordId)) {
      this.state.learnedWords.push(wordId);
      this.updateDailyQuest("word");
      this.saveState();
    }
  }

  updateDailyQuest(type) {
    const q = this.state.todayQuest;
    if (!q.completed) {
      q.progress += 1;
      if (q.progress >= q.target) {
        q.completed = true;
        this.addXP(q.xpReward, "Daily Quest Completed!");
      }
      this.saveState();
    }
  }

  checkBadges() {
    const { xp, discoveredCulture, completedTourist } = this.state;
    const toUnlock = [];

    if (discoveredCulture.length >= 2 && !this.state.unlockedBadges.includes("badge_foodie")) {
      toUnlock.push("badge_foodie");
    }
    if (completedTourist.includes("scen_restaurant") && !this.state.unlockedBadges.includes("badge_tourist_ready")) {
      toUnlock.push("badge_tourist_ready");
    }
    if (discoveredCulture.includes("cult_herit_balcao") && !this.state.unlockedBadges.includes("badge_heritage_sleuth")) {
      toUnlock.push("badge_heritage_sleuth");
    }

    if (toUnlock.length > 0) {
      this.state.unlockedBadges.push(...toUnlock);
      this.saveState();
    }
  }

  setApiKey(key) {
    this.state.geminiApiKey = key.trim();
    this.saveState();
  }

  getApiKey() {
    return this.state.geminiApiKey || "";
  }
}

export const progressService = new ProgressService();
