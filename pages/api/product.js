import prisma from "../../prisma";

const Product = async (req, res) => {
  if (req.body.command === "add-product") {
    let { name, img, average = 0.0, currentPrice = 0.0 } = req.body;
    let result = await prisma.product.create({
      data: {
        name: name,
        img: img,
        average: average,
        currentPrice: currentPrice,
      },
    });
    res.end(
      JSON.stringify({
        status: "success",
        message: "Успешно!",
      }),
    );
  }
};

export default Product;
