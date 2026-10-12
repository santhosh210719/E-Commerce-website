import React from "react";
import { useECommerce } from "../../context/ECommerceContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer = () => {
  const { toasts, removeToast } = useECommerce();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let Icon = CheckCircle2;
        let borderClass = "border-emerald-500/30 bg-white/95 dark:bg-gray-900/95 text-gray-800 dark:text-gray-100 shadow-xl shadow-emerald-500/10";
        let iconColor = "text-emerald-500";

        if (toast.type === "error") {
          Icon = AlertCircle;
          borderClass = "border-red-500/30 bg-white/95 dark:bg-gray-900/95 text-gray-800 dark:text-gray-100 shadow-xl shadow-red-500/10";
          iconColor = "text-rose-500";
        } else if (toast.type === "info") {
          Icon = Info;
          borderClass = "border-primary-500/30 bg-white/95 dark:bg-gray-900/95 text-gray-800 dark:text-gray-100 shadow-xl shadow-primary-500/10";
          iconColor = "text-primary-500";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border backdrop-blur-md animate-fade-in transition-all ${borderClass}`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-5 h-5 shrink-0 ${iconColor}`} />
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
