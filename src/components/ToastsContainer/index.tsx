import { AnimatePresence, motion } from "framer-motion";
import styles from "./ToastsContainer.module.css";
import { PositionType, ToastType } from "../../types";
import Toast from "../Toast";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function ToastsContainer({
  position,
  onRemove,
  toasts,
}: {
  position: PositionType;
  onRemove: (id: string) => void;
  toasts: ToastType[];
}) {
  const [host, setHost] = useState<Element | null>(null);

  useEffect(() => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    div.setAttribute("id", "toasts-container");
    setHost(div);

    return () => {
      document.body.removeChild(div);
    };
  }, [setHost]);

  if (!host) {
    return null;
  }
  return createPortal(
    <ul
      className={styles.wrapper}
      style={{
        top: position.startsWith("top") ? "1rem" : "auto",
        bottom: position.startsWith("bottom") ? "1rem" : "auto",
        left: position.endsWith("left")
          ? "1rem"
          : position.endsWith("center")
          ? "50%"
          : "auto",
        right: position.endsWith("right") ? "1rem" : "auto",
        transform: position.endsWith("center") ? "translateX(-50%)" : "none", // Corrected to translate to the left for centering
      }}
    >
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
              onRemove={onRemove}
            >
              {toast.message}
            </Toast>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>,
    host
  );
}

export default ToastsContainer;
