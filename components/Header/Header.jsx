import styles from "./Header.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const userName = useSelector((state) => state.login.user.payload);
  let login = useSelector((state) => state.login.login);
  return (
    <div className={styles.container}>
      {login && (
        <>
          <Link href='/main'>
            <a>
              <img src='/logo.svg' alt='Site logo' className={styles.logo} />
            </a>
          </Link>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              Привет,{" "}
              <Link href='/user'>
                <a>{userName || ""}</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href='/table'>
                <a>
                  <button className={styles.button}>Перейти к таблице</button>
                </a>
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Header;
