import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";

const ECommerceContext = createContext();

export const useECommerce = () => {
  const context = useContext(ECommerceContext);
  if (!context) {
    throw new Error("useECommerce must be used within an ECommerceProvider");
  }
  return context;
};

export const ECommerceProvider = ({ children }) => {
  // --- Dark Mode State ---
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("reflex_dark_mode");
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    localStorage.setItem("reflex_dark_mode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // --- Toast Notifications State ---
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // --- Cart State ---
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("reflex_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("reflex_cart", JSON.stringify(cart));
  }, [cart]);

  // Promo code discounts
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "REFLEX20" || cleanCode === "SAVE20") {
      setDiscountPercent(20);
      setPromoCode(cleanCode);
      showToast("Coupon applied! 20% discount granted! 🎉", "success");
      return { success: true, message: "20% discount applied!" };
    } else if (cleanCode === "WELCOME10") {
      setDiscountPercent(10);
      setPromoCode(cleanCode);
      showToast("Coupon applied! 10% discount granted! 🎉", "success");
      return { success: true, message: "10% discount applied!" };
    } else {
      showToast("Invalid promo code. Try 'REFLEX20'", "error");
      return { success: false, message: "Invalid promo code" };
    }
  };

  const removePromoCode = () => {
    setPromoCode("");
    setDiscountPercent(0);
    showToast("Promo code removed", "info");
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity > 1 ? quantity + "x " : ""}"${product.title.slice(0, 24)}..." to cart! 🛒`);
  };

  const removeFromCart = (productId) => {
    const item = cart.find(i => i.product.id === productId);
    setCart(prev => prev.filter(i => i.product.id !== productId));
    if (item) {
      showToast(`Removed "${item.product.title.slice(0, 20)}..." from cart`, "info");
    }
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode("");
    setDiscountPercent(0);
  };

  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const estimatedShipping = cartSubtotal > 200 || cartSubtotal === 0 ? 0 : 25;
  const estimatedTax = Math.round((cartSubtotal - discountAmount) * 0.08);
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + estimatedShipping + estimatedTax);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // --- Wishlist State ---
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("reflex_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("reflex_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed from favorites`, "info");
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Saved to favorites! ❤️`, "success");
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // --- Modals & Drawers State ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickLookProduct, setQuickLookProduct] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openQuickLook = (product) => {
    setQuickLookProduct(product);
  };

  const closeQuickLook = () => {
    setQuickLookProduct(null);
  };

  // --- User Account State ---
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("reflex_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("reflex_user", JSON.stringify(userData));
    showToast(`Welcome back, ${userData.name}! 👋`, "success");
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("reflex_user");
    showToast("Signed out successfully", "info");
  };

  // --- Search & Filters State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState(4000);
  const [onlyInStock, setOnlyInStock] = useState(false);

  // --- Order Placement ---
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("reflex_orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const placeOrder = (orderInfo) => {
    const newOrder = {
      id: "REF-" + Math.floor(100000 + Math.random() * 900000),
      items: [...cart],
      total: cartTotal,
      subtotal: cartSubtotal,
      discount: discountAmount,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      shippingInfo: orderInfo
    };

    setOrders(prev => [newOrder, ...prev]);
    localStorage.setItem("reflex_orders", JSON.stringify([newOrder, ...orders]));
    clearCart();
    setIsCheckoutOpen(false);

    // Trigger celebration confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.warn("Confetti animation:", e);
    }

    showToast(`Order #${newOrder.id} confirmed! Thank you! 🎉`, "success");
    return newOrder;
  };

  return (
    <ECommerceContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        toasts,
        showToast,
        removeToast,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        discountPercent,
        discountAmount,
        promoCode,
        applyPromoCode,
        removePromoCode,
        estimatedShipping,
        estimatedTax,
        cartTotal,
        cartItemCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickLookProduct,
        openQuickLook,
        closeQuickLook,
        isAuthModalOpen,
        setIsAuthModalOpen,
        user,
        login,
        logout,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        priceRange,
        setPriceRange,
        onlyInStock,
        setOnlyInStock,
        orders,
        placeOrder
      }}
    >
      {children}
    </ECommerceContext.Provider>
  );
};
