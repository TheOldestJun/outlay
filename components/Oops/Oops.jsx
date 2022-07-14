import Link from "next/link";
import styles from "./Oops.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Oops = () => {
  const { push } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      push("/");
    }, 3000);
  }, []);
  return (
    <>
      <div className={styles.back}></div>
      <div className={styles.front}>
        <h1>Упс... &#128577; Похоже вы вышли из своего аккаунта</h1>
        <h4>
          Перехожу на страницу{" "}
          <Link href='/'>
            <a>входа</a>
          </Link>
        </h4>
      </div>
    </>
  );
};

export default Oops;
