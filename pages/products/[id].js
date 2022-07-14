import prisma from "../../prisma";
import styles from "../../styles/[id].module.scss";
import Image from "next/image";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import { useState, useEffect } from "react";
import axios from "axios";
import { getPeriodData, countAverage } from "../../helpers/functions";
import { useSelector } from "react-redux";
import Oops from "../../components/Oops/Oops";

const Id = ({ product, average }) => {
  const [price, setPrice] = useState("");
  const [margin, setMargin] = useState(0);
  const [currentAverage, setCurrentAverage] = useState(average);
  const [url, setUrl] = useState(product.img);
  const login = useSelector((state) => state.login.login);

  const clientImg = (url) => {
    setUrl(url);
  };
  const submit = async (e) => {
    e.preventDefault();
    let result = await axios.put("/api/price", {
      command: "add-by-productId",
      productId: product.id,
      amount: parseFloat(price),
      margin: parseFloat(margin),
    });
    if (result.data.status === "error") {
      alert(result.data.message);
    }
    alert(result.data.message);
  };
  return (
    <>
      {login == false && <Oops />}
      <div className={styles.main}>
        <div className={styles.card}>
          <h2 className={styles.h2}>{product.name}</h2>
          <h3 className={styles.h3}>
            Текущая средняя цена - {parseFloat(currentAverage).toFixed(2)}
          </h3>
          <Image src={url} width='250px' height='250px' />

          <form onSubmit={submit} className={styles.form}>
            <p>Новая цена</p>
            <input
              className={styles.input}
              type='text'
              id='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <button className={styles.button}>Ввод</button>
          </form>
          <ImageUploader
            clientImg={clientImg}
            imgUrl={url}
            productId={product.id}
          />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ query }) {
  //получаем айдишник из запроса
  const { id } = query;
  //получаем данные их базы
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  const prices = await prisma.price.findMany({
    where: {
      productId: id,
    },
  });
  let average;
  //получаем данные за нужный период (сейчас 7 дней в constants, можно переделать для возможности выбора)
  let currentPrices = getPeriodData(prices);
  //проверка на полученное значение если массив не пустой получаем среднее
  currentPrices.length === 0
    ? (average = product.currentPrice)
    : (average = countAverage(currentPrices));

  return {
    props: {
      product: product,
      average: average,
    },
  };
}

export default Id;
