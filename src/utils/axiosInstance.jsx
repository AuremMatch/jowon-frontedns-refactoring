import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = () => {
  const userToken = Cookies.get("csrftoken") || "";
  console.log(userToken);

  return axios.create({
    withCredentials: true,
  });
};

export default axiosInstance();
