import axios from "axios";

const url =
  "http://comp231qrderapi-dev.us-east-2.elasticbeanstalk.com/api/restaurants";

const orderUrl =
  "http://comp231qrderapi-dev.us-east-2.elasticbeanstalk.com/api/restaurant/50a96701adb6482088eb97342ea4bd8b/tables";
const payOrderUrl =
  "http://comp231qrderapi-dev.us-east-2.elasticbeanstalk.com/api/restaurant/50a96701adb6482088eb97342ea4bd8b/order";

const deleteOrderUrl =
  "http://comp231qrderapi-dev.us-east-2.elasticbeanstalk.com/api/restaurant/50a96701adb6482088eb97342ea4bd8b/order";

export const getAllOrder = async () => {
  return await axios.get(`${orderUrl}`);
};

// export const getAllTables = async () => {
//     return await axios.get(`${tablesUrl}`);
// }

export const getAllMenu = async () => {
  return await axios.get(`${url}`);
};

export const payOrder = async (data) => {
  return await axios.post(`${payOrderUrl}`, data);
};

export const deleteOrder = async (data) => {
  return await axios.delete(`${deleteOrderUrl}`, data);
};
