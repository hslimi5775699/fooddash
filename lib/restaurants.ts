export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
};

export type Restaurant = {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  emoji: string;
  menu: MenuItem[];
};

export const restaurants: Restaurant[] = [
  {
    id: "burger-house",
    name: "Burger House",
    category: "Burgers",
    description: "Fresh burgers made with quality ingredients.",
    rating: 4.8,
    deliveryTime: "20–30 min",
    deliveryFee: 2.99,
    emoji: "🍔",
    menu: [
      {
        id: "classic-burger",
        name: "Classic Burger",
        description: "Beef patty, cheddar, lettuce and house sauce.",
        price: 12.99,
        emoji: "🍔",
      },
      {
        id: "double-burger",
        name: "Double Burger",
        description: "Two beef patties with melted cheese.",
        price: 16.99,
        emoji: "🍔",
      },
      {
        id: "fries",
        name: "French Fries",
        description: "Golden and crispy potato fries.",
        price: 4.99,
        emoji: "🍟",
      },
    ],
  },
  {
    id: "pizza-corner",
    name: "Pizza Corner",
    category: "Pizza",
    description: "Stone-baked pizzas with fresh toppings.",
    rating: 4.7,
    deliveryTime: "25–40 min",
    deliveryFee: 3.49,
    emoji: "🍕",
    menu: [
      {
        id: "margherita",
        name: "Margherita Pizza",
        description: "Tomato sauce, mozzarella and basil.",
        price: 14.99,
        emoji: "🍕",
      },
      {
        id: "pepperoni",
        name: "Pepperoni Pizza",
        description: "Mozzarella and spicy pepperoni.",
        price: 17.99,
        emoji: "🍕",
      },
    ],
  },
  {
    id: "sushi-studio",
    name: "Sushi Studio",
    category: "Sushi",
    description: "Fresh sushi rolls prepared daily.",
    rating: 4.9,
    deliveryTime: "30–45 min",
    deliveryFee: 3.99,
    emoji: "🍣",
    menu: [
      {
        id: "salmon-roll",
        name: "Salmon Roll",
        description: "Salmon, seasoned rice and seaweed.",
        price: 13.99,
        emoji: "🍣",
      },
      {
        id: "avocado-roll",
        name: "Avocado Roll",
        description: "Fresh avocado wrapped in sushi rice.",
        price: 9.99,
        emoji: "🥑",
      },
    ],
  },
  {
    id: "green-bowl",
    name: "Green Bowl",
    category: "Healthy",
    description: "Colorful bowls and fresh ingredients.",
    rating: 4.6,
    deliveryTime: "15–25 min",
    deliveryFee: 1.99,
    emoji: "🥗",
    menu: [
      {
        id: "chicken-bowl",
        name: "Chicken Power Bowl",
        description: "Grilled chicken, quinoa and vegetables.",
        price: 15.99,
        emoji: "🥗",
      },
      {
        id: "veggie-bowl",
        name: "Veggie Bowl",
        description: "Seasonal vegetables, rice and tahini.",
        price: 12.99,
        emoji: "🥦",
      },
    ],
  },
  {
    id: "taco-street",
    name: "Taco Street",
    category: "Mexican",
    description: "Bold flavors and freshly prepared tacos.",
    rating: 4.7,
    deliveryTime: "20–35 min",
    deliveryFee: 2.49,
    emoji: "🌮",
    menu: [
      {
        id: "beef-tacos",
        name: "Beef Tacos",
        description: "Three tacos with seasoned beef and salsa.",
        price: 13.49,
        emoji: "🌮",
      },
      {
        id: "chicken-burrito",
        name: "Chicken Burrito",
        description: "Chicken, rice, beans and fresh salsa.",
        price: 14.49,
        emoji: "🌯",
      },
    ],
  },
  {
    id: "sweet-spot",
    name: "Sweet Spot",
    category: "Desserts",
    description: "Desserts and sweet treats for every mood.",
    rating: 4.8,
    deliveryTime: "15–30 min",
    deliveryFee: 2.99,
    emoji: "🍰",
    menu: [
      {
        id: "cheesecake",
        name: "Classic Cheesecake",
        description: "Creamy cheesecake with berry topping.",
        price: 7.99,
        emoji: "🍰",
      },
      {
        id: "brownie",
        name: "Chocolate Brownie",
        description: "Rich chocolate brownie.",
        price: 6.49,
        emoji: "🍫",
      },
    ],
  },
];

export function getRestaurant(id: string) {
  return restaurants.find((restaurant) => restaurant.id === id);
}