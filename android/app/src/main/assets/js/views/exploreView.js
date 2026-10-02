/**
 * KONKANIGO EXPLORE GOA VIEW
 * Cultural discovery layer connecting Goan Food, Marine Life, Heritage, Festivals, and Literature to Konkani Language.
 * Includes interactive 3D artifact viewer, Goan Discovery Map, and Future AR Preview.
 */

import { GOAN_CULTURE_CATALOG, getCultureItemById, getCultureItemsByCategory } from "../data/culture.js";
import { GOA_MAP_ZONES } from "../data/mapData.js";
import { Cultural3DViewer } from "../services/threeViewer.js";
import { ttsService } from "../services/ttsService.js";
import { progressService } from "../services/progressService.js";
import { TorliMascot } from "../mascot.js";

export function renderExploreView(navigateTo, initialItemId = null) {
  const container = document.createElement("div");
  container.className = "view-container explore-view";

  let activeTab = "catalog"; // 'catalog' | 'map' | '3d' | 'ar'
  let activeCategory = "all";
  let activeDetailItem = initialItemId ? getCultureItemById(initialItemId) : null;
  let activeViewer = null;

  function render() {
    container.innerHTML = `
      <div class="explore-header">
        <h2 class="page-title">Explore Goa</h2>
        <p class="page-subtitle">Amche Goem • Cultural discovery, 3D heritage, and stories</p>

        <!-- Navigation Tabs -->
        <div class="explore-nav-tabs">
          <button class="tab-btn ${activeTab === 'catalog' ? 'active' : ''}" data-tab="catalog">
            🏛️ Heritage & Food
          </button>
          <button class="tab-btn ${activeTab === 'map' ? 'active' : ''}" data-tab="map">
            🗺️ Goa Map
          </button>
          <button class="tab-btn ${activeTab === '3d' ? 'active' : ''}" data-tab="3d">
            👓 3D Artifacts
          </button>
          <button class="tab-btn ${activeTab === 'ar' ? 'active' : ''}" data-tab="ar">
            ✨ AR Portal
          </button>
        </div>
      </div>

      <div class="explore-tab-content" id="tabContent"></div>

      <!-- Detail Modal / Slide-up Overlay -->
      <div class="culture-detail-modal ${activeDetailItem ? 'visible' : 'hidden'}" id="detailModal">
        <div class="modal-backdrop" id="modalBackdrop"></div>
        <div class="modal-sheet card-shadow" id="modalSheet"></div>
      </div>
    `;

    // Tab buttons
    container.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        activeTab = btn.getAttribute("data-tab");
        if (activeViewer) {
          activeViewer.destroy();
          activeViewer = null;
        }
        render();
      });
    });

    // Render active tab content
    const content = container.querySelector("#tabContent");
    if (activeTab === "catalog") {
      renderCatalogTab(content);
    } else if (activeTab === "map") {
      renderMapTab(content);
    } else if (activeTab === "3d") {
      render3DGalleryTab(content);
    } else if (activeTab === "ar") {
      renderARPreviewTab(content);
    }

    if (activeDetailItem) {
      renderDetailModal();
    }
  }

  function renderCatalogTab(parent) {
    const items = getCultureItemsByCategory(activeCategory);

    parent.innerHTML = `
      <!-- Category Pills -->
      <div class="category-filters-row">
        <button class="cat-pill ${activeCategory === 'all' ? 'active' : ''}" data-cat="all">All</button>
        <button class="cat-pill ${activeCategory === 'food' ? 'active' : ''}" data-cat="food">🍲 Food</button>
        <button class="cat-pill ${activeCategory === 'fish' ? 'active' : ''}" data-cat="fish">🐟 Fish & Coastal</button>
        <button class="cat-pill ${activeCategory === 'heritage' ? 'active' : ''}" data-cat="heritage">🏛️ Heritage</button>
        <button class="cat-pill ${activeCategory === 'festivals' ? 'active' : ''}" data-cat="festivals">🎭 Festivals</button>
        <button class="cat-pill ${activeCategory === 'people' ? 'active' : ''}" data-cat="people">📖 People & Books</button>
      </div>

      <!-- Cards Grid -->
      <div class="culture-cards-grid">
        ${items.map(item => `
          <div class="culture-item-card card-shadow" data-id="${item.id}" style="border-left-color: ${item.accentColor}">
            <div class="culture-card-header">
              <span class="culture-emoji">${item.imageEmoji}</span>
              <div class="culture-meta">
                <span class="culture-cat-label">${item.categoryLabel}</span>
                <h3 class="culture-card-title">${item.title}</h3>
                <span class="culture-konkani-name">${item.konkaniName} • <em>${item.romanName}</em></span>
              </div>
            </div>
            <p class="culture-card-tagline">${item.tagline}</p>
            <div class="culture-card-footer">
              <span class="culture-location-pill">📍 ${item.location}</span>
              ${item.model3DId ? `<span class="badge-3d-mini">👓 3D Model</span>` : ''}
              <button class="btn btn-xs btn-outline btn-explore-item">Explore →</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;

    // Filter pills
    parent.querySelectorAll(".cat-pill").forEach(p => {
      p.addEventListener("click", () => {
        activeCategory = p.getAttribute("data-cat");
        render();
      });
    });

    // Item cards click
    parent.querySelectorAll(".culture-item-card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-id");
        openDetail(id);
      });
    });
  }

  function renderMapTab(parent) {
    parent.innerHTML = `
      <div class="goa-map-container card-shadow">
        <div class="map-banner">
          <h3>Interactive Goan Discovery Map</h3>
          <p>Tap any region pin to uncover cultural stories and local Konkani vocabulary.</p>
        </div>

        <div class="stylized-goa-map" id="mapCanvas">
          <!-- Stylized Coastline & Hinterland SVG -->
          <svg viewBox="0 0 400 480" class="goa-map-svg">
            <defs>
              <linearGradient id="arabianSea" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1A5276" />
                <stop offset="100%" stop-color="#0E2F44" />
              </linearGradient>
              <linearGradient id="goaLand" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#27AE60" />
                <stop offset="50%" stop-color="#1E8449" />
                <stop offset="100%" stop-color="#145A32" />
              </linearGradient>
            </defs>

            <!-- Arabian Sea Background -->
            <rect width="400" height="480" fill="url(#arabianSea)" rx="16" />

            <!-- Stylized Mandovi & Zuari River Estuaries -->
            <path d="M 0 180 Q 120 185 180 195 Q 260 210 320 220" stroke="#2980B9" stroke-width="12" fill="none" opacity="0.6" />
            <path d="M 0 270 Q 140 280 220 290 Q 280 300 340 310" stroke="#2980B9" stroke-width="10" fill="none" opacity="0.6" />

            <!-- Goa Landform Silhouette -->
            <path d="M 120 40 
                     Q 240 30 300 80 
                     Q 340 160 330 250 
                     Q 320 360 280 430 
                     Q 200 460 160 410 
                     Q 140 320 110 240 
                     Q 80 140 120 40 Z" 
                  fill="url(#goaLand)" stroke="#F39C12" stroke-width="2" />

            <!-- Western Ghats Hill Ridges -->
            <path d="M 280 70 Q 330 180 310 300 Q 290 400 260 420" stroke="#B7950B" stroke-width="3" stroke-dasharray="4,4" fill="none" opacity="0.7" />
          </svg>

          <!-- Interactive Pins -->
          ${GOA_MAP_ZONES.map(zone => `
            <div class="map-pin" style="left: ${zone.pinX}%; top: ${zone.pinY}%" data-zone-id="${zone.id}">
              <div class="pin-pulse"></div>
              <div class="pin-marker" title="${zone.name}">
                <span class="pin-icon">${zone.icon}</span>
              </div>
              <span class="pin-label">${zone.name.split(" ")[0]}</span>
            </div>
          `).join("")}
        </div>

        <div class="map-selected-zone card-shadow" id="zoneDetails">
          <div class="zone-placeholder">Tap any map pin above to inspect Goan heritage!</div>
        </div>
      </div>
    `;

    // Map pin interactions
    parent.querySelectorAll(".map-pin").forEach(pin => {
      pin.addEventListener("click", () => {
        const zoneId = pin.getAttribute("data-zone-id");
        const zone = GOA_MAP_ZONES.find(z => z.id === zoneId);
        if (!zone) return;

        parent.querySelectorAll(".map-pin").forEach(p => p.classList.remove("active"));
        pin.classList.add("active");

        const zoneBox = parent.querySelector("#zoneDetails");
        zoneBox.innerHTML = `
          <div class="zone-info-card">
            <div class="zone-card-top">
              <span class="zone-badge">${zone.badge} • ${zone.region}</span>
              <h4 class="zone-title">${zone.name}</h4>
              <p class="zone-desc">${zone.description}</p>
            </div>

            <!-- Konkani Phrase from Region -->
            <div class="zone-phrase-box">
              <span class="zp-label">Regional Konkani Phrase:</span>
              <div class="zp-dev">${zone.konkaniPhrase.devanagari}</div>
              <div class="zp-rom">“${zone.konkaniPhrase.roman}”</div>
              <div class="zp-eng">${zone.konkaniPhrase.english}</div>
              <button class="btn btn-xs btn-audio" id="btnSpeakZonePhrase">🔊 Hear Phrase</button>
            </div>

            <button class="btn btn-primary btn-sm btn-block" id="btnOpenZoneCulture">
              Discover ${zone.name} Culture →
            </button>
          </div>
        `;

        zoneBox.querySelector("#btnSpeakZonePhrase").addEventListener("click", () => {
          ttsService.speak(zone.konkaniPhrase.roman);
        });

        zoneBox.querySelector("#btnOpenZoneCulture").addEventListener("click", () => {
          openDetail(zone.linkedCultureId);
        });
      });
    });
  }

  function render3DGalleryTab(parent) {
    parent.innerHTML = `
      <div class="gallery-3d-intro">
        <h3>Interactive 3D Cultural Artifacts</h3>
        <p>Rotate, inspect, and experience Goan heritage models in real-time 3D.</p>
      </div>

      <div class="viewer-3d-container card-shadow">
        <div class="viewer-controls-bar">
          <select id="selectModel" class="model-select-dropdown">
            <option value="pot_drum">🥁 Ghumott (Goan Heritage Percussion)</option>
            <option value="goan_house">🏡 Traditional Goan Balcão Villa</option>
            <option value="fish_mackerel">🐟 Visvon / Mackerel Marine Life</option>
          </select>
          <div class="viewer-btn-group">
            <button class="btn-ctrl" id="btnToggleRotate" title="Toggle Auto-Rotation">🔄 Auto</button>
            <button class="btn-ctrl" id="btnToggleWire" title="Toggle Wireframe">🌐 Mesh</button>
            <button class="btn-ctrl" id="btnResetView" title="Reset View">🎯 Reset</button>
          </div>
        </div>

        <div class="canvas-3d-wrapper">
          <canvas id="main3DCanvas"></canvas>
          <div class="canvas-hint">Drag with finger / mouse to rotate • Pinch / scroll to zoom</div>
        </div>

        <div class="model-meta-card" id="modelMetaCard">
          <!-- Dynamic Model Metadata -->
        </div>
      </div>
    `;

    const canvas = parent.querySelector("#main3DCanvas");
    const modelSelect = parent.querySelector("#selectModel");
    const metaCard = parent.querySelector("#modelMetaCard");

    activeViewer = new Cultural3DViewer(canvas, { modelType: modelSelect.value });

    function updateModelMeta(type) {
      if (type === "pot_drum") {
        metaCard.innerHTML = `
          <h4>The Ghumott (घुमट)</h4>
          <span class="meta-tag">Declared Goa's State Heritage Musical Instrument</span>
          <p>Terracotta earthen pot played in Shigmo, Mando, and traditional Goan village festivals.</p>
          <div class="vocab-chips-row">
            <span class="vocab-chip" data-speak="Ghumott">🥁 घुमट (Ghumott)</span>
            <span class="vocab-chip" data-speak="Gayan">🎵 गायन (Gayan - Song)</span>
            <span class="vocab-chip" data-speak="Naach">💃 नाच (Naach - Dance)</span>
          </div>
        `;
      } else if (type === "goan_house") {
        metaCard.innerHTML = `
          <h4>Traditional Goan Balcão House (बाल्कांव घर)</h4>
          <span class="meta-tag">Indo-Portuguese Architecture</span>
          <p>Built with red laterite stone, Mangalore tiles, and an open colonnaded porch for village bonding.</p>
          <div class="vocab-chips-row">
            <span class="vocab-chip" data-speak="Ghor">🏡 घर (Ghor - House)</span>
            <span class="vocab-chip" data-speak="Balcao">🪑 बाल्कांव (Balcão - Porch)</span>
            <span class="vocab-chip" data-speak="Sopo">🧱 सोपो (Sopo - Stone Bench)</span>
          </div>
        `;
      } else {
        metaCard.innerHTML = `
          <h4>Goan Visvon & Mackerel (विस्वण आनी बांगडे)</h4>
          <span class="meta-tag">Coastal Marine Life & Fish Thali</span>
          <p>The culinary pride of Goan shores, celebrated in folk fishing songs and spicy recheado recipes.</p>
          <div class="vocab-chips-row">
            <span class="vocab-chip" data-speak="Visvon">🐟 विस्वण (Visvon - Kingfish)</span>
            <span class="vocab-chip" data-speak="Bangdde">🐟 बांगडे (Bangdde - Mackerel)</span>
            <span class="vocab-chip" data-speak="Nuste">🌊 नुसतें (Nuste - Fish)</span>
          </div>
        `;
      }

      metaCard.querySelectorAll(".vocab-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          const word = chip.getAttribute("data-speak");
          ttsService.speak(word);
        });
      });
    }

    updateModelMeta(modelSelect.value);

    modelSelect.addEventListener("change", (e) => {
      activeViewer.setModel(e.target.value);
      updateModelMeta(e.target.value);
    });

    parent.querySelector("#btnToggleRotate").addEventListener("click", (e) => {
      const isAuto = activeViewer.toggleAutoRotate();
      e.target.innerText = isAuto ? "🔄 Auto" : "⏸️ Paused";
    });

    parent.querySelector("#btnToggleWire").addEventListener("click", () => {
      activeViewer.toggleWireframe();
    });

    parent.querySelector("#btnResetView").addEventListener("click", () => {
      activeViewer.resetView();
    });
  }

  function renderARPreviewTab(parent) {
    parent.innerHTML = `
      <div class="ar-portal-card card-shadow">
        <div class="ar-badge">COMING NEXT IN PRODUCT ROADMAP</div>
        <div class="ar-icon-banner">✨ 📱 🏛️</div>
        <h3 class="ar-title">WebXR Augmented Reality Portal</h3>
        <p class="ar-desc">
          Point your smartphone camera at any Goan church portal, temple pillar, or heritage doorway to project interactive 3D digital replicas with native Konkani audio guides.
        </p>

        <div class="ar-steps-pipeline">
          <div class="ar-step">
            <span class="step-num">1</span>
            <div class="step-txt">
              <strong>Scan Heritage Site</strong>
              <p>Camera recognizes laterite facades & monuments</p>
            </div>
          </div>
          <div class="ar-step">
            <span class="step-num">2</span>
            <div class="step-txt">
              <strong>AR Model Appears</strong>
              <p>Interactive 3D geometry anchors to the ground</p>
            </div>
          </div>
          <div class="ar-step">
            <span class="step-num">3</span>
            <div class="step-txt">
              <strong>Konkani Audio Guide</strong>
              <p>Hear authentic cultural stories narrated in Konkani</p>
            </div>
          </div>
        </div>

        <div class="ar-cta-box">
          <p>Are you a Goan cultural institution or heritage contributor?</p>
          <button class="btn btn-outline btn-sm" id="btnJoinArWaitlist">Request AR Heritage Pilot Access</button>
        </div>
      </div>
    `;

    parent.querySelector("#btnJoinArWaitlist").addEventListener("click", () => {
      alert("Dev borem korum! You have been registered on the KonkaniGO Heritage AR Early Pilot list.");
    });
  }

  function openDetail(itemId) {
    activeDetailItem = getCultureItemById(itemId);
    progressService.discoverCulture(itemId);
    renderDetailModal();
  }

  function renderDetailModal() {
    const modal = container.querySelector("#detailModal");
    const sheet = container.querySelector("#modalSheet");
    if (!activeDetailItem || !modal || !sheet) return;

    modal.classList.remove("hidden");
    modal.classList.add("visible");

    sheet.innerHTML = `
      <div class="modal-header">
        <span class="modal-cat-tag">${activeDetailItem.categoryLabel}</span>
        <button class="btn-close-modal" id="btnCloseModal">✕</button>
      </div>

      <div class="modal-body-scroll">
        <div class="modal-banner-row">
          <span class="modal-huge-emoji">${activeDetailItem.imageEmoji}</span>
          <div>
            <h2 class="modal-title">${activeDetailItem.title}</h2>
            <div class="modal-konkani-name">${activeDetailItem.konkaniName} (${activeDetailItem.romanName})</div>
            <span class="modal-verified-pill">✓ Verified: ${activeDetailItem.source}</span>
          </div>
        </div>

        <p class="modal-tagline">“${activeDetailItem.tagline}”</p>
        <p class="modal-description">${activeDetailItem.description}</p>

        <!-- Cultural Story Section -->
        <div class="modal-story-card">
          <h4>📖 Cultural Heritage Story</h4>
          <p>${activeDetailItem.culturalStory}</p>
        </div>

        <!-- Ingredients or Key Components -->
        <div class="modal-ingredients-card">
          <h4>Key Elements & Context:</h4>
          <div class="ingredients-tags">
            ${activeDetailItem.ingredients.map(ing => `<span class="ing-tag">${ing}</span>`).join("")}
          </div>
        </div>

        <!-- Connected Konkani Language Words -->
        <div class="modal-language-bridge card-shadow">
          <h4>🗣️ Learn Konkani Words from this Heritage</h4>
          <p class="bridge-sub">Tap any word to hear authentic pronunciation:</p>
          <div class="vocab-words-list">
            ${activeDetailItem.relatedVocabulary.map(v => `
              <div class="vocab-row" data-roman="${v.roman}">
                <div class="vocab-text">
                  <strong class="v-dev">${v.konkani}</strong>
                  <span class="v-rom">${v.roman}</span>
                  <span class="v-eng">${v.english}</span>
                </div>
                <button class="btn-audio-mini" title="Play pronunciation">🔊</button>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Actions -->
        <div class="modal-actions-row">
          <button class="btn btn-secondary btn-block" id="btnAskAiAboutThis">
            Ask Torli AI about this 💬
          </button>
        </div>
      </div>
    `;

    sheet.querySelector("#btnCloseModal").addEventListener("click", closeModal);
    container.querySelector("#modalBackdrop").addEventListener("click", closeModal);

    sheet.querySelectorAll(".vocab-row").forEach(row => {
      row.addEventListener("click", () => {
        const roman = row.getAttribute("data-roman");
        ttsService.speak(roman);
      });
    });

    sheet.querySelector("#btnAskAiAboutThis").addEventListener("click", () => {
      const query = `Tell me more about ${activeDetailItem.title} in Goan culture!`;
      closeModal();
      navigateTo("ai", { initialQuery: query });
    });
  }

  function closeModal() {
    activeDetailItem = null;
    const modal = container.querySelector("#detailModal");
    if (modal) {
      modal.classList.remove("visible");
      modal.classList.add("hidden");
    }
  }

  render();
  return container;
}
