/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // 이 부분이 Tailwind가 사용할 파일들을 지정하는 부분입니다.
  ],
  theme: {
    colors: {
      brand: "#FF000",
    },
    fontFamily: {
      customFont: ["minerva-modern"],
      diphylleia: ["Diphylleia", "serif"],
      dongle: ["GowunDodum-Regular"],
      dongle_light: ["GowunDodum-Light"],
      dongle_semibolde: ["GowunDodum-Semibolde"],
    },
  },
  plugins: [],
};
