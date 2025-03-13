export const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description: "Experience immersive sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and memory foam ear cushions for all-day comfort. The built-in voice assistant and touch controls make these headphones the perfect companion for your daily commute or focused work sessions.",
    specs: {
      batteryLife: "30 hours",
      connectivity: "Bluetooth 5.2",
      noiseReduction: "Active",
      color: "Midnight Black"
    },
    reviews: [
      { user: "AudioEnthusiast", rating: 5, comment: "Crystal clear sound quality, worth every penny!" },
      { user: "TechGuru", rating: 4, comment: "Great battery life, comfortable for long sessions." }
    ],
    inStock: true,
    category: "Audio"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    description: "Track your fitness journey with precision using our Smart Fitness Watch. Monitor heart rate, sleep patterns, and workout intensity with high-accuracy sensors. The waterproof design and 7-day battery life make it perfect for athletes and fitness enthusiasts. Customize your experience with interchangeable bands and watch faces.",
    specs: {
      batteryLife: "7 days",
      waterResistance: "50m",
      display: "AMOLED",
      sensors: "Heart rate, GPS, Accelerometer"
    },
    reviews: [
      { user: "FitnessFreak", rating: 5, comment: "The accuracy of the heart rate monitor is impressive!" },
      { user: "RunnerDaily", rating: 4, comment: "Love the battery life and water resistance." }
    ],
    inStock: true,
    category: "Wearables"
  },
  {
    id: 3,
    name: "Ultra-thin Laptop",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    description: "Redefine productivity with our Ultra-thin Laptop. Powered by the latest processor and featuring a stunning 4K display, this laptop handles intense workloads while maintaining incredible portability. The premium aluminum chassis, backlit keyboard, and 12-hour battery life create the perfect balance of performance and design.",
    specs: {
      processor: "Intel Core i7 11th Gen",
      ram: "16GB DDR4",
      storage: "1TB SSD",
      display: "15.6\" 4K OLED"
    },
    reviews: [
      { user: "TechReviewer", rating: 5, comment: "The performance-to-thickness ratio is unmatched!" },
      { user: "DigitalNomad", rating: 5, comment: "Perfect for my work trips - powerful and light." }
    ],
    inStock: true,
    category: "Computers"
  },
  {
    id: 4,
    name: "Professional Camera",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    description: "Capture moments with unparalleled clarity using our Professional Camera. The 45-megapixel sensor delivers stunning detail, while the advanced autofocus system ensures you never miss the perfect shot. Weather-sealed construction allows you to shoot in any environment, and the intuitive controls are designed for professionals and enthusiasts alike.",
    specs: {
      resolution: "45MP",
      sensorType: "Full-frame CMOS",
      iso: "100-51200",
      videoResolution: "8K 30fps"
    },
    reviews: [
      { user: "ProPhotographer", rating: 5, comment: "The image quality is breathtaking!" },
      { user: "FilmMaker", rating: 4, comment: "Great for both stills and video work." }
    ],
    inStock: false,
    category: "Photography"
  },
  {
    id: 5,
    name: "Smart Home Speaker",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500",
    description: "Transform your home with our Smart Home Speaker. Room-filling sound combines with an intelligent voice assistant to create the perfect hub for your connected lifestyle. Control your smart home devices, play music across multiple rooms, or get answers to your questions—all with simple voice commands or the companion app.",
    specs: {
      power: "30W",
      connectivity: "WiFi, Bluetooth",
      voiceAssistants: "Alexa, Google Assistant",
      dimensions: "5.6\" x 5.6\" x 6.8\""
    },
    reviews: [
      { user: "SmartHomeEnthusiast", rating: 5, comment: "The sound quality is amazing for its size!" },
      { user: "TechFamily", rating: 4, comment: "Easy to set up and works with all our devices." }
    ],
    inStock: true,
    category: "Smart Home"
  }
]; 