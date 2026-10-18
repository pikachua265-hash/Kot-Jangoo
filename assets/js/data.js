/**
 * Kot Jangoo - House of Taste & Royal Heritage Hotel
 * Jacobabad Bypass (N-65), Sindh, Pakistan
 * Master Dataset for Menu, Authentic Iftar & Grand Buffet, Hotel Rooms, and Seating Plan
 */

const KOT_JANGOO_DATA = {
  hotelInfo: {
    name: "Kot Jangoo",
    tagline: "House of Taste & Royal Heritage Hotel",
    subheading: "Jacobabad's Premier Red-Brick Fortress Restaurant & Luxury Highway Oasis",
    address: "N-65, 1 KM Jacobabad Bypass, Near Byco Pump, Sindh, Pakistan",
    phone: "0303-9136661 / 0304-9136661",
    email: "reservations@kotjangoo.com",
    rating: 4.9,
    totalReviews: "3,150+ Happy Guests",
    timings: "12:00 PM – 02:00 AM Daily (Special Iftar & Sehri Hours in Ramadan)",
    status: "Open Now",
    features: [
      "Authentic Namkeen Rosh & Mutton Karahi",
      "Iftar Plus Grand Buffet Dinner (50+ Dishes)",
      "Red-Brick Fortress Castle Architecture",
      "Open Lawn, Tower Rooftop & Family AC Dining",
      "Fast Food, Chinese & Signature Boti Parathas",
      "Spacious Secure Highway Parking with Valet"
    ],
    images: {
      fullNight: "assets/images/hotel_night_full.png",
      towerLogo: "assets/images/hotel_tower_logo.png",
      buffetPoster: "assets/images/iftar_buffet_poster.jpg"
    }
  },

  // Official Iftar Plus Buffet Dinner Menu directly from authentic Kot Jangoo Jacobabad menu card
  buffetDetails: {
    title: "Iftar Plus Grand Buffet Dinner",
    venue: "Kot Jangoo Castle Courtyard & Imperial Hall",
    pricing: {
      adult: 1850,
      child: 1150,
      underFour: "Free"
    },
    timing: "Maghrib Adhan to 10:30 PM",
    posterImage: "assets/images/iftar_buffet_poster.jpg",
    categories: [
      {
        name: "Iftar Buffet Openers & Starters",
        icon: "sun",
        items: [
          "Medjool & Iranian Fresh Dates",
          "Traditional Jam-e-Shirin & Shikanjabeen (Fresh Lime)",
          "Tang Orange Cooler & Chilled Mint Mojito",
          "Special Lahori Chana Chaat",
          "Sweet & Tangy Seasonal Fruit Chaat",
          "Dahi Boondi & Dahi Phulkiyan with roasted cumin",
          "Club Cold Sandwiches & Vegetable Sandwiches",
          "Crispy Mix Vegetable Pakora (Besan Crisps)",
          "Golden Tempura Vegetables",
          "Crispy Fried Chicken Wings & Spicy Crunch Wings"
        ]
      },
      {
        name: "Main Course Royal Specialties",
        icon: "utensils",
        items: [
          "Mutton Karahi / Traditional Mutton Qorma / Mutton Malai Qorma",
          "Chicken Qorma / Special Chicken Karahi / Chicken Malai Qorma",
          "Sindhi Spicy Dum Biryani & Fragrant Chicken Pulao",
          "Vegetable Pulao & Peas Pulao",
          "Chicken Shashlik with Sizzling Garlic Sauce",
          "Sweet 'n Sour Chicken & Special Gravy Chicken",
          "Steamed Vegetable Rice, Butter Garlic Rice & Masala Rice",
          "Chicken Chowmein, Veg Chowmein & Kot Jangoo Special Chowmein",
          "Charcoal Grilled Chicken Tikka Boti, Malai Boti & Bone-in Achari Boti",
          "Shahi Daal, Daal Makhni & Traditional Balochi Massar Beans",
          "Shahi Palak Paneer, Mix Seasonal Sabzi & Spiced Potato"
        ]
      },
      {
        name: "Artisan Salads & Cold Bar",
        icon: "salad",
        items: [
          "Classic Russian Salad with Diced Apples",
          "Creamy Guava & Fresh Fruit Salad",
          "Italian Macaroni Salad & Arabian Herb Pasta Salad",
          "Crunchy Apple Cabbage Coleslaw",
          "Mediterranean Chickpea & White Bean Salad",
          "Turkish Citrus Salad & Afghani Tomato Herb Salad",
          "Crispy Onion Rings, Fresh Cucumber Strips & Ripe Red Tomatoes"
        ]
      },
      {
        name: "Handcrafted Sauces & Chutneys",
        icon: "sparkles",
        items: [
          "Special Sweet Plum (Aloo Bukhara) Sauce",
          "Honey Mustard Glaze",
          "Herb Infused Creamy Mayo",
          "Smoked Mayo Garlic Sauce",
          "Spicy Tomato Salsa Dip",
          "Sweet & Sour Tamarind (Imli) Chutney",
          "Fresh Mountain Mint & Coriander Yogurt Sauce"
        ]
      },
      {
        name: "Heritage Desserts & French Pastries",
        icon: "cake",
        items: [
          "Pineapple Cream Pastry & Strawberry Glaze Pastry",
          "Rich Chocolate Fudge Pastry",
          "Wild Blueberry Layered Pastry",
          "Authentic Arabic Semolina Basbousa with Rose Syrup",
          "Zesty Lemon Pastry Slice",
          "Warm Cinnamon Apple Pie",
          "Caramelized Walnut Tart Pie"
        ]
      },
      {
        name: "Fresh Clay Oven Breads",
        icon: "disc",
        items: [
          "Tandoori Shahi Roghni Naan with Butter & Sesame",
          "Crispy Garlic Butter Naan",
          "Fresh Whole Wheat Tandoori Roti"
        ]
      }
    ]
  },

  menuCategories: [
    { id: "all", name: "All Dishes", icon: "sparkles" },
    { id: "buffet", name: "Iftar & Grand Buffet", icon: "crown" },
    { id: "deals", name: "Family Combos & Platters", icon: "gift" },
    { id: "namkeen-karahi", name: "Namkeen & Mutton Karahi", icon: "flame" },
    { id: "bbq", name: "Charcoal BBQ & Boti", icon: "utensils" },
    { id: "chinese", name: "Chinese & Chowmein", icon: "soup" },
    { id: "tandoor", name: "Naans & Breads", icon: "disc" },
    { id: "desserts", name: "Desserts & Pastries", icon: "cake" }
  ],

  menuItems: [
    // Authentic Kot Jangoo Promos & Researched Deals
    {
      id: "deal-10",
      name: "Deal 10: Kot Jangoo Family Pizza Combo",
      category: "deals",
      price: 2549,
      unit: "Serves 3-4 Persons",
      rating: 4.9,
      reviewsCount: 380,
      description: "Researched official Kot Jangoo deal: 1 Large Pizza (Fajita/Tikka), 5 Golden Crispy Wings, 2 Charcoal Boti Parathas, and a 1.5-Litre Chilled Drink.",
      badge: "Official Best Value Deal",
      isSpicy: true,
      prepTime: "25 mins",
      isPopular: true,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "deal-platter",
      name: "Rice & Spice Duo Platter (Kot Jangoo Special)",
      category: "deals",
      price: 1650,
      unit: "Serves 2 Persons",
      rating: 4.8,
      reviewsCount: 290,
      description: "A mouth-watering combination of fragrant spiced rice, Chicken Tikka Boti skewers, Crispy Wings, and special herb mayo & plum sauce.",
      badge: "Highway Duo Favorite",
      isSpicy: true,
      prepTime: "20 mins",
      isPopular: true,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "m-namkeen",
      name: "Kot Jangoo Signature Dry Mutton Namkeen Rosh",
      category: "namkeen-karahi",
      price: 3800,
      unit: "per kg",
      rating: 5.0,
      reviewsCount: 640,
      description: "Traditional Jacobabad & Balochistan highway specialty. Succulent bone-in mutton slow-cooked in natural fat with sea salt, whole black pepper, and garlic cloves.",
      badge: "Authentic Highway Special",
      isSpicy: false,
      prepTime: "45 mins",
      isPopular: true,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "m-malai-qorma",
      name: "Shahi Mutton Malai Qorma (From Buffet Menu)",
      category: "namkeen-karahi",
      price: 3600,
      unit: "per kg",
      rating: 4.9,
      reviewsCount: 310,
      description: "Featured on the official Iftar Buffet card: Prime mutton steeped in pure dairy malai, crushed green cardamom, and golden cashew paste.",
      badge: "Buffet Headliner",
      isSpicy: false,
      prepTime: "35 mins",
      isPopular: true,
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "m-sindhi-biryani",
      name: "Authentic Sindhi Special Mutton Dum Biryani",
      category: "namkeen-karahi",
      price: 1350,
      unit: "per serving with Raita",
      rating: 4.9,
      reviewsCount: 420,
      description: "Cooked with dried plums (aloo bukhara), green chillies, tender mutton pieces, saffron potatoes, and aromatic aged basmati rice.",
      badge: "Sindhi Specialty",
      isSpicy: true,
      prepTime: "20 mins",
      isPopular: true,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
    },

    // BBQ & Boti
    {
      id: "m-achari-boti",
      name: "Kot Jangoo Achari Boti with Bone",
      category: "bbq",
      price: 1250,
      unit: "full plate (8 pcs)",
      rating: 4.8,
      reviewsCount: 270,
      description: "As seen on the Buffet card: Juicy chicken on the bone marinated with traditional pickling spices (kalonji, fennel, mustard seeds) and roasted on charcoal.",
      badge: "Tandoor Grilled",
      isSpicy: true,
      prepTime: "20 mins",
      isPopular: true,
      image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "m-boti-paratha",
      name: "Charcoal Chicken Boti Paratha Roll",
      category: "bbq",
      price: 420,
      unit: "per roll with sauce",
      rating: 4.9,
      reviewsCount: 510,
      description: "Crispy tawa paratha loaded with smoky grilled chicken boti, sliced rings of onion, and Kot Jangoo's signature herb garlic mayo sauce.",
      badge: "Customer Favorite",
      isSpicy: true,
      prepTime: "12 mins",
      isPopular: true,
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
    },

    // Chinese
    {
      id: "m-chowmein",
      name: "Kot Jangoo Special Chicken Chowmein",
      category: "chinese",
      price: 1100,
      unit: "large platter",
      rating: 4.8,
      reviewsCount: 340,
      description: "Featured on Kot Jangoo's official menu card: Handcrafted egg noodles wok-tossed with shredded chicken, crunchy bell peppers, cabbage, and rich dark soy reduction.",
      badge: "Chinese Favorite",
      isSpicy: false,
      prepTime: "15 mins",
      isPopular: true,
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "m-shashlik",
      name: "Chicken Shashlik with Sizzling Butter Garlic Rice",
      category: "chinese",
      price: 1350,
      unit: "sizzler plate",
      rating: 4.9,
      reviewsCount: 280,
      description: "Tender chicken skewers with glazed capsicum, sweet onions, and a tangy rich red shashlik sauce served over hot steaming garlic butter rice.",
      badge: "Chef's Choice",
      isSpicy: false,
      prepTime: "20 mins",
      isPopular: true,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
    },

    // Desserts from Card
    {
      id: "m-basbousa",
      name: "Authentic Arabic Basbousa with Rose Syrup",
      category: "desserts",
      price: 490,
      unit: "2 large pieces",
      rating: 4.9,
      reviewsCount: 190,
      description: "Traditional Middle Eastern semolina cake soaked in sweet floral rosewater syrup, garnished with blanched whole almonds and pistachios.",
      badge: "Buffet Dessert Special",
      isSpicy: false,
      prepTime: "5 mins",
      isPopular: true,
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "m-walnut-pie",
      name: "Caramelized Walnut Tart Pie",
      category: "desserts",
      price: 550,
      unit: "per slice with cream",
      rating: 4.8,
      reviewsCount: 160,
      description: "Crisp flaky buttery pastry crust filled with toasted Jacobabad mountain walnuts in a golden brown caramel sauce.",
      badge: "European Bakery",
      isSpicy: false,
      prepTime: "5 mins",
      isPopular: false,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
    }
  ],

  hotelRooms: [
    {
      id: "room-1",
      name: "Fortress View Royal Suite",
      tagline: "Direct view of the illuminated Kot Jangoo tower & highway ramparts",
      pricePerNight: 24500,
      rating: 4.9,
      reviewsCount: 140,
      capacity: "2 Adults + 1 Child",
      bedType: "Royal King Bed",
      size: "650 sq ft",
      amenities: [
        "Castle Tower View Balcony",
        "Complimentary Buffet Breakfast",
        "Jacuzzi & Rain Shower",
        "24/7 Room & Butler Service",
        "High-speed Wi-Fi",
        "Smart 65\" TV with Streaming"
      ],
      description: "Luxurious heritage suite with red brick exposed walls, handcrafted Mughal furnishings, and private balcony overlooking the grand illuminated castle at night.",
      image: "assets/images/hotel_night_full.png",
      badge: "Most Popular",
      availableRooms: 3
    },
    {
      id: "room-2",
      name: "Imperial Grand Chamber",
      tagline: "Opulent regal comfort with authentic royal decor & plush amenities",
      pricePerNight: 18000,
      rating: 4.8,
      reviewsCount: 112,
      capacity: "2 Adults",
      bedType: "Custom Teakwood King Bed",
      size: "520 sq ft",
      amenities: [
        "Garden & Fountain View",
        "Free Gourmet Breakfast",
        "Marble Bathroom with Bathtub",
        "Espresso Machine & Minibar",
        "High-speed Wi-Fi"
      ],
      description: "Designed for travelers on the N-65 route who appreciate classic heritage elegance, quiet air conditioning, and warm hospitality.",
      image: "assets/images/hotel_tower_logo.png",
      badge: "Best Value",
      availableRooms: 5
    },
    {
      id: "room-3",
      name: "Heritage Family Castle Suite",
      tagline: "Two interconnecting royal master bedrooms for families and VIP groups",
      pricePerNight: 36000,
      rating: 5.0,
      reviewsCount: 88,
      capacity: "4 Adults + 2 Children",
      bedType: "2 King Beds + Daybed",
      size: "1,100 sq ft",
      amenities: [
        "Private Terrace with Fort Panorama",
        "Two En-suite Luxury Bathrooms",
        "Living & Dining Lounge",
        "Kids Play Area Access",
        "Complimentary High-Tea & Breakfast"
      ],
      description: "An expansive two-bedroom palace suite featuring an exclusive private terrace facing the glowing night towers of Kot Jangoo.",
      image: "assets/images/hotel_night_full.png",
      badge: "Family VIP",
      availableRooms: 2
    }
  ],

  seatingZones: [
    {
      id: "courtyard",
      name: "Starry Castle Courtyard",
      badge: "Open Air Under Night Lights",
      description: "Breathtaking outdoor dining surrounded by the illuminated red brick fortress architecture, cool highway breeze, and water fountains.",
      tables: [
        { id: "T-C1", name: "Table C-1", type: "family", capacity: 6, status: "available", price: 500 },
        { id: "T-C2", name: "Table C-2", type: "couple", capacity: 2, status: "available", price: 300 },
        { id: "T-C3", name: "Table C-3", type: "standard", capacity: 4, status: "booked", price: 400 },
        { id: "T-C4", name: "Table C-4", type: "standard", capacity: 4, status: "available", price: 400 },
        { id: "T-C5", name: "Table C-5", type: "couple", capacity: 2, status: "available", price: 300 },
        { id: "T-C6", name: "Table C-6", type: "large", capacity: 8, status: "available", price: 800 },
        { id: "T-C7", name: "Table C-7", type: "couple", capacity: 2, status: "booked", price: 300 },
        { id: "T-C8", name: "Table C-8", type: "standard", capacity: 4, status: "available", price: 400 }
      ]
    },
    {
      id: "buffet-hall",
      name: "Iftar & Grand Buffet Arena",
      badge: "Direct Buffet Access",
      description: "Spacious luxury hall right next to the 50+ dish live buffet counters, salads, dessert station, and fresh tandoor.",
      tables: [
        { id: "B-1", name: "Buffet Table B-1", type: "standard", capacity: 4, status: "available", price: 400 },
        { id: "B-2", name: "Buffet Table B-2", type: "family", capacity: 6, status: "available", price: 600 },
        { id: "B-3", name: "Buffet Table B-3", type: "large", capacity: 10, status: "available", price: 1000 },
        { id: "B-4", name: "Buffet Table B-4", type: "standard", capacity: 4, status: "booked", price: 400 },
        { id: "B-5", name: "Buffet Table B-5", type: "family", capacity: 6, status: "available", price: 600 },
        { id: "B-6", name: "Buffet Table B-6", type: "large", capacity: 8, status: "available", price: 800 }
      ]
    },
    {
      id: "rooftop",
      name: "Royal Fortress Rooftop",
      badge: "Prime Tower View",
      description: "Elevated vantage point directly beneath the iconic neon-lit Kot Jangoo tower with panoramic views.",
      tables: [
        { id: "T-R1", name: "Tower Deck R-1", type: "couple", capacity: 2, status: "available", price: 600 },
        { id: "T-R2", name: "Tower Deck R-2", type: "couple", capacity: 2, status: "available", price: 600 },
        { id: "T-R3", name: "Tower Deck R-3", type: "standard", capacity: 4, status: "booked", price: 700 },
        { id: "T-R4", name: "Tower Deck R-4", type: "standard", capacity: 4, status: "available", price: 700 },
        { id: "T-R5", name: "Tower VIP R-5", type: "family", capacity: 6, status: "available", price: 1000 }
      ]
    },
    {
      id: "vip-gazebo",
      name: "Royal VIP Gazebo Cabanas",
      badge: "Curtained Royal Luxury",
      description: "Private open-air brick and wood gazebos with dedicated personal server, red carpet, and custom lighting.",
      tables: [
        { id: "T-G1", name: "Gazebo Sultana G-1", type: "gazebo", capacity: 8, status: "available", price: 1500 },
        { id: "T-G2", name: "Gazebo Shehenshah G-2", type: "gazebo", capacity: 12, status: "available", price: 2000 },
        { id: "T-G3", name: "Gazebo Darbar G-3", type: "gazebo", capacity: 8, status: "booked", price: 1500 }
      ]
    }
  ],

  timeSlots: [
    { id: "ts-iftar", time: "06:15 PM (Iftar Time)", period: "Iftar Buffet", popular: true },
    { id: "ts-dinner", time: "08:30 PM", period: "Dinner Buffet & A La Carte", popular: true },
    { id: "ts-night", time: "10:30 PM", period: "Night BBQ & Rosh", popular: true },
    { id: "ts-late", time: "12:30 AM", period: "Late Night Dining" }
  ],

  testimonials: [
    {
      name: "Chaudhry Tariq Mehmood",
      city: "Sukkur / Jacobabad Highway",
      rating: 5,
      comment: "The Iftar Plus Buffet Dinner at Kot Jangoo is the best in Upper Sindh! Loved the Mutton Malai Qorma, Balochi Massar, and Arabic Basbousa. Outstanding family environment.",
      avatar: "CT"
    },
    {
      name: "Naveed Ahmed Brohi",
      city: "Quetta Traveler",
      rating: 5,
      comment: "We always stop at Kot Jangoo on the N-65 highway. Their Dry Mutton Namkeen Rosh and Deal 10 Boti Parathas are delicious. Ample parking near Byco Pump.",
      avatar: "NB"
    },
    {
      name: "Dr. Farah Jatoi",
      city: "Larkana",
      rating: 5,
      comment: "The fortress lights at night make it look like a historic palace. The seat booking feature made our family buffet reservation hassle-free.",
      avatar: "FJ"
    }
  ]
};
