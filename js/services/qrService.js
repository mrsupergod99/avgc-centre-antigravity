/**
 * KONKANIGO QR HERITAGE SERVICE
 * Connects physical heritage plaques & museum tags to 3D models and Konkani language lessons.
 * Flow: Scan QR -> Identify Artifact -> Launch 3D Viewer -> Learn Konkani Words -> Cultural Story
 */

export const DEMO_HERITAGE_TAGS = [
  {
    id: "tag_balcao",
    label: "Heritage Plaque #041: Goan Balcão House",
    location: "Fontainhas Latin Quarter, Panaji",
    cultureId: "cult_herit_balcao",
    model3D: "goan_house",
    konkaniWord: "बाल्कांव (Balcão)",
    tagIcon: "🏡"
  },
  {
    id: "tag_bom_jesus",
    label: "Monument Tag #109: Basilica of Bom Jesus",
    location: "Old Goa Heritage Complex",
    cultureId: "cult_herit_bom_jesus",
    model3D: "goan_house",
    konkaniWord: "इगर्ज (Igorz)",
    tagIcon: "⛪"
  },
  {
    id: "tag_ghumott",
    label: "Folk Museum Tag #018: The Sacred Ghumott",
    location: "Goa Chitra Museum, Benaulim",
    cultureId: "cult_herit_ghumott",
    model3D: "pot_drum",
    konkaniWord: "घुमट (Ghumott)",
    tagIcon: "🥁"
  },
  {
    id: "tag_visvon",
    label: "Harbor Catch Tag #077: Visvon Kingfish",
    location: "Betim Fishermen's Jetty, Mandovi",
    cultureId: "cult_fish_visvon",
    model3D: "fish_mackerel",
    konkaniWord: "विस्वण (Visvon)",
    tagIcon: "🐟"
  }
];

class QRService {
  constructor() {
    this.stream = null;
    this.isScanning = false;
  }

  async startCamera(videoElement) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
        });
        if (videoElement) {
          videoElement.srcObject = this.stream;
          await videoElement.play();
          this.isScanning = true;
          return { success: true };
        }
      } catch (err) {
        console.info("Camera permission or environment restriction:", err.message);
        return { success: false, error: err.message };
      }
    }
    return { success: false, error: "Camera API not supported" };
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
      this.isScanning = false;
    }
  }

  resolveTag(tagId) {
    return DEMO_HERITAGE_TAGS.find(t => t.id === tagId) || DEMO_HERITAGE_TAGS[0];
  }
}

export const qrService = new QRService();
