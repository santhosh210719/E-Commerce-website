import React, { useState } from "react";
import { useECommerce } from "../context/ECommerceContext";
import {
  Zap,
  Mail,
  Send,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight
} from "lucide-react";

const Footer = () => {
  const { showToast } = useECommerce();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast(`Subscribed! Check ${newsletterEmail} for exclusive tech drops. 🚀`, "success");
    setNewsletterEmail("");
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200/80 dark:border-gray-800 transition-colors">
      {/* Newsletter Signup Banner */}
      <div className="border-b border-gray-200/80 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left max-w-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                Join The Tech Elite
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-1">
                Subscribe for private drops & flash sales
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Get first dibs on limited hardware batches and member-only coupons directly in your inbox.
              </p>
            </div>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full max-w-md gap-2"
            >
              <div className="relative flex-1">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your personal email..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <button
                type="submit"
                className="py-3 px-5 rounded-xl bg-primary-600 hover:bg-primary-700 active:scale-[0.98] text-white text-xs font-bold transition-all shadow-md shadow-primary-500/20 shrink-0 flex items-center gap-1.5"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2">
            <a href="#hero" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-primary-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-primary-500/25">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                Ref<span className="text-primary-600 dark:text-primary-400">!</span>ex
              </span>
            </a>

            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm mb-4">
              Ref!ex is an authorized boutique retailer delivering authentic luxury electronics, pro workstations, and acoustic equipment with worldwide express dispatch.
            </p>

            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                256-Bit SSL Protection
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-500" />
                Authenticity Guaranteed
              </span>
            </div>
          </div>

          {/* Quick Category Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Shop Tech
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-500 dark:text-gray-400">
              <li>
                <a href="#products" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Computers & Desktops
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Studio Acoustics
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Smart Wearables
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Flagship Phones
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Custom Keyboards & Mice
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Support & Help
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-500 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Track Your Package
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Warranty & Registration
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Shipping Rates & Timelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Help Desk & Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-500 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  About Ref!ex Store
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Sustainability Pledge
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Affiliate Program
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Ref!ex Store. Engineered for precision performance.</p>

          <div className="flex items-center gap-4 text-[11px] font-semibold text-gray-500 dark:text-gray-400">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>APPLE PAY</span>
            <span>GOOGLE PAY</span>
            <span>PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;