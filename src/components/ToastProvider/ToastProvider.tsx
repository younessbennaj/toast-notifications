import React, { createContext, useEffect, useState } from "react";
import { PositionType, ToastType } from "../../types";
import { DEFAULT_TOAST_DURATION, Variant } from "../../constants";
import ToastsContainer from "../ToastsContainer";

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
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
}>({
  createToast: () => {
    throw new Error(
      "You can't call showToast() outside of a <ToastProvider> – add it to your tree."
    );
  },
  removeToast: () => {
    throw new Error(
      "You can't call removeToast() outside of a <ToastProvider> – add it to your tree."
    );
  },
  removeAllToasts: () => {
    throw new Error(
      "You can't call removeAllToasts() outside of a <ToastProvider> – add it to your tree."
    );
  },
});

function ToastProvider({
  children,
  position = "top-right",
}: {
  children: React.ReactNode;
  position?: PositionType;
}) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  function createToast({
    message,
    duration = DEFAULT_TOAST_DURATION,
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

  const removeAllToasts = React.useCallback(() => {
    setToasts([]);
  }, [setToasts]);

  // use useCallback to memoize the function so that it doesn't change on every render and create new timer inside toast
  const removeToast = React.useCallback(
    (id: string) => {
      setToasts((previousToasts) => {
        return previousToasts.filter((t) => t.id !== id);
      });
    },
    [setToasts]
  );

  useEffect(() => {});

  return (
    <>
      {toasts.length > 0 && (
        <ToastsContainer
          position={position}
          onRemove={removeToast}
          toasts={toasts}
        />
      )}

      <ToastContext.Provider
        value={{ createToast, removeToast, removeAllToasts }}
      >
        {children}
      </ToastContext.Provider>
    </>
  );
}

export default ToastProvider;
