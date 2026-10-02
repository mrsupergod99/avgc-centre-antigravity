/**
 * KONKANIGO TOURIST MODE DATA
 * Tailored practical Konkani survival guides for 1-Day, 3-Day, and 7-Day visitors.
 * Focuses on high-utility real-world scenarios with Devanagari, Roman transliteration, and English meanings.
 */

export const TOURIST_PACKS = {
  "1day": {
    id: "1day",
    title: "1-Day Express Pass",
    badge: "Quick Trip",
    subtitle: "Absolute essentials to order food, say hello, and hail a ride.",
    targetTime: "15 mins",
    scenarios: ["scen_restaurant", "scen_transport", "scen_emergency"]
  },
  "3day": {
    id: "3day",
    title: "3-Day Weekend Wanderer",
    badge: "Most Popular",
    subtitle: "Navigate beach shacks, bargain at night markets, and ask local directions.",
    targetTime: "30 mins",
    scenarios: ["scen_restaurant", "scen_transport", "scen_market", "scen_directions", "scen_emergency"]
  },
  "7day": {
    id: "7day",
    title: "7-Day Goenkar Immersion",
    badge: "Full Culture",
    subtitle: "Connect warmly with locals, converse in ancestral villages, and explore with ease.",
    targetTime: "60 mins",
    scenarios: ["scen_restaurant", "scen_transport", "scen_market", "scen_hotel", "scen_directions", "scen_social", "scen_emergency"]
  }
};

export const TOURIST_SCENARIOS = [
  {
    id: "scen_restaurant",
    title: "Ordering at a Beach Shack / Restaurant",
    icon: "🍽️",
    description: "Order fresh catch, request the bill, and express compliments to the chef.",
    phrases: [
      {
        id: "tour_food_01",
        devanagari: "एक नुस्त्याचें थाळी दियात.",
        roman: "Ek nustyachem thali diyat.",
        english: "Please give one fish thali.",
        phonetic: "ay-k noos-thyah-chehm thah-lee dee-yaht",
        context: "Polite order to the server at any Goan restaurant."
      },
      {
        id: "tour_food_02",
        devanagari: "ताजी नुस्तीं खंयचीं आसात?",
        roman: "Taji nustim khoimchim asat?",
        english: "Which fresh fish do you have today?",
        phonetic: "tah-jee noos-teem khoym-cheem ah-saht",
        context: "Great phrase when checking the display catch of the day."
      },
      {
        id: "tour_food_03",
        devanagari: "मिरसांग कमी घालात.",
        roman: "Mirsang komi ghalat.",
        english: "Please make it less spicy (less chili).",
        phonetic: "meer-sahng kuh-mee ghah-laht",
        context: "Essential if you prefer milder curries or frying."
      },
      {
        id: "tour_food_04",
        devanagari: "जेवण एकदम बरें आशिल्लें!",
        roman: "Jevonn ekdam borem axil'lem!",
        english: "The food was delicious / excellent!",
        phonetic: "zheh-vuhn ayk-dahm boh-rehm ah-shill-lehm",
        context: "Guaranteed to bring a huge smile to your Goan host!"
      },
      {
        id: "tour_food_05",
        devanagari: "बील कितलें जालें?",
        roman: "Bill kitlem zalem?",
        english: "How much is the bill?",
        phonetic: "bill keet-lehm zah-lehm",
        context: "Asking for the check."
      }
    ]
  },

  {
    id: "scen_transport",
    title: "Hailing a Taxi, Auto or Motorcycle 'Pilot'",
    icon: "🛵",
    description: "Negotiate fares with famous Goan motorcycle pilots, autos, and cabs.",
    phrases: [
      {
        id: "tour_trans_01",
        devanagari: "पणजे वचपाक कितलें जातलें?",
        roman: "Ponnje vochpak kitlem zatlem?",
        english: "How much will it cost to go to Panaji?",
        phonetic: "pohn-zheh vuch-pahk keet-lehm zaht-lehm",
        context: "Replace 'Ponnje' with 'Margao', 'Calangute', etc."
      },
      {
        id: "tour_trans_02",
        devanagari: "गाडी हांगा थांबयात.",
        roman: "Gaddi hanga thambyat.",
        english: "Please stop the vehicle here.",
        phonetic: "gah-dee hahn-gah thahm-byaht",
        context: "Telling your driver to drop you off."
      },
      {
        id: "tour_trans_03",
        devanagari: "एअरपोर्टाक वचपाक कितलो वेळ लागतलो?",
        roman: "Airport-ak vochpak kitlo vell lagtolo?",
        english: "How much time will it take to reach the airport?",
        phonetic: "ayr-pohrt-ahk vuch-pahk keet-loh vayll lahg-toh-loh",
        context: "Estimating travel time across North / South Goa."
      }
    ]
  },

  {
    id: "scen_market",
    title: "Shopping at Mapusa Market & Bazaars",
    icon: "🛍️",
    description: "Ask prices, bargain gently, and buy Goan cashews, spices, and souvenirs.",
    phrases: [
      {
        id: "tour_mkt_01",
        devanagari: "हाचो भाव कितें?",
        roman: "Hacho bhav kitem?",
        english: "What is the price of this?",
        phonetic: "hah-choh bhah-aav kee-tehm",
        context: "Pointing at any item at a flea market or stall."
      },
      {
        id: "tour_mkt_02",
        devanagari: "दर मातसो कमी करात.",
        roman: "Dar maatso komi korat.",
        english: "Please reduce the rate a little bit.",
        phonetic: "dahr maht-soh kuh-mee koh-raht",
        context: "Polite bargaining at street markets."
      },
      {
        id: "tour_mkt_03",
        devanagari: "ताजे काजू आसात?",
        roman: "Taje kaju asat?",
        english: "Do you have fresh Goan cashews?",
        phonetic: "tah-zheh kah-zhoo ah-saht",
        context: "Shopping for authentic Goan cashew nuts."
      }
    ]
  },

  {
    id: "scen_directions",
    title: "Asking for Directions in Villages",
    icon: "🗺️",
    description: "Find beaches, forts, old churches, and scenic village roads.",
    phrases: [
      {
        id: "tour_dir_01",
        devanagari: "वेल्योलो रस्तो खंय आसा?",
        roman: "Vellovelo rosto khoim aasa?",
        english: "Where is the road to the beach?",
        phonetic: "vayl-loh-vay-loh ruhs-toh khoym ah-sah",
        context: "'Vello' is beach in coastal Konkani."
      },
      {
        id: "tour_dir_02",
        devanagari: "हो रस्तो ओल्ड गोयांक वेटा?",
        roman: "Ho rosto Old Goa-nk veta?",
        english: "Does this road go to Old Goa?",
        phonetic: "hoh ruhs-toh ohld goh-ah-nk vay-tah",
        context: "Confirming route direction at a fork."
      },
      {
        id: "tour_dir_03",
        devanagari: "लागीं आसा की पयस?",
        roman: "Lagim aasa ki pois?",
        english: "Is it nearby or far away?",
        phonetic: "lah-geem ah-sah kee poy-ees",
        context: "Checking walking / driving proximity."
      }
    ]
  },

  {
    id: "scen_hotel",
    title: "Hotel & Homestay Check-in",
    icon: "🏨",
    description: "Greet your Goan homestay host and ask for hotel amenities.",
    phrases: [
      {
        id: "tour_htl_01",
        devanagari: "रूम तयार आसा?",
        roman: "Room toyar aasa?",
        english: "Is the room ready?",
        phonetic: "room toy-ahr ah-sah",
        context: "Checking in at your stay."
      },
      {
        id: "tour_htl_02",
        devanagari: "वाय-फाय पासवर्ड कितें?",
        roman: "Wi-Fi password kitem?",
        english: "What is the Wi-Fi password?",
        phonetic: "wy-fy pass-wuh-rd kee-tehm",
        context: "Universal essential request."
      }
    ]
  },

  {
    id: "scen_emergency",
    title: "Emergency & Safety",
    icon: "🚨",
    description: "Vital phrases for assistance, medical aid, and finding police.",
    phrases: [
      {
        id: "tour_emg_01",
        devanagari: "म्हजी मदत करात!",
        roman: "Mhoji modot korat!",
        english: "Please help me!",
        phonetic: "mhoh-zhee muh-duht koh-raht",
        context: "Urgent call for assistance."
      },
      {
        id: "tour_emg_02",
        devanagari: "लागसार हॉस्पिटल खंय आसा?",
        roman: "Lagsar hospital khoim aasa?",
        english: "Where is the nearest hospital / clinic?",
        phonetic: "lahg-sahr hohs-pee-tuhl khoym ah-sah",
        context: "In case of sudden illness or accident."
      },
      {
        id: "tour_emg_03",
        devanagari: "पोलिस स्टेशन खंय आसा?",
        roman: "Police station khoim aasa?",
        english: "Where is the police station?",
        phonetic: "poh-leess stay-shun khoym ah-sah",
        context: "Locating law enforcement."
      }
    ]
  }
];

export function getTouristScenario(id) {
  return TOURIST_SCENARIOS.find(s => s.id === id) || null;
}
