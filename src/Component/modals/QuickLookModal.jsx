import React, { useState } from "react";
import { useECommerce } from "../../context/ECommerceContext";
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Check
} from "lucide-react";

export const QuickLookModal = () => {
  const {
    quickLookProduct,
    closeQuickLook,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useECommerce();

  const [quantity, setQuantity] = useState(1);

  if (!quickLookProduct) return null;

  const product = quickLookProduct;
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    closeQuickLook();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={closeQuickLook}
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-fade-in z-10">
        <button
          onClick={closeQuickLook}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-500 hover:text-gray-900 dark:hover:text-white shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Product Image Area */}
          <div className="relative bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center p-8 min-h-[340px]">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[300px] w-full object-contain rounded-xl hover:scale-105 transition-transform duration-300"
            />
            {product.badge && (
              <span
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${product.badgeColor}`}
              >
                {product.badge}
              </span>
            )}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-xs font-semibold">
                {product.discount}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-gray-900/70 text-white text-xs font-medium backdrop-blur-md">
                {product.category}
              </span>
            </div>
          </div>

          {/* Product Details Area */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {product.rating}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({product.reviews} reviews)
                </span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-3">
                {product.title}
              </h2>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Specs */}
              {product.specs && (
                <div className="mb-6 space-y-1.5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Key Highlights
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {product.specs.map((spec, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium"
                      >
                        <Check className="w-3 h-3 text-primary-500" />
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 px-5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                    product.inStock
                      ? "bg-primary-600 hover:bg-primary-700 active:scale-[0.99] text-white shadow-primary-500/25"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed shadow-none"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isWishlisted
                      ? "border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-500"
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
                  }`}
                  title={isWishlisted ? "Remove from favorites" : "Save to favorites"}
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-rose-500" : ""}`}
                  />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="flex flex-col items-center text-[11px] text-gray-500 dark:text-gray-400">
                  <Truck className="w-4 h-4 text-primary-500 mb-1" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex flex-col items-center text-[11px] text-gray-500 dark:text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 mb-1" />
                  <span>2-Yr Warranty</span>
                </div>
                <div className="flex flex-col items-center text-[11px] text-gray-500 dark:text-gray-400">
                  <RotateCcw className="w-4 h-4 text-amber-500 mb-1" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
