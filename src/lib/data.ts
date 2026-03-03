import { Company, RentalItem } from "@/types";

export const companies: Company[] = [
  {
    id: "kidzz-star-jumpers",
    name: "Kidzz Star Jumpers",
    slug: "kidzz-star-jumpers",
    logo: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&h=200&fit=crop",
    description:
      "Family-owned and operated for 27 years, Kidzz Star Jumpers provides high-quality, clean, and sanitized inflatables and party equipment across the Bay Area. From small backyard birthday parties to large corporate events, we handle every event with the utmost care. We serve San Mateo, San Francisco, Santa Clara, and Alameda Counties.",
    yearsInBusiness: 27,
    rating: 4.9,
    reviewCount: 342,
    location: "East Palo Alto, CA",
    serviceArea: [
      "East Palo Alto",
      "Palo Alto",
      "Menlo Park",
      "Redwood City",
      "Mountain View",
      "Sunnyvale",
      "San Jose",
      "Fremont",
      "Cupertino",
      "Los Altos Hills",
      "Los Gatos",
      "San Mateo",
      "Union City",
      "Daly City",
      "San Francisco",
    ],
    phone: "(650) 814-4499",
    email: "info@kidzzstarjumpers.com",
    website: "https://kidzzstarjumpers.com",
    verified: true,
    insuranceCertified: true,
  },
  {
    id: "bay-area-bounce",
    name: "Bay Area Bounce",
    slug: "bay-area-bounce",
    logo: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=200&h=200&fit=crop",
    description:
      "Premium bounce house and party rental company serving the greater South Bay. We pride ourselves on fast delivery, professional setup, and spotless equipment. Every unit is thoroughly cleaned and inspected before each rental.",
    yearsInBusiness: 12,
    rating: 4.7,
    reviewCount: 189,
    location: "San Jose, CA",
    serviceArea: [
      "San Jose",
      "Santa Clara",
      "Milpitas",
      "Campbell",
      "Los Gatos",
      "Saratoga",
      "Los Altos",
      "Mountain View",
      "Sunnyvale",
    ],
    phone: "(408) 555-0200",
    email: "info@bayareabounce.com",
    website: "https://bayareabounce.com",
    verified: true,
    insuranceCertified: true,
  },
  {
    id: "astro-jump-north-bay",
    name: "Astro Jump North Bay",
    slug: "astro-jump-north-bay",
    logo: "https://images.unsplash.com/photo-1566041510394-cf7c1b1eae6c?w=200&h=200&fit=crop",
    description:
      "For nearly 35 years, Astro Jump® of the North Bay has been San Francisco and Marin's favorite source for backyard fun — renting inflatable bounce houses, obstacle courses, waterslides, and more. We deliver to Marin, Sonoma, and San Francisco with full setup included. Located at 47 Paul Dr, Bldg 9, San Rafael, CA 94903.",
    yearsInBusiness: 35,
    rating: 4.8,
    reviewCount: 214,
    location: "San Rafael, CA",
    serviceArea: [
      "San Rafael",
      "Santa Rosa",
      "Petaluma",
      "Novato",
      "Mill Valley",
      "Napa",
      "Sonoma",
      "Fairfax",
      "Corte Madera",
      "San Francisco",
      "Sausalito",
      "Tiburon",
    ],
    phone: "(415) 499-0955",
    email: "info@astrojumpnorthbay.com",
    website: "https://astrojump.com/northbay",
    verified: true,
    insuranceCertified: true,
  },
];

export const rentalItems: RentalItem[] = [
  // ─── KIDZZ STAR JUMPERS ────────────────────────────────────────────────────

  {
    id: "razzle-dazzle-castle",
    companyId: "kidzz-star-jumpers",
    name: "Razzle Dazzle Castle Jumper",
    slug: "razzle-dazzle-castle-jumper",
    category: "Bounce Houses",
    themes: ["Princess", "Castle", "Fantasy"],
    description:
      "A stunning castle-themed bounce house decorated with colorful towers and fun graphics. Features a large bouncing area, safety netting on all sides, easy-access entry ramp, and a basketball hoop inside. Our most popular rental for princess-themed parties! Cleaned and sanitized before every rental.",
    dimensions: "15ft x 15ft x 14ft",
    capacity: 6,
    ageRange: "2–12 years",
    setupTime: 30,
    price: 169,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Safety netting on all sides",
      "Easy-access entry ramp",
      "Interior basketball hoop",
      "Anchor stakes included",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "Maximum 5–6 kids of equal size. Adult supervision required at all times. Not suitable for adults.",
    colors: ["Pink", "Purple", "Yellow"],
  },

  {
    id: "castle-jumper-basic",
    companyId: "kidzz-star-jumpers",
    name: "Castle Jumper",
    slug: "castle-jumper",
    category: "Bounce Houses",
    themes: ["Castle", "Fantasy", "Adventure"],
    description:
      "Classic castle-themed bounce house — a reliable crowd-pleaser at any party. Features a spacious bounce area, safety netting on all four sides, and a built-in basketball hoop. Perfect for birthday parties, school events, and backyard celebrations. Great value for a traditional bounce house experience.",
    dimensions: "13ft x 13ft x 14ft",
    capacity: 6,
    ageRange: "2–12 years",
    setupTime: 25,
    price: 165,
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Safety netting on all sides",
      "Interior basketball hoop",
      "Easy entry ramp",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "Maximum 5–6 kids of equal size. Adult supervision required at all times.",
    colors: ["Pink", "Blue", "Yellow"],
  },

  {
    id: "castle-toddler",
    companyId: "kidzz-star-jumpers",
    name: "Castle Toddler Bounce House",
    slug: "castle-toddler-bounce-house",
    category: "Bounce Houses",
    themes: ["Castle", "Toddler", "Fun"],
    description:
      "Specially designed for the littlest bouncers! This compact toddler-safe bounce house has lower walls, soft interior padding, and a gentle bounce surface — ideal for ages 1–5. Perfect for toddler birthday parties or playgroups. Features include a safety ball pit area inside and easy visibility for supervising adults.",
    dimensions: "12ft x 12ft x 8ft",
    capacity: 6,
    ageRange: "1–5 years",
    setupTime: 20,
    price: 149,
    images: [
      "https://images.unsplash.com/photo-1566041510394-cf7c1b1eae6c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Toddler-safe low walls",
      "Soft interior padding",
      "Built-in ball pit area",
      "Easy adult supervision design",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "For ages 1–5 only. No children over 5. Always have an adult within arm's reach.",
    colors: ["Yellow", "Red", "Blue"],
  },

  {
    id: "disney-princess-large",
    companyId: "kidzz-star-jumpers",
    name: "Disney Princess 2-Jump (Large)",
    slug: "disney-princess-2-jump-large",
    category: "Bounce Houses",
    themes: ["Disney", "Princess", "Cinderella", "Ariel", "Belle"],
    description:
      "An extra-large bounce house with two separate bouncing chambers featuring full-color artwork of Cinderella, Ariel, Belle, Rapunzel, and more. The dual chambers allow kids of different ages to bounce safely. A dream come true for any little princess — this is our largest bounce house.",
    dimensions: "22ft x 15ft x 14ft",
    capacity: 12,
    ageRange: "2–12 years",
    setupTime: 45,
    price: 299,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Disney Princess themed artwork",
      "Dual bouncing chambers",
      "Large interior headroom (14ft)",
      "Integrated safety netting",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "Separate chambers for younger (2–5) and older (6–12) children recommended.",
    colors: ["Pink", "Blue", "Gold"],
  },

  {
    id: "razzle-dazzle-4in1",
    companyId: "kidzz-star-jumpers",
    name: "Razzle Dazzle 4-in-1 Combo",
    slug: "razzle-dazzle-4in1-combo",
    category: "Combos",
    themes: [
      "Princess",
      "Barbie",
      "Frozen",
      "Unicorn",
      "Hello Kitty",
      "Moana",
      "Disney",
      "My Little Pony",
    ],
    description:
      "The ultimate party combo! This 4-in-1 inflatable features a bounce area, climbing wall, slide, and obstacle section. Includes interchangeable themed banners — choose from Barbie, Hello Kitty, Tinkerbell, Moana, Dora, Sofia the First, Frozen, Little Mermaid, My Little Pony, Unicorn, and many more. One unit, endless themes!",
    dimensions: "20ft x 15ft x 14ft",
    capacity: 8,
    ageRange: "3–14 years",
    setupTime: 45,
    price: 249,
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "4-in-1: bounce, climb, slide, obstacle",
      "Interchangeable themed banners",
      "Commercial-grade vinyl",
      "Blower motor included",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "One person on the slide at a time. Maximum weight per climber 150 lbs.",
    colors: ["Multi-color", "Pink", "Purple"],
  },

  {
    id: "razzle-dazzle-4in1-wet",
    companyId: "kidzz-star-jumpers",
    name: "Razzle Dazzle 4-in-1 Combo (Wet)",
    slug: "razzle-dazzle-4in1-combo-wet",
    category: "Water Slides",
    themes: [
      "Princess",
      "Frozen",
      "Moana",
      "Disney",
      "Tropical",
      "Summer",
      "Unicorn",
    ],
    description:
      "Beat the heat with the water version of our beloved Razzle Dazzle 4-in-1 Combo! Features a wet slip-and-slide section in addition to the bounce area, climbing wall, and obstacle course. Includes interchangeable themed banners — Disney Princess, Frozen, Moana, Sofia the 1st, Little Mermaid, and more. Requires a water hose connection.",
    dimensions: "20ft x 15ft x 14ft",
    capacity: 6,
    ageRange: "3–14 years",
    setupTime: 50,
    price: 329,
    images: [
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Wet & dry play modes",
      "Interchangeable themed banners",
      "Slip-and-slide section",
      "Additional tie-down straps",
      "Safety handles throughout",
      "Connects to standard garden hose",
    ],
    safetyNotes:
      "One person on the slide at a time. Ages 3+ only. Wet surface — use caution when climbing.",
    colors: ["Multi-color", "Pink", "Blue"],
  },

  {
    id: "module-5in1-combo",
    companyId: "kidzz-star-jumpers",
    name: "Module 5-in-1 Combo",
    slug: "module-5in1-combo",
    category: "Combos",
    themes: ["Adventure", "Sports", "Jungle", "Multi"],
    description:
      "The all-in-one party solution! This massive 5-in-1 combo unit includes a bounce house, two slides, climbing wall, obstacle section, and basketball hoop inside. Available in multiple themes. Great for larger events where you want maximum entertainment value from a single unit.",
    dimensions: "25ft x 18ft x 16ft",
    capacity: 10,
    ageRange: "3–14 years",
    setupTime: 60,
    price: 349,
    images: [
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "5-in-1 entertainment",
      "Dual slides",
      "Interior basketball hoop",
      "Climbing wall",
      "Obstacle section",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "One child at a time on slides. No flipping or rough play. Adult supervision required.",
    colors: ["Blue", "Red", "Yellow", "Green"],
  },

  {
    id: "big-kahuna-slide-wet",
    companyId: "kidzz-star-jumpers",
    name: "The Big Kahuna Slide (Wet)",
    slug: "big-kahuna-slide-wet",
    category: "Water Slides",
    themes: ["Tropical", "Beach", "Summer", "Luau"],
    description:
      "Towering single-lane water slide — one of the most thrilling rides we offer! Kids climb up the safety-handle ladder and plunge down into the splash pool at the base. Decorated with tropical colors and graphics. Requires a garden hose connection to keep the surface wet and fast. A total showstopper at any summer party.",
    dimensions: "18ft tall x 10ft wide x 22ft long",
    capacity: 1,
    ageRange: "5–17 years",
    setupTime: 45,
    price: 389,
    images: [
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "18ft tall single-lane slide",
      "Built-in splash pool",
      "Safety climbing handles",
      "Additional tie-down straps",
      "Connects to standard garden hose",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "One rider at a time. Children under 5 not recommended. Must be able to exit splash pool unassisted.",
    colors: ["Green", "Blue", "Yellow"],
  },

  {
    id: "rampage-slide-wet",
    companyId: "kidzz-star-jumpers",
    name: "Rampage Slide (Wet)",
    slug: "rampage-slide-wet",
    category: "Water Slides",
    themes: ["Adventure", "Extreme", "Summer", "Beach"],
    description:
      "The Rampage delivers the ultimate adrenaline rush — our tallest and most extreme water slide! At 24 feet tall, riders fly down a long, steep lane into a massive splash pool below. Not for the faint of heart. This is the go-to centerpiece for a party that people will be talking about for years.",
    dimensions: "24ft tall x 12ft wide x 28ft long",
    capacity: 1,
    ageRange: "6–17 years",
    setupTime: 60,
    price: 479,
    images: [
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "24ft extreme water slide",
      "Large splash pool",
      "Heavy-duty safety handles",
      "Wide launching platform at top",
      "Connects to garden hose",
    ],
    safetyNotes:
      "Ages 6+ only. One rider at a time. Must be at least 48\" tall. No diving or jumping off sides.",
    colors: ["Blue", "Red", "Yellow"],
  },

  {
    id: "double-lane-slide-wet",
    companyId: "kidzz-star-jumpers",
    name: "24' Double Lane Slide (Wet)",
    slug: "24ft-double-lane-slide-wet",
    category: "Water Slides",
    themes: ["Summer", "Beach", "Racing", "Competition"],
    description:
      "Race your friends down this massive 24-foot dual-lane water slide! Two riders can compete side-by-side in this thrilling head-to-head racing slide. Features a wide launching platform at the top, safety handles all the way up, and a large shared splash pool at the bottom. Our biggest crowd-pleaser for summer parties.",
    dimensions: "24ft tall x 18ft wide x 28ft long",
    capacity: 2,
    ageRange: "6–17 years",
    setupTime: 60,
    price: 469,
    images: [
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Dual racing lanes",
      "24ft height",
      "Large shared splash pool",
      "Safety handles throughout",
      "Wide top platform",
      "Connects to garden hose",
    ],
    safetyNotes:
      "One rider per lane. Ages 6+ only. Must be 48\" tall. No pushing or roughhousing at launch.",
    colors: ["Blue", "Green"],
  },

  {
    id: "obstacle-course-50ft",
    companyId: "kidzz-star-jumpers",
    name: "50ft Obstacle Course",
    slug: "50ft-obstacle-course",
    category: "Obstacle Courses",
    themes: ["Sports", "Adventure", "Challenge", "Competition"],
    description:
      "Get the competitive energy going with this 50-foot inflatable obstacle course! Features pop-ups, crawl tunnels, climbing walls, and a slide finish. Perfect for group events, school carnivals, or corporate team-building. Two lanes allow head-to-head racing. A crowd favorite at every event!",
    dimensions: "50ft x 12ft x 12ft",
    capacity: 4,
    ageRange: "5–17 years",
    setupTime: 60,
    price: 449,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "50ft dual-lane racing",
      "Pop-up obstacles",
      "Crawl tunnels",
      "Climbing walls",
      "Slide finish",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "No pushing or shoving. Remove shoes before entering. Ages 5+ only.",
    colors: ["Blue", "Red", "Yellow"],
  },

  {
    id: "dunk-tank",
    companyId: "kidzz-star-jumpers",
    name: "Dunk Tank",
    slug: "dunk-tank",
    category: "Games",
    themes: ["Games", "Carnival", "Competition", "Summer"],
    description:
      "The classic party challenge! Our dunk tank holds 500 gallons of water for a massive splash. Sit on the seat and dare your friends to knock you in! Three balls are included and the tank comes in several themes. A huge hit at school carnivals, company picnics, and block parties. Requires 8ft width and 20ft throwing area.",
    dimensions: "8ft wide x 7ft tall (20ft throwing area needed)",
    capacity: 1,
    ageRange: "All ages",
    setupTime: 30,
    price: 499,
    images: [
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "500-gallon water tank",
      "3 throwing balls included",
      "Multiple theme options",
      "Easy fill & drain",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "Person in seat must be able to swim or wear a flotation device. Seat weight capacity 250 lbs. Supervise young children near open water.",
    colors: ["Blue", "White"],
  },

  {
    id: "popcorn-machine",
    companyId: "kidzz-star-jumpers",
    name: "Popcorn Machine",
    slug: "popcorn-machine",
    category: "Concessions",
    themes: ["Concessions", "Food", "Snacks"],
    description:
      "Classic commercial-grade popcorn machine rental. Makes fresh, delicious popcorn in minutes. Comes with 50 servings of popcorn supplies (kernels, oil, salt, and bags). Easy to operate — plug in and go! Great add-on for any party or event.",
    dimensions: "24in x 18in x 48in",
    capacity: 0,
    ageRange: "All ages",
    setupTime: 10,
    price: 79,
    images: [
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Commercial-grade machine",
      "50 servings included",
      "Easy plug-and-go operation",
      "Cleaned before rental",
    ],
    safetyNotes: "Keep away from flammable materials. Adult operation recommended.",
    colors: ["Red", "Chrome"],
  },

  {
    id: "cotton-candy-machine",
    companyId: "kidzz-star-jumpers",
    name: "Cotton Candy Machine",
    slug: "cotton-candy-machine",
    category: "Concessions",
    themes: ["Concessions", "Food", "Carnival", "Snacks"],
    description:
      "Spin up some sweet fun with a cotton candy machine rental! Includes 50 servings of cotton candy floss sugar in assorted flavors (pink vanilla, blue raspberry, and grape). The machine is easy to use and adds a carnival atmosphere to any party.",
    dimensions: "24in x 24in x 18in",
    capacity: 0,
    ageRange: "All ages",
    setupTime: 10,
    price: 79,
    images: [
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "50 servings included",
      "3 assorted flavors",
      "Easy operation",
      "Carnival atmosphere",
    ],
    safetyNotes:
      "Keep away from children under 3. Hot spinning element — adult operation only.",
    colors: ["Pink", "White"],
  },

  {
    id: "bbq-grill",
    companyId: "kidzz-star-jumpers",
    name: "BBQ Grill",
    slug: "bbq-grill",
    category: "Concessions",
    themes: ["Food", "BBQ", "Outdoor", "Events"],
    description:
      "Add some serious flavor to your event with a BBQ grill rental! Our large commercial-grade propane BBQ grill is perfect for feeding a crowd. Great for birthday parties, corporate picnics, and community events. Propane not included — pick up locally or ask about add-on bundles.",
    dimensions: "48in x 24in cooking surface",
    capacity: 0,
    ageRange: "All ages",
    setupTime: 15,
    price: 79,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Large commercial-grade grill",
      "Propane compatible",
      "Cleaned before rental",
      "Handles crowd-size cooking",
    ],
    safetyNotes:
      "Propane not included. Keep grill away from inflatables and flammable materials. Adult operation only.",
    colors: ["Black", "Silver"],
  },

  {
    id: "tent-10x10",
    companyId: "kidzz-star-jumpers",
    name: "10x10 Pop Up Tent",
    slug: "10x10-pop-up-tent",
    category: "Tents",
    themes: ["Shade", "Outdoor", "Events"],
    description:
      "Quick-setup 10x10 pop-up canopy tent — perfect for adding shade to any backyard party or event. Commercial-grade frame with white top. Easy to set up in minutes. Great for individual vendor booths, food stations, or small shaded areas.",
    dimensions: "10ft x 10ft",
    capacity: 10,
    ageRange: "All ages",
    setupTime: 15,
    price: 95,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Commercial-grade frame",
      "White canopy top",
      "Quick pop-up setup",
      "Stake-and-weight compatible",
    ],
    safetyNotes:
      "Do not use in winds over 25mph. Must be staked or weighted on all corners.",
    colors: ["White"],
  },

  {
    id: "tent-10x10-walls",
    companyId: "kidzz-star-jumpers",
    name: "10x10 Tent with Walls",
    slug: "10x10-tent-with-walls",
    category: "Tents",
    themes: ["Shade", "Outdoor", "Events"],
    description:
      "Our 10x10 pop-up tent with full sidewalls — ideal when you need shade AND wind/sun protection. The removable sidewalls can be attached on any combination of sides for maximum flexibility. Great for outdoor food service, vendor booths, or when you need a more enclosed private space.",
    dimensions: "10ft x 10ft",
    capacity: 10,
    ageRange: "All ages",
    setupTime: 20,
    price: 135,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Commercial-grade frame",
      "White canopy top",
      "Removable sidewalls (all 4 sides)",
      "Stake-and-weight compatible",
    ],
    safetyNotes:
      "Do not use in winds over 25mph. Must be staked or weighted on all corners.",
    colors: ["White"],
  },

  {
    id: "tent-10x20",
    companyId: "kidzz-star-jumpers",
    name: "10x20 Pop Up Tent",
    slug: "10x20-pop-up-tent",
    category: "Tents",
    themes: ["Shade", "Outdoor", "Events"],
    description:
      "Double the coverage with this 10x20 pop-up canopy tent. Perfect for larger seating areas, buffet setups, or long vendor rows. Commercial-grade frame with white top. Can comfortably shade up to 20 guests. Easy setup without tools.",
    dimensions: "10ft x 20ft",
    capacity: 20,
    ageRange: "All ages",
    setupTime: 25,
    price: 178,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Commercial-grade frame",
      "White canopy top",
      "Covers up to 20 guests",
      "Stake-and-weight compatible",
    ],
    safetyNotes:
      "Do not use in winds over 25mph. Must be staked or weighted on all corners.",
    colors: ["White"],
  },

  {
    id: "tent-10x30",
    companyId: "kidzz-star-jumpers",
    name: "10x30 Pop Up Tent",
    slug: "10x30-pop-up-tent",
    category: "Tents",
    themes: ["Shade", "Outdoor", "Events"],
    description:
      "Our largest pop-up canopy option — the 10x30 tent is perfect for large parties, outdoor receptions, and corporate events. Provides shade for 30+ guests. Commercial-grade aluminum frame with white top. Can be configured with optional sidewalls for added protection.",
    dimensions: "10ft x 30ft",
    capacity: 30,
    ageRange: "All ages",
    setupTime: 35,
    price: 269,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Commercial-grade aluminum frame",
      "White canopy top",
      "Covers 30+ guests",
      "Sidewalls available as add-on",
    ],
    safetyNotes:
      "Do not use in winds over 25mph. Must be staked or weighted on all corners.",
    colors: ["White"],
  },

  {
    id: "tent-20x20",
    companyId: "kidzz-star-jumpers",
    name: "20x20 Canopy Tent",
    slug: "20x20-canopy-tent",
    category: "Tents",
    themes: ["Shade", "Outdoor", "Events"],
    description:
      "Provide shade and shelter for your guests with this large 20x20 canopy tent. Commercial-grade frame with white top. Can accommodate up to 40 people. Great for backyard parties, school events, and corporate gatherings. Sides available upon request.",
    dimensions: "20ft x 20ft",
    capacity: 40,
    ageRange: "All ages",
    setupTime: 45,
    price: 199,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Commercial-grade frame",
      "White canopy top",
      "Fits up to 40 people",
      "Sidewalls available",
    ],
    safetyNotes:
      "Do not use in high winds over 25mph. Must be staked or weighted on all corners.",
    colors: ["White"],
  },

  {
    id: "tables-chairs-package",
    companyId: "kidzz-star-jumpers",
    name: "Tables & Chairs Package (10 Tables / 80 Chairs)",
    slug: "tables-chairs-package",
    category: "Tables & Chairs",
    themes: ["Events", "Party", "Seating"],
    description:
      "Our most popular seating package — 10 rectangular 6-foot folding tables and 80 matching folding chairs. Perfect for parties, school events, or corporate gatherings. Tables seat 8 comfortably. Chairs are durable plastic folding chairs in white or black. Smaller packages also available — contact us for custom quantities.",
    dimensions: "6ft tables, standard chairs",
    capacity: 80,
    ageRange: "All ages",
    setupTime: 30,
    price: 149,
    images: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "10 folding tables (6ft)",
      "80 folding chairs",
      "White or black chairs",
      "Clean and inspected",
    ],
    safetyNotes: "Max weight per chair 250 lbs. Do not stand on tables or chairs.",
    colors: ["White", "Black"],
  },

  // ─── BAY AREA BOUNCE ───────────────────────────────────────────────────────

  {
    id: "superhero-combo",
    companyId: "bay-area-bounce",
    name: "Superhero 4-in-1 Combo",
    slug: "superhero-4in1-combo",
    category: "Combos",
    themes: ["Superhero", "Marvel", "DC", "Spider-Man", "Batman"],
    description:
      "Every kid wants to be a superhero! This action-packed 4-in-1 combo features Spider-Man, Batman, and Avengers artwork throughout. Includes bounce area, climbing wall, two slides, and obstacle section. The ultimate combo for superhero fans of all ages.",
    dimensions: "22ft x 16ft x 15ft",
    capacity: 8,
    ageRange: "3–14 years",
    setupTime: 50,
    price: 279,
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566041510394-cf7c1b1eae6c?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Marvel & DC themed artwork",
      "4-in-1 entertainment",
      "Dual slides",
      "Interior obstacles",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes: "Maximum 8 children at one time. No rough play.",
    colors: ["Red", "Blue", "Black"],
  },

  {
    id: "jungle-safari-bounce",
    companyId: "bay-area-bounce",
    name: "Jungle Safari Bounce House",
    slug: "jungle-safari-bounce-house",
    category: "Bounce Houses",
    themes: ["Jungle", "Safari", "Animals", "Adventure"],
    description:
      "Go wild at your party with this Jungle Safari themed bounce house! Full of lions, giraffes, elephants, and zebras throughout. Features an extra-large bounce area, safety netting on all four sides, and a fun entry slide. Perfect for animal lovers and adventurous kids!",
    dimensions: "15ft x 15ft x 13ft",
    capacity: 6,
    ageRange: "2–12 years",
    setupTime: 30,
    price: 179,
    images: [
      "https://images.unsplash.com/photo-1566041510394-cf7c1b1eae6c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Jungle/animal themed artwork",
      "Extra-large bounce area",
      "Safety netting on all sides",
      "Built-in entry slide",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes: "Max 6 children. Remove shoes before entering.",
    colors: ["Green", "Brown", "Yellow"],
  },

  {
    id: "dual-water-slide-combo",
    companyId: "bay-area-bounce",
    name: "Dual Lane Water Slide Combo",
    slug: "dual-lane-water-slide-combo",
    category: "Water Slides",
    themes: ["Summer", "Beach", "Tropical", "Water Park"],
    description:
      "Double the fun with this dual-lane water slide! Two riders can race side-by-side down this 20-foot giant. Features a large splash pool at the bottom, safety handles all the way up, and a wide launching platform at the top. The most exciting water slide rental we offer!",
    dimensions: "20ft tall x 18ft wide x 22ft long",
    capacity: 2,
    ageRange: "5–17 years",
    setupTime: 60,
    price: 399,
    images: [
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Dual racing lanes",
      "20ft height",
      "Large splash pool",
      "Safety handles throughout",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "One rider per lane. Ages 5+ only. Children under 48\" height should be accompanied by an adult.",
    colors: ["Blue", "Green"],
  },

  {
    id: "rainbow-unicorn-bounce",
    companyId: "bay-area-bounce",
    name: "Rainbow Unicorn Bounce House",
    slug: "rainbow-unicorn-bounce-house",
    category: "Bounce Houses",
    themes: ["Unicorn", "Rainbow", "Fantasy", "Princess"],
    description:
      "Magical and colorful, this Rainbow Unicorn bounce house is a dream for any unicorn-loving kid! Bursting with vibrant rainbow colors and adorable unicorn graphics throughout. Features a large bounce area with safety netting on all sides and an easy-access entry ramp.",
    dimensions: "15ft x 15ft x 13ft",
    capacity: 6,
    ageRange: "2–12 years",
    setupTime: 30,
    price: 189,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Rainbow unicorn themed artwork",
      "Full safety netting",
      "Easy entry ramp",
      "Interior basketball hoop",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes: "Max 6 children. Remove shoes before entering.",
    colors: ["Pink", "Purple", "Rainbow"],
  },

  {
    id: "princess-castle-combo",
    companyId: "bay-area-bounce",
    name: "Princess Castle 4-in-1 Combo",
    slug: "princess-castle-4in1-combo",
    category: "Combos",
    themes: ["Princess", "Castle", "Disney", "Fantasy"],
    description:
      "The royal treatment for your little princess! This stunning castle-themed 4-in-1 combo features a bounce area, climbing wall, slide, and obstacle section adorned with princess and castle artwork. Perfect for birthdays, school events, and any occasion deserving a royal touch.",
    dimensions: "21ft x 15ft x 15ft",
    capacity: 8,
    ageRange: "3–12 years",
    setupTime: 45,
    price: 269,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Princess castle themed artwork",
      "4-in-1: bounce, climb, slide, obstacle",
      "Commercial-grade vinyl",
      "Blower motor included",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes: "One person on slide at a time. Max weight per climber 150 lbs.",
    colors: ["Pink", "Gold", "Purple"],
  },

  {
    id: "sports-arena-combo",
    companyId: "bay-area-bounce",
    name: "Sports Arena 4-in-1 Combo",
    slug: "sports-arena-4in1-combo",
    category: "Combos",
    themes: ["Sports", "Football", "Basketball", "Adventure"],
    description:
      "Perfect for the sports fanatic! This action-packed 4-in-1 combo is decked out in sports-themed graphics and features a bounce house, climbing wall, slide, and obstacle course. Great for sports team parties, school events, or any kid who loves the game.",
    dimensions: "22ft x 15ft x 14ft",
    capacity: 8,
    ageRange: "4–14 years",
    setupTime: 45,
    price: 289,
    images: [
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566041510394-cf7c1b1eae6c?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Sports themed artwork",
      "4-in-1 entertainment",
      "Dual slides",
      "Interior basketball hoop",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes: "One child at a time on slides. No rough play. Adult supervision required.",
    colors: ["Green", "Blue", "Red"],
  },

  {
    id: "giant-obstacle-course",
    companyId: "bay-area-bounce",
    name: "Giant Obstacle Course (40ft)",
    slug: "giant-obstacle-course-40ft",
    category: "Obstacle Courses",
    themes: ["Adventure", "Sports", "Challenge", "Competition"],
    description:
      "Race through this 40-foot inflatable obstacle course! Packed with crawl tunnels, pop-up pillars, a climbing wall, and a slide finish. Perfect for birthday parties, school carnivals, and any event where you want kids burning off energy. Watch the competition heat up as kids race to the finish!",
    dimensions: "40ft x 12ft x 12ft",
    capacity: 4,
    ageRange: "5–15 years",
    setupTime: 50,
    price: 399,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "40ft dual-lane course",
      "Crawl tunnels",
      "Pop-up obstacles",
      "Climbing wall",
      "Slide finish",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "No pushing or shoving inside. Remove shoes. Ages 5+ only.",
    colors: ["Blue", "Red", "Yellow"],
  },

  {
    id: "popcorn-cotton-candy-bundle",
    companyId: "bay-area-bounce",
    name: "Popcorn & Cotton Candy Bundle",
    slug: "popcorn-cotton-candy-bundle",
    category: "Concessions",
    themes: ["Concessions", "Carnival", "Food", "Snacks"],
    description:
      "Get two classic carnival treats in one convenient bundle! Rent both a commercial-grade popcorn machine and a cotton candy machine together at a bundled rate. Includes 50 servings of supplies for each machine. Add a carnival atmosphere to any party without the hassle of managing two separate rentals.",
    dimensions: "Approx 4ft x 4ft combined footprint",
    capacity: 0,
    ageRange: "All ages",
    setupTime: 15,
    price: 129,
    images: [
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Popcorn machine with 50 servings",
      "Cotton candy machine with 50 servings",
      "Assorted cotton candy flavors",
      "Both machines cleaned before rental",
    ],
    safetyNotes:
      "Hot elements on both machines — adult operation only. Keep away from children under 3.",
    colors: ["Red", "Pink", "White"],
  },

  // ─── BAY AREA BOUNCE (additional) ─────────────────────────────────────────

  {
    id: "bab-toddler-bounce",
    companyId: "bay-area-bounce",
    name: "Toddler Bounce House",
    slug: "toddler-bounce-house-bab",
    category: "Bounce Houses",
    themes: ["Toddler", "Animals", "Farm", "Fun"],
    description:
      "Designed just for little ones! This compact, low-profile toddler bounce house features bright farm animal graphics, soft interior walls, and a gentle bounce surface safe for children ages 1–5. Lower walls mean easy visibility for supervising adults. The perfect centerpiece for a toddler birthday party.",
    dimensions: "12ft x 12ft x 8ft",
    capacity: 6,
    ageRange: "1–5 years",
    setupTime: 20,
    price: 159,
    images: [
      "https://images.unsplash.com/photo-1566041510394-cf7c1b1eae6c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Toddler-safe low walls",
      "Soft interior padding",
      "Farm animal themed artwork",
      "Easy adult supervision design",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "For ages 1–5 only. No children over 5. Always have an adult within arm's reach.",
    colors: ["Yellow", "Green", "Red"],
  },

  {
    id: "bab-pirate-ship",
    companyId: "bay-area-bounce",
    name: "Pirate Ship Bounce House",
    slug: "pirate-ship-bounce-house",
    category: "Bounce Houses",
    themes: ["Pirate", "Adventure", "Ocean", "Treasure"],
    description:
      "Ahoy, mateys! This swashbuckling Pirate Ship bounce house is a showstopper at any party. The ship-shaped inflatable features pirate graphics, cannons, and ocean waves. Includes a large bounce area, safety netting on all sides, and an interior basketball hoop. Perfect for adventurous kids who dream of sailing the seven seas!",
    dimensions: "18ft x 15ft x 14ft",
    capacity: 8,
    ageRange: "3–14 years",
    setupTime: 35,
    price: 199,
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566041510394-cf7c1b1eae6c?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Pirate ship themed design",
      "Interior basketball hoop",
      "Safety netting on all sides",
      "Easy entry ramp",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes: "Max 8 children. No rough play. Remove shoes before entering.",
    colors: ["Brown", "Black", "Blue"],
  },

  {
    id: "bab-tropical-water-slide",
    companyId: "bay-area-bounce",
    name: "Tropical Water Slide (18ft)",
    slug: "tropical-water-slide-18ft",
    category: "Water Slides",
    themes: ["Tropical", "Beach", "Summer", "Luau"],
    description:
      "Bring the beach to your backyard with this 18-foot tropical water slide! Kids climb the safety-handle ladder and plunge down into the splash pool at the bottom. Decorated with tropical palms and vibrant colors. Connects to a standard garden hose. A must-have for summer birthday parties in the South Bay.",
    dimensions: "18ft tall x 10ft wide x 20ft long",
    capacity: 1,
    ageRange: "5–17 years",
    setupTime: 45,
    price: 379,
    images: [
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "18ft tall single-lane slide",
      "Built-in splash pool",
      "Safety climbing handles",
      "Tropical themed artwork",
      "Connects to garden hose",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "One rider at a time. Children under 5 not permitted. Must be able to exit splash pool unassisted.",
    colors: ["Green", "Yellow", "Blue"],
  },

  {
    id: "bab-wet-dry-combo",
    companyId: "bay-area-bounce",
    name: "Adventure Wet/Dry Combo",
    slug: "adventure-wet-dry-combo",
    category: "Combos",
    themes: ["Adventure", "Summer", "Water Park", "Sports"],
    description:
      "The ultimate summer combo! This 4-in-1 unit works both wet (water slide mode) and dry (standard bounce mode). Features a bounce area, climbing wall, obstacle section, and a large slide with a splash pool. Switch between wet and dry modes depending on the weather. The perfect all-in-one party solution.",
    dimensions: "22ft x 16ft x 14ft",
    capacity: 8,
    ageRange: "3–14 years",
    setupTime: 50,
    price: 369,
    images: [
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Works wet or dry",
      "4-in-1 activities",
      "Large splash pool (wet mode)",
      "Climbing wall",
      "Obstacle section",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "In wet mode: one rider at a time on slide. Ages 3+ only. Adult supervision required at all times.",
    colors: ["Blue", "Green", "Red"],
  },

  {
    id: "bab-dunk-tank",
    companyId: "bay-area-bounce",
    name: "Dunk Tank",
    slug: "dunk-tank-bab",
    category: "Games",
    themes: ["Games", "Carnival", "Competition", "Summer", "Corporate"],
    description:
      "The crowd favorite at any event! Our 500-gallon dunk tank delivers big laughs and big splashes. Dare your boss, teacher, or friends to sit in the hot seat — then let the balls fly! Includes 3 throwing balls. A hit at school carnivals, company picnics, and block parties. Requires 8ft width and 20ft throwing area.",
    dimensions: "8ft wide x 7ft tall (20ft throwing area)",
    capacity: 1,
    ageRange: "All ages",
    setupTime: 30,
    price: 469,
    images: [
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "500-gallon water tank",
      "3 throwing balls included",
      "Easy fill & drain valve",
      "Powder-coated steel frame",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "Person in seat must be a strong swimmer or wear flotation device. Seat weight limit 250 lbs. Supervise young children near open water.",
    colors: ["Blue", "White"],
  },

  {
    id: "bab-snow-cone-machine",
    companyId: "bay-area-bounce",
    name: "Snow Cone Machine",
    slug: "snow-cone-machine-bab",
    category: "Concessions",
    themes: ["Concessions", "Food", "Carnival", "Summer"],
    description:
      "Keep guests cool with freshly shaved snow cones! Our commercial-grade snow cone machine comes with 50 servings of flavored syrups in assorted flavors: cherry, grape, blue raspberry, watermelon, and lemon-lime. Easy to operate and a huge hit on hot summer days. Great add-on with any bounce house or water slide rental.",
    dimensions: "18in x 18in x 36in",
    capacity: 0,
    ageRange: "All ages",
    setupTime: 10,
    price: 69,
    images: [
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Commercial-grade shaved ice machine",
      "50 servings included",
      "5 assorted flavors",
      "Cups and spoon-straws included",
      "Cleaned before rental",
    ],
    safetyNotes:
      "Keep machine away from water and flammable materials. Adult operation recommended. Blade is sharp — keep children away from the ice chamber.",
    colors: ["Red", "White"],
  },

  {
    id: "bab-popcorn-machine",
    companyId: "bay-area-bounce",
    name: "Popcorn Machine",
    slug: "popcorn-machine-bab",
    category: "Concessions",
    themes: ["Concessions", "Food", "Carnival", "Snacks"],
    description:
      "Add the smell and taste of fresh popcorn to your event! Our commercial-grade 8oz kettle popcorn machine makes delicious, buttery popcorn in minutes. Comes with 50 servings of all-in-one popcorn kits (kernels, oil, and seasoning pre-packaged). Plug in and serve within 5 minutes. Pairs great with a dunk tank or cotton candy machine.",
    dimensions: "24in x 18in x 48in",
    capacity: 0,
    ageRange: "All ages",
    setupTime: 10,
    price: 79,
    images: [
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Commercial-grade 8oz kettle",
      "50 servings included",
      "Bags included",
      "Easy plug-and-go operation",
      "Cleaned before rental",
    ],
    safetyNotes:
      "Keep away from flammable materials. Kettle becomes very hot — adult operation only. Do not leave unattended.",
    colors: ["Red", "Chrome"],
  },

  {
    id: "bab-tent-10x10",
    companyId: "bay-area-bounce",
    name: "10x10 Pop Up Tent",
    slug: "10x10-pop-up-tent-bab",
    category: "Tents",
    themes: ["Shade", "Outdoor", "Events"],
    description:
      "Keep guests comfortable in the shade with this quick-setup 10x10 pop-up canopy tent. Commercial-grade frame with white canopy top. Sets up in minutes without any tools. Great for individual vendor booths, food stations, or shaded rest areas. Can be combined with sidewalls for added wind and sun protection.",
    dimensions: "10ft x 10ft",
    capacity: 10,
    ageRange: "All ages",
    setupTime: 15,
    price: 89,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Commercial-grade frame",
      "White canopy top",
      "Quick pop-up setup",
      "Stake and weight compatible",
    ],
    safetyNotes:
      "Do not use in winds over 25mph. Must be staked or weighted on all corners.",
    colors: ["White"],
  },

  {
    id: "bab-tent-20x20",
    companyId: "bay-area-bounce",
    name: "20x20 Canopy Tent",
    slug: "20x20-canopy-tent-bab",
    category: "Tents",
    themes: ["Shade", "Outdoor", "Events", "Party"],
    description:
      "Provide shade and shelter for up to 40 guests with this spacious 20x20 canopy tent. Perfect for backyard parties, outdoor receptions, school events, and corporate gatherings. Commercial-grade frame with white canopy top. Sidewalls available upon request for additional wind and sun protection.",
    dimensions: "20ft x 20ft",
    capacity: 40,
    ageRange: "All ages",
    setupTime: 45,
    price: 199,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Commercial-grade frame",
      "White canopy top",
      "Fits up to 40 people",
      "Sidewalls available",
    ],
    safetyNotes:
      "Do not use in winds over 25mph. Must be staked or weighted on all corners.",
    colors: ["White"],
  },

  {
    id: "bab-tables-chairs",
    companyId: "bay-area-bounce",
    name: "Tables & Chairs Package (8 Tables / 64 Chairs)",
    slug: "tables-chairs-package-bab",
    category: "Tables & Chairs",
    themes: ["Events", "Party", "Seating"],
    description:
      "Everything you need to seat your guests! This package includes 8 folding 6-foot rectangular tables and 64 matching folding chairs — perfect for parties up to 64 people. Tables seat 8 comfortably. Chairs are sturdy white plastic folding chairs. Bundle with a tent for the complete outdoor setup. Contact us for custom quantities.",
    dimensions: "6ft tables, standard chairs",
    capacity: 64,
    ageRange: "All ages",
    setupTime: 30,
    price: 139,
    images: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "8 folding tables (6ft)",
      "64 folding chairs",
      "White chairs",
      "Clean and inspected",
    ],
    safetyNotes: "Max weight per chair 250 lbs. Do not stand on tables or chairs.",
    colors: ["White"],
  },

  // ─── ASTRO JUMP NORTH BAY ──────────────────────────────────────────────────

  {
    id: "space-adventure-combo",
    companyId: "astro-jump-north-bay",
    name: "Space Adventure 5-in-1 Combo",
    slug: "space-adventure-5in1-combo",
    category: "Combos",
    themes: ["Space", "Astronaut", "Galaxy", "Science"],
    description:
      "Blast off to fun with this out-of-this-world space-themed combo! Featuring planets, rockets, and astronaut graphics throughout. Includes a bounce house, two slides, climbing wall, and obstacle zone. Perfect for STEM-themed parties or any kid who dreams of space!",
    dimensions: "24ft x 16ft x 15ft",
    capacity: 10,
    ageRange: "3–15 years",
    setupTime: 60,
    price: 379,
    images: [
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Space/galaxy themed artwork",
      "5 activity zones",
      "Dual slides",
      "Climbing wall",
      "Delivery and setup included",
    ],
    safetyNotes: "Adult supervision required at all times. Max 10 children.",
    colors: ["Dark Blue", "Purple", "Silver"],
  },

  {
    id: "dinosaur-bounce",
    companyId: "astro-jump-north-bay",
    name: "Dinosaur Bounce House",
    slug: "dinosaur-bounce-house",
    category: "Bounce Houses",
    themes: ["Dinosaur", "Jurassic", "Adventure", "T-Rex"],
    description:
      "ROAR into party time with this Jurassic-themed bounce house! Featuring T-Rex, Triceratops, Brachiosaurus, and Velociraptor graphics in bold, eye-catching colors. Huge bounce area with an interior basketball hoop. Kids will feel like they've stepped into a prehistoric adventure. Serving Novato, San Anselmo, San Francisco, and all of Marin County.",
    dimensions: "16ft x 16ft x 14ft",
    capacity: 8,
    ageRange: "2–12 years",
    setupTime: 35,
    price: 189,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566041510394-cf7c1b1eae6c?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Bold dinosaur themed artwork",
      "Interior basketball hoop",
      "Extra-large bounce area",
      "Safety mesh windows",
      "Delivery and setup included",
    ],
    safetyNotes:
      "Max 8 children. Do not allow children to jump into each other.",
    colors: ["Green", "Brown", "Orange"],
  },

  {
    id: "giant-slip-slide",
    companyId: "astro-jump-north-bay",
    name: "Giant Slip & Slide (40ft)",
    slug: "giant-slip-and-slide-40ft",
    category: "Water Slides",
    themes: ["Summer", "Water", "Outdoor", "Fun"],
    description:
      "The classic Slip & Slide, supersized! This 40-foot inflatable slip and slide is the perfect summer party centerpiece. Kids (and adults!) run and slide the full length into a splash pool. Features a continuous sprinkler strip to keep the surface wet and fast. Available throughout Marin, Sonoma, and San Francisco.",
    dimensions: "40ft long x 8ft wide",
    capacity: 1,
    ageRange: "4–17 years",
    setupTime: 30,
    price: 249,
    images: [
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "40ft giant slide",
      "Continuous sprinkler strip",
      "Inflatable splash pool",
      "Delivery and setup included",
    ],
    safetyNotes:
      "One rider at a time. Run straight — no diving. Remove all jewelry and sharp objects.",
    colors: ["Blue", "Yellow"],
  },

  {
    id: "disney-frozen-junior",
    companyId: "astro-jump-north-bay",
    name: "Disney Frozen Bounce House",
    slug: "disney-frozen-bounce-house",
    category: "Bounce Houses",
    themes: ["Disney", "Frozen", "Elsa", "Anna", "Princess"],
    description:
      "Do your kids love Frozen? Open up the backyard to all of your children's friends with this amazing Disney Frozen Bounce House featuring Elsa, Anna, and the whole Arendelle crew! Part of the Astro Jump Junior Jumpy collection — perfectly sized for birthday parties and backyard fun in Marin and Sonoma County.",
    dimensions: "13ft x 13ft x 11ft",
    capacity: 6,
    ageRange: "2–10 years",
    setupTime: 25,
    price: 149,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Official Disney Frozen artwork",
      "Full safety netting",
      "Junior Jumpy collection",
      "Delivery and setup included",
      "Cleaned & sanitized before every rental",
    ],
    safetyNotes:
      "Max 6 children. Adults not permitted. Always have an adult supervising.",
    colors: ["Blue", "White", "Purple"],
  },

  {
    id: "princess-palace-playground",
    companyId: "astro-jump-north-bay",
    name: "Princess Palace Playground",
    slug: "princess-palace-playground",
    category: "Combos",
    themes: ["Princess", "Castle", "Fantasy", "Toddler"],
    description:
      "This fun and beautiful Princess Palace Playground will make your little princess's eyes light up! With plenty of room to jump and a variety of other activities inside, your child and guests will never want to stop playing. Designed for children 5 and younger — a safe, age-appropriate wonderland. Pair it with a cotton candy machine for the perfect party package!",
    dimensions: "16ft x 14ft x 12ft",
    capacity: 8,
    ageRange: "1–5 years",
    setupTime: 35,
    price: 199,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Princess palace themed artwork",
      "Designed for ages 5 and under",
      "Multiple activity zones inside",
      "Full safety netting",
      "Delivery and setup included",
    ],
    safetyNotes:
      "For ages 1–5 only. No children over 5. Adult must supervise at all times.",
    colors: ["Pink", "Gold", "Purple"],
  },

  {
    id: "royal-princess-carriage",
    companyId: "astro-jump-north-bay",
    name: "Royal Princess Carriage Combo",
    slug: "royal-princess-carriage-combo",
    category: "Combos",
    themes: [
      "Princess",
      "Cinderella",
      "Belle",
      "Ariel",
      "Aurora",
      "Snow White",
      "Disney",
    ],
    description:
      "The most iconic princess rental in our fleet! This carriage-shaped combo is perfect for any princess party, featuring original Disney Princesses — Cinderella, Belle (Beauty & the Beast), Aurora (Sleeping Beauty), Snow White, Ariel (Little Mermaid) — plus newer favorites like Tiana, Rapunzel, Merida, and Sofia the 1st. Includes a bounce area, slide, and obstacle activities.",
    dimensions: "20ft x 14ft x 14ft",
    capacity: 8,
    ageRange: "3–12 years",
    setupTime: 45,
    price: 259,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Carriage-shaped design",
      "All major Disney Princesses featured",
      "Bounce area + slide + activities",
      "Full safety netting",
      "Delivery and setup included",
    ],
    safetyNotes: "One person on the slide at a time. Max 8 children. No rough play.",
    colors: ["Pink", "Gold", "White"],
  },

  {
    id: "robots-jump",
    companyId: "astro-jump-north-bay",
    name: "Robots Jump Bounce House",
    slug: "robots-jump-bounce-house",
    category: "Bounce Houses",
    themes: ["Robots", "Science", "Space", "Transformers", "Sci-Fi"],
    description:
      "Perfect for young ones who love robots, Star Wars, and Transformers! This eye-catching Robots Jump bounce house features colorful robot and sci-fi graphics throughout. A large bounce area with safety netting on all sides and an interior basketball hoop. A great unique theme that stands out at any party!",
    dimensions: "15ft x 15ft x 12ft",
    capacity: 6,
    ageRange: "2–12 years",
    setupTime: 30,
    price: 169,
    images: [
      "https://images.unsplash.com/photo-1566041510394-cf7c1b1eae6c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Robot/sci-fi themed artwork",
      "Interior basketball hoop",
      "Safety netting on all sides",
      "Entry ramp",
      "Delivery and setup included",
    ],
    safetyNotes: "Max 6 children. Remove shoes before entering. Adult supervision required.",
    colors: ["Blue", "Silver", "Red"],
  },

  {
    id: "hello-kitty-junior",
    companyId: "astro-jump-north-bay",
    name: "Hello Kitty Junior Bounce House",
    slug: "hello-kitty-junior-bounce-house",
    category: "Bounce Houses",
    themes: ["Hello Kitty", "Kawaii", "Pink", "Princess"],
    description:
      "Adorable Hello Kitty-themed bounce house — part of the Astro Jump Junior Jumpy collection. Perfectly sized for smaller backyard spaces, this cute jumper features Hello Kitty graphics all around. Great for preschool and early elementary birthday parties in San Francisco, Marin, and Sonoma County.",
    dimensions: "13ft x 13ft x 11ft",
    capacity: 6,
    ageRange: "2–10 years",
    setupTime: 25,
    price: 149,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566041510394-cf7c1b1eae6c?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Hello Kitty themed artwork",
      "Junior Jumpy collection",
      "Full safety netting",
      "Compact size for smaller yards",
      "Delivery and setup included",
    ],
    safetyNotes:
      "Max 6 children. No adults permitted. Always supervise children.",
    colors: ["Pink", "White", "Red"],
  },

  {
    id: "elmo-junior-bounce",
    companyId: "astro-jump-north-bay",
    name: "Elmo & Friends Junior Bounce House",
    slug: "elmo-friends-junior-bounce-house",
    category: "Bounce Houses",
    themes: ["Sesame Street", "Elmo", "Toddler", "Fun"],
    description:
      "Elmo and his Sesame Street friends are here to party! This charming Junior Jumpy bounce house features Elmo, Big Bird, Cookie Monster, and more. A perfect choice for toddlers and young children who love Sesame Street. Available throughout Marin, Sonoma, and San Francisco for backyard birthdays and celebrations.",
    dimensions: "13ft x 13ft x 11ft",
    capacity: 6,
    ageRange: "2–8 years",
    setupTime: 25,
    price: 149,
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Sesame Street / Elmo themed artwork",
      "Junior Jumpy collection",
      "Full safety netting",
      "Toddler-friendly design",
      "Delivery and setup included",
    ],
    safetyNotes:
      "For ages 2–8 only. Always have an adult supervising nearby.",
    colors: ["Red", "Yellow", "Blue"],
  },

  // ─── ASTRO JUMP NORTH BAY (additional) ────────────────────────────────────

  {
    id: "astro-pirates-combo",
    companyId: "astro-jump-north-bay",
    name: "Pirate Ship Adventure Combo",
    slug: "pirate-ship-adventure-combo",
    category: "Combos",
    themes: ["Pirate", "Adventure", "Ocean", "Treasure"],
    description:
      "Set sail for adventure with this massive Pirate Ship Combo! One of Astro Jump's most beloved units, featuring a bounce area shaped like a pirate ship, climbing wall, two slides, and obstacle zone. Spectacular pirate and ocean graphics throughout. Available throughout Marin, Sonoma, and San Francisco — full setup included in delivery.",
    dimensions: "22ft x 16ft x 16ft",
    capacity: 10,
    ageRange: "3–14 years",
    setupTime: 50,
    price: 339,
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Pirate ship themed design",
      "Dual slides",
      "Climbing wall",
      "Obstacle zone",
      "Delivery and setup included",
    ],
    safetyNotes:
      "One person on slide at a time. Max 10 children. No rough play.",
    colors: ["Brown", "Black", "Blue"],
  },

  {
    id: "astro-teen-giant-water-slide",
    companyId: "astro-jump-north-bay",
    name: "Giant Water Slide (20ft)",
    slug: "giant-water-slide-20ft-astro",
    category: "Water Slides",
    themes: ["Summer", "Water Park", "Extreme", "Beach"],
    description:
      "Take summer to the next level with this 20-foot giant water slide! A single-lane straight drop delivers serious speed right into the splash pool below. Safety handles all the way up and a wide launching platform at the top. Connects to a standard garden hose. Serving Marin, Sonoma, and San Francisco — delivery and full setup included.",
    dimensions: "20ft tall x 10ft wide x 24ft long",
    capacity: 1,
    ageRange: "6–17 years",
    setupTime: 45,
    price: 349,
    images: [
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "20ft single-lane slide",
      "Large splash pool",
      "Safety handles throughout",
      "Wide launch platform",
      "Connects to garden hose",
      "Delivery and setup included",
    ],
    safetyNotes:
      "Ages 6+ only. Must be at least 46\" tall. One rider at a time. No diving.",
    colors: ["Blue", "Green", "Yellow"],
  },

  {
    id: "astro-obstacle-course",
    companyId: "astro-jump-north-bay",
    name: "Obstacle Course (35ft)",
    slug: "obstacle-course-35ft-astro",
    category: "Obstacle Courses",
    themes: ["Adventure", "Sports", "Challenge", "Competition"],
    description:
      "Get the competitive energy flowing with this 35-foot inflatable obstacle course! Packed with crawl tunnels, pop-up pillars, climbing walls, and a slide finish. Two side-by-side lanes allow head-to-head racing. A crowd favorite at birthday parties, school carnivals, and community events throughout Marin and Sonoma County. Setup included.",
    dimensions: "35ft x 12ft x 12ft",
    capacity: 4,
    ageRange: "5–17 years",
    setupTime: 55,
    price: 419,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "35ft dual-lane racing course",
      "Crawl tunnels",
      "Pop-up obstacles",
      "Climbing walls",
      "Slide finish",
      "Delivery and setup included",
    ],
    safetyNotes:
      "No pushing inside the course. Remove shoes before entering. Ages 5+ only.",
    colors: ["Blue", "Red", "Yellow"],
  },

  {
    id: "astro-dunk-tank",
    companyId: "astro-jump-north-bay",
    name: "Dunk Tank",
    slug: "dunk-tank-astro",
    category: "Games",
    themes: ["Games", "Carnival", "Competition", "Summer"],
    description:
      "The classic party crowd-pleaser! Our heavy-duty 500-gallon dunk tank brings the laughs to any event. Sit on the dunk seat and challenge friends to knock you in! Includes 3 throwing balls and easy fill/drain operation. Great for school carnivals, company picnics, and block parties across Marin, Sonoma, and San Francisco.",
    dimensions: "8ft wide x 7ft tall (20ft throwing area needed)",
    capacity: 1,
    ageRange: "All ages",
    setupTime: 30,
    price: 499,
    images: [
      "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "500-gallon water tank",
      "3 throwing balls included",
      "Easy fill & drain",
      "Powder-coated steel frame",
      "Delivery and setup included",
    ],
    safetyNotes:
      "Person in seat must be a confident swimmer. Seat weight limit 250 lbs. Always supervise children near open water.",
    colors: ["Blue", "White"],
  },

  {
    id: "astro-snow-cone",
    companyId: "astro-jump-north-bay",
    name: "Snow Cone Machine",
    slug: "snow-cone-machine-astro",
    category: "Concessions",
    themes: ["Concessions", "Food", "Carnival", "Summer"],
    description:
      "A perfect add-on for any summer party! Our commercial snow cone machine shaves ice into fluffy, light cones in seconds. Comes with 50 servings of syrups in cherry, grape, blue raspberry, and watermelon flavors — cups and spoon-straws included. Pairs beautifully with any bounce house or water slide rental.",
    dimensions: "18in x 18in x 36in",
    capacity: 0,
    ageRange: "All ages",
    setupTime: 10,
    price: 75,
    images: [
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Commercial-grade shaved ice machine",
      "50 servings included",
      "4 assorted flavors",
      "Cups and spoon-straws included",
      "Delivery included",
    ],
    safetyNotes:
      "Adult operation only. Keep away from children — internal blade is sharp. Do not use near water.",
    colors: ["Red", "White"],
  },

  {
    id: "astro-popcorn",
    companyId: "astro-jump-north-bay",
    name: "Popcorn Machine",
    slug: "popcorn-machine-astro",
    category: "Concessions",
    themes: ["Concessions", "Food", "Carnival", "Snacks"],
    description:
      "Add the smell of fresh popcorn to your next event! Our commercial-grade 8oz kettle popcorn machine pops up to 25 cups per batch and is ready to serve in minutes. Comes with 50 pre-measured all-in-one popcorn kits — just pour and pop! Easy plug-and-go operation. Popular add-on for birthday parties and school events throughout the North Bay.",
    dimensions: "24in x 18in x 48in",
    capacity: 0,
    ageRange: "All ages",
    setupTime: 10,
    price: 79,
    images: [
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Commercial-grade 8oz kettle",
      "50 servings included",
      "Bags included",
      "Easy plug-and-go operation",
      "Delivery included",
    ],
    safetyNotes:
      "Kettle reaches high temperatures — adult operation only. Keep children away from the kettle. Do not leave unattended while in use.",
    colors: ["Red", "Chrome"],
  },

  {
    id: "astro-tent-20x20",
    companyId: "astro-jump-north-bay",
    name: "20x20 Party Tent",
    slug: "20x20-party-tent-astro",
    category: "Tents",
    themes: ["Shade", "Outdoor", "Events"],
    description:
      "Keep guests comfortable and shaded with this large 20x20 party tent. Commercial-grade frame with white canopy top — fits up to 40 guests comfortably. Perfect for outdoor birthday parties, community events, and gatherings across Marin and Sonoma County. Delivery and setup included. Sidewalls available as an add-on.",
    dimensions: "20ft x 20ft",
    capacity: 40,
    ageRange: "All ages",
    setupTime: 45,
    price: 209,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Commercial-grade frame",
      "White canopy top",
      "Fits up to 40 guests",
      "Sidewalls available",
      "Delivery and setup included",
    ],
    safetyNotes:
      "Do not use in winds over 25mph. Must be staked or weighted on all corners.",
    colors: ["White"],
  },

  {
    id: "astro-tent-10x10",
    companyId: "astro-jump-north-bay",
    name: "10x10 Pop Up Tent",
    slug: "10x10-pop-up-tent-astro",
    category: "Tents",
    themes: ["Shade", "Outdoor", "Events"],
    description:
      "Add a shaded spot to any outdoor event with this quick-setup 10x10 pop-up canopy. Commercial-grade aluminum frame with white top. Sets up in minutes without tools. Great for food stations, vendor booths, or seating areas at backyard parties. Available throughout the North Bay area with delivery included.",
    dimensions: "10ft x 10ft",
    capacity: 10,
    ageRange: "All ages",
    setupTime: 15,
    price: 95,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "Commercial-grade aluminum frame",
      "White canopy top",
      "Quick pop-up setup",
      "Stake and weight compatible",
      "Delivery included",
    ],
    safetyNotes:
      "Do not use in winds over 25mph. Must be staked or weighted on all corners.",
    colors: ["White"],
  },

  {
    id: "astro-tables-chairs",
    companyId: "astro-jump-north-bay",
    name: "Tables & Chairs Package (8 Tables / 64 Chairs)",
    slug: "tables-chairs-package-astro",
    category: "Tables & Chairs",
    themes: ["Events", "Party", "Seating"],
    description:
      "Complete your outdoor event setup with this 8-table, 64-chair package. Includes 8 folding 6-foot rectangular tables and 64 sturdy white folding chairs. Seats up to 64 guests comfortably — perfect for birthday parties, community events, and family gatherings in Marin and Sonoma County. Bundle with a tent for the perfect outdoor setup. Delivery and pickup included.",
    dimensions: "6ft tables, standard chairs",
    capacity: 64,
    ageRange: "All ages",
    setupTime: 30,
    price: 149,
    images: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
    ],
    available: true,
    features: [
      "8 folding tables (6ft)",
      "64 folding chairs",
      "White chairs",
      "Clean and inspected",
      "Delivery and pickup included",
    ],
    safetyNotes: "Max weight per chair 250 lbs. Do not stand on tables or chairs.",
    colors: ["White"],
  },
];

export function getCompanyById(id: string): Company | undefined {
  return companies.find((c) => c.id === id);
}

export function getItemById(id: string): RentalItem | undefined {
  return rentalItems.find((i) => i.id === id);
}

export function getItemsByCompany(companyId: string): RentalItem[] {
  return rentalItems.filter((i) => i.companyId === companyId);
}

export function searchItems(query: string): RentalItem[] {
  const q = query.toLowerCase();
  return rentalItems.filter(
    (i) =>
      i.name.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.themes.some((t) => t.toLowerCase().includes(q)) ||
      i.category.toLowerCase().includes(q) ||
      i.colors.some((c) => c.toLowerCase().includes(q))
  );
}

/**
 * Returns items from OTHER companies in the same category as the given item.
 */
export function getSimilarItemsFromOtherCompanies(item: RentalItem, limit = 3): RentalItem[] {
  return rentalItems
    .filter((i) => i.category === item.category && i.companyId !== item.companyId && i.available)
    .slice(0, limit);
}

/**
 * Returns complementary items from the SAME company (accessories, concessions, tables, tents, games).
 * Prioritises non-inflatable support categories so the suggestions feel useful.
 */
const COMPLEMENT_CATEGORIES = ["Concessions", "Tables & Chairs", "Tents", "Games", "Accessories"];
export function getComplementaryItems(item: RentalItem, limit = 4): RentalItem[] {
  const sameCompany = rentalItems.filter(
    (i) => i.companyId === item.companyId && i.id !== item.id && i.available
  );
  // Sort: complement categories first, then everything else
  sameCompany.sort((a, b) => {
    const aComp = COMPLEMENT_CATEGORIES.includes(a.category) ? 0 : 1;
    const bComp = COMPLEMENT_CATEGORIES.includes(b.category) ? 0 : 1;
    return aComp - bComp;
  });
  return sameCompany.slice(0, limit);
}

/**
 * Returns companies whose serviceArea includes the given city/zip string.
 * Matching is case-insensitive and checks if the input is contained in any
 * service area entry (so "palo alto" matches "East Palo Alto" and "Palo Alto").
 */
export function getCompaniesByLocation(cityOrZip: string): Company[] {
  const q = cityOrZip.toLowerCase().trim();
  if (!q) return companies;
  return companies.filter((c) =>
    c.serviceArea.some(
      (area) =>
        area.toLowerCase().includes(q) || q.includes(area.toLowerCase())
    )
  );
}

/**
 * Returns items available in a given city/zip, limited to companies that
 * serve that location.
 */
export function getItemsByLocation(cityOrZip: string): RentalItem[] {
  const servingCompanies = getCompaniesByLocation(cityOrZip).map((c) => c.id);
  return rentalItems.filter((i) => servingCompanies.includes(i.companyId));
}

export const categories = [
  {
    name: "Bounce Houses",
    icon: "🏰",
    count: rentalItems.filter((i) => i.category === "Bounce Houses").length,
  },
  {
    name: "Water Slides",
    icon: "💦",
    count: rentalItems.filter((i) => i.category === "Water Slides").length,
  },
  {
    name: "Combos",
    icon: "⭐",
    count: rentalItems.filter((i) => i.category === "Combos").length,
  },
  {
    name: "Obstacle Courses",
    icon: "🏃",
    count: rentalItems.filter((i) => i.category === "Obstacle Courses").length,
  },
  {
    name: "Concessions",
    icon: "🍿",
    count: rentalItems.filter((i) => i.category === "Concessions").length,
  },
  {
    name: "Tents",
    icon: "⛺",
    count: rentalItems.filter((i) => i.category === "Tents").length,
  },
  {
    name: "Tables & Chairs",
    icon: "🪑",
    count: rentalItems.filter((i) => i.category === "Tables & Chairs").length,
  },
  {
    name: "Games",
    icon: "🎮",
    count: rentalItems.filter((i) => i.category === "Games").length,
  },
];
