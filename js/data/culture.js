/**
 * KONKANIGO GOAN CULTURAL KNOWLEDGE BASE
 * Deep, verified cultural discovery catalog covering Food, Fish, Festivals, Heritage, People & Traditions.
 * Each entry bridges CULTURE -> LANGUAGE with related Konkani vocabulary.
 */

export const GOAN_CULTURE_CATALOG = [
  // ==================== FOOD ====================
  {
    id: "cult_food_mangane",
    category: "food",
    categoryLabel: "Goan Food",
    categoryIcon: "🍲",
    title: "Mangane (माणगाणें)",
    konkaniName: "माणगाणें",
    romanName: "Mangane",
    tagline: "The queen of traditional Goan festive desserts",
    description: "A rich, sweet porridge made of chana dal (bengal gram), fragrant coconut milk, sabudana, Goan pyramid palm jaggery, cardamom, and roasted cashews.",
    culturalStory: "Mangane is deeply intertwined with Goan celebration. No major Hindu or family feast in Goa is complete without it. Simmered in massive brass cauldrons ('moddki'), its warm aroma of freshly squeezed coconut milk and dark palm jaggery signals auspicious occasions and joyful gatherings across villages.",
    ingredients: ["Chana Dal (Bengali Gram)", "Fresh Coconut Milk", "Goan Palm Jaggery (Maddachem Godd)", "Sabudana", "Cardamom & Cashews"],
    location: "Celebrated across North & South Goa",
    relatedVocabulary: [
      { konkani: "गॉड", roman: "Godd", english: "Jaggery / Sweet" },
      { konkani: "नाल्ल", roman: "Nall", english: "Coconut" },
      { konkani: "काजू", roman: "Kaju", english: "Cashew nut" },
      { konkani: "उदक", roman: "Udok", english: "Water" }
    ],
    model3DId: "pot_drum", // Links to 3D terracotta / cooking vessel
    imageEmoji: "🥣",
    accentColor: "#E67E22",
    verified: true,
    source: "Goan Culinary Heritage Archives"
  },
  {
    id: "cult_food_xacuti",
    category: "food",
    categoryLabel: "Goan Food",
    categoryIcon: "🍲",
    title: "Goan Xacuti (शागोती)",
    konkaniName: "शागोती",
    romanName: "Xacuti / Shagoti",
    tagline: "Complex roasted coconut and spice elixir",
    description: "An iconic, deeply spiced Goan curry made with white poppy seeds (khus khus), sliced onions, grated coconut roasted till deep bronze, star anise, and whole spices.",
    culturalStory: "Originating with rural Goan hunters who simmered wild game with roasted jungle herbs and ground coconut, Xacuti is famed for its complex aromatic alchemy. The secret lies in roasting the coconut shavings slowly until smoky and golden-brown.",
    ingredients: ["Roasted Coconut", "Poppy Seeds", "Tamarind", "Kashmiri Chilies", "Coriander Seeds", "Meat or Mushrooms"],
    location: "All Goan ancestral villages",
    relatedVocabulary: [
      { konkani: "मसालो", roman: "Masalo", english: "Spice blend" },
      { konkani: "मिरसांग", roman: "Mirsang", english: "Chili" },
      { konkani: "कांदो", roman: "Kando", english: "Onion" }
    ],
    model3DId: null,
    imageEmoji: "🍛",
    accentColor: "#C0392B",
    verified: true,
    source: "Goan Traditional Cuisine Corpus"
  },
  {
    id: "cult_food_balchao",
    category: "food",
    categoryLabel: "Goan Food",
    categoryIcon: "🍲",
    title: "Prawn Balchão (सुंगटांचें बालचांव)",
    konkaniName: "सुंगटांचें बालचांव",
    romanName: "Sungtanchem Balchão",
    tagline: "Fiery, tangy coastal pickle-curry",
    description: "A fiery red pickled prawn dish prepared with fresh Goan toddy vinegar, dried red chilies, garlic, and cumin. It acts almost like a spicy preserve that matures with age.",
    culturalStory: "Introduced by Goan sailors returning from Malacca (where it was known as 'balachan'), Goan Catholic cooks transformed it with pungent local toddy vinegar and fiery local spices. A single spoonful with hot rice and crusty pao is legendary.",
    ingredients: ["Fresh Prawns (Sungtam)", "Toddy Vinegar", "Dried Red Chilies", "Garlic & Ginger", "Cumin"],
    location: "Coastal Goa / Salcete & Bardez",
    relatedVocabulary: [
      { konkani: "सुंगटां", roman: "Sungtam", english: "Prawns" },
      { konkani: "सिरको", roman: "Sirko", english: "Vinegar" },
      { konkani: "लसूण", roman: "Losun", english: "Garlic" }
    ],
    model3DId: null,
    imageEmoji: "🦐",
    accentColor: "#D35400",
    verified: true,
    source: "Goa Food Heritage Trust"
  },
  {
    id: "cult_food_shevya_kheer",
    category: "food",
    categoryLabel: "Goan Food",
    categoryIcon: "🍲",
    title: "Shevyachi Kheer (शेव्यांची खीर)",
    konkaniName: "शेव्यांची खीर",
    romanName: "Shevyachi Kheer",
    tagline: "Golden roasted vermicelli milk dessert",
    description: "Hand-rolled roasted vermicelli simmered slowly in thickened milk or rich coconut milk, perfumed with green cardamom, golden raisins, and slivered almonds.",
    culturalStory: "Traditionally made during Eid, Diwali, and family feast days in Goa. The delicate aroma of ghee-roasted shevyo simmering on the stove is a childhood memory cherished by generations of Goan kids.",
    ingredients: ["Wheat Vermicelli (Shevyo)", "Milk or Coconut Milk", "Pure Ghee", "Cardamom", "Cashews"],
    location: "Every Goan household",
    relatedVocabulary: [
      { konkani: "दूध", roman: "Doodh", english: "Milk" },
      { konkani: "तूप", roman: "Toop", english: "Ghee / Clarified Butter" },
      { konkani: "गोड", roman: "Godd", english: "Sweet" }
    ],
    model3DId: null,
    imageEmoji: "🍮",
    accentColor: "#F39C12",
    verified: true,
    source: "Goa Culinary Heritage Archives"
  },
  {
    id: "cult_food_fish_thali",
    category: "food",
    categoryLabel: "Goan Food",
    categoryIcon: "🍲",
    title: "Goan Fish Thali (नुस्त्याचें जेवण)",
    konkaniName: "नुस्त्याचें जेवण",
    romanName: "Nustyachem Jevonn / Fish Thali",
    tagline: "The daily sacred ritual of Goa",
    description: "The complete Goan lunch platter: steaming boiled rice, fragrant fish curry (Koddie), semolina-crusted Kingfish rava fry, tisreo (clams sukka), kismur (dried prawn salad), and digestive Sol Kadi.",
    culturalStory: "In Goa, lunchtime without fish is considered incomplete. From village shacks to bustling Panaji eateries, the fish thali represents the bounty of the Arabian Sea and the warmth of coastal hospitality.",
    ingredients: ["Rice (Xitt)", "Fish Curry (Koddie)", "Fried Kingfish (Visvon Fry)", "Clams (Tisreo)", "Sol Kadi"],
    location: "Throughout all Goan coastlines and towns",
    relatedVocabulary: [
      { konkani: "नुसतें", roman: "Nuste", english: "Fish" },
      { konkani: "शीत", roman: "Xitt", english: "Cooked Rice" },
      { konkani: "कढी", roman: "Koddie", english: "Curry" },
      { konkani: "जेवण", roman: "Jevonn", english: "Meal / Feast" }
    ],
    model3DId: "fish_mackerel",
    imageEmoji: "🍱",
    accentColor: "#27AE60",
    verified: true,
    source: "Official Goan Tourism & Heritage Board"
  },

  // ==================== FISH & COASTAL ====================
  {
    id: "cult_fish_visvon",
    category: "fish",
    categoryLabel: "Coastal & Marine",
    categoryIcon: "🐟",
    title: "Visvon (Kingfish / Surmai)",
    konkaniName: "विस्वण",
    romanName: "Visvon",
    tagline: "The undisputed monarch of Goan waters",
    description: "Known in English as Indo-Pacific King Mackerel. A prized, firm-fleshed pelagic fish sliced into thick steaks, marinated in chili-turmeric paste, coated with crunchy semolina (rava), and shallow fried.",
    culturalStory: "Ask any Goan what their dream weekend lunch is, and 'Visvon Fry' tops the list. The fish markets of Mapusa, Margao, and Panaji erupt in intense friendly bargaining each morning as fresh morning catches arrive.",
    ingredients: ["Rava (Semolina)", "Kashmiri Red Chili Paste", "Turmeric (Halad)", "Salt & Coconut Oil"],
    location: "Arabian Sea, Goan Coastal Harbors",
    relatedVocabulary: [
      { konkani: "विस्वण", roman: "Visvon", english: "Kingfish" },
      { konkani: "तळप", roman: "Tollop", english: "Frying" },
      { konkani: "ताजो", roman: "Tazo", english: "Fresh" }
    ],
    model3DId: "fish_mackerel",
    imageEmoji: "🐟",
    accentColor: "#2980B9",
    verified: true,
    source: "Fisheries Department of Goa"
  },
  {
    id: "cult_fish_bangdde",
    category: "fish",
    categoryLabel: "Coastal & Marine",
    categoryIcon: "🐟",
    title: "Bangdde (Mackerel)",
    konkaniName: "बांगडे",
    romanName: "Bangdde",
    tagline: "The beloved everyday fuel of coastal life",
    description: "Indian Mackerel, rich in healthy Omega-3 oils. Often stuffed with a fiery crimson paste called 'Recheado' made from whole spices ground in Goan toddy vinegar.",
    culturalStory: "Mackerels arrive in great shimmering schools along Goan beaches after the monsoon. Fishermen in traditional wooden 'rampon' boats haul huge nets to shore while chanting rhythmic folk work-songs ('Bailila').",
    ingredients: ["Recheado Masala", "Toddy Vinegar", "Garlic", "Salt"],
    location: "Baga, Betalbatim, Colva, Morjim shores",
    relatedVocabulary: [
      { konkani: "बांगडे", roman: "Bangdde", english: "Mackerel" },
      { konkani: "खारें", roman: "Kharem", english: "Salted / Dry fish" },
      { konkani: "दऱ्या", roman: "Dorya", english: "Sea / Ocean" }
    ],
    model3DId: "fish_mackerel",
    imageEmoji: "🐟",
    accentColor: "#16A085",
    verified: true,
    source: "Goan Marine Life & Fisheries Lexicon"
  },
  {
    id: "cult_fish_tarle",
    category: "fish",
    categoryLabel: "Coastal & Marine",
    categoryIcon: "🐟",
    title: "Tarle (Sardines)",
    konkaniName: "तारले",
    romanName: "Tarle",
    tagline: "Silver treasures and the inspiration for Torli!",
    description: "Small, shiny, highly nutritious sardines that travel in glistening silver shoals. Prepared in tangy curries with fresh kokum or crisp-fried with green chili masala.",
    culturalStory: "Tarle are celebrated in popular Konkani proverbs and children's folk rhymes. Their agile, joyful jumping across the waves inspired the character of our mascot, 'Torli the Fish'!",
    ingredients: ["Kokum (Binddim)", "Fresh Coconut", "Green Chilies"],
    location: "Coastal Goan fishing villages",
    relatedVocabulary: [
      { konkani: "तारले", roman: "Tarle", english: "Sardines" },
      { konkani: "उड्डी", roman: "Uddi", english: "Jump / Leap" },
      { konkani: "ल्हान", roman: "Lhan", english: "Small / Tiny" }
    ],
    model3DId: "fish_mackerel",
    imageEmoji: "🐠",
    accentColor: "#3498DB",
    verified: true,
    source: "Goa Folk Literature Archives"
  },

  // ==================== HERITAGE ====================
  {
    id: "cult_herit_balcao",
    category: "heritage",
    categoryLabel: "Goan Heritage",
    categoryIcon: "🏛",
    title: "Traditional Goan Balcão House",
    konkaniName: "गोंयचें बाल्कांव घर",
    romanName: "Goenchem Balcão Ghor",
    tagline: "Colonnaded porch where community and stories live",
    description: "The architectural soul of Goa: large tiled-roof houses constructed from porous red laterite stone, featuring an open, colonnaded porch ('balcão') with built-in masonry seats lined with hand-painted Portuguese azulejo tiles.",
    culturalStory: "The balcão is the heart of social life in Goan villages. Here, families relax in the cool evening breeze, greet passing neighbors with 'Kitem chollam?', read the morning newspaper, and sip evening tea. It is a bridge between private home and public street.",
    ingredients: ["Laterite Stone (Chire)", "Mangalore Tiles", "Azulejo Ceramic Tiles", "Oyster Shell Windows"],
    location: "Fontainhas (Panaji), Chandor, Loutolim, Saligao",
    relatedVocabulary: [
      { konkani: "घर", roman: "Ghor", english: "House / Home" },
      { konkani: "बाल्कांव", roman: "Balcão", english: "Covered porch / Veranda" },
      { konkani: "सोपो", roman: "Sopo", english: "Built-in masonry bench" }
    ],
    model3DId: "goan_house",
    imageEmoji: "🏡",
    accentColor: "#E74C3C",
    verified: true,
    source: "Goa Heritage Action Group (GHAG)"
  },
  {
    id: "cult_herit_bom_jesus",
    category: "heritage",
    categoryLabel: "Goan Heritage",
    categoryIcon: "🏛",
    title: "Basilica of Bom Jesus",
    konkaniName: "बोम जेजूचें बासिलिका",
    romanName: "Bom Jezuchem Basilica",
    tagline: "UNESCO World Heritage Baroque landmark in Old Goa",
    description: "Consecrated in 1605, this masterpiece of Baroque architecture is constructed from exposed dark red laterite stone. It houses the sacred relics of St. Francis Xavier.",
    culturalStory: "Located in Velha Goa (Old Goa), it is visited by millions of pilgrims and tourists of all faiths. The church features exquisite gilded woodcarvings, basalt portals, and a towering three-story facade.",
    ingredients: ["Laterite Stone", "Basalt Stone", "Gilded Teak Woodcarvings"],
    location: "Old Goa (Velha Goa), Tiswadi",
    relatedVocabulary: [
      { konkani: "इगर्ज", roman: "Igorz", english: "Church" },
      { konkani: "पोरणें गोंय", roman: "Pornnem Goem", english: "Old Goa" },
      { konkani: "फातर", roman: "Fator", english: "Stone / Rock" }
    ],
    model3DId: "goan_house",
    imageEmoji: "⛪",
    accentColor: "#8E44AD",
    verified: true,
    source: "Archaeological Survey of India (ASI)"
  },
  {
    id: "cult_herit_shanta_durga",
    category: "heritage",
    categoryLabel: "Goan Heritage",
    categoryIcon: "🏛",
    title: "Shanta Durga Temple",
    konkaniName: "श्री शांतादुर्गा संस्थान",
    romanName: "Shree Shanta Durga Saunsthan",
    tagline: "Peaceful synthesis of Goan temple architecture",
    description: "Nestled at the foothills of Kavlem in Ponda, this revered temple is dedicated to the Goddess of Peace who mediated a fierce dispute between Vishnu and Shiva.",
    culturalStory: "Goan temples in Ponda showcase a unique regional Indo-Portuguese fusion architecture. Instead of towering stone gopurams, they feature sloping terracotta tiled roofs, arched windows, Roman balustrades, and multi-tiered octagonal lamp towers ('Deepastambha').",
    ingredients: ["Deepastambha (Lamp Tower)", "Red Laterite", "Golden Kalash"],
    location: "Kavlem, Ponda taluka",
    relatedVocabulary: [
      { konkani: "देवूळ", roman: "Devull", english: "Temple" },
      { konkani: "शांतताय", roman: "Xantatai", english: "Peace" },
      { konkani: "दिवो", roman: "Divo", english: "Oil Lamp" }
    ],
    model3DId: null,
    imageEmoji: "🛕",
    accentColor: "#F39C12",
    verified: true,
    source: "Goa Cultural Studies & Temple Records"
  },
  {
    id: "cult_herit_ghumott",
    category: "heritage",
    categoryLabel: "Goan Traditions",
    categoryIcon: "🥁",
    title: "The Ghumott (घुमट)",
    konkaniName: "घुमट",
    romanName: "Ghumott",
    tagline: "The heartbeat of Goan folk music",
    description: "An ancient Goan percussion instrument crafted from an earthen terracotta clay pot with two open mouths, now legally fitted with synthetic skin. It has been declared Goa's Heritage Musical Instrument.",
    culturalStory: "The deep, resonant rhythm of the Ghumott drives every Goan folk celebration—from the spirited chants of the Shigmo spring festival to the haunting choral verses of traditional Goan Mando songs.",
    ingredients: ["Baked Terracotta Clay Pot", "Percussion Skin", "Brass Bells"],
    location: "Played throughout rural and cultural Goa",
    relatedVocabulary: [
      { konkani: "घुमट", roman: "Ghumott", english: "Clay percussion drum" },
      { konkani: "गायन", roman: "Gayan", english: "Singing / Song" },
      { konkani: "नाच", roman: "Naach", english: "Dance" }
    ],
    model3DId: "pot_drum",
    imageEmoji: "🥁",
    accentColor: "#D35400",
    verified: true,
    source: "Goa Directorate of Art & Culture"
  },

  // ==================== FESTIVALS ====================
  {
    id: "cult_fest_sao_joao",
    category: "festivals",
    categoryLabel: "Festivals",
    categoryIcon: "🎭",
    title: "Sao Joao (सांव जुआंव)",
    konkaniName: "सांव जुआंव",
    romanName: "Sao Joao",
    tagline: "The exhilarating monsoon feast of wells",
    description: "Celebrated every 24th of June during the peak of the monsoon. Villagers wear vibrant crowns woven with fresh jungle flowers and wild leaves ('kopel'), sing folk songs, and leap joyously into village wells and streams.",
    culturalStory: "The festival commemorates St. John leaping in joy in his mother Elizabeth's womb. In Goan villages, newlywed sons-in-law ('javai') receive platters of fresh fruits, jackfruit ('ponos'), and mangoes ('aambo') from their mothers-in-law.",
    ingredients: ["Kopel (Flower Crown)", "Fresh Fruits & Jackfruit", "Village Well Waters"],
    location: "Siolim, Candolim, Benaulim",
    relatedVocabulary: [
      { konkani: "कोपल", roman: "Kopel", english: "Floral crown" },
      { konkani: "बांय", roman: "Baaim", english: "Water well" },
      { konkani: "पावस", roman: "Pavs", english: "Rain / Monsoon" }
    ],
    model3DId: null,
    imageEmoji: "👑",
    accentColor: "#2ECC71",
    verified: true,
    source: "Goan Folklore Documentation"
  },
  {
    id: "cult_fest_shigmo",
    category: "festivals",
    categoryLabel: "Festivals",
    categoryIcon: "🎭",
    title: "Shigmo (शिगमो)",
    konkaniName: "शिगमो",
    romanName: "Shigmo",
    tagline: "The vibrant spring carnival of folk color",
    description: "The Goan counterpart of Holi celebrating the arrival of spring and harvest. Massive street parades feature traditional Ghode Modni (warrior horse dances), Romtamel drums, and elaborate mythological floats.",
    culturalStory: "Village men gather in temples in white attire with red vermillion, chanting ancient Konkani verses called 'Naman'. It is a magnificent celebration of agricultural abundance and warrior history.",
    ingredients: ["Gulal (Colored Powders)", "Dhol-Tasha Drums", "Horse Dance Outfits"],
    location: "Ponda, Panaji, Margao, Vasco",
    relatedVocabulary: [
      { konkani: "रंग", roman: "Rong", english: "Color" },
      { konkani: "उत्सव", roman: "Utsav", english: "Festival / Celebration" },
      { konkani: "ढोल", roman: "Dhol", english: "Large Drum" }
    ],
    model3DId: null,
    imageEmoji: "🎉",
    accentColor: "#E67E22",
    verified: true,
    source: "Goa Directorate of Art & Culture"
  },

  // ==================== PEOPLE & LITERATURE ====================
  {
    id: "cult_ppl_shenoi_goembab",
    category: "people",
    categoryLabel: "People & Literature",
    categoryIcon: "📖",
    title: "Shenoi Goembab (वामन रघुनाथ शेणै वर्दे वालावलीकार)",
    konkaniName: "शणै गोंयबाब",
    romanName: "Shenoi Goembab",
    tagline: "The father of the modern Konkani language revival",
    description: "Waman Raghunath Shenoi Varde Valaulikar (1877–1946) championed the dignity, literary potential, and pride of the Konkani language when it was suppressed.",
    culturalStory: "He famously proclaimed that Konkani is not a mere dialect, but an ancient, lyrical, and fully formed language with deep Vedic roots and rich modern potential. His death anniversary, April 9th, is celebrated as World Konkani Day.",
    ingredients: ["Prose", "Plays", "Grammar Books", "Cultural Awakening"],
    location: "Bicholim & All Goa",
    relatedVocabulary: [
      { konkani: "भास", roman: "Bhaas", english: "Language" },
      { konkani: "बरोवपी", roman: "Borovpi", english: "Writer / Author" },
      { konkani: "अभिमान", roman: "Abhiman", english: "Pride" }
    ],
    model3DId: null,
    imageEmoji: "✒️",
    accentColor: "#34495E",
    verified: true,
    source: "Goa Konkani Akademi Biographies"
  },
  {
    id: "cult_ppl_mauzo",
    category: "people",
    categoryLabel: "People & Literature",
    categoryIcon: "📖",
    title: "Damodar Mauzo (दामोदर मावजो)",
    konkaniName: "दामोदर मावजो",
    romanName: "Damodar Mauzo",
    tagline: "Jnanpith Award-winning Konkani novelist",
    description: "Renowned Konkani novelist, short-story writer, and screenwriter from Majorda, Goa. Awarded India's highest literary honor, the 57th Jnanpith Award in 2021.",
    culturalStory: "His celebrated novel 'Karmelin' won the Sahitya Akademi Award and sensitively portrayed the hardships of Goan women working in the Gulf. Mauzo's stories capture the soul, humor, and changing landscape of rural Goa.",
    ingredients: ["Novels", "Short Stories", "Jnanpith Award"],
    location: "Majorda, Salcete",
    relatedVocabulary: [
      { konkani: "पुस्तकां", roman: "Pustakam", english: "Books" },
      { konkani: "काणी", roman: "Kanni", english: "Story / Tale" },
      { konkani: "साहित्य", roman: "Sahitya", english: "Literature" }
    ],
    model3DId: null,
    imageEmoji: "📚",
    accentColor: "#2C3E50",
    verified: true,
    source: "Sahitya Akademi Archives"
  }
];

export function getCultureItemById(id) {
  return GOAN_CULTURE_CATALOG.find(item => item.id === id) || null;
}

export function getCultureItemsByCategory(cat) {
  if (cat === "all") return GOAN_CULTURE_CATALOG;
  return GOAN_CULTURE_CATALOG.filter(item => item.category === cat);
}
