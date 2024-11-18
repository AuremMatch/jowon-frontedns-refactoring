import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = () => {
  const userToken = Cookies.get("csrftoken") || "";
  console.log(userToken);

  return axios.create({
    withCredentials: true,
    // headers: {
    //   "X-CSRFToken": userToken, // CSRF 토큰을 헤더에 추가
    // },
  });
};

export default axiosInstance();
