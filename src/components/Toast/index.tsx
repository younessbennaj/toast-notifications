import { useEffect, useState } from "react";
import styles from "./Toast.module.css";
import { X } from "react-feather";
import { ToastContext } from "../ToastProvider/ToastProvider";
import React from "react";

const DURATION = 2000;

function Toast({
    duration = DURATION,
    id,
    children,
}: {
    duration?: number;
    id: string;
    children: React.ReactNode;
}) {
  const [loadingPercentage, setLoadingPercentage] = useState<number>(0);

  const {handleRemoveToast} = React.useContext(ToastContext);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //       console.log('remove')
  //       handleRemoveToast(id)
  //   }, duration);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [
  //   id,
  //   handleRemoveToast,
  // ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercentage((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 1;
      });
    }, duration / 100);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className={styles.toast}>
      <div>
        <p>{children}</p>
        <button
          className={styles.closeButton}
          onClick={() => {
            handleRemoveToast(id);
          }}
        >
          <X size={16} />
        </button>
      </div>
      {loadingPercentage < 100 && (
        <div
          className={styles.progressBar}
          style={{ width: `${loadingPercentage}%` }}
        />
      )}
    </div>
  );
}

export default Toast;