import { period } from "./constants";
import moment from "moment";

export const getPeriodData = (data) => {
  //критический срок для просчета в period
  let lastDate = moment().subtract(period, "days");
  let currentData = [];
  //собираем массив данных не старше period дней
  for (let d of data) {
    if (
      moment(d.dateCreated).isAfter(lastDate) ||
      moment(d.dateCreated).isSame(lastDate)
    ) {
      currentData.push(d);
    }
  }
  return currentData;
};

export const countAverage = (data) => {
  //функция для вычисления средней цены
  let sum = 0;
  let divisor = 0;
  for (let d of data) {
    sum += d.amount;
    divisor++;
  }
  return sum / divisor;
};

export const capitalize = (str) => {
  return (str && str[0].toUpperCase() + str.slice(1).toLowerCase()) || "";
};
