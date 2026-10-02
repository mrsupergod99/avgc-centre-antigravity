/**
 * KONKANIGO LEARN VIEW (GEN ALPHA & YOUTH CURRICULUM)
 * 5 Units with interactive exercises:
 * Multiple Choice, Translations, Word Arrangement, Match Pairs, Sentence Completion, Listening & Speaking.
 */

import { CURRICULUM_UNITS, getLessonById } from "../data/lessons.js";
import { progressService } from "../services/progressService.js";
import { ttsService } from "../services/ttsService.js";
import { TorliMascot } from "../mascot.js";

export function renderLearnView(navigateTo, initialLessonId = null) {
  const container = document.createElement("div");
  container.className = "view-container learn-view";

  let activeLesson = initialLessonId ? getLessonById(initialLessonId) : null;
  let currentExerciseIndex = 0;
  let mistakesInLesson = 0;

  function renderUnitList() {
    const state = progressService.state;

    container.innerHTML = `
      <div class="learn-header">
        <h2 class="page-title">Learn Konkani</h2>
        <p class="page-subtitle">Amchi Bhaas • Master Goan Konkani step by step</p>

        <!-- Stats Bar -->
        <div class="stats-pills-row">
          <div class="stat-pill streak-pill">
            <span>🔥 ${state.streak} Days</span>
          </div>
          <div class="stat-pill xp-pill">
            <span>⭐ ${state.xp} XP</span>
          </div>
          <div class="stat-pill hearts-pill">
            <span>❤️ ${state.hearts}/${state.maxHearts}</span>
          </div>
        </div>
      </div>

      <!-- 5 Units Roadmap -->
      <div class="units-roadmap">
        ${CURRICULUM_UNITS.map(unit => {
          const isCompleted = unit.lessons.every(l => state.completedLessons.includes(l.id));
          const completedCount = unit.lessons.filter(l => state.completedLessons.includes(l.id)).length;

          return `
            <div class="unit-card ${isCompleted ? 'unit-completed' : ''}" style="border-top-color: ${unit.color}">
              <div class="unit-banner" style="background: ${unit.color}">
                <div class="unit-icon">${unit.icon}</div>
                <div class="unit-meta">
                  <span class="unit-badge">UNIT ${unit.unitNumber}</span>
                  <h3 class="unit-title-dev">${unit.titleDevanagari}</h3>
                  <h4 class="unit-title-eng">${unit.titleEnglish} (${unit.titleRoman})</h4>
                </div>
                <span class="unit-completion-tag">${completedCount}/${unit.lessons.length}</span>
              </div>
              <p class="unit-desc">${unit.description}</p>

              <!-- Lessons in Unit -->
              <div class="lessons-list">
                ${unit.lessons.map((lesson, idx) => {
                  const done = state.completedLessons.includes(lesson.id);
                  return `
                    <div class="lesson-row ${done ? 'done' : ''}" data-lesson-id="${lesson.id}">
                      <div class="lesson-indicator">${done ? '✓' : idx + 1}</div>
                      <div class="lesson-info">
                        <span class="lesson-name">${lesson.title}</span>
                        <span class="lesson-exercises">${lesson.exercises.length} exercises • +${lesson.xpReward} XP</span>
                      </div>
                      <button class="btn btn-sm ${done ? 'btn-outline' : 'btn-primary'} btn-start-lesson">
                        ${done ? 'Review' : 'Start'}
                      </button>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    // Attach click listeners to lesson rows
    container.querySelectorAll(".lesson-row").forEach(row => {
      row.addEventListener("click", () => {
        const lessonId = row.getAttribute("data-lesson-id");
        activeLesson = getLessonById(lessonId);
        currentExerciseIndex = 0;
        mistakesInLesson = 0;
        renderActiveExercise();
      });
    });
  }

  function renderActiveExercise() {
    if (!activeLesson) return renderUnitList();

    const ex = activeLesson.exercises[currentExerciseIndex];
    const totalEx = activeLesson.exercises.length;
    const progressPct = Math.round((currentExerciseIndex / totalEx) * 100);
    const state = progressService.state;

    container.innerHTML = `
      <div class="exercise-runner">
        <!-- Top Bar with Exit, Progress & Hearts -->
        <div class="exercise-topbar">
          <button class="btn-icon-close" id="btnExitExercise" title="Exit Lesson">✕</button>
          <div class="exercise-progress-bar">
            <div class="exercise-progress-fill" style="width: ${progressPct}%"></div>
          </div>
          <div class="hearts-indicator">
            ❤️ ${state.hearts}
          </div>
        </div>

        <!-- Exercise Content -->
        <div class="exercise-body">
          <div class="mascot-prompt-row">
            <div id="mascotContainer">
              ${TorliMascot.render("thinking", "", 85)}
            </div>
            <div class="exercise-question-box">
              <span class="exercise-type-tag">${formatExerciseType(ex.type)}</span>
              <h3 class="exercise-question">${ex.question}</h3>
              ${ex.audioText ? `
                <button class="btn-audio-listen" id="btnPlayAudio" title="Listen to pronunciation">
                  🔊 Listen: <strong>${ex.audioText}</strong>
                </button>
              ` : ''}
              ${ex.promptPhonetic ? `
                <div class="phonetic-guide">🗣️ Pronounced: "<em>${ex.promptPhonetic}</em>"</div>
              ` : ''}
            </div>
          </div>

          <!-- Dynamic Exercise Area -->
          <div class="exercise-interactive-area" id="interactiveArea"></div>

          <!-- Feedback Drawer -->
          <div class="exercise-feedback-drawer hidden" id="feedbackDrawer"></div>
        </div>
      </div>
    `;

    container.querySelector("#btnExitExercise").addEventListener("click", () => {
      activeLesson = null;
      renderUnitList();
    });

    const playBtn = container.querySelector("#btnPlayAudio");
    if (playBtn) {
      playBtn.addEventListener("click", () => {
        ttsService.speak(ex.audioText, { phonetic: ex.promptPhonetic });
      });
    }

    renderInteractiveContent(ex);
  }

  function renderInteractiveContent(ex) {
    const area = container.querySelector("#interactiveArea");
    if (!area) return;

    if (ex.type === "multiple-choice" || ex.type === "translate-to-english" || ex.type === "translate-to-konkani" || ex.type === "listening") {
      area.innerHTML = `
        <div class="options-grid">
          ${ex.options.map(opt => `
            <button class="option-btn" data-correct="${opt.correct}">
              ${opt.text}
            </button>
          `).join("")}
        </div>
      `;

      area.querySelectorAll(".option-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const isCorrect = btn.getAttribute("data-correct") === "true";
          handleAnswerEvaluation(isCorrect, ex);
        });
      });
    } 
    else if (ex.type === "word-arrange") {
      let selectedWords = [];
      const scrambled = [...ex.scrambledWords];

      area.innerHTML = `
        <div class="word-arrange-target" id="targetSlot">
          <span class="target-placeholder">Tap words below to arrange sentence</span>
        </div>
        <div class="word-chips-pool" id="sourcePool">
          ${scrambled.map((w, idx) => `
            <button class="word-chip" data-word="${w}" data-idx="${idx}">${w}</button>
          `).join("")}
        </div>
        <button class="btn btn-primary btn-block btn-check-arrange" id="btnCheckArrange" disabled>Check Order</button>
      `;

      const targetSlot = area.querySelector("#targetSlot");
      const checkBtn = area.querySelector("#btnCheckArrange");

      area.querySelectorAll(".word-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          const word = chip.getAttribute("data-word");
          if (!chip.classList.contains("used")) {
            chip.classList.add("used");
            selectedWords.push(word);
            updateTargetDisplay();
          }
        });
      });

      function updateTargetDisplay() {
        if (selectedWords.length === 0) {
          targetSlot.innerHTML = `<span class="target-placeholder">Tap words below to arrange sentence</span>`;
          checkBtn.disabled = true;
          return;
        }
        targetSlot.innerHTML = selectedWords.map((w, i) => `
          <span class="arranged-word" data-arr-idx="${i}">${w} ✕</span>
        `).join("");
        checkBtn.disabled = false;

        targetSlot.querySelectorAll(".arranged-word").forEach(wEl => {
          wEl.addEventListener("click", () => {
            const idx = parseInt(wEl.getAttribute("data-arr-idx"));
            const removedWord = selectedWords.splice(idx, 1)[0];
            const origChip = area.querySelector(`.word-chip[data-word="${removedWord}"].used`);
            if (origChip) origChip.classList.remove("used");
            updateTargetDisplay();
          });
        });
      }

      checkBtn.addEventListener("click", () => {
        const isCorrect = selectedWords.join(" ") === ex.correctOrder.join(" ");
        handleAnswerEvaluation(isCorrect, ex);
      });
    }
    else if (ex.type === "match-pairs") {
      let selectedKonkani = null;
      let selectedEnglish = null;
      let matchedCount = 0;

      // Scramble columns
      const konkaniList = [...ex.pairs].sort(() => Math.random() - 0.5);
      const englishList = [...ex.pairs].sort(() => Math.random() - 0.5);

      area.innerHTML = `
        <div class="match-pairs-columns">
          <div class="match-column" id="colKonkani">
            ${konkaniList.map(p => `
              <button class="match-tile" data-roman="${p.roman}">
                <strong>${p.konkani}</strong>
                <small>${p.roman}</small>
              </button>
            `).join("")}
          </div>
          <div class="match-column" id="colEnglish">
            ${englishList.map(p => `
              <button class="match-tile" data-roman="${p.roman}">
                ${p.english}
              </button>
            `).join("")}
          </div>
        </div>
      `;

      area.querySelectorAll("#colKonkani .match-tile").forEach(tile => {
        tile.addEventListener("click", () => {
          if (tile.classList.contains("matched")) return;
          area.querySelectorAll("#colKonkani .match-tile").forEach(t => t.classList.remove("selected"));
          tile.classList.add("selected");
          selectedKonkani = tile.getAttribute("data-roman");
          checkMatch();
        });
      });

      area.querySelectorAll("#colEnglish .match-tile").forEach(tile => {
        tile.addEventListener("click", () => {
          if (tile.classList.contains("matched")) return;
          area.querySelectorAll("#colEnglish .match-tile").forEach(t => t.classList.remove("selected"));
          tile.classList.add("selected");
          selectedEnglish = tile.getAttribute("data-roman");
          checkMatch();
        });
      });

      function checkMatch() {
        if (selectedKonkani && selectedEnglish) {
          if (selectedKonkani === selectedEnglish) {
            // Match success
            ttsService.playAudioCue();
            area.querySelector(`#colKonkani .match-tile[data-roman="${selectedKonkani}"]`).classList.add("matched");
            area.querySelector(`#colEnglish .match-tile[data-roman="${selectedEnglish}"]`).classList.add("matched");
            matchedCount++;
            selectedKonkani = null;
            selectedEnglish = null;

            if (matchedCount === ex.pairs.length) {
              setTimeout(() => handleAnswerEvaluation(true, ex), 600);
            }
          } else {
            // Match failed
            const kTile = area.querySelector(`#colKonkani .match-tile.selected`);
            const eTile = area.querySelector(`#colEnglish .match-tile.selected`);
            if (kTile) kTile.classList.add("shake-error");
            if (eTile) eTile.classList.add("shake-error");
            setTimeout(() => {
              if (kTile) kTile.classList.remove("shake-error", "selected");
              if (eTile) eTile.classList.remove("shake-error", "selected");
              selectedKonkani = null;
              selectedEnglish = null;
            }, 600);
          }
        }
      }
    }
    else if (ex.type === "sentence-completion") {
      area.innerHTML = `
        <div class="sentence-fill-box">
          <div class="fill-devanagari">${ex.konkaniDevanagari}</div>
          <div class="fill-roman">${ex.sentenceTemplate}</div>
        </div>
        <div class="options-grid">
          ${ex.options.map(opt => `
            <button class="option-btn" data-opt="${opt}">
              ${opt}
            </button>
          `).join("")}
        </div>
      `;

      area.querySelectorAll(".option-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const isCorrect = btn.getAttribute("data-opt") === ex.missingWord;
          handleAnswerEvaluation(isCorrect, ex);
        });
      });
    }
    else if (ex.type === "speaking") {
      area.innerHTML = `
        <div class="speaking-practice-box">
          <div class="speaking-target-phrase">
            <span class="spk-dev">${ex.devanagari}</span>
            <span class="spk-rom">${ex.targetPhrase}</span>
            <span class="spk-phon">🗣️ "${ex.phonetic}"</span>
          </div>

          <button class="btn-mic-pulse" id="btnRecordVoice">
            <span class="mic-icon">🎤</span>
            <span class="mic-label">Tap to Speak</span>
          </button>
          <p class="mic-hint">Practice out loud! Torli will verify your Goan pronunciation.</p>
        </div>
      `;

      const micBtn = area.querySelector("#btnRecordVoice");
      micBtn.addEventListener("click", () => {
        micBtn.classList.add("recording");
        micBtn.querySelector(".mic-label").innerText = "Listening...";
        ttsService.speak(ex.audioText);

        setTimeout(() => {
          micBtn.classList.remove("recording");
          handleAnswerEvaluation(true, ex);
        }, 1800);
      });
    }
  }

  function handleAnswerEvaluation(isCorrect, ex) {
    const feedback = container.querySelector("#feedbackDrawer");
    const mascotContainer = container.querySelector("#mascotContainer");
    if (!feedback) return;

    feedback.classList.remove("hidden", "correct", "wrong");

    if (isCorrect) {
      ttsService.playSuccessSound();
      progressService.addXP(10, "Correct Exercise Answer");
      feedback.classList.add("correct");
      if (mascotContainer) {
        mascotContainer.innerHTML = TorliMascot.render("correct", "Wah! Ekdam borem! 🎉", 85);
      }

      feedback.innerHTML = `
        <div class="feedback-content">
          <div class="feedback-title">✓ Wah! Ekdam Borem! (Awesome!)</div>
          ${ex.explanation ? `<div class="feedback-exp">${ex.explanation}</div>` : ''}
          <button class="btn btn-success btn-block" id="btnNextExercise">Continue →</button>
        </div>
      `;
    } else {
      mistakesInLesson++;
      progressService.loseHeart();
      feedback.classList.add("wrong");
      if (mascotContainer) {
        mascotContainer.innerHTML = TorliMascot.render("wrong", "Almost! Try once more.", 85);
      }

      feedback.innerHTML = `
        <div class="feedback-content">
          <div class="feedback-title">✕ Almost there! Porthun proytn korat.</div>
          ${ex.explanation ? `<div class="feedback-exp">${ex.explanation}</div>` : ''}
          <button class="btn btn-secondary btn-block" id="btnNextExercise">Got it, Continue →</button>
        </div>
      `;
    }

    feedback.querySelector("#btnNextExercise").addEventListener("click", () => {
      currentExerciseIndex++;
      if (currentExerciseIndex < activeLesson.exercises.length) {
        renderActiveExercise();
      } else {
        renderLessonCompletion();
      }
    });
  }

  function renderLessonCompletion() {
    const isPerfect = mistakesInLesson === 0;
    const earnedXp = progressService.completeLesson(activeLesson.id, isPerfect ? 100 : 80);

    container.innerHTML = `
      <div class="lesson-complete-card card-shadow">
        <div class="celebration-mascot">
          ${TorliMascot.render("celebration", "You did it! 🎉", 140)}
        </div>
        <h2 class="complete-heading">Lesson Complete!</h2>
        <p class="complete-sub">“Amchi Bhaas, Amche Goem”</p>

        <div class="complete-stats-row">
          <div class="complete-stat">
            <span class="cs-val">+${earnedXp}</span>
            <span class="cs-lbl">XP Earned</span>
          </div>
          <div class="complete-stat">
            <span class="cs-val">${isPerfect ? '100%' : 'Great'}</span>
            <span class="cs-lbl">Accuracy</span>
          </div>
          <div class="complete-stat">
            <span class="cs-val">🔥 ${progressService.state.streak}</span>
            <span class="cs-lbl">Day Streak</span>
          </div>
        </div>

        <button class="btn btn-primary btn-block" id="btnBackToCurriculum">
          Continue Learning →
        </button>
      </div>
    `;

    container.querySelector("#btnBackToCurriculum").addEventListener("click", () => {
      activeLesson = null;
      renderUnitList();
    });
  }

  function formatExerciseType(type) {
    switch (type) {
      case "multiple-choice": return "Multiple Choice";
      case "translate-to-english": return "Translate to English";
      case "translate-to-konkani": return "Translate to Konkani";
      case "word-arrange": return "Sentence Building";
      case "match-pairs": return "Vocabulary Match";
      case "sentence-completion": return "Fill in the Blank";
      case "listening": return "Listening Practice";
      case "speaking": return "Voice Pronunciation";
      default: return "Language Game";
    }
  }

  if (activeLesson) {
    renderActiveExercise();
  } else {
    renderUnitList();
  }

  return container;
}
