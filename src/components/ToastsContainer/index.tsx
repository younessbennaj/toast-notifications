import Toast from "../Toast";
import styles from "./ToastsContainer.module.css";

function ToastsContainer({
    onRemoveToast,
    toasts,
}: {
    onRemoveToast: (id: string) => void;
    toasts: {
        id: string;
        message: string;
    }[];
}) {

    return (
        <ol className={styles.wrapper}>
            {toasts.map((toast) => (
                <li className={styles.toastWrapper} key={toast.id}>
                    <Toast onRemoveToast={onRemoveToast} id={toast.id}>
                        {toast.message}
                    </Toast>
                </li>
            )
            )}
        </ol>
    )
}

export default ToastsContainer;