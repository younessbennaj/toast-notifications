import React from "react";
import Toast from "../Toast";
import { ToastContext } from "../ToastProvider/ToastProvider";
import styles from "./ToastsContainer.module.css";

function ToastsContainer() {
  const { toasts } = React.useContext(ToastContext);

  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast) => (
        <li className={styles.toastWrapper} key={toast.id}>
          <Toast
            id={toast.id}
            duration={toast.duration}
            variant={toast.variant}
          >
            {toast.message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastsContainer;
