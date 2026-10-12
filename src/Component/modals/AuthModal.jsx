import React, { useState } from "react";
import { useECommerce } from "../../context/ECommerceContext";
import { X, User, Lock, Mail, Sparkles, Check } from "lucide-react";

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useECommerce();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: name || (isRegister ? "New Member" : "Sanjay"),
      email: email || "sanjay@reflex.store",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    });
  };

  const handleDemoLogin = () => {
    login({
      name: "Sanjay",
      email: "sanjay@reflex.store",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-fade-in z-10 p-6 md:p-8">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-950/80 text-primary-600 dark:text-primary-400 mx-auto flex items-center justify-center mb-3">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {isRegister ? "Create Your Account" : "Welcome to Ref!ex"}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {isRegister
              ? "Join elite shoppers enjoying exclusive tech perks"
              : "Sign in to track orders and save your wishlist"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegister && (
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Sanjay"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                placeholder="sanjay@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 active:scale-[0.99] text-white font-semibold text-xs transition-all shadow-md shadow-primary-500/25 mt-2"
          >
            {isRegister ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-900 px-2 text-gray-400 text-[10px]">
              Or 1-Click Fast Access
            </span>
          </div>
        </div>

        <button
          onClick={handleDemoLogin}
          type="button"
          className="w-full py-2.5 px-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2 transition-colors"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          Auto-Login as Demo VIP Member
        </button>

        <p className="mt-5 text-center text-xs text-gray-500 dark:text-gray-400">
          {isRegister ? "Already have an account?" : "Don't have an account yet?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="font-semibold text-primary-600 dark:text-primary-400 hover:underline"
          >
            {isRegister ? "Sign In" : "Register Now"}
          </button>
        </p>
      </div>
    </div>
  );
};
