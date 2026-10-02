/**
 * KONKANIGO ORIGINAL MASCOT SYSTEM: "TORLI"
 * The Stylized Goan Pearlspot / Marine Guide
 * 
 * Expressive vector-based mascot supporting states:
 * idle, greeting, happy, thinking, wrong, correct, celebration, speaking, pointing, tourist-guide.
 */

export class TorliMascot {
  /**
   * Generates the SVG string for Torli based on emotion and optional dialogue
   * @param {string} state - 'idle' | 'greeting' | 'happy' | 'thinking' | 'wrong' | 'correct' | 'celebration' | 'speaking' | 'pointing' | 'tourist-guide'
   * @param {string} dialogue - Optional speech bubble text
   * @param {number} size - Pixel size (default 120)
   */
  static render(state = "idle", dialogue = "", size = 130) {
    const isWaving = state === "greeting" || state === "celebration";
    const isCelebrating = state === "celebration" || state === "correct";
    const isThinking = state === "thinking";
    const isWrong = state === "wrong";
    const isSpeaking = state === "speaking";
    const isTourist = state === "tourist-guide";
    const isPointing = state === "pointing";

    // Eyes expression
    let eyesSvg = `
      <ellipse cx="64" cy="50" rx="9" ry="11" fill="#FFFFFF" />
      <circle cx="66" cy="51" r="5" fill="#0C2340" />
      <circle cx="68" cy="48" r="2" fill="#FFFFFF" />
    `;
    if (isCelebrating) {
      eyesSvg = `
        <path d="M 55 52 Q 65 42 75 52" stroke="#0C2340" stroke-width="4" fill="none" stroke-linecap="round" />
        <circle cx="78" cy="42" r="2" fill="#F39C12" />
        <circle cx="52" cy="42" r="2" fill="#F39C12" />
      `;
    } else if (isThinking) {
      eyesSvg = `
        <ellipse cx="64" cy="48" rx="8" ry="10" fill="#FFFFFF" />
        <circle cx="64" cy="44" r="4.5" fill="#0C2340" />
        <circle cx="66" cy="42" r="1.8" fill="#FFFFFF" />
      `;
    } else if (isWrong) {
      eyesSvg = `
        <ellipse cx="64" cy="52" rx="8" ry="8" fill="#FFFFFF" />
        <circle cx="63" cy="54" r="4" fill="#0C2340" />
        <path d="M 74 54 Q 78 58 76 62" stroke="#3498DB" stroke-width="2" fill="none" />
      `;
    }

    // Mouth expression
    let mouthSvg = `<path d="M 74 66 Q 80 72 86 66" stroke="#C0392B" stroke-width="3" fill="none" stroke-linecap="round" />`;
    if (isCelebrating || state === "happy") {
      mouthSvg = `<path d="M 72 64 Q 82 78 92 64 Z" fill="#C0392B" />`;
    } else if (isSpeaking) {
      mouthSvg = `
        <ellipse cx="82" cy="67" rx="5" ry="7" fill="#C0392B" />
        <path d="M 94 62 Q 98 67 94 72" stroke="#2980B9" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path d="M 99 58 Q 105 67 99 76" stroke="#2980B9" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6" />
      `;
    } else if (isThinking) {
      mouthSvg = `<ellipse cx="80" cy="67" rx="3.5" ry="3.5" fill="#C0392B" />`;
    } else if (isWrong) {
      mouthSvg = `<path d="M 74 72 Q 80 66 86 72" stroke="#C0392B" stroke-width="3" fill="none" stroke-linecap="round" />`;
    }

    // Accessories (Goan Kopel flower crown for celebration, Traveler hat for tourist)
    let accessorySvg = "";
    if (isCelebrating) {
      accessorySvg = `
        <!-- Goan Sao Joao Kopel Flower Wreath -->
        <g class="torli-kopel">
          <ellipse cx="60" cy="24" rx="28" ry="7" fill="#27AE60" />
          <circle cx="42" cy="22" r="6" fill="#E74C3C" />
          <circle cx="54" cy="18" r="7" fill="#F1C40F" />
          <circle cx="68" cy="18" r="6.5" fill="#E67E22" />
          <circle cx="80" cy="22" r="6" fill="#9B59B6" />
        </g>
      `;
    } else if (isTourist) {
      accessorySvg = `
        <!-- Goan Traveler Sun Hat -->
        <path d="M 32 30 Q 62 10 92 30 Z" fill="#F39C12" />
        <ellipse cx="62" cy="30" rx="36" ry="6" fill="#D68910" />
        <rect x="44" y="24" width="36" height="4" fill="#C0392B" rx="2" />
      `;
    }

    // Fin gesture
    let finSvg = `<path d="M 45 68 Q 28 85 46 92 Q 52 82 50 68 Z" fill="#2980B9" />`;
    if (isWaving) {
      finSvg = `<path d="M 52 64 Q 60 40 76 34 Q 68 54 54 66 Z" fill="#2980B9" class="torli-fin-wave" />`;
    } else if (isThinking) {
      finSvg = `<path d="M 52 68 Q 62 60 74 65 Q 68 76 52 74 Z" fill="#2980B9" />`;
    } else if (isPointing) {
      finSvg = `<path d="M 52 68 Q 78 68 96 60 Q 82 78 52 74 Z" fill="#2980B9" />`;
    }

    const speechBubbleSvg = dialogue ? `
      <div class="torli-speech-bubble">
        <span class="torli-bubble-text">${dialogue}</span>
      </div>
    ` : "";

    return `
      <div class="torli-container torli-${state}" style="width: ${size}px; height: auto;">
        ${speechBubbleSvg}
        <svg viewBox="0 0 130 130" class="torli-svg" style="width: 100%; height: auto;">
          <defs>
            <linearGradient id="torliBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#3498DB" />
              <stop offset="45%" stop-color="#1ABC9C" />
              <stop offset="100%" stop-color="#16A085" />
            </linearGradient>
            <linearGradient id="torliBellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FCF3CF" />
              <stop offset="100%" stop-color="#F9E79F" />
            </linearGradient>
          </defs>

          <!-- Tail Fin -->
          <path d="M 22 62 Q 2 40 4 72 Q 2 98 22 76 Z" fill="#F39C12" />
          <path d="M 18 64 Q 6 52 8 72 Q 6 88 18 74 Z" fill="#E67E22" opacity="0.6" />

          <!-- Dorsal Fin -->
          <path d="M 46 36 Q 66 16 86 38 Q 66 28 46 36 Z" fill="#F39C12" />

          <!-- Main Fish Body (Pearlspot / Karimeen contour) -->
          <ellipse cx="62" cy="68" rx="44" ry="34" fill="url(#torliBodyGrad)" />

          <!-- Gentle Golden Belly -->
          <path d="M 40 76 Q 66 98 94 76 Q 66 84 40 76 Z" fill="url(#torliBellyGrad)" />

          <!-- Pearlescent Scales (Subtle Goan Pearlspot Pattern) -->
          <circle cx="56" cy="62" r="3" fill="#FFFFFF" opacity="0.4" />
          <circle cx="68" cy="66" r="3.5" fill="#FFFFFF" opacity="0.4" />
          <circle cx="52" cy="72" r="2.5" fill="#FFFFFF" opacity="0.3" />

          <!-- Eye -->
          ${eyesSvg}

          <!-- Mouth -->
          ${mouthSvg}

          <!-- Pectoral Fin -->
          ${finSvg}

          <!-- Accessory -->
          ${accessorySvg}
        </svg>
      </div>
    `;
  }
}
