import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useState } from "react";
import { ToastType } from "../../types";
import Toast from "../Toast";
import { TOAST_DURATION, Variant } from "../../constants";
import styles from "./ToastProvider.module.css";

export const ToastContext = createContext<{
  createToast: ({
    message,
    duration,
    variant,
  }: {
    message: string;
    duration?: number;
    variant: Variant;
  }) => void;
}>({
  createToast: () => {
    throw new Error(
      "You can't call showToast() outside of a <ToastProvider> – add it to your tree."
    );
  },
});

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([
    {
      duration: 2000,
      id: window.crypto.randomUUID(),
      message: "Test",
      variant: "info",
    },
  ]);

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
      id: window.crypto.randomUUID(),
      message,
      variant,
    };
    setToasts((currentToasts) => [...currentToasts, newToast]);
  }

  // remove toast on escape key press
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setToasts((currentToasts) => {
          const lastToast = currentToasts[currentToasts.length - 1];
          if (lastToast) {
            return currentToasts.filter((t) => t.id !== lastToast.id);
          }
          return currentToasts;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // use useCallback to memoize the function so that it doesn't change on every render and create new timer inside toast
  const removeToast = React.useCallback(
    (id: string) => {
      setToasts((previousToasts) => {
        return previousToasts.filter((t) => t.id !== id);
      });
    },
    [setToasts]
  );

  return (
    <>
      <ul className={styles.wrapper}>
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.li
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring" }}
              className="box"
              key={toast.id}
            >
              <Toast
                duration={toast.duration}
                variant={toast.variant}
                id={toast.id}
                onRemove={removeToast}
              >
                {toast.message}
              </Toast>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <ToastContext.Provider value={{ createToast }}>
        {children}
      </ToastContext.Provider>
    </>
  );
}

export default ToastProvider;
