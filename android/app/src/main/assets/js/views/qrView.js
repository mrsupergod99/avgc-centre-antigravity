/**
 * KONKANIGO QR SCANNER VIEW
 * Bridges physical Goan museum plaques & heritage spots to 3D models and Konkani language learning.
 */

import { DEMO_HERITAGE_TAGS, qrService } from "../services/qrService.js";
import { ttsService } from "../services/ttsService.js";

export function renderQrView(navigateTo) {
  const container = document.createElement("div");
  container.className = "view-container qr-view";

  container.innerHTML = `
    <!-- Top Header -->
    <div class="qr-header">
      <button class="btn-back-qr" id="btnBackHome">← Back</button>
      <h2 class="qr-title">Heritage QR Scanner</h2>
      <span class="qr-badge">Museum & Site Mode</span>
    </div>

    <!-- Scanner Viewfinder Box -->
    <div class="scanner-frame card-shadow">
      <div class="scanner-viewport">
        <!-- Live Camera Video Tag -->
        <video id="cameraVideo" playsinline autoplay muted class="camera-stream"></video>

        <!-- Animated Scanner Target Reticle & Laser Beam -->
        <div class="scanner-overlay">
          <div class="scanner-corner top-left"></div>
          <div class="scanner-corner top-right"></div>
          <div class="scanner-corner bottom-left"></div>
          <div class="scanner-corner bottom-right"></div>
          <div class="scanner-laser-line"></div>
        </div>
      </div>

      <div class="scanner-hint-bar">
        <span>Point camera at any KonkaniGO Heritage Plaque or QR Tag</span>
      </div>
    </div>

    <!-- Demo QR Tags for instant interactive testing without physical codes -->
    <div class="demo-tags-section">
      <h3 class="demo-tags-heading">Or Simulate Scanning a Goan Heritage Plaque:</h3>
      <p class="demo-tags-sub">Tap any museum tag below to simulate real-world scanning:</p>

      <div class="demo-tags-grid">
        ${DEMO_HERITAGE_TAGS.map(tag => `
          <button class="demo-tag-card card-shadow" data-tag-id="${tag.id}">
            <span class="tag-icon">${tag.tagIcon}</span>
            <div class="tag-details">
              <strong class="tag-title">${tag.label}</strong>
              <span class="tag-loc">📍 ${tag.location}</span>
              <span class="tag-word">Learn: <strong>${tag.konkaniWord}</strong></span>
            </div>
            <span class="tag-scan-btn">Scan ➔</span>
          </button>
        `).join("")}
      </div>
    </div>

    <!-- Scan Resolution Notification -->
    <div class="scan-result-toast hidden" id="scanToast">
      <span class="toast-emoji">🎉</span>
      <div class="toast-text">
        <strong>Heritage Tag Identified!</strong>
        <span id="toastTagName">Loading 3D model...</span>
      </div>
    </div>
  `;

  const video = container.querySelector("#cameraVideo");
  qrService.startCamera(video);

  container.querySelector("#btnBackHome").addEventListener("click", () => {
    qrService.stopCamera();
    navigateTo("home");
  });

  const toast = container.querySelector("#scanToast");
  const toastTagName = container.querySelector("#toastTagName");

  container.querySelectorAll(".demo-tag-card").forEach(btn => {
    btn.addEventListener("click", () => {
      const tagId = btn.getAttribute("data-tag-id");
      const tag = qrService.resolveTag(tagId);

      // Play scanner beep
      ttsService.playAudioCue();

      toastTagName.innerText = `${tag.label} • Opening 3D Experience`;
      toast.classList.remove("hidden");
      toast.classList.add("visible");

      setTimeout(() => {
        qrService.stopCamera();
        navigateTo("explore", { itemId: tag.cultureId });
      }, 900);
    });
  });

  return container;
}
