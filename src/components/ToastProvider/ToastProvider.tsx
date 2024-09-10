import React, { useEffect } from "react";
import { Toast } from "../../types";

export const ToastContext = React.createContext<{
    createToast: (message: string) => void,
    handleRemoveToast: (id: string) => void,
    toasts: Toast[]
}>({
    createToast: () => {},
    handleRemoveToast: () => {},
    toasts: [],
});

function ToastProvider({
    children,
} : {
    children: React.ReactNode;
}) {
    const [toasts, setToasts] = React.useState<Toast[]>([
        {
            id: crypto.randomUUID(),
            message: "This is a toast message",
        },
    ]);

    function createToast(message: string) {
        const newToasts = [...toasts, {
            id: crypto.randomUUID(),
            message,
        }];
        setToasts(newToasts);
    }

    function handleRemoveToast (id: string) {
        const newToasts = toasts.filter((toast) => toast.id !== id);
        setToasts(newToasts);
      }
      
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setToasts([]);
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
    }, 
    [toasts, handleRemoveToast]);
    
    return (
        <ToastContext.Provider value={{createToast, handleRemoveToast, toasts}}>{children}</ToastContext.Provider>
    )
}

export default ToastProvider;