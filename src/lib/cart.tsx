import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { MenuItem, Restaurant } from "@/data/restaurants";

export type CartLine = {
  item: MenuItem;
  qty: number;
};

type CartState = {
  restaurantId: string | null;
  restaurantName: string | null;
  lines: Record<string, CartLine>;
};

type CartContextValue = CartState & {
  add: (restaurant: Restaurant, item: MenuItem) => void;
  remove: (itemId: string) => void;
  setQty: (itemId: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "morsel.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>({
    restaurantId: null,
    restaurantName: null,
    lines: {},
  });

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setState(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    } catch {
      // ignore
    }
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const lines = Object.values(state.lines);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.item.price, 0);

    return {
      ...state,
      count,
      subtotal,
      add: (restaurant, item) => {
        setState((prev) => {
          // Switching restaurants resets cart
          if (prev.restaurantId && prev.restaurantId !== restaurant.id) {
            return {
              restaurantId: restaurant.id,
              restaurantName: restaurant.name,
              lines: { [item.id]: { item, qty: 1 } },
            };
          }
          const existing = prev.lines[item.id];
          return {
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            lines: {
              ...prev.lines,
              [item.id]: { item, qty: (existing?.qty ?? 0) + 1 },
            },
          };
        });
      },
      remove: (itemId) =>
        setState((prev) => {
          const next = { ...prev.lines };
          delete next[itemId];
          const empty = Object.keys(next).length === 0;
          return {
            restaurantId: empty ? null : prev.restaurantId,
            restaurantName: empty ? null : prev.restaurantName,
            lines: next,
          };
        }),
      setQty: (itemId, qty) =>
        setState((prev) => {
          if (qty <= 0) {
            const next = { ...prev.lines };
            delete next[itemId];
            const empty = Object.keys(next).length === 0;
            return {
              restaurantId: empty ? null : prev.restaurantId,
              restaurantName: empty ? null : prev.restaurantName,
              lines: next,
            };
          }
          const existing = prev.lines[itemId];
          if (!existing) return prev;
          return {
            ...prev,
            lines: { ...prev.lines, [itemId]: { ...existing, qty } },
          };
        }),
      clear: () => setState({ restaurantId: null, restaurantName: null, lines: {} }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
