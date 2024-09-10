import Toast from "../Toast";
import styles from "./ToastsContainer.module.css";

function ToastsContainer() {
    return (
        <ol className={styles.wrapper}>
            <li className={styles.toastWrapper}>
                <Toast message={'test 1'} />
            </li>
            <li className={styles.toastWrapper}>
                <Toast message={'test 2'} />
            </li>
        </ol>
    )
}

export default ToastsContainer;