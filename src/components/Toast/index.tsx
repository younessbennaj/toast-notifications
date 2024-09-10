import { useEffect, useState } from "react";
import styles from "./Toast.module.css";
import { X } from "react-feather";

function Toast({
    id,
    children,
    onRemoveToast,
}: {
    id: string;
    children: React.ReactNode;
    onRemoveToast: (id: string) => void;
}) {
  const [loadingPercentage, setLoadingPercentage] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
        onRemoveToast(id)
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [
    id,
    onRemoveToast,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercentage((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 1;
      });
    }, 50);
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
            onRemoveToast(id);
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