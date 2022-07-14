import prisma from "../../prisma";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Отключить парсинг принимаем как поток
  },
};

const SetImage = async (req, res) => {
  if (req.method === "POST") {
    const saveFile = async (file) => {
      const data = fs.readFileSync(file.filepath);
      fs.writeFileSync(`./public/img/product/${file.originalFilename}`, data);
      fs.unlink(file.filepath, (error) => {
        if (error) {
          alert(error);
        }
      });
      return;
    };
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      await saveFile(files.file);
      await prisma.product.update({
        where: {
          id: fields.productId,
        },
        data: {
          img: `/img/product/${fields.imgName}`,
        },
      });
      res.end();
    });
  }
};

export default SetImage;
