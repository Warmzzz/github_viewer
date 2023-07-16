import { Link } from "@remix-run/react";
import styles from "./style.module.css";

export default function Header(){
    return(
        <header className={styles.Header}>
            <Link to="/" className={styles.Title}>Github Viewer</Link>
            <hr className={styles.Hr} />
        </header>
    )
}