import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createPrismaAdapter } from "../src/lib/prisma-adapter";

const prisma = new PrismaClient({ adapter: createPrismaAdapter() });

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.bookmark.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.newsletter.deleteMany();

  // Create Admin User
  const passwordHash = await bcrypt.hash("rumiatlas2026", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Editorial Curator",
      email: "admin@rumiatlas.com",
      passwordHash,
      role: "ADMIN",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      bio: "Architectural photographer, travel curator, and editor of The Rumi Atlas. Documenting serene places, high-altitude expeditions, and personal travel reflections.",
    },
  });

  // Create Categories
  const catLuxury = await prisma.category.create({
    data: {
      name: "Luxury & Heritage",
      slug: "luxury-heritage",
      description: "Palatial stays, historic estates, and timeless elegance across the world.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    },
  });

  const catCoastal = await prisma.category.create({
    data: {
      name: "Coastal & Islands",
      slug: "coastal-islands",
      description: "Sun-drenched Mediterranean cliffs, turquoise waters, and idyllic island sanctuaries.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    },
  });

  const catMountain = await prisma.category.create({
    data: {
      name: "Mountain Expeditions",
      slug: "mountain-expeditions",
      description: "High-altitude alpine passes, dramatic summits, and remote mountain hideaways.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    },
  });

  const catCulinary = await prisma.category.create({
    data: {
      name: "Culinary Journeys",
      slug: "culinary-journeys",
      description: "Gastronomic adventures, Michelin-starred craftsmanship, and authentic local markets.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    },
  });

  const catCultural = await prisma.category.create({
    data: {
      name: "Cultural Immersion",
      slug: "cultural-immersion",
      description: "Deep dives into artisan heritage, sacred rituals, and centuries-old traditions.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    },
  });

  const catRoadTrip = await prisma.category.create({
    data: {
      name: "Road Trips & Routes",
      slug: "road-trips",
      description: "Iconic scenic drives, coastal highway journeys, and off-the-beaten-track expeditions.",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    },
  });

  // Seed Blog Posts
  const post1 = await prisma.post.create({
    data: {
      title: "Whispering Sands: A Journey Through the Sahara & Desert Palaces of Merzouga",
      slug: "sahara-desert-palaces-merzouga",
      excerpt: "Ascending the towering golden dunes of Erg Chebbi as the sun dips below the horizon, revealing starry skies over handcrafted Berber luxury camps.",
      content: `
        <p class="lead text-lg font-serif italic text-purple-300 mb-6">"In the desert, silence is not empty; it is full of answers."</p>
        <p>Leaving behind the bustling courtyards of Marrakech, our convoy wound through the dramatic Tizi n'Tichka pass of the High Atlas Mountains. As the terracotta earth yielded to endless expanses of golden sand, we arrived at Erg Chebbi—where wind-carved dunes stretch towards the horizon like ocean waves frozen in time.</p>
        
        <h2>The Architecture of Silence</h2>
        <p>Our shelter for the next three nights was an intimate sanctuary constructed entirely from sustainable acacia wood, woven camel wool, and hand-stitched Moroccan textiles. Each tent featured private plunge pools fed by subterranean mountain springs and open-air skylights framed for stargazing.</p>
        
        <blockquote>
          "The desert has a way of stripping away noise and leaving only what is vital: light, shadow, texture, and deep contemplation."
        </blockquote>

        <h2>Flavors of the Oasis</h2>
        <p>Dusk brought the scent of slow-simmered lamb tagine infused with saffron, caramelized figs, and toasted almonds. As Berber musicians played fireside melodies under a velvet canopy of constellations, we tasted local orange blossom teas and aged dates harvested from the Ziz Valley.</p>
      `,
      featuredImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80"
      ]),
      destination: "Erg Chebbi, Merzouga",
      country: "Morocco",
      state: "Drâa-Tafilalet",
      latitude: 31.0983,
      longitude: -4.0105,
      travelDate: new Date("2026-04-12"),
      tripDuration: "6 Days",
      budget: "$3,800",
      categoryId: catLuxury.id,
      tags: JSON.stringify(["Desert", "Luxury Camp", "Stargazing", "Morocco", "Photography"]),
      tips: "Book a private 4x4 transfer with an experienced desert guide. High dune winds can dust camera sensors—bring sealed weather-proof gear protection.",
      bestTimeToVisit: "October to April (Mild daytime temperatures and crisp starry nights)",
      readingTime: 6,
      isPublished: true,
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date("2026-05-01"),
      metaTitle: "Desert Palaces of Merzouga - The Rumi Atlas",
      metaDescription: "Experience luxury desert camping, golden dunes, and starlight banquets in Merzouga, Morocco.",
      metaKeywords: "Morocco, Sahara Desert, Erg Chebbi, Luxury Travel, Desert Glamping",
      views: 1420,
      authorId: admin.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: "Cliffside Elegance: Exploring Amalfi, Ravello & The Secrets of Positano",
      slug: "amalfi-coast-ravello-positano-guide",
      excerpt: "Sailing private wooden Gozzos along emerald grottoes, sipping Limoncello Spritzes on Ravello balustrades, and tracing romantic coastal paths.",
      content: `
        <p class="lead text-lg font-serif italic text-purple-300 mb-6">"To see Amalfi is to witness a masterpiece carved by ocean, stone, and sunlight."</p>
        <p>The Amalfi Coast is a dramatic cascade of pastel villas clinging to vertical limestone cliffs above the Tyrrhenian Sea. From the aristocratic gardens of Villa Cimbrone in Ravello to the iconic vertical village of Positano, every bend in the SS163 road unveils a postcard landscape.</p>
      `,
      featuredImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80",
      galleryImages: JSON.stringify([
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80"
      ]),
      destination: "Amalfi Coast & Positano",
      country: "Italy",
      state: "Campania",
      latitude: 40.634,
      longitude: 14.6027,
      travelDate: new Date("2026-06-20"),
      tripDuration: "8 Days",
      budget: "$5,200",
      categoryId: catCoastal.id,
      tags: JSON.stringify(["Amalfi", "Italy", "Coastal", "Luxury Yacht", "Mediterranean"]),
      tips: "Reserve cliffside dinner tables at least 3 months in advance. Take the ferry between Amalfi and Positano to bypass heavy summer traffic.",
      bestTimeToVisit: "May to June or September (Fewer crowds, pleasant Mediterranean climate)",
      readingTime: 7,
      isPublished: true,
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date("2026-06-28"),
      views: 2180,
      authorId: admin.id,
    },
  });

  // Seed Newsletter Subscribers
  await prisma.newsletter.create({
    data: { email: "wanderlust.reader@gmail.com" },
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
