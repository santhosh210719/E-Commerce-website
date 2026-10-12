import React, { useMemo } from "react";
import { useECommerce } from "../context/ECommerceContext";
import { PRODUCTS, CATEGORIES } from "../data/products";
import { ProductCard } from "./ProductCard";
import {
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  RotateCcw,
  Sparkles,
  Zap,
  Tag
} from "lucide-react";

export const ProductLayout = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    onlyInStock,
    setOnlyInStock,
    applyPromoCode
  } = useECommerce();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCategory) {
          return false;
        }
      }
      // Price range filter
      if (item.price > priceRange) {
        return false;
      }
      // In-stock filter
      if (onlyInStock && !item.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.id - b.id; // default featured
    });
  }, [selectedCategory, searchQuery, sortBy, priceRange, onlyInStock]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortBy("featured");
    setPriceRange(4000);
    setOnlyInStock(false);
  };

  return (
    <section id="products" className="py-12 md:py-16 bg-gray-50/60 dark:bg-gray-950/60 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-100 dark:bg-primary-950/80 text-primary-700 dark:text-primary-300 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Curated Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Featured Flagship Devices
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
              Engineered for extreme performance, uncompromised battery life, and sublime aesthetics.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            <span>Showing <strong className="text-gray-900 dark:text-white">{filteredProducts.length}</strong> of {PRODUCTS.length} devices</span>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {CATEGORIES.map((cat) => {
            const count = cat === "All"
              ? PRODUCTS.length
              : PRODUCTS.filter(p => p.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-4 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? "bg-primary-600 text-white shadow-md shadow-primary-500/25 scale-102"
                    : "bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter and Sorting Control Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 mb-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Price Range Slider */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Max Price:
              </span>
              <input
                type="range"
                min="100"
                max="4000"
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-32 sm:w-40 accent-primary-600 cursor-pointer"
              />
              <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                ${priceRange.toLocaleString()}
              </span>
            </div>

            {/* In-Stock Toggle */}
            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
              <span>In-stock only</span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-1.5 px-3 text-xs font-semibold rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Reset Filter Button if active */}
            {(selectedCategory !== "All" || searchQuery !== "" || priceRange < 4000 || onlyInStock) && (
              <button
                onClick={resetFilters}
                className="py-1.5 px-3 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-1.5 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800 p-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              No matching products found
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
              We couldn't find any products matching your current filters. Try relaxing your search criteria or resetting filters.
            </p>
            <button
              onClick={resetFilters}
              className="py-2.5 px-6 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-md shadow-primary-500/20"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Special Promo Banner */}
        <div id="deals" className="mt-16 rounded-3xl bg-gradient-to-r from-primary-900 via-indigo-900 to-purple-950 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-primary-500/20">
          <div className="absolute right-0 top-0 -bottom-10 w-96 bg-primary-500/10 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md text-amber-300 mb-4">
              <Zap className="w-3.5 h-3.5 fill-amber-300" /> Exclusive VIP Discount
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight mb-3">
              Get 20% Off Everything With Code: <span className="text-amber-300 underline decoration-wavy">REFLEX20</span>
            </h3>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Unlock extraordinary savings across our entire catalogue including Apple M3 Macs, Sony Noise Cancelling acoustics, and Garmin smartwatches. Limited redemptions available.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => applyPromoCode("REFLEX20")}
                className="py-3 px-6 rounded-xl bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs shadow-lg transition-all"
              >
                Auto-Apply Voucher
              </button>
              <span className="text-xs text-gray-400">
                Applied directly to your cart at checkout.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
