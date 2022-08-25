import prisma from "../../prisma";
import { getPeriodData, countAverage } from "../../helpers/functions";

const Price = async (req, res) => {
  let { amount, productId } = req.body;

  if (req.body.command === "add-by-productId") {
    if (!amount) {
      res.end(
        JSON.stringify({
          status: "error",
          message: "Введите верные данные",
        }),
      );
      return;
    }
    //создаем новую запись с ценой
    await prisma.price.create({
      data: {
        amount: amount,
        productId: productId,
      },
    });
    //получаем новый массив данных с новой ценой
    const prices = await prisma.price.findMany({
      where: {
        productId: productId,
      },
    });
    let average;
    //получаем только интересующие нас данные в промежутке дней из константы
    const currentPrices = getPeriodData(prices);
    currentPrices.length !== 0
      ? (average = countAverage(currentPrices))
      : (average = 0.0);

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        currentPrice: amount,
        average: average,
      },
    });

    res.end(
      JSON.stringify({
        status: "success",
        message: "Готово!",
      }),
    );
  }
};

export default Price;
