import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { ECommerceProvider } from "./context/ECommerceContext";
import Header from "./Component/Header";
import Hero from "./Component/Hero";
import { ProductLayout } from "./Component/ProductLayout";
import Footer from "./Component/Footer";
import { CartDrawer } from "./Component/modals/CartDrawer";
import { WishlistDrawer } from "./Component/modals/WishlistDrawer";
import { QuickLookModal } from "./Component/modals/QuickLookModal";
import { CheckoutModal } from "./Component/modals/CheckoutModal";
import { AuthModal } from "./Component/modals/AuthModal";
import { ToastContainer } from "./Component/modals/ToastContainer";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductLayout />
      </main>
      <Footer />

      {/* Global Interactive Drawers, Modals & Toast Alerts */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickLookModal />
      <CheckoutModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const reactRoot = ReactDOM.createRoot(rootElement);
  reactRoot.render(
    <React.StrictMode>
      <ECommerceProvider>
        <AppLayout />
      </ECommerceProvider>
    </React.StrictMode>
  );
}
