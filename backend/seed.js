require("dotenv").config();
const mongoose = require("mongoose");
const Room = require("./models/Room");

const roomsData = [
  {
    name: "Master Luxury Suite",
    description:
      "A spacious primary bedroom with elegant decor and high-end finishes.",
    pricePerStay: 120,
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Suite", // Changed from Luxury
    amenities: ["King Bed", "350 sqft", "WiFi", "AC"],
    isAvailable: true,
  },
  {
    name: "Modern Garden Room",
    description:
      "Relaxing guest room with a beautiful view of the private garden.",
    pricePerStay: 85,
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Premium", // Changed from Deluxe
    amenities: ["Queen Bed", "240 sqft", "Garden Access"],
    isAvailable: true,
  },
  {
    name: "Skyline Loft",
    description:
      "Modern private loft with a stunning view of the city skyline.",
    pricePerStay: 95,
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Suite",
    amenities: ["Queen Bed", "200 sqft", "Smart TV"],
    isAvailable: true,
  },
  {
    name: "The Executive Studio",
    description:
      "The perfect hybrid of a luxury office and a premium bedroom suite.",
    pricePerStay: 110,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Premium", // Changed from Luxury
    amenities: ["King Bed", "310 sqft", "Workspace"],
    isAvailable: true,
  },
  {
    name: "Bohemian Terrace Room",
    description:
      "Artistic guest room featuring a private terrace and unique bohemian decor.",
    pricePerStay: 90,
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Premium", // Changed from Deluxe
    amenities: ["Queen Bed", "280 sqft", "Terrace"],
    isAvailable: true,
  },
  {
    name: "The Artisan Nook",
    description:
      "A cozy and robust studio designed for the solo traveler seeking comfort.",
    pricePerStay: 75,
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Single", // Changed from Deluxe
    amenities: ["Full Bed", "185 sqft", "Local Art"],
    isAvailable: true,
  },
];

const seedDB = async () => {
  try {
    const connString =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hotel-room-booking";
    await mongoose.connect(connString);
    console.log("Connected to MongoDB...");

    await Room.deleteMany({});
    console.log("Old rooms cleared.");

    await Room.insertMany(roomsData);
    console.log("Database seeded successfully with valid Room Categories!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
