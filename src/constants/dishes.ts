import { Dish, Restaurant } from "./types";

export const restaurants: Restaurant[] = [
  {
    id: "rest_001",

    name: "Burger Hub",

    slug: "burger-hub",

    description:
      "Burger Hub serves premium burgers, crispy fries, wraps, and refreshing beverages with fast delivery and top-quality ingredients.",

    cuisine: ["American", "Fast Food"],

    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",

    logo:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",

    coverImage:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9",

    location: {
      address: "221B Food Street",
      city: "New York",
      state: "NY",
      country: "USA",
      zipCode: "10001",

      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
    },

    contact: {
      phone: "+1 9876543210",
      email: "support@burgerhub.com",
      website: "https://burgerhub.com",
    },

    openingHours: {
      monday: "10:00 AM - 11:00 PM",
      tuesday: "10:00 AM - 11:00 PM",
      wednesday: "10:00 AM - 11:00 PM",
      thursday: "10:00 AM - 11:00 PM",
      friday: "10:00 AM - 01:00 AM",
      saturday: "10:00 AM - 01:00 AM",
      sunday: "11:00 AM - 10:00 PM",
    },

    rating: {
      average: 4.5,
      totalReviews: 1240,
    },

    delivery: {
      available: true,
      deliveryFee: 2.99,
      estimatedTime: 35,
    },

    tags: ["Popular", "Fast Delivery", "Top Rated"],

    isOpen: true,

    isFeatured: true,

    createdAt: "2026-05-20T10:00:00Z",

    updatedAt: "2026-05-20T10:00:00Z",
  },

  {
    id: "rest_002",

    name: "Italiano Pizza",

    slug: "italiano-pizza",

    description:
      "Italiano Pizza offers authentic Italian pizzas, creamy pasta, garlic bread, and handcrafted sauces made with fresh ingredients.",

    cuisine: ["Italian", "Pizza", "Pasta"],

    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",

    logo:
      "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5",

    coverImage:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1",

    location: {
      address: "45 Pizza Avenue",
      city: "Chicago",
      state: "Illinois",
      country: "USA",
      zipCode: "60601",

      coordinates: {
        lat: 41.8781,
        lng: -87.6298,
      },
    },

    contact: {
      phone: "+1 9123456780",
      email: "hello@italianopizza.com",
      website: "https://italianopizza.com",
    },

    openingHours: {
      monday: "11:00 AM - 10:00 PM",
      tuesday: "11:00 AM - 10:00 PM",
      wednesday: "11:00 AM - 10:00 PM",
      thursday: "11:00 AM - 11:00 PM",
      friday: "11:00 AM - 12:00 AM",
      saturday: "11:00 AM - 12:00 AM",
      sunday: "12:00 PM - 09:00 PM",
    },

    rating: {
      average: 4.7,
      totalReviews: 980,
    },

    delivery: {
      available: true,
      deliveryFee: 3.49,
      estimatedTime: 35,
    },

    tags: ["Italian", "Best Seller", "Family Friendly"],

    isOpen: true,

    isFeatured: true,

    createdAt: "2026-05-20T10:00:00Z",

    updatedAt: "2026-05-20T10:00:00Z",
  },
];

export const dishes: Dish[] = [
  {
    id: "dish_001",

    restaurantId: "rest_001",

    title: "Chicken Burger",

    slug: "chicken-burger",

    description:
      "Juicy grilled chicken burger with fresh lettuce, tomato, cheddar cheese, and signature sauce served in a toasted bun.",

    shortDescription:
      "Classic grilled chicken burger with cheese and fresh veggies.",

    category: "Burger",

    cuisine: "American",

    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",

    gallery: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      "https://images.unsplash.com/photo-1550547660-d9450f859349",
    ],

    price: {
      base: 10.99,
      currency: "USD",
      discount: 10,
      finalPrice: 9.89,
    },

    sizes: [
      { name: "Small", price: 8.99 },
      { name: "Medium", price: 10.99 },
      { name: "Large", price: 13.99 },
    ],

    ingredients: [
      "Chicken Patty",
      "Lettuce",
      "Tomato",
      "Cheddar Cheese",
      "Burger Bun",
      "Special Sauce",
    ],

    addons: [
      {
        name: "Extra Cheese",
        price: 1.5,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      },
      {
        name: "French Fries",
        price: 2.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      },
    ],

    nutritionalInfo: {
      calories: 550,
      protein: "28g",
      carbs: "42g",
      fat: "25g",
    },

    spicyLevel: "Medium",

    preparationTime: 15,

    rating: {
      average: 4.6,
      totalReviews: 320,
    },

    stock: 25,

    isAvailable: true,

    isFeatured: true,

    isFavourite: false,

    dietary: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
    },

    tags: ["Best Seller", "Hot", "Popular"],

    createdAt: "2026-05-20T10:00:00Z",

    updatedAt: "2026-05-20T10:00:00Z",
  },

  {
    id: "dish_002",

    restaurantId: "rest_001",

    title: "Cheese Fries",

    slug: "cheese-fries",

    description:
      "Golden crispy fries topped with melted cheddar cheese, herbs, and creamy mayo sauce.",

    shortDescription:
      "Crispy fries loaded with cheese and creamy sauce.",

    category: "Snacks",

    cuisine: "American",

    image:
      "https://images.unsplash.com/photo-1576107232684-1279f390859f",

    gallery: [
      "https://images.unsplash.com/photo-1576107232684-1279f390859f",
      "https://images.unsplash.com/photo-1518013431117-eb1465fa5752",
    ],

    price: {
      base: 6.5,
      currency: "USD",
      discount: 5,
      finalPrice: 6.17,
    },

    sizes: [
      { name: "Regular", price: 6.5 },
      { name: "Large", price: 8.5 },
    ],

    ingredients: [
      "Potatoes",
      "Cheddar Cheese",
      "Herbs",
      "Mayonnaise",
    ],

    addons: [
      {
        name: "Extra Cheese Dip",
        price: 1.2,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      },
      {
        name: "Jalapenos",
        price: 0.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      },
    ],

    nutritionalInfo: {
      calories: 420,
      protein: "8g",
      carbs: "50g",
      fat: "20g",
    },

    spicyLevel: "Low",

    preparationTime: 10,

    rating: {
      average: 4.4,
      totalReviews: 210,
    },

    stock: 40,

    isAvailable: true,

    isFeatured: false,

    isFavourite: true,

    dietary: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
    },

    tags: ["Snacks", "Cheesy", "Crispy"],

    createdAt: "2026-05-20T10:00:00Z",

    updatedAt: "2026-05-20T10:00:00Z",
  },

  {
    id: "dish_003",

    restaurantId: "rest_002",

    title: "Pepperoni Pizza",

    slug: "pepperoni-pizza",

    description:
      "Classic Italian pizza loaded with spicy pepperoni, mozzarella cheese, and rich tomato sauce.",

    shortDescription:
      "Authentic pepperoni pizza with mozzarella cheese.",

    category: "Pizza",

    cuisine: "Italian",

    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",

    gallery: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      "https://images.unsplash.com/photo-1548365328-9f547fb0953b",
    ],

    price: {
      base: 14.99,
      currency: "USD",
      discount: 15,
      finalPrice: 12.74,
    },

    sizes: [
      { name: "Medium", price: 14.99 },
      { name: "Large", price: 18.99 },
    ],

    ingredients: [
      "Pizza Dough",
      "Pepperoni",
      "Mozzarella Cheese",
      "Tomato Sauce",
    ],

    addons: [
      {
        name: "Extra Pepperoni",
        price: 2.5,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      },
      {
        name: "Stuffed Crust",
        price: 3.0,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      },
    ],

    nutritionalInfo: {
      calories: 780,
      protein: "32g",
      carbs: "68g",
      fat: "35g",
    },

    spicyLevel: "Medium",

    preparationTime: 25,

    rating: {
      average: 4.8,
      totalReviews: 500,
    },

    stock: 18,

    isAvailable: true,

    isFeatured: true,

    isFavourite: false,

    dietary: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
    },

    tags: ["Italian", "Popular", "Spicy"],

    createdAt: "2026-05-20T10:00:00Z",

    updatedAt: "2026-05-20T10:00:00Z",
  },

  {
    id: "dish_004",

    restaurantId: "rest_002",

    title: "Margherita Pizza",

    slug: "margherita-pizza",

    description:
      "Traditional Margherita pizza topped with fresh basil, mozzarella cheese, and tomato sauce.",

    shortDescription:
      "Classic vegetarian pizza with fresh basil and mozzarella.",

    category: "Pizza",

    cuisine: "Italian",

    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",

    gallery: [
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
      "https://images.unsplash.com/photo-1511689660979-10d2b1aada49",
    ],

    price: {
      base: 12.99,
      currency: "USD",
      discount: 8,
      finalPrice: 11.95,
    },

    sizes: [
      { name: "Medium", price: 12.99 },
      { name: "Large", price: 16.99 },
    ],

    ingredients: [
      "Pizza Dough",
      "Mozzarella Cheese",
      "Fresh Basil",
      "Tomato Sauce",
    ],

    addons: [
      {
        name: "Extra Cheese",
        price: 2.0,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      },
      {
        name: "Olives",
        price: 1.5,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      },
    ],

    nutritionalInfo: {
      calories: 690,
      protein: "24g",
      carbs: "60g",
      fat: "28g",
    },

    spicyLevel: "Low",

    preparationTime: 22,

    rating: {
      average: 4.7,
      totalReviews: 410,
    },

    stock: 22,

    isAvailable: true,

    isFeatured: true,

    isFavourite: true,

    dietary: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
    },

    tags: ["Vegetarian", "Classic", "Italian"],

    createdAt: "2026-05-20T10:00:00Z",

    updatedAt: "2026-05-20T10:00:00Z",
  },

  {
    id: "dish_005",

    restaurantId: "rest_002",

    title: "Creamy Alfredo Pasta",

    slug: "creamy-alfredo-pasta",

    description:
      "Creamy Alfredo pasta cooked with parmesan cheese, garlic butter sauce, and fresh herbs.",

    shortDescription:
      "Rich and creamy Alfredo pasta with parmesan cheese.",

    category: "Pasta",

    cuisine: "Italian",

    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",

    gallery: [
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
    ],

    price: {
      base: 13.5,
      currency: "USD",
      discount: 12,
      finalPrice: 11.88,
    },

    sizes: [
      { name: "Regular", price: 13.5 },
      { name: "Large", price: 16.5 },
    ],

    ingredients: [
      "Pasta",
      "Parmesan Cheese",
      "Cream",
      "Garlic",
      "Butter",
    ],

    addons: [
      {
        name: "Grilled Chicken",
        price: 3.5,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      },
      {
        name: "Garlic Bread",
        price: 2.5,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      },
    ],

    nutritionalInfo: {
      calories: 720,
      protein: "20g",
      carbs: "65g",
      fat: "38g",
    },

    spicyLevel: "Low",

    preparationTime: 20,

    rating: {
      average: 4.5,
      totalReviews: 280,
    },

    stock: 15,

    isAvailable: true,

    isFeatured: false,

    isFavourite: false,

    dietary: {
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
    },

    tags: ["Creamy", "Italian", "Pasta"],

    createdAt: "2026-05-20T10:00:00Z",

    updatedAt: "2026-05-20T10:00:00Z",
  },
];
