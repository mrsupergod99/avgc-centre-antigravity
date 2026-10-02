# KONKANIGO
### *“Amchi Bhaas, Amche Goem”*
**AI-Powered Konkani Language Learning & Goan Cultural Discovery Platform**

---

## 🌟 Product Vision
> **“Make the next generation want to USE Konkani, not merely study it.”**

**KonkaniGO** transforms Konkani from a traditional classroom subject into a vibrant, modern digital experience combining **Language + AI + Gamification + Goan Culture + 3D Heritage + QR Exploration + Practical Tourism**.

Designed primarily for children, Gen Alpha, and Gen Z, with a dedicated streamlined **Tourist Mode** for visitors to Goa.

---

## 🚀 How to Run the App (Zero Installation Required)

Because KonkaniGO is built as a zero-dependency, modern HTML5/CSS3/ES6+ PWA, you can launch it instantly on Windows:

### 1. Launch with Local Web Server (Recommended for ES Modules)
Open PowerShell in this directory and run:
```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```
This automatically starts a local server at `http://localhost:8080` and opens your browser!

---

## 📱 How to Convert to an Android APK (100% Free)

You can convert KonkaniGO into an installable Android APK without writing any Java or Kotlin code:

### Method 1: PWABuilder (Easiest — No Setup Needed)
1. Push this folder to a GitHub repository and turn on **GitHub Pages** (free hosting).
2. Go to [PWABuilder.com](https://www.pwabuilder.com) (created by Microsoft, 100% free).
3. Enter your hosted GitHub Pages URL.
4. Click **Package for Android** $\rightarrow$ Click **Download APK**.
5. Install the generated `.apk` directly on any Android device!

### Method 2: Capacitor Wrap (Local Android Studio Build)
If you install Node.js later:
```powershell
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "KonkaniGO" "com.konkanigo.app" --web-dir "."
npx cap add android
npx cap open android
```
In Android Studio: Click **Build $\rightarrow$ Build Bundle(s) / APK(s) $\rightarrow$ Build APK(s)**.

---

## 🎯 Three Primary Experiences

### 1. Learn Konkani (Gen Alpha Mode)
* **Playful, fast, visual, and rewarding** language-learning path.
* **5 Initial Curriculum Units**:
  * **Unit 1**: Greetings & Welcome (*उलवप आनी येवकार / Uloup ani Yevkar*)
  * **Unit 2**: Introductions & Identity (*वळख आनी भास / Vollokh ani Bhaas*)
  * **Unit 3**: Family & Affection (*कुटुंब आनी मोग / Kuttumb ani Mog*)
  * **Unit 4**: Numbers & Counting (*आंकडे आनी मेजप / Ankdde ani Mezop*)
  * **Unit 5**: Food & Fish Cuisine (*खाण-जेवण आनी नुसतें / Khaan-Jevonn ani Nuste*)
* **Exercise Mechanics**:
  * Multiple Choice
  * English $\rightarrow$ Konkani translation
  * Konkani $\rightarrow$ English translation
  * Sentence Word Arrangement (Interactive chips)
  * Memory Match Pairs
  * Fill in the Blank
  * Listening Practice
  * Voice Pronunciation Practice with phonetic feedback

### 2. Explore Goa (Cultural Discovery Layer)
* **Food Explorer**: Mangane, Goan Xacuti, Prawn Balchão, Shevyachi Kheer, and the iconic Goan Fish Thali.
* **Fish & Marine Life**: Local Konkani names, culinary traditions, and folklore for *Visvon* (Kingfish), *Bangdde* (Mackerel), *Tarle* (Sardines), and *Sungtam* (Prawns).
* **3D Heritage Viewer**: Real-time canvas 3D renderer supporting touch drag-to-rotate, pinch/wheel zoom, wireframe toggle, and reset for:
  * The sacred **Ghumott** (Goa's heritage clay percussion pot drum)
  * The traditional **Goan Balcão House** (with colonnaded porch & Mangalore tile roof)
  * The shimmering **Visvon & Mackerel** marine life
* **Interactive Goa Discovery Map**: Clickable regional pins across Tiswadi, Bardez, Salcete, Ponda, and Canacona connecting locations to local Konkani phrases.
* **Future AR Heritage Portal**: Product preview roadmap for WebXR camera recognition at Goan monument sites.

### 3. Tourist Mode (Practical Trip Companion)
* Sleek, high-contrast, mature travel UI.
* **1-Day, 3-Day, and 7-Day** curated itinerary packs.
* Real-world contextual scenarios:
  1. Ordering at a Beach Shack / Restaurant
  2. Hailing a Motorcycle 'Pilot', Auto or Taxi
  3. Bargaining at Mapusa Market & Night Bazaars
  4. Asking Directions in Ancestral Villages
  5. Hotel & Homestay Check-in
  6. Emergency & Safety Phrases
* Every phrase features: Devanagari script, Roman transliteration, English meaning, audio pronunciation, and a **"Practise with AI"** one-click launch!

---

## 🐟 Meet "Torli" — The Original Mascot
* Torli is a friendly, stylized Goan pearlspot / sardine character who guides users through their language journey.
* Reacts dynamically to user actions:
  * `greeting`: Waving pectoral fin, welcoming the learner with *"Devo boro dis dium!"*
  * `thinking`: Fin on chin with buoyant bubbles.
  * `correct`: Exuberant jump with *"Wah! Ekdam borem! 🎉"*
  * `wrong`: Gentle encouragement *"Almost! Try once more."*
  * `celebration`: Wearing the traditional Goan Sao Joao *kopel* flower wreath with golden confetti!
  * `tourist-guide`: Sporting a Goan traveler's sun hat.

---

## 🤖 AI Coach & Audio Architecture

### Gemini 3.8 Flash TTS & AI Tutor Integration (`aiTutorService.js` & `ttsService.js`)
* **Strict Pedagogical Guardrails**: The AI tutor always responds with Devanagari, Roman transliteration, English meaning, and phonetic pronunciation guide.
* **Zero Fabrication Rule**: The AI is strictly instructed never to invent fake Konkani words; any unverified word is flagged for linguistic review.
* **Fail-Safe Offline Mode**: If no Gemini API key is provided, the app runs on a built-in pedagogical Konkani rule engine with 10+ interactive scenarios.
* **API Key Security**: Users can optionally enter a `GEMINI_API_KEY` in settings. It is stored exclusively in client-side `localStorage` and never hardcoded in source files.

---

## 🏛️ Structured Konkani Knowledge Base Schema
Located in `js/data/knowledgeBase.js`, separating content from UI:
```json
{
  "id": "kb_food_01",
  "devanagari": "नुसतें",
  "roman": "Nuste",
  "english": "Fish",
  "phonetic": "noos-thehm",
  "partOfSpeech": "noun",
  "category": "Food",
  "difficulty": "Beginner",
  "context": "The heart of Goan cuisine and daily life",
  "exampleSentence": {
    "konkani": "Aiz amkam nuste zai.",
    "english": "Today we want fish."
  },
  "verified": true,
  "source": "Traditional Coastal Goan Glossary",
  "reviewer": "Verified Editorial Board"
}
```

---

## 🏆 MVP Gamification System
* **XP System**: +10 for correct exercises, +40 for lesson completion, +25 for cultural discoveries, +30 for tourist scenarios.
* **Hearts/Lives**: 5 hearts that decrement on wrong answers and can be restored through practice.
* **Daily Streaks**: Tracked with fire emoji 🔥.
* **Level Progression**:
  * Level 1: Konkani Explorer 🌱
  * Level 2: Goem Learner 🌊
  * Level 3: Bhaas Buddy 🐟
  * Level 4: Goan Storyteller 👑
  * Level 5: Asal Goenkar Guru ⭐
* **Badges Showcase**: Unlocks for "First Splash", "Nuste Lover", "Goan Flame", "Shack Diplomat", and "Balcão Detective".
* **Persistent Storage**: All progress is saved automatically in `localStorage`.

---

## 🎨 Cultural Authenticity & Goan Color Palette
* **Deep Sea Navy** (`#0C2340`)
* **Laterite Terracotta** (`#D35400` & `#C0392B`)
* **Estuary Azure** (`#2980B9`)
* **Mango Gold** (`#F39C12`)
* **Hinterland Emerald** (`#27AE60`)
* **Warm Oyster White** (`#FBF9F5`)

*KonkaniGO is dedicated to the preservation, celebration, and digital revitalization of the Konkani language and Goan heritage.*
