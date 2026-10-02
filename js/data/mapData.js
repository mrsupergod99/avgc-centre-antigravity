/**
 * KONKANIGO MAP DATA
 * Stylized interactive Goa Discovery Map zones with cultural coordinates,
 * vocabulary hotspots, and heritage locations.
 */

export const GOA_MAP_ZONES = [
  {
    id: "zone_old_goa",
    name: "Old Goa (Velha Goa)",
    region: "Tiswadi / Central",
    pinX: 52, // Percentage on stylized map
    pinY: 42,
    badge: "Heritage Sanctuary",
    icon: "⛪",
    description: "The historical heart of Portuguese Asia, famed for towering 16th-century cathedrals and golden baroque art.",
    highlights: ["Basilica of Bom Jesus", "Se Cathedral", "Church of St. Francis of Assisi"],
    konkaniPhrase: {
      devanagari: "पोरणें गोंय म्होजी अस्मिताय",
      roman: "Pornnem Goem mhoji asmitai",
      english: "Old Goa is my heritage/identity"
    },
    linkedCultureId: "cult_herit_bom_jesus"
  },
  {
    id: "zone_panaji",
    name: "Panaji & Fontainhas",
    region: "Tiswadi / Capital",
    pinX: 44,
    pinY: 40,
    badge: "Latin Quarter & River Mandovi",
    icon: "🎨",
    description: "Goa's capital city along the river Mandovi, renowned for colorful Latin quarters, red-tiled roofs, and cultural cafes.",
    highlights: ["Fontainhas Latin Quarter", "Immaculate Conception Church", "Mandovi Promenade"],
    konkaniPhrase: {
      devanagari: "पणजे शारांत चालूंया",
      roman: "Ponnje xarant chalum-ya",
      english: "Let's stroll through Panaji town"
    },
    linkedCultureId: "cult_herit_balcao"
  },
  {
    id: "zone_mapusa",
    name: "Mapusa Bazaar",
    region: "Bardez / North",
    pinX: 40,
    pinY: 26,
    badge: "Traditional Market Hub",
    icon: "🧺",
    description: "The bustling cultural marketplace of North Goa where farmers, fishermen, and spice vendors gather every Friday.",
    highlights: ["Friday Market", "Traditional Pottery", "Goan Sausages & Spices"],
    konkaniPhrase: {
      devanagari: "म्हापशांच्या बाजारांत वचूंया",
      roman: "Mhapxanchea bazarant vochum-ya",
      english: "Let's go to Mapusa market"
    },
    linkedCultureId: "cult_fish_bangdde"
  },
  {
    id: "zone_ponda",
    name: "Ponda Temple & Spice Heartland",
    region: "Central Inland",
    pinX: 62,
    pinY: 54,
    badge: "Sacred Shrines & Spice Plantations",
    icon: "🛕",
    description: "The spiritual sanctuary of Goa surrounded by dense tropical hills, ancient Hindu temples, and spice gardens.",
    highlights: ["Shanta Durga Temple", "Mangueshi Temple", "Organic Spice Plantations"],
    konkaniPhrase: {
      devanagari: "शांतादुर्गा देवीक नमन",
      roman: "Shanta Durga devik nomon",
      english: "Salutations to Goddess Shanta Durga"
    },
    linkedCultureId: "cult_herit_shanta_durga"
  },
  {
    id: "zone_margao",
    name: "Margao & Salcete",
    region: "Salcete / South",
    pinX: 48,
    pinY: 66,
    badge: "Cultural Capital & Culinary Mecca",
    icon: "🍲",
    description: "The commercial and culinary capital of South Goa, celebrated for grand colonial mansions and legendary fish markets.",
    highlights: ["Ancestral Mansions", "Margao Fish Market", "Holy Spirit Church"],
    konkaniPhrase: {
      devanagari: "माडगांवांत ताजें नुसतें मेळटा",
      roman: "Maddgavant tajem nuste mellta",
      english: "Fresh fish is found in Margao"
    },
    linkedCultureId: "cult_food_fish_thali"
  },
  {
    id: "zone_canacona",
    name: "Canacona & Palolem",
    region: "South Coast",
    pinX: 58,
    pinY: 84,
    badge: "Untouched Southern Shore",
    icon: "🏝️",
    description: "Pristine crescent bays, serene backwaters, and indigenous tribal culture near the Cotigao Wildlife Sanctuary.",
    highlights: ["Palolem Beach", "Cotigao Wildlife", "Galgibaga Turtle Nesting"],
    konkaniPhrase: {
      devanagari: "दऱ्याचो वालो शांत आसा",
      roman: "Doryacho vallo xant aasa",
      english: "The sea coast is peaceful"
    },
    linkedCultureId: "cult_fish_tarle"
  }
];
