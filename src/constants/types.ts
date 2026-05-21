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
    estimatedTime: number;
  };
  tags: string[];
  isOpen: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}
export type AddonType = {
  name: string;
  price: number;
  image?: string;
};
export type PortionType = {
  name: string;
  price: number;
};
export type NutritionalInfoType = {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
};
export type DietaryType = {
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
};
export type PriceType = {
  base: number;
  currency: string;
  discount: number;
  finalPrice: number;
};
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
  price: PriceType;
  sizes:PortionType[];
  ingredients: string[];
  addons: AddonType[];
  nutritionalInfo: NutritionalInfoType;
  spicyLevel: string;
  preparationTime: number;
  rating: {
    average: number;
    totalReviews: number;
  };
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isFavourite: boolean;
  dietary: DietaryType;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  dishId: string;
  restaurantId: string;
  size: PortionType;
  addons: AddonType[];
  finalPrice: number;
  deliveryFee: number;
  deliveryTime: number;
  deliveryLocation?: string;
  quantity: number;
}

export interface User{
  _id: string;
  avatar: {
    _id: string;
    localPath: string;
    url: string;
  };
  createdAt: string;
  email: string;
  isEmailVerified: boolean;
  loginType: string;
  role: string;
  updatedAt: string;
  username: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  }
}