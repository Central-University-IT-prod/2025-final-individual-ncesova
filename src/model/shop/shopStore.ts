import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ShopItemType =
  | "hairColor"
  | "topColor"
  | "bottomColor"
  | "shoeColor"
  | "skinColor";

export type ShopItem = {
  id: string;
  name: string;
  type: ShopItemType;
  value: string;
  price: number;
  purchased: boolean;
  variant?: "tshirt" | "longsleeve"; // For tops only
};

interface ShopStore {
  items: ShopItem[];
  purchaseItem: (itemId: string) => void;
}

const initialItems: ShopItem[] = [
  // Skin colors
  {
    id: "skin-1",
    name: "Светлый",
    type: "skinColor",
    value: "#fffbeb",
    price: 500,
    purchased: true, // Default skin color is already purchased
  },
  {
    id: "skin-2",
    name: "Бежевый",
    type: "skinColor",
    value: "#fde68a",
    price: 500,
    purchased: false,
  },
  {
    id: "skin-3",
    name: "Золотистый",
    type: "skinColor",
    value: "#fcd34d",
    price: 500,
    purchased: false,
  },
  {
    id: "skin-4",
    name: "Смуглый",
    type: "skinColor",
    value: "#fbbf24",
    price: 500,
    purchased: false,
  },
  {
    id: "skin-5",
    name: "Оливковый",
    type: "skinColor",
    value: "#f59e0b",
    price: 500,
    purchased: false,
  },
  {
    id: "skin-6",
    name: "Темный",
    type: "skinColor",
    value: "#b45309",
    price: 500,
    purchased: false,
  },
  // Hair colors
  {
    id: "hair-1",
    name: "Черный",
    type: "hairColor",
    value: "#000000",
    price: 100,
    purchased: false,
  },
  {
    id: "hair-2",
    name: "Блонд",
    type: "hairColor",
    value: "#FFD700",
    price: 150,
    purchased: false,
  },
  {
    id: "hair-3",
    name: "Каштановый",
    type: "hairColor",
    value: "#8B4513",
    price: 120,
    purchased: false,
  },
  // T-shirts
  {
    id: "top-1",
    name: "Белая футболка",
    type: "topColor",
    value: "#ffffff",
    price: 200,
    purchased: false,
    variant: "tshirt",
  },
  {
    id: "top-2",
    name: "Черная футболка",
    type: "topColor",
    value: "#000000",
    price: 200,
    purchased: false,
    variant: "tshirt",
  },
  {
    id: "top-3",
    name: "Красная футболка",
    type: "topColor",
    value: "#dc2626",
    price: 200,
    purchased: false,
    variant: "tshirt",
  },
  {
    id: "top-4",
    name: "Зеленая футболка",
    type: "topColor",
    value: "#15803d",
    price: 200,
    purchased: false,
    variant: "tshirt",
  },
  {
    id: "top-5",
    name: "Синяя футболка",
    type: "topColor",
    value: "#1e40af",
    price: 200,
    purchased: false,
    variant: "tshirt",
  },
  // Longsleeves
  {
    id: "top-6",
    name: "Белый лонгслив",
    type: "topColor",
    value: "#ffffff",
    price: 300,
    purchased: false,
    variant: "longsleeve",
  },
  {
    id: "top-7",
    name: "Черный лонгслив",
    type: "topColor",
    value: "#000000",
    price: 300,
    purchased: false,
    variant: "longsleeve",
  },
  {
    id: "top-8",
    name: "Серый лонгслив",
    type: "topColor",
    value: "#4b5563",
    price: 300,
    purchased: false,
    variant: "longsleeve",
  },
  {
    id: "top-9",
    name: "Темно-синий лонгслив",
    type: "topColor",
    value: "#1e3a8a",
    price: 300,
    purchased: false,
    variant: "longsleeve",
  },
  // Pants
  {
    id: "bottom-1",
    name: "Черные штаны",
    type: "bottomColor",
    value: "#000000",
    price: 250,
    purchased: false,
  },
  {
    id: "bottom-2",
    name: "Синие джинсы",
    type: "bottomColor",
    value: "#1e3a8a",
    price: 250,
    purchased: false,
  },
  {
    id: "bottom-3",
    name: "Бежевые штаны",
    type: "bottomColor",
    value: "#92400e",
    price: 250,
    purchased: false,
  },
  {
    id: "bottom-4",
    name: "Серые штаны",
    type: "bottomColor",
    value: "#4b5563",
    price: 250,
    purchased: false,
  },
  {
    id: "bottom-5",
    name: "Хаки штаны",
    type: "bottomColor",
    value: "#3f6212",
    price: 250,
    purchased: false,
  },
  // Shoes
  {
    id: "shoe-1",
    name: "Черные кроссовки",
    type: "shoeColor",
    value: "#000000",
    price: 400,
    purchased: false,
  },
  {
    id: "shoe-2",
    name: "Белые кроссовки",
    type: "shoeColor",
    value: "#ffffff",
    price: 400,
    purchased: false,
  },
  {
    id: "shoe-3",
    name: "Красные кроссовки",
    type: "shoeColor",
    value: "#dc2626",
    price: 400,
    purchased: false,
  },
  {
    id: "shoe-4",
    name: "Синие кроссовки",
    type: "shoeColor",
    value: "#1e40af",
    price: 400,
    purchased: false,
  },
  {
    id: "shoe-5",
    name: "Серые кроссовки",
    type: "shoeColor",
    value: "#4b5563",
    price: 400,
    purchased: false,
  },
];

export const useShopStore = create<ShopStore>()(
  persist(
    (set) => ({
      items: initialItems,
      purchaseItem: (itemId: string) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, purchased: true } : item,
          ),
        })),
    }),
    {
      name: "shop-storage",
    },
  ),
);
