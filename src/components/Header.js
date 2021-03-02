import Link from "next/link";
import styles from "../styles/Home.module.css";

const Header = () => {


    return (
        <div className={styles.menu}>

            <h2>
                <Link href="/">Time to Clean</Link>
            </h2>

            <p>
                <Link href="/neighborhoods">Consultar horarios -- </Link>
                <Link href="/login">Gestión -- </Link>
                <Link href="/about">Acerca de </Link>
            </p>

        </div>
    );
};

export default Header;
