const addElement = (icon, title, selector) => {
  // create a new div element
  const newDiv = document.createElement("option");
  // and give it some content
  const newContent = document.createTextNode(icon + title);
  // add the text node to the newly created Element
  newDiv.appendChild(newContent);
  // add the newly created element and its content into the DOM
  const currentDiv = document.querySelector(selector);
  currentDiv.appendChild(newDiv);
};

const fetchData = async () => {
  const response = await axios.get("http://localhost:8080/moods");
  const moodsData = await response.data;

  moodsData.map((mood) => {
    const icon = mood.icon;
    const title = mood.title;
    addElement(icon, title, "#moods");
  });
};

fetchData();
