require("dotenv").config();
const mongoose = require("mongoose");
const Room = require("./models/Room"); // Ensure this path is correct

const roomsData = [
  {
    name: "Master Luxury Suite",
    description:
      "A spacious primary bedroom with elegant decor and high-end finishes.",
    pricePerStay: 120, // Updated field name
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Luxury",
    amenities: ["King Bed", "350 sqft", "WiFi", "AC"],
  },
  {
    name: "Modern Garden Room",
    description:
      "Relaxing guest room with a beautiful view of the private garden.",
    pricePerStay: 85, // Updated field name
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Deluxe",
    amenities: ["Queen Bed", "240 sqft", "Garden Access"],
  },
  {
    name: "Skyline Loft",
    description:
      "Modern private loft with a stunning view of the city skyline.",
    pricePerStay: 95, // Updated field name
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Suite",
    amenities: ["Queen Bed", "200 sqft", "Smart TV"],
  },
  {
    name: "The Executive Studio",
    description:
      "The perfect hybrid of a luxury office and a premium bedroom suite.",
    pricePerStay: 110, // Updated field name
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Luxury",
    amenities: ["King Bed", "310 sqft", "Workspace"],
  },
  {
    name: "Bohemian Terrace Room",
    description:
      "Artistic guest room featuring a private terrace and unique bohemian decor.",
    pricePerStay: 90, // Updated field name
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Deluxe",
    amenities: ["Queen Bed", "280 sqft", "Terrace"],
  },
  {
    name: "The Artisan Nook",
    description:
      "A cozy and robust studio designed for the solo traveler seeking comfort.",
    pricePerStay: 75, // Updated field name
    images: [
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800",
    ],
    category: "Deluxe",
    amenities: ["Full Bed", "185 sqft", "Local Art"],
  },
];

const seedDB = async () => {
  try {
    // 1. Connect to DB
    const connString =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hotel-room-booking"; // Updated to match your folder name
    await mongoose.connect(connString);
    console.log("Connected to MongoDB for seeding...");

    // 2. Clear existing rooms
    await Room.deleteMany({});
    console.log("Old rooms cleared.");

    // 3. Insert the new data
    await Room.insertMany(roomsData);
    console.log("Database seeded successfully with 6 updated rooms!");

    // 4. Close connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
