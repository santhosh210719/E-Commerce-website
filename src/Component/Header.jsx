import React, { useState } from "react";
import { useECommerce } from "../context/ECommerceContext";
import {
  Search,
  ShoppingCart,
  Heart,
  Sun,
  Moon,
  User,
  Menu,
  X,
  Sparkles,
  Zap,
  LogOut
} from "lucide-react";

const Header = () => {
  const {
    darkMode,
    toggleDarkMode,
    cartItemCount,
    cartTotal,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsAuthModalOpen,
    user,
    logout,
    searchQuery,
    setSearchQuery
  } = useECommerce();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Products", href: "#products" },
    { label: "Special Deals", href: "#deals" },
    { label: "Why Ref!ex", href: "#features" },
  ];

  return (
    <header className="sticky top-0 z-40 glass-nav border-b border-gray-200/80 dark:border-gray-800/80 transition-colors duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary-600 via-indigo-600 to-primary-700 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
        <span>Autumn Tech Fest: Use code <strong className="underline decoration-wavy">REFLEX20</strong> for 20% OFF all premium devices!</span>
      </div>

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group shrink-0 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-primary-500/25 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white flex items-center">
                Ref<span className="text-primary-600 dark:text-primary-400">!</span>ex
              </span>
              <span className="hidden sm:block text-[10px] font-semibold uppercase tracking-widest text-gray-400 -mt-1">
                Luxury Tech
              </span>
            </div>
          </a>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search MacBook, iPhone, Audio, Drones..."
                className="w-full pl-10 pr-9 py-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/70 text-gray-900 dark:text-white placeholder-gray-400 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-gray-800 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 sm:p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="View favorites"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? "text-rose-500 fill-rose-500" : ""}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors"
              title="Open shopping cart"
            >
              <ShoppingCart className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="hidden sm:inline text-xs font-bold">
                ${cartTotal.toLocaleString()}
              </span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:top-1 sm:right-1 w-5 h-5 rounded-full bg-primary-600 text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Account / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-primary-500"
                  />
                  <span className="hidden md:inline text-xs font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800 py-2 animate-fade-in z-50">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-xs font-bold text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-primary-600 hover:bg-primary-700 active:scale-[0.99] text-white text-xs font-semibold shadow-md shadow-primary-500/20 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input bar */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-9 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 animate-fade-in space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {link.label}
              </a>
            ))}

            {!user && (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2 py-2.5 rounded-xl bg-primary-600 text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                Sign In to Account
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;