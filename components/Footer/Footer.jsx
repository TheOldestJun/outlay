import styles from "./Footer.module.scss";
import { version } from "../../helpers/constants";

const Footer = () => {
  return (
    <>
      <div className={styles.main}>
        <img src='/logo.svg' alt='Site Logo' className={styles.logo} />
        <div>
          <h5>Считай обед легко!&#128579; v.{version}</h5>
        </div>
        <div>
          <h5>&copy; Copyright 2022</h5>
        </div>
      </div>
    </>
  );
};

export default Footer;
