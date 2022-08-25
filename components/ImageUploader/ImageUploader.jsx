import styles from "./ImageUploader.module.scss";
import { useState, useEffect } from "react";

const ImageUploader = ({ imgUrl, clientImg, productId }) => {
  const [image, setImage] = useState(null);
  const [createImgUrl, setCreateImgUrl] = useState(imgUrl);

  useEffect(() => {
    clientImg(createImgUrl);
  }, [createImgUrl]);

  const uploadToClient = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setImage(img);
      setCreateImgUrl(URL.createObjectURL(img));
    }
  };

  const uploadToServer = async (e) => {
    const body = new FormData();
    body.append("file", image);
    body.append("productId", productId);
    body.append("imgName", image.name);
    const response = await fetch("/api/set-image", {
      method: "POST",
      body,
    });
    console.log(response);
    alert(response.statusText);
  };

  return (
    <>
      <fieldset>
        <legend>Изменить изображение?</legend>
        <input type='file' name='currentImage' onChange={uploadToClient} />
        <button
          type='submit'
          className={styles.button}
          onClick={uploadToServer}
        >
          Сохранить
        </button>
      </fieldset>
    </>
  );
};

export default ImageUploader;
