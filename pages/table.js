import prisma from "../prisma";
import styles from "../styles/Table.module.scss";
import { useSelector } from "react-redux";
import Oops from "../components/Oops/Oops";

const Table = ({ products }) => {
  const login = useSelector((state) => state.login.login);
  products.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  return (
    <>
      {login == false && <Oops />}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th className={styles.th}>Наименование</th>
              <th className={styles.th}>Текущая цена</th>
              <th className={styles.th}>Средняя цена</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr className={styles.tr} key={product.name}>
                  <td className={styles.td}>{product.name}</td>
                  <td className={styles.td}>{product.price}</td>
                  <td className={styles.td}>{product.average}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const products = await prisma.product.findMany();
  const data = products.map((product) => {
    return {
      name: product.name,
      average: product.average,
      price: product.currentPrice,
    };
  });
  return {
    props: {
      products: data,
    },
  };
}

export default Table;
