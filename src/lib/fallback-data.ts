export interface FallbackCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface FallbackAuthor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface FallbackPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  galleryImages: string;
  destination: string;
  country: string;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
  travelDate: string | null;
  tripDuration: string;
  budget: string;
  readingTime: number;
  isPublished: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  category: FallbackCategory;
  author: FallbackAuthor;
}

export const FALLBACK_CATEGORIES: FallbackCategory[] = [
  {
    id: "cat-1",
    name: "Luxury & Heritage",
    slug: "luxury-heritage",
    description: "Palatial stays, historic estates, and timeless elegance across the world.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "cat-2",
    name: "Coastal & Islands",
    slug: "coastal-islands",
    description: "Sun-drenched Mediterranean cliffs, turquoise waters, and idyllic island sanctuaries.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "cat-3",
    name: "Mountain Expeditions",
    slug: "mountain-expeditions",
    description: "High-altitude alpine passes, dramatic summits, and remote mountain hideaways.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  },
];

export const FALLBACK_AUTHOR: FallbackAuthor = {
  id: "author-1",
  name: "Editorial Curator",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  bio: "Architectural photographer, travel curator, and editor of The Rumi Atlas.",
};

export const FALLBACK_POSTS: FallbackPost[] = [
  {
    id: "fallback-1",
    title: "Whispering Sands: A Journey Through the Sahara & Desert Palaces of Merzouga",
    slug: "sahara-desert-palaces-merzouga",
    excerpt: "Ascending the towering golden dunes of Erg Chebbi as the sun dips below the horizon, revealing starry skies over handcrafted Berber luxury camps.",
    content: `
      <p class="lead text-lg font-serif italic text-purple-300 mb-6">"In the desert, silence is not empty; it is full of answers."</p>
      <p>Leaving behind the bustling courtyards of Marrakech, our convoy wound through the dramatic Tizi n'Tichka pass of the High Atlas Mountains. As the terracotta earth yielded to endless expanses of golden sand, we arrived at Erg Chebbi—where wind-carved dunes stretch towards the horizon like ocean waves frozen in time.</p>
      <h2>The Architecture of Silence</h2>
      <p>Our shelter for the next three nights was an intimate sanctuary constructed entirely from sustainable acacia wood, woven camel wool, and hand-stitched Moroccan textiles. Each tent featured private plunge pools fed by subterranean mountain springs and open-air skylights framed for stargazing.</p>
      <blockquote>"The desert has a way of stripping away noise and leaving only what is vital: light, shadow, texture, and deep contemplation."</blockquote>
      <h2>Flavors of the Oasis</h2>
      <p>Dusk brought the scent of slow-simmered lamb tagine infused with saffron, caramelized figs, and toasted almonds. As Berber musicians played fireside melodies under a velvet canopy of constellations, we tasted local orange blossom teas and aged dates harvested from the Ziz Valley.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80",
    galleryImages: JSON.stringify([
      {
        dayNumber: "Day 1",
        title: "Arriving at the Golden Dunes of Merzouga",
        story: "We arrived at the edge of the Sahara as dusk began to painterly tint the sky in hues of deep violet and dusty rose. The air was crisp, scented with woodfire smoke and dry earth.",
        photos: [
          "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
        ],
        videos: [
          "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
        ],
      },
      {
        dayNumber: "Day 2",
        title: "Stargazing over Nomadic Berber Camps",
        story: "Night fell like a heavy velvet curtain over the desert. With zero light pollution, millions of stars emerged, tracing constellations across the sky.",
        photos: [
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
        ],
        videos: [
          "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4",
        ],
      },
      {
        dayNumber: "Day 3",
        title: "Valley of Roses & Cedar Trails",
        story: "Leaving the dunes behind, we crossed winding mountain passes flanked by ancient mud-brick kasbahs. Fresh wild roses grew along stone aqueducts.",
        photos: [
          "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
        ],
        videos: [
          "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
        ],
      },
    ]),
    destination: "Erg Chebbi, Merzouga",
    country: "Morocco",
    state: "Drâa-Tafilalet",
    latitude: 31.0983,
    longitude: -4.0105,
    travelDate: "2026-04-12T00:00:00.000Z",
    tripDuration: "6 Days",
    budget: "$3,800",
    readingTime: 6,
    isPublished: true,
    isFeatured: true,
    isTrending: true,
    publishedAt: "2026-05-01T00:00:00.000Z",
    createdAt: "2026-05-01T00:00:00.000Z",
    updatedAt: "2026-05-01T00:00:00.000Z",
    category: FALLBACK_CATEGORIES[0],
    author: FALLBACK_AUTHOR,
  },
  {
    id: "fallback-2",
    title: "Cliffside Elegance: Exploring Amalfi, Ravello & The Secrets of Positano",
    slug: "amalfi-coast-ravello-positano-guide",
    excerpt: "Sailing private wooden Gozzos along emerald grottoes, sipping Limoncello Spritzes on Ravello balustrades, and tracing romantic coastal paths.",
    content: `
      <p class="lead text-lg font-serif italic text-purple-300 mb-6">"To see Amalfi is to witness a masterpiece carved by ocean, stone, and sunlight."</p>
      <p>The Amalfi Coast is a dramatic cascade of pastel villas clinging to vertical limestone cliffs above the Tyrrhenian Sea. From the aristocratic gardens of Villa Cimbrone in Ravello to the iconic vertical village of Positano, every bend in the SS163 road unveils a postcard landscape.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80",
    galleryImages: JSON.stringify([
      {
        dayNumber: "Day 1",
        title: "Sailing the Tyrrhenian Waters & Positano Bay",
        story: "We boarded a handcrafted wooden Gozzo at sunrise, gliding along sapphire waters toward Positano's cliffside village.",
        photos: [
          "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80",
        ],
        videos: [
          "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4",
        ],
      },
      {
        dayNumber: "Day 2",
        title: "Balustrades of Villa Cimbrone in Ravello",
        story: "High above the coastal clouds, Ravello offered quiet sanctuary among marble statues and lemon groves.",
        photos: [
          "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80",
        ],
        videos: [
          "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
        ],
      },
    ]),
    destination: "Amalfi Coast & Positano",
    country: "Italy",
    state: "Campania",
    latitude: 40.634,
    longitude: 14.6027,
    travelDate: "2026-06-20T00:00:00.000Z",
    tripDuration: "8 Days",
    budget: "$5,200",
    readingTime: 7,
    isPublished: true,
    isFeatured: true,
    isTrending: true,
    publishedAt: "2026-06-28T00:00:00.000Z",
    createdAt: "2026-06-28T00:00:00.000Z",
    updatedAt: "2026-06-28T00:00:00.000Z",
    category: FALLBACK_CATEGORIES[1],
    author: FALLBACK_AUTHOR,
  },
];

