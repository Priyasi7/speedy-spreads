import burger from "@/assets/r-burger.jpg";
import sushi from "@/assets/r-sushi.jpg";
import pizza from "@/assets/r-pizza.jpg";
import indian from "@/assets/r-indian.jpg";
import ramen from "@/assets/r-ramen.jpg";
import dessert from "@/assets/r-dessert.jpg";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  veg?: boolean;
  signature?: boolean;
};

export type Restaurant = {
  id: string;
  name: string;
  tagline: string;
  cuisine: string;
  image: string;
  rating: number;
  reviews: number;
  eta: string;
  priceForTwo: number;
  distance: string;
  tags: string[];
  menu: { section: string; items: MenuItem[] }[];
};

export const categories = [
  { id: "all", label: "All" },
  { id: "burger", label: "Burgers" },
  { id: "sushi", label: "Sushi" },
  { id: "pizza", label: "Pizza" },
  { id: "indian", label: "Indian" },
  { id: "ramen", label: "Ramen" },
  { id: "dessert", label: "Dessert" },
];

export const restaurants: Restaurant[] = [
  {
    id: "ember-grill",
    name: "Ember & Smoke",
    tagline: "Wood-fired smash burgers, salt & fat & fire.",
    cuisine: "burger",
    image: burger,
    rating: 4.7,
    reviews: 2143,
    eta: "25–30 min",
    priceForTwo: 480,
    distance: "1.2 km",
    tags: ["Smash Burger", "Late Night", "Best Seller"],
    menu: [
      {
        section: "Signatures",
        items: [
          { id: "b1", name: "Double Smash", description: "Two beef patties, aged cheddar, ember onions, house bun.", price: 320, signature: true },
          { id: "b2", name: "Truffle Stack", description: "Wagyu blend, black truffle aioli, gruyère.", price: 520, signature: true },
          { id: "b3", name: "Smoke Chicken", description: "Buttermilk-brined thigh, chipotle mayo, slaw.", price: 280 },
        ],
      },
      {
        section: "Sides",
        items: [
          { id: "b4", name: "Hand-cut Frites", description: "Confit duck fat, smoked salt.", price: 180, veg: true },
          { id: "b5", name: "Charred Corn", description: "Cotija, lime, espelette.", price: 160, veg: true },
        ],
      },
    ],
  },
  {
    id: "kuro-omakase",
    name: "Kuro Omakase",
    tagline: "Eight courses of silence and salt.",
    cuisine: "sushi",
    image: sushi,
    rating: 4.9,
    reviews: 982,
    eta: "35–40 min",
    priceForTwo: 1800,
    distance: "2.4 km",
    tags: ["Omakase", "Premium", "Chef's Pick"],
    menu: [
      {
        section: "Nigiri",
        items: [
          { id: "s1", name: "Otoro", description: "Bluefin belly, brushed with soy.", price: 680, signature: true },
          { id: "s2", name: "Hokkaido Uni", description: "Sea urchin, nori band, fresh wasabi.", price: 720, signature: true },
          { id: "s3", name: "Aji", description: "Spanish mackerel, ginger, scallion.", price: 280 },
        ],
      },
      {
        section: "Plates",
        items: [
          { id: "s4", name: "Black Cod Saikyo", description: "Miso-marinated cod, charred leek.", price: 880 },
        ],
      },
    ],
  },
  {
    id: "osteria-noir",
    name: "Osteria Noir",
    tagline: "Naples by way of midnight.",
    cuisine: "pizza",
    image: pizza,
    rating: 4.6,
    reviews: 1547,
    eta: "20–25 min",
    priceForTwo: 620,
    distance: "0.8 km",
    tags: ["Wood-Fired", "Italian"],
    menu: [
      {
        section: "Pizze",
        items: [
          { id: "p1", name: "Margherita Vera", description: "San Marzano, fior di latte, basil.", price: 420, veg: true, signature: true },
          { id: "p2", name: "Diavola", description: "Spicy salame, calabrian chili, mozzarella.", price: 520 },
          { id: "p3", name: "Tartufo Bianco", description: "White cream, mushrooms, truffle.", price: 720, veg: true },
        ],
      },
    ],
  },
  {
    id: "saffron-ember",
    name: "Saffron & Ember",
    tagline: "Royal kitchens, contemporary ash.",
    cuisine: "indian",
    image: indian,
    rating: 4.8,
    reviews: 3204,
    eta: "30–35 min",
    priceForTwo: 750,
    distance: "1.7 km",
    tags: ["North Indian", "Tandoor", "Best Seller"],
    menu: [
      {
        section: "From the Tandoor",
        items: [
          { id: "i1", name: "Butter Chicken", description: "24-hour marinated, tomato-cashew gravy.", price: 420, signature: true },
          { id: "i2", name: "Dal Makhani", description: "Black lentils, slow-cooked overnight.", price: 320, veg: true, signature: true },
          { id: "i3", name: "Garlic Naan", description: "Hand-stretched, charred, brushed butter.", price: 80, veg: true },
        ],
      },
    ],
  },
  {
    id: "izakaya-tsuki",
    name: "Izakaya Tsuki",
    tagline: "Broth simmered for thirty hours.",
    cuisine: "ramen",
    image: ramen,
    rating: 4.7,
    reviews: 1820,
    eta: "20–25 min",
    priceForTwo: 560,
    distance: "1.0 km",
    tags: ["Ramen", "Japanese"],
    menu: [
      {
        section: "Ramen",
        items: [
          { id: "r1", name: "Tonkotsu", description: "Pork bone broth, chashu, ajitama.", price: 460, signature: true },
          { id: "r2", name: "Black Garlic Shoyu", description: "Soy broth, charred garlic oil.", price: 440 },
          { id: "r3", name: "Spicy Miso", description: "Red miso, ground pork, chili oil.", price: 480 },
        ],
      },
    ],
  },
  {
    id: "noir-patisserie",
    name: "Noir Pâtisserie",
    tagline: "Sweet, dark, deliberate.",
    cuisine: "dessert",
    image: dessert,
    rating: 4.8,
    reviews: 940,
    eta: "15–20 min",
    priceForTwo: 380,
    distance: "0.6 km",
    tags: ["Dessert", "Patisserie"],
    menu: [
      {
        section: "Sweets",
        items: [
          { id: "d1", name: "Dark Chocolate Mille-feuille", description: "70% Valrhona, berries, gold.", price: 280, veg: true, signature: true },
          { id: "d2", name: "Burnt Basque Cheesecake", description: "Caramelized top, soft center.", price: 240, veg: true },
          { id: "d3", name: "Espresso Tartufo", description: "Frozen mousse, cocoa nibs.", price: 220, veg: true },
        ],
      },
    ],
  },
];

export const findRestaurant = (id: string) => restaurants.find((r) => r.id === id);
