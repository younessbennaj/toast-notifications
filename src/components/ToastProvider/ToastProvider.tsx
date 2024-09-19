import React, { useEffect } from "react";
import { Toast, Variant } from "../../types";
import { TOAST_DURATION } from "../../constants";

export const ToastContext = React.createContext<{
  createToast: ({
    message,
    duration,
    variant,
  }: {
    message: string;
    duration?: number;
    variant: Variant;
  }) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
}>({
  createToast: () => {
    throw new Error("createToast not implemented");
  },
  removeToast: () => {
    throw new Error("removeToast not implemented");
  },
  toasts: [],
});

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  function createToast({
    message,
    duration = TOAST_DURATION,
    variant,
  }: {
    message: string;
    duration?: number;
    variant: Variant;
  }) {
    const newToast = {
      duration,
      id: crypto.randomUUID(),
      message,
      variant,
    };
    setToasts((currentToasts) => [...currentToasts, newToast]);

    setTimeout(() => {
      removeToast(newToast.id);
    }, duration);
  }

  function removeToast(id: string) {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        const lastToast = toasts[toasts.length - 1];
        if (lastToast) {
          removeToast(lastToast.id);
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ createToast, removeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
