import styles from "../styles/Main.module.scss";
import prisma from "../prisma";
import axios from "axios";
import SmartSearch from "../components/SmartSearch/SmartSearch";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { capitalize } from "../helpers/functions";
import { useSelector } from "react-redux";
import Oops from "../components/Oops/Oops";

const Main = ({ products }) => {
  const { push } = useRouter();
  const [filteredProducts, setFilteredProducts] = useState();
  const [newItem, setNewItem] = useState("");
  const login = useSelector((state) => state.login.login);
  //обычная сортировка нужна один раз не выносил в отдельный файл
  products.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  const updateFilter = (text) => {
    let filteredOptions = [];
    for (let i = 0; i < products.length; i++) {
      let item = products[i];
      //если хоть одна буква из инпута есть в названии продукта кидаем в массив отсортированных
      if (item.name.toLowerCase().indexOf(text) != -1) {
        filteredOptions.push(products[i]);
        setNewItem(""); //нет нового продукта
      }
    }
    setFilteredProducts([...filteredOptions]);
    //если пусто в найденном - переходим к созданию нового продукта с именем которое пользолватель внес в инпут с большой буквы для красоты
    if (filteredOptions.length === 0) {
      setNewItem(capitalize(text));
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/product", {
      command: "add-product",
      name: newItem,
    });
    setFilteredProducts(null);
    alert(res.data.message);
    push("/main");
  };

  return (
    <>
      {login == false && <Oops />}
      <div className={styles.container}>
        <h1>Выбирай продукт</h1>
        <SmartSearch search={updateFilter} />
        <div className={styles.grid}>
          {newItem ? ( //карточка нового продукта
            <a href='#'>
              <div
                onClick={addProduct}
                className={styles.card}
                style={{
                  backgroundImage: `url('/img/product/no-image.png')`,
                  backgroundSize: "100% 100%",
                }}
              >
                <h3>{newItem}</h3>
                <h3 style={{ color: "red", cursor: "pointer" }}>Добавить?</h3>
              </div>
            </a>
          ) : filteredProducts ? ( //найдены совпадения
            filteredProducts.map((product) => {
              return (
                <Link
                  href='/products/[id]'
                  as={"products/" + product.id}
                  key={product.id}
                >
                  <a>
                    <div
                      className={styles.card}
                      style={{
                        backgroundImage: `url(${product.img})`,
                        backgroundSize: "100% 100%",
                      }}
                    >
                      <h3>{product.name}</h3>
                    </div>
                  </a>
                </Link>
              );
            })
          ) : (
            products.map((product) => {
              return (
                //просто список ВСЕХ продуктов
                <Link
                  href='/products/[id]'
                  as={"products/" + product.id}
                  key={product.id}
                >
                  <a>
                    <div
                      className={styles.card}
                      style={{
                        backgroundImage: `url(${product.img})`,
                        backgroundSize: "100% 100%",
                      }}
                    >
                      <h3>{product.name}</h3>
                    </div>
                  </a>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const products = await prisma.product.findMany();
  return {
    props: {
      products,
    },
  };
};

export default Main;
