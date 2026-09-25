"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { usePackages } from "@/hooks/usePackages"; // Ajusta la ruta a tu hook
import { Package } from "@/data/plans";

export interface Product extends Package {
  image: string;
  [key: string]: any;
}

export interface CartItem {
  id: string; // ID del paquete o id único custom
  quantity: number;
  customPrice?: number;
  meta?: {
    customPackage?: Partial<Product>;
    [key: string]: any;
  };
}

export interface EnrichedCartItem extends CartItem {
  product: Product | null;
  price: number;
  subtotal: number;
}

interface CartContextType {
  items: EnrichedCartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number; customPrice?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [rawItems, setRawItems] = useState<CartItem[]>([]);
  const { packages } = usePackages();
  const [isLoaded, setIsLoaded] = useState(false);
  const CART_STORAGE_KEY = "decora_cart_packages_v1";

  // Cargar desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setRawItems(JSON.parse(saved) as CartItem[]);
      }
    } catch (error) {
      console.error("Error al cargar el carrito de localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persistir en localStorage
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(rawItems));
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage:", error);
    }
  }, [rawItems, isLoaded]);

  // Mapear y enriquecer los items dinámicamente según el paquete y el idioma activo
  const items = useMemo(() => {
    return rawItems.map((raw) => {
      // 1. Buscar coincidencia exacta en los paquetes traducidos del hook
      const matchedPackage = packages.find((p) => p.id === raw.id) || null;

      // 2. Fusionar los datos del paquete con las sobreescrituras en meta.customPackage
      let finalProduct: Product | null = null;

      if (matchedPackage || raw.meta?.customPackage) {
        finalProduct = {
          id: raw.id,
          name: matchedPackage?.name || raw.meta?.customPackage?.name || "Producto / Paquete",
          price: matchedPackage?.price || 0,
          features: matchedPackage?.features || [],
          image: raw.meta?.customPackage?.image || "/placeholder.jpg",
          ...matchedPackage,
          ...raw.meta?.customPackage, // Sobreescrituras dinámicas
        };
      }

      // 3. Determinar precio final: customPrice explícito -> precio sobreescrito -> paquete -> 0
      const price =
        raw.customPrice !== undefined && raw.customPrice >= 0
          ? raw.customPrice
          : finalProduct?.price || 0;

      const subtotal = price * raw.quantity;

      return {
        ...raw,
        product: finalProduct,
        price,
        subtotal,
      };
    });
  }, [rawItems, packages]);

  const addItem = (
    newItem: Omit<CartItem, "quantity"> & { quantity?: number; customPrice?: number }
  ) => {
    const qty = newItem.quantity ?? 1;

    setRawItems((prev) => {
      // Comparación por ID y customPrice para no agrupar montos personalizados diferentes
      const existingIndex = prev.findIndex(
        (i) => i.id === newItem.id && i.customPrice === newItem.customPrice
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
          meta: {
            ...updated[existingIndex].meta,
            ...newItem.meta,
            customPackage: {
              ...updated[existingIndex].meta?.customPackage,
              ...newItem.meta?.customPackage,
            },
          },
        };
        return updated;
      }

      return [...prev, { ...newItem, quantity: qty }];
    });
  };

  const removeItem = (id: string) => {
    setRawItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return removeItem(id);
    setRawItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setRawItems([]);

  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.subtotal, 0),
    [items]
  );

  const itemCount = useMemo(
    () => rawItems.reduce((acc, item) => acc + item.quantity, 0),
    [rawItems]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}