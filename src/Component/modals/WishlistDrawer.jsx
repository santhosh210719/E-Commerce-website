import React from "react";
import { useECommerce } from "../../context/ECommerceContext";
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export const WishlistDrawer = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart
  } = useECommerce();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach(item => {
      addToCart(item, 1);
      toggleWishlist(item);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Wishlist & Saved
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for later
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center mb-4 text-rose-400">
                  <Heart className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Your wishlist is empty
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-6">
                  Save your favorite tech gear by tapping the heart icon on any product card.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white font-medium text-sm transition-all"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Saved Products
                  </span>
                  <button
                    onClick={handleMoveAllToCart}
                    className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    Move all to cart
                  </button>
                </div>

                <div className="space-y-3">
                  {wishlist.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 hover:border-gray-200 dark:hover:border-gray-700 transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-20 h-20 rounded-xl object-cover bg-white shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                              {product.title}
                            </h4>
                            <button
                              onClick={() => toggleWishlist(product)}
                              className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                              title="Remove from favorites"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-primary-600 dark:text-primary-400 font-bold mt-1">
                            ${product.price.toLocaleString()}
                          </p>
                        </div>

                        <button
                          onClick={() => handleMoveToCart(product)}
                          className="mt-3 py-1.5 px-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors self-start"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Move to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
