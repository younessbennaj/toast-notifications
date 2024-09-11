import React, { useEffect } from "react";
import { Toast } from "../../types";

export const ToastContext = React.createContext<{
    createToast: (message: string) => void,
    handleRemoveToast: (id: string) => void,
    toasts: Toast[]
}>({
    createToast: () => {throw new Error("createToast not implemented")},
    // removeToast
    handleRemoveToast: () => {throw new Error("handleRemoveToast not implemented")},
    toasts: [],
});

function ToastProvider({
    children,
} : {
    children: React.ReactNode;
}) {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    /*
    better approach
    function createToast() {
const newToast = {}
setToast(currentToasts => [...currentToasts, newToast]
}
     */

// => here use useCallback with toasts as dependency
    function createToast(message: string) {
        const id = crypto.randomUUID()
        const newToasts = [...toasts, {
            id,
            message,
        }];
        setToasts(newToasts);

        setTimeout(() => {
            handleRemoveToast(id)
        }, 2000);
    }

    // here same => use previous state 
    function handleRemoveToast (id: string) {
        const newToasts = toasts.filter((toast) => toast.id !== id);
        setToasts(newToasts);
      }
      
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                // just the last one
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