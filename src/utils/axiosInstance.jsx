import axios from "axios";
import Cookies from "js-cookie";

const getAxiosInstance = () => {
  const userToken = Cookies.get("csrftoken") || "";
  console.log(userToken);

  return axios.create({
    withCredentials: true,
    headers: {
      "X-CSRFToken": userToken,
    },
  });
};

export default getAxiosInstance();
