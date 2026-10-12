import React from "react";
import { useECommerce } from "../context/ECommerceContext";
import {
  Star,
  Eye,
  Heart,
  ShoppingCart,
  Truck,
  Check,
  Zap
} from "lucide-react";

export const ProductCard = ({ product }) => {
  const {
    addToCart,
    openQuickLook,
    toggleWishlist,
    isInWishlist
  } = useECommerce();

  const isFavorite = isInWishlist(product.id);

  return (
    <div className="group rounded-3xl border border-gray-200/80 bg-white p-5 shadow-xs hover:shadow-xl hover:border-primary-500/30 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-primary-500/30 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container with Badges & Hover Actions */}
        <div className="relative h-60 w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800/60 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.badge && (
              <span
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-xs ${product.badgeColor}`}
              >
                {product.badge}
              </span>
            )}
            {product.discount && (
              <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-rose-500 text-white shadow-xs">
                {product.discount}
              </span>
            )}
          </div>

          {/* Favorite & Quick Look Floating Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-2 rounded-xl backdrop-blur-md shadow-md transition-all active:scale-90 ${
                isFavorite
                  ? "bg-rose-50 dark:bg-rose-950/80 text-rose-500"
                  : "bg-white/90 dark:bg-gray-800/90 text-gray-500 hover:text-rose-500 dark:text-gray-300"
              }`}
              title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? "fill-rose-500" : ""}`}
              />
            </button>

            <button
              onClick={() => openQuickLook(product)}
              className="p-2 rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white backdrop-blur-md shadow-md transition-all hover:scale-105"
              title="Quick look details"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Look overlay button on hover */}
          <button
            onClick={() => openQuickLook(product)}
            className="absolute bottom-3 inset-x-3 py-2 rounded-xl bg-gray-900/80 dark:bg-gray-800/90 backdrop-blur-md text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" /> Quick Preview
          </button>
        </div>

        {/* Content */}
        <div className="pt-4">
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-900 dark:text-white">
                {product.rating}
              </span>
              <span className="text-gray-400 text-[11px]">
                ({product.reviews})
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => openQuickLook(product)}
            className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer transition-colors leading-snug min-h-[2.5rem]"
          >
            {product.title}
          </h3>

          {/* Delivery & Stock Perks */}
          <div className="mt-2.5 flex items-center gap-3 text-[11px] text-gray-500 dark:text-gray-400">
            {product.fastDelivery && (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <Truck className="w-3.5 h-3.5" /> Fast Delivery
              </span>
            )}
            <span className="flex items-center gap-1">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  product.inStock ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing and Add to Cart Button */}
      <div className="mt-5 pt-3.5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-extrabold text-gray-900 dark:text-white">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-[10px] text-gray-400 block -mt-0.5">Taxes included</span>
        </div>

        <button
          onClick={() => addToCart(product, 1)}
          disabled={!product.inStock}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm ${
            product.inStock
              ? "bg-primary-600 hover:bg-primary-700 text-white shadow-primary-500/20"
              : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Add
        </button>
      </div>
    </div>
  );
};
