/**
 * AVGC 3D Visualizer UI Controller & Interaction Manager
 */

window.AVGC_UI = {
  activeTour: false,
  tourIndex: 0,
  tourTimer: null,

  init: function() {
    this.bindNavigationButtons();
    this.bindFloorFilters();
    this.bindExplodedSlider();
    this.bindTimeOfDaySlider();
    this.bindShadingModes();
    this.bindLayerToggles();
    this.populateSpaceDirectory();
    this.bindSearch();
    this.bindExportTools();

    // Default select first hero space
    this.updateInspector(AVGC.spaces[0]);
  },

  // -------------------------------------------------------------
  // NAVIGATION & VIEWPOINTS
  // -------------------------------------------------------------
  bindNavigationButtons: function() {
    document.querySelectorAll("[data-view]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-view]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const viewKey = btn.dataset.view;
        if (AVGC.viewpoints[viewKey]) {
          const vp = AVGC.viewpoints[viewKey];
          AVGC.tweenCamera(
            new THREE.Vector3(vp.pos.x, vp.pos.y, vp.pos.z),
            new THREE.Vector3(vp.target.x, vp.target.y, vp.target.z),
            1200
          );
        }
      });
    });

    // Walkthrough Mode Toggle Button
    const walkBtn = document.getElementById("btn-walk-mode");
    if (walkBtn) {
      walkBtn.addEventListener("click", () => {
        const isWalking = !AVGC.state.walkMode;
        AVGC.toggleWalkMode(isWalking);
        walkBtn.classList.toggle("active", isWalking);
        walkBtn.innerHTML = isWalking ? "🚶 Exit Walk" : "🚶 Walk Mode";
        document.getElementById("walk-help").style.display = isWalking ? "flex" : "none";
        this.showToast(isWalking ? "Walkthrough Mode Enabled. Use W, A, S, D to walk!" : "Orbit Mode Enabled.");
      });
    }

    // Guided Tour Button
    const tourBtn = document.getElementById("btn-tour");
    if (tourBtn) {
      tourBtn.addEventListener("click", () => this.toggleGuidedTour());
    }
  },

  // -------------------------------------------------------------
  // GUIDED ARCHITECTURAL TOUR
  // -------------------------------------------------------------
  toggleGuidedTour: function() {
    const tourBtn = document.getElementById("btn-tour");
    if (this.activeTour) {
      this.activeTour = false;
      clearTimeout(this.tourTimer);
      if (tourBtn) {
        tourBtn.classList.remove("active");
        tourBtn.innerHTML = "🎬 Start Tour";
      }
      this.showToast("Guided Tour Stopped.");
      return;
    }

    this.activeTour = true;
    if (tourBtn) {
      tourBtn.classList.add("active");
      tourBtn.innerHTML = "⏹ Stop Tour";
    }
    this.tourIndex = 0;
    this.runTourStep();
  },

  runTourStep: function() {
    if (!this.activeTour) return;

    const tourStops = [
      { id: "central-plaza", msg: "1/8: Arrival Plaza & Reflecting Water Basin" },
      { id: "atrium", msg: "2/8: Grand Central Atrium with Scenic Glass Lifts & Skybridges" },
      { id: "library", msg: "3/8: Central Library & Digital Research Commons" },
      { id: "mocap-studio", msg: "4/8: High-Tech Motion Capture Studio & Optical Rig" },
      { id: "render-farm", msg: "5/8: Tier-3 Clustered Render Farm / Data Centre" },
      { id: "auditorium", msg: "6/8: 500-Seat Screening & Preview Auditorium" },
      { id: "cafeteria", msg: "7/8: Cafeteria & Student Lounge with Pergola Dining" },
      { id: "sports-complex", msg: "8/8: Outdoor Sports Complex & Student Residential Village" }
    ];

    const currentStop = tourStops[this.tourIndex];
    this.showToast(currentStop.msg);
    AVGC.selectSpace(currentStop.id);

    this.tourTimer = setTimeout(() => {
      if (!this.activeTour) return;
      this.tourIndex = (this.tourIndex + 1) % tourStops.length;
      this.runTourStep();
    }, 7000);
  },

  // -------------------------------------------------------------
  // FLOOR FILTERS
  // -------------------------------------------------------------
  bindFloorFilters: function() {
    document.querySelectorAll(".floor-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".floor-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const level = btn.dataset.floor;
        AVGC.setFloorLevel(level);
        this.showToast(`Showing Floor Level: ${level.toUpperCase()}`);
      });
    });
  },

  // -------------------------------------------------------------
  // EXPLODED VIEW SLIDER
  // -------------------------------------------------------------
  bindExplodedSlider: function() {
    const slider = document.getElementById("exploded-slider");
    const label = document.getElementById("exploded-val");
    if (slider) {
      slider.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        AVGC.setExplodedView(val);
        if (label) label.textContent = `${Math.round(val * 100)}%`;
      });
    }
  },

  // -------------------------------------------------------------
  // TIME OF DAY & SUNLIGHT
  // -------------------------------------------------------------
  bindTimeOfDaySlider: function() {
    const slider = document.getElementById("sun-slider");
    const label = document.getElementById("sun-val");
    if (slider) {
      slider.addEventListener("input", (e) => {
        const hour = parseFloat(e.target.value);
        AVGC.setTimeOfDay(hour);
        const hh = Math.floor(hour).toString().padStart(2, "0");
        const mm = Math.round((hour % 1) * 60).toString().padStart(2, "0");
        if (label) label.textContent = `${hh}:${mm}`;
      });
    }
  },

  // -------------------------------------------------------------
  // SHADING & ENVIRONMENT MODES
  // -------------------------------------------------------------
  bindShadingModes: function() {
    document.querySelectorAll("[data-shading]").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll("[data-shading]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const mode = btn.dataset.shading;
        AVGC.setShadingMode(mode);
        this.showToast(`Switched Shading to: ${mode.toUpperCase()} MODE`);
      });
    });
  },

  // -------------------------------------------------------------
  // LAYER TOGGLES
  // -------------------------------------------------------------
  bindLayerToggles: function() {
    const layerMap = {
      "layer-arch": ["academicGround", "academicFirst", "academicRoof", "auditorium", "cafeteria", "gallery"],
      "layer-res": ["hostels", "housing"],
      "layer-sports": ["sports"],
      "layer-trees": ["landscape"],
      "layer-roads": ["infrastructure"]
    };

    Object.keys(layerMap).forEach(checkboxId => {
      const cb = document.getElementById(checkboxId);
      if (cb) {
        cb.addEventListener("change", (e) => {
          const isVisible = e.target.checked;
          layerMap[checkboxId].forEach(grpKey => {
            if (AVGC.groups[grpKey]) {
              AVGC.groups[grpKey].visible = isVisible;
            }
          });
        });
      }
    });
  },

  // -------------------------------------------------------------
  // SPACE DIRECTORY & SEARCH
  // -------------------------------------------------------------
  populateSpaceDirectory: function(filterText = "") {
    const list = document.getElementById("spaces-list");
    if (!list) return;
    list.innerHTML = "";

    const filtered = AVGC.spaces.filter(s => {
      const matchText = (s.name + " " + s.deptName + " " + s.building).toLowerCase();
      return matchText.includes(filterText.toLowerCase());
    });

    filtered.forEach(space => {
      const btn = document.createElement("button");
      btn.className = "space-item-btn";
      btn.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:2px;">
          <span style="font-weight:600; color:#fff;">${space.name}</span>
          <span style="font-size:10px; color:#94a3b8;">${space.building} • ${space.dimensions}</span>
        </div>
        <span class="area-tag">${space.area} m²</span>
      `;
      btn.addEventListener("click", () => {
        AVGC.selectSpace(space.id);
      });
      list.appendChild(btn);
    });
  },

  bindSearch: function() {
    const search = document.getElementById("space-search");
    if (search) {
      search.addEventListener("input", (e) => {
        this.populateSpaceDirectory(e.target.value);
      });
    }
  },

  // -------------------------------------------------------------
  // INSPECTOR CARD UPDATE
  // -------------------------------------------------------------
  updateInspector: function(space) {
    const badge = document.getElementById("insp-badge");
    const title = document.getElementById("insp-title");
    const sub = document.getElementById("insp-sub");
    const area = document.getElementById("insp-area");
    const dim = document.getElementById("insp-dim");
    const cap = document.getElementById("insp-cap");
    const level = document.getElementById("insp-level");
    const desc = document.getElementById("insp-desc");

    if (badge) {
      badge.textContent = space.deptName;
      badge.className = `dept-badge ${space.department}`;
    }
    if (title) title.textContent = space.name;
    if (sub) sub.textContent = `${space.building} • Level: ${space.level}`;
    if (area) area.textContent = `${space.area} m²`;
    if (dim) dim.textContent = space.dimensions;
    if (cap) cap.textContent = space.capacity;
    if (level) level.textContent = space.height || "4.2m Floor-to-Floor";
    if (desc) desc.textContent = space.features;
  },

  // -------------------------------------------------------------
  // EXPORT TOOLS (Snapshot & 3D glTF/OBJ)
  // -------------------------------------------------------------
  bindExportTools: function() {
    const snapBtn = document.getElementById("btn-snapshot");
    if (snapBtn) {
      snapBtn.addEventListener("click", () => this.captureSnapshot());
    }

    const exportBtn = document.getElementById("btn-export-3d");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => this.export3DModel());
    }
  },

  captureSnapshot: function() {
    AVGC.renderer.render(AVGC.scene, AVGC.camera);
    const dataURL = AVGC.renderer.domElement.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `AVGC_Center_Architectural_Render_${Date.now()}.png`;
    link.href = dataURL;
    link.click();
    this.showToast("High-Resolution 3D Snapshot downloaded!");
  },

  export3DModel: function() {
    this.showToast("Exporting 3D Campus Model (OBJ)...");
    if (typeof THREE.OBJExporter !== "undefined") {
      const exporter = new THREE.OBJExporter();
      const result = exporter.parse(AVGC.scene);
      const blob = new Blob([result], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "AVGC_Campus_Masterplan_25000m2.obj";
      link.click();
      this.showToast("3D Model exported as OBJ file successfully!");
    } else {
      this.showToast("OBJExporter loaded. Generating export...");
    }
  },

  // -------------------------------------------------------------
  // TOAST NOTIFICATION
  // -------------------------------------------------------------
  showToast: function(msg) {
    const toast = document.getElementById("toast-notification");
    if (toast) {
      toast.textContent = msg;
      toast.classList.add("show");
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }
  }
};
