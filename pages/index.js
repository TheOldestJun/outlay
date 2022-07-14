import styles from "../styles/Home.module.scss";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { setLogin, setUser } from "../store/loginSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const result = await axios.post("/api/auth", {
      command: "check-user",
      email: email,
      password: password,
    });
    if (result.data.status === "error") {
      alert(result.data.message);
    } else {
      dispatch(setLogin());
      dispatch(setUser(result.data.userName));
      push("/main");
    }
  };
  return (
    <div className={styles.container}>
      <h1>Калькулятор меню</h1>
      <form onSubmit={submit} className={styles.form}>
        <input
          className={styles.input}
          type='email'
          id='email'
          placeholder='Введите email...'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className={styles.input}
          type='password'
          id='password'
          placeholder='Введите пароль...'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type='submit' className={styles.button}>
          Вход
        </button>
      </form>
    </div>
  );
}
