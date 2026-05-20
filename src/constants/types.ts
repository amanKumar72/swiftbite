export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  cuisine: string[];
  image: string;
  logo: string;
  coverImage: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  rating: {
    average: number;
    totalReviews: number;
  };
  delivery: {
    available: boolean;
    deliveryFee: number;
    estimatedTime: string;
  };
  tags: string[];
  isOpen: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Dish {
  id: string;
  restaurantId: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  cuisine: string;
  image: string;
  gallery: string[];
  price: {
    base: number;
    currency: string;
    discount: number;
    finalPrice: number;
  };
  sizes: {
    name: string;
    price: number;
  }[];
  ingredients: string[];
  addons: {
    name: string;
    price: number;
  }[];
  nutritionalInfo: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  spicyLevel: string;
  preparationTime: string;
  rating: {
    average: number;
    totalReviews: number;
  };
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isFavourite: boolean;
  dietary: {
    isVegetarian: boolean;
    isVegan: boolean;
    isGlutenFree: boolean;
  };
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
