const axios = require("axios");

const fetchData = async () => {
  const response = await axios.get("http://localhost:8080/moods");
  const moodsData = await response.data;
  console.log(moodsData);
};

fetchData();
console.log("hello");
