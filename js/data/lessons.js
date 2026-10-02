/**
 * KONKANIGO CURRICULUM DATA
 * 5 Core Units for Gen Alpha & Youth Language Learning
 * Content strictly connected to the verified Knowledge Base.
 */

export const CURRICULUM_UNITS = [
  {
    id: "unit_1",
    unitNumber: 1,
    titleDevanagari: "उलवप आनी येवकार",
    titleRoman: "Uloup ani Yevkar",
    titleEnglish: "Greetings & Welcome",
    color: "#D35400", // Goan Laterite Terracotta
    icon: "👋",
    description: "Master daily Goan greetings and essential polite expressions.",
    lessons: [
      {
        id: "u1_l1",
        title: "Hello & Good Day",
        xpReward: 30,
        exercises: [
          {
            id: "u1_l1_ex1",
            type: "multiple-choice",
            question: "How do Goans traditionally say 'Good day'?",
            promptPhonetic: "deh-voh boh-roh dees dee-oom",
            audioText: "Devo boro dis dium",
            options: [
              { id: "opt1", text: "देव बरें दीस दिवं (Devo boro dis dium)", correct: true },
              { id: "opt2", text: "पांव खा (Pao kha)", correct: false },
              { id: "opt3", text: "उदक पी (Udok pi)", correct: false },
              { id: "opt4", text: "नुसतें हाड (Nuste had)", correct: false }
            ],
            explanation: "'Devo boro dis dium' literally translates to 'May God give you a good day' and is the standard polite greeting across Goa."
          },
          {
            id: "u1_l1_ex2",
            type: "translate-to-english",
            question: "Translate this common friendly phrase to English:",
            konkaniDevanagari: "कितें चल्लां?",
            konkaniRoman: "Kitem chollam?",
            audioText: "Kitem chollam",
            options: [
              { id: "opt1", text: "What's up? / What's going on?", correct: true },
              { id: "opt2", text: "Where are you going?", correct: false },
              { id: "opt3", text: "How much is the fish?", correct: false },
              { id: "opt4", text: "Good night", correct: false }
            ],
            explanation: "'Kitem chollam?' is popular among Goan youth when meeting friends."
          },
          {
            id: "u1_l1_ex3",
            type: "word-arrange",
            question: "Arrange the words to say: 'Thank you'",
            targetEnglish: "Thank you",
            correctOrder: ["Dev", "borem", "korum"],
            scrambledWords: ["korum", "Dev", "borem", "kitem", "aasa"],
            explanation: "'Dev borem korum' means 'May God do good to you' (Thank you)."
          },
          {
            id: "u1_l1_ex4",
            type: "listening",
            question: "Listen to the audio and select the matching phrase:",
            audioText: "Borem aasa",
            hint: "Used to say 'I am fine / All is good'",
            options: [
              { id: "opt1", text: "बरें आसा (Borem aasa)", correct: true },
              { id: "opt2", text: "देव बरें दीस दिवं (Devo boro dis dium)", correct: false },
              { id: "opt3", text: "शीत कढी (Xitt koddie)", correct: false }
            ],
            explanation: "'Borem aasa' means 'Everything is well / I am good'."
          }
        ]
      },
      {
        id: "u1_l2",
        title: "Polite Words & Thanks",
        xpReward: 35,
        exercises: [
          {
            id: "u1_l2_ex1",
            type: "match-pairs",
            question: "Match the Konkani words with their English meanings:",
            pairs: [
              { konkani: "देव बरें करूं", roman: "Dev borem korum", english: "Thank you" },
              { konkani: "नमस्कार", roman: "Nomoskar", english: "Greetings" },
              { konkani: "बरें आसा", roman: "Borem aasa", english: "Fine / Good" }
            ]
          },
          {
            id: "u1_l2_ex2",
            type: "sentence-completion",
            question: "Fill in the blank to complete the greeting:",
            sentenceTemplate: "Devo ___ dis dium",
            konkaniDevanagari: "देव ___ दीस दिवं",
            missingWord: "boro",
            options: ["boro", "kitem", "chollam", "nuste"],
            explanation: "'Boro' (or borem) means 'good' in Konkani."
          },
          {
            id: "u1_l2_ex3",
            type: "speaking",
            question: "Practice pronouncing the Goan universal greeting:",
            targetPhrase: "Devo boro dis dium",
            devanagari: "देव बरें दीस दिवं",
            phonetic: "deh-voh boh-roh dees dee-oom",
            audioText: "Devo boro dis dium"
          }
        ]
      }
    ]
  },

  {
    id: "unit_2",
    unitNumber: 2,
    titleDevanagari: "वळख आनी भास",
    titleRoman: "Vollokh ani Bhaas",
    titleEnglish: "Introductions & Identity",
    color: "#2980B9", // Arabian Sea Azure
    icon: "🤝",
    description: "Learn how to introduce yourself, ask names, and share your identity.",
    lessons: [
      {
        id: "u2_l1",
        title: "What is your name?",
        xpReward: 35,
        exercises: [
          {
            id: "u2_l1_ex1",
            type: "multiple-choice",
            question: "How do you ask 'What is your name?' in Konkani?",
            audioText: "Tujem naav kitem?",
            options: [
              { id: "opt1", text: "तुजें नांव कितें? (Tujem naav kitem?)", correct: true },
              { id: "opt2", text: "तुका खंय वचपाक जाय? (Tuka khoim vochunk zai?)", correct: false },
              { id: "opt3", text: "कितें खाल्लें? (Kitem khallem?)", correct: false }
            ],
            explanation: "'Tujem' = your, 'naav' = name, 'kitem' = what."
          },
          {
            id: "u2_l1_ex2",
            type: "word-arrange",
            question: "Form the sentence: 'My name is Torli'",
            targetEnglish: "My name is Torli",
            correctOrder: ["Mhojem", "naav", "Torli"],
            scrambledWords: ["Torli", "naav", "kitem", "Mhojem", "Goem"],
            explanation: "'Mhojem naav...' is how you introduce yourself."
          },
          {
            id: "u2_l1_ex3",
            type: "translate-to-konkani",
            question: "Select the Konkani translation for: 'I am a Goan'",
            englishPrompt: "I am a Goan",
            audioText: "Haav Goemcho",
            options: [
              { id: "opt1", text: "हांव गोंयचो (Haav Goemcho)", correct: true },
              { id: "opt2", text: "हांव शीत खांक लागलां (Haav xitt khank laglam)", correct: false },
              { id: "opt3", text: "हांव पयस आसां (Haav pois aasam)", correct: false }
            ],
            explanation: "'Haav' = I, 'Goemcho' = of Goa (masculine). Girls say 'Haav Goemchi'."
          }
        ]
      }
    ]
  },

  {
    id: "unit_3",
    unitNumber: 3,
    titleDevanagari: "कुटुंब आनी मोग",
    titleRoman: "Kuttumb ani Mog",
    titleEnglish: "Family & Affection",
    color: "#27AE60", // Lush Goan Hinterland Green
    icon: "🏡",
    description: "Names for family members, relatives, and warmth of Goan home life.",
    lessons: [
      {
        id: "u3_l1",
        title: "Parents & Siblings",
        xpReward: 35,
        exercises: [
          {
            id: "u3_l1_ex1",
            type: "match-pairs",
            question: "Match Konkani family words with English:",
            pairs: [
              { konkani: "मांय", roman: "Maim", english: "Mother" },
              { konkani: "पाय", roman: "Pai", english: "Father" },
              { konkani: "भाव", roman: "Bhav", english: "Brother" },
              { konkani: "भयण", roman: "Bhoinn", english: "Sister" }
            ]
          },
          {
            id: "u3_l1_ex2",
            type: "multiple-choice",
            question: "What does 'Mhozo bhav' mean?",
            audioText: "Mhozo bhav",
            options: [
              { id: "opt1", text: "My brother", correct: true },
              { id: "opt2", text: "My father", correct: false },
              { id: "opt3", text: "My mother", correct: false },
              { id: "opt4", text: "My sister", correct: false }
            ],
            explanation: "'Bhav' means brother in Konkani."
          }
        ]
      }
    ]
  },

  {
    id: "unit_4",
    unitNumber: 4,
    titleDevanagari: "आंकडे आनी मेजप",
    titleRoman: "Ankdde ani Mezop",
    titleEnglish: "Numbers & Counting",
    color: "#8E44AD", // Festive Jacaranda Purple
    icon: "🔢",
    description: "Learn to count from 1 to 5 and use numbers in everyday shopping.",
    lessons: [
      {
        id: "u4_l1",
        title: "Counting 1 to 5",
        xpReward: 35,
        exercises: [
          {
            id: "u4_l1_ex1",
            type: "match-pairs",
            question: "Match the numerals to Konkani:",
            pairs: [
              { konkani: "एक", roman: "Ek", english: "1" },
              { konkani: "दोन", roman: "Don", english: "2" },
              { konkani: "तीन", roman: "Teen", english: "3" },
              { konkani: "चार", roman: "Chaar", english: "4" }
            ]
          },
          {
            id: "u4_l1_ex2",
            type: "multiple-choice",
            question: "What is the Konkani word for 'Five' (5)?",
            audioText: "Paanch",
            options: [
              { id: "opt1", text: "पांच (Paanch)", correct: true },
              { id: "opt2", text: "दोन (Don)", correct: false },
              { id: "opt3", text: "तीन (Teen)", correct: false },
              { id: "opt4", text: "एक (Ek)", correct: false }
            ],
            explanation: "'Paanch' is the Konkani word for 5."
          },
          {
            id: "u4_l1_ex3",
            type: "word-arrange",
            question: "Form the phrase: 'Two mackerels please'",
            targetEnglish: "Two mackerels",
            correctOrder: ["Don", "bangdde"],
            scrambledWords: ["bangdde", "Don", "teen", "ek"],
            explanation: "'Don bangdde' = two mackerels."
          }
        ]
      }
    ]
  },

  {
    id: "unit_5",
    unitNumber: 5,
    titleDevanagari: "खाण-जेवण आनी नुसतें",
    titleRoman: "Khaan-Jevonn ani Nuste",
    titleEnglish: "Food & Fish Cuisine",
    color: "#E67E22", // Golden Fried Surmai Amber
    icon: "🐟",
    description: "Explore the heart of Goan food culture, seafood, and staples.",
    lessons: [
      {
        id: "u5_l1",
        title: "The Goan Thali Staples",
        xpReward: 40,
        exercises: [
          {
            id: "u5_l1_ex1",
            type: "multiple-choice",
            question: "What is the Konkani word for 'Fish'?",
            audioText: "Nuste",
            options: [
              { id: "opt1", text: "नुसतें (Nuste)", correct: true },
              { id: "opt2", text: "उदक (Udok)", correct: false },
              { id: "opt3", text: "शीत (Xitt)", correct: false },
              { id: "opt4", text: "पांव (Pao)", correct: false }
            ],
            explanation: "'Nuste' is the beloved Konkani word for fish, the foundation of coastal Goan diet."
          },
          {
            id: "u5_l1_ex2",
            type: "match-pairs",
            question: "Match the food items:",
            pairs: [
              { konkani: "शीत", roman: "Xitt", english: "Cooked Rice" },
              { konkani: "कढी", roman: "Koddie", english: "Curry" },
              { konkani: "उदक", roman: "Udok", english: "Water" },
              { konkani: "पांव", roman: "Pao", english: "Goan Bread" }
            ]
          },
          {
            id: "u5_l1_ex3",
            type: "sentence-completion",
            question: "Complete the famous phrase: 'Xitt koddie ani ___' (Rice, curry, and fish)",
            sentenceTemplate: "Xitt koddie ani ___",
            konkaniDevanagari: "शीत कढी आनी ___",
            missingWord: "nuste",
            options: ["nuste", "ankdde", "maim", "pai"],
            explanation: "'Xitt koddie nuste' is the iconic trio of a traditional Goan meal."
          },
          {
            id: "u5_l1_ex4",
            type: "speaking",
            question: "Say the Konkani word for Fish:",
            targetPhrase: "Nuste",
            devanagari: "नुसतें",
            phonetic: "noos-thehm",
            audioText: "Nuste"
          }
        ]
      },
      {
        id: "u5_l2",
        title: "Famous Goan Fish Varieties",
        xpReward: 40,
        exercises: [
          {
            id: "u5_l2_ex1",
            type: "multiple-choice",
            question: "Which fish is known as 'Visvon' in Goa?",
            audioText: "Visvon",
            options: [
              { id: "opt1", text: "Kingfish (Surmai)", correct: true },
              { id: "opt2", text: "Sardines", correct: false },
              { id: "opt3", text: "Prawns", correct: false },
              { id: "opt4", text: "Crab", correct: false }
            ],
            explanation: "'Visvon' is the Kingfish, prized for Goan rava fry!"
          },
          {
            id: "u5_l2_ex2",
            type: "translate-to-konkani",
            question: "What do Goans call Mackerel?",
            englishPrompt: "Mackerel",
            audioText: "Bangdde",
            options: [
              { id: "opt1", text: "बांगडे (Bangdde)", correct: true },
              { id: "opt2", text: "तारले (Tarle)", correct: false },
              { id: "opt3", text: "सुंगटां (Sungtam)", correct: false }
            ],
            explanation: "'Bangdde' are mackerels, often prepared recheado or curry."
          }
        ]
      }
    ]
  }
];

export function getUnitById(unitId) {
  return CURRICULUM_UNITS.find(u => u.id === unitId) || null;
}

export function getLessonById(lessonId) {
  for (const unit of CURRICULUM_UNITS) {
    const lesson = unit.lessons.find(l => l.id === lessonId);
    if (lesson) return { ...lesson, unitId: unit.id, unitTitle: unit.titleEnglish };
  }
  return null;
}
