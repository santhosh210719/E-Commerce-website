import React from "react";
import { useECommerce } from "../context/ECommerceContext";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Star,
  CheckCircle2,
  Zap,
  TrendingUp
} from "lucide-react";
import { PRODUCTS } from "../data/products";

const Hero = () => {
  const { openQuickLook, addToCart, applyPromoCode } = useECommerce();
  const featuredHeroProduct = PRODUCTS[1]; // MacBook Pro 16" M3 Max

  const trustPillars = [
    {
      icon: Truck,
      title: "Global Express Delivery",
      description: "Free express shipping on all orders over $200"
    },
    {
      icon: ShieldCheck,
      title: "2-Year Official Warranty",
      description: "100% authentic certified devices & accessories"
    },
    {
      icon: RotateCcw,
      title: "30-Day Money Back",
      description: "No-questions-asked seamless return policy"
    },
    {
      icon: Headphones,
      title: "24/7 Dedicated Support",
      description: "Instant assistance from certified tech specialists"
    }
  ];

  const brandPartners = [
    "APPLE", "SONY", "SAMSUNG", "BOSE", "DJI", "LOGITECH"
  ];

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-12 lg:pt-12 lg:pb-16">
      {/* Background Glow Orbs */}
      <div className="absolute top-0 left-1/4 -z-10 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 -z-10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/80 border border-primary-200/60 dark:border-primary-800/60 text-primary-700 dark:text-primary-300 text-xs font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-primary-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Next-Gen M3 & AI Devices Now Available</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1]">
              Elevate Your Everyday With{" "}
              <span className="bg-gradient-to-r from-primary-600 via-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                Next-Gen Tech
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Ref!ex is your curated gateway to elite computing power, studio-grade acoustics, and precision wearable gear. Designed for creators, pros, and visionaries.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#products"
                className="py-3.5 px-7 rounded-2xl bg-primary-600 hover:bg-primary-700 active:scale-[0.99] text-white font-semibold text-sm shadow-xl shadow-primary-500/25 transition-all flex items-center gap-2 group"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => applyPromoCode("REFLEX20")}
                className="py-3.5 px-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold text-sm shadow-sm transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Claim 20% Voucher</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 border-t border-gray-200/60 dark:border-gray-800/60 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-gray-900 dark:text-white ml-1">4.9/5.0</span>
                <span>(12,400+ Verified Buyers)</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>30-Day Risk-Free Trial</span>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive Product Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl p-6 glass-card border border-gray-200/80 dark:border-gray-800/80 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                  <TrendingUp className="w-3.5 h-3.5" /> Featured Spotlight
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Save $400 Today
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800/60 mb-5 group">
                <img
                  src={featuredHeroProduct.image}
                  alt={featuredHeroProduct.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => openQuickLook(featuredHeroProduct)}
                  className="absolute inset-0 bg-gray-900/40 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold gap-2"
                >
                  Click For Quick Look
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                    {featuredHeroProduct.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-gray-700 dark:text-gray-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {featuredHeroProduct.rating} ({featuredHeroProduct.reviews})
                  </div>
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1">
                  {featuredHeroProduct.title}
                </h3>

                <div className="flex items-baseline justify-between pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-gray-900 dark:text-white">
                      ${featuredHeroProduct.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${featuredHeroProduct.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(featuredHeroProduct, 1)}
                    className="py-2.5 px-4 rounded-xl bg-primary-600 hover:bg-primary-700 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md shadow-primary-500/20"
                  >
                    Quick Add +
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Mini Badge */}
            <div className="hidden sm:flex absolute -bottom-4 -left-6 items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 shadow-xl">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-black text-sm">
                ✓
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-gray-900 dark:text-white">Same-Day Dispatch</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Order within 2 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Partners Ticker / Logos */}
        <div className="mt-16 pt-8 border-t border-gray-200/60 dark:border-gray-800/60">
          <p className="text-center text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">
            Authorized Retailer & Official Warranty Partner For
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {brandPartners.map((brand) => (
              <span
                key={brand}
                className="text-sm sm:text-base font-black tracking-widest text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Trust Pillars Grid */}
        <div id="features" className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 hover:border-primary-500/40 dark:hover:border-primary-500/40 transition-all shadow-xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/80 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  {pillar.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;