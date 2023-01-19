// -------------------- DROPDOWN + DISPLAY MOODS --------------------

const dropdowns = document.querySelectorAll(".dropdown");

const fetchData = async () => {
  const response = await axios.get("http://localhost:8080/moods");
  const moodsData = await response.data;

  moodsData.map((mood) => {
    const icon = mood.icon;
    const title = mood.title;
    const moodId = mood._id;
    const newDiv = document.createElement("li");
    newDiv.setAttribute("data-moodId", moodId);
    const newContent = document.createTextNode(icon + " " + title);
    newDiv.appendChild(newContent);
    const currentDiv = document.querySelector(".menu");
    currentDiv.appendChild(newDiv);
  });

  document.querySelector(".menu :first-child").classList.add("active");

  if (moodsData) {
    dropdowns.forEach((dropdown) => {
      const select = dropdown.querySelector(".select");
      const caret = dropdown.querySelector(".caret");
      const menu = dropdown.querySelector(".menu");
      const options = dropdown.querySelectorAll(".menu li");
      const selected = dropdown.querySelector(".selected");

      select.addEventListener("click", () => {
        select.classList.toggle("select-clicked");
        caret.classList.toggle("caret-rotate");
        menu.classList.toggle("menu-open");
      });

      options.forEach((option) => {
        // Add a click event to the option element
        option.addEventListener("click", () => {
          // Change selected inner text to clicked option inner text
          selected.innerText = option.innerText;
          // Add the clicked select styles to the select element
          select.classList.remove("select-clicked");
          // Add the rotate styles to the caret element
          caret.classList.remove("caret-rotate");
          // Add the open styles to the menu element
          menu.classList.remove("menu-open");
          // Remove active class from all option elements
          options.forEach((option) => {
            option.classList.remove("active");
          });
          // Add active class to clicked option element
          option.classList.add("active");
        });
      });
    });
  }
};

fetchData();

// -------------------- SUBMIT SELECT MOOD IN DATABASE --------------------

const handleSubmit = async (moodId, date) => {
  const tokenStore = localStorage.getItem("token");
  try {
    const response = await axios.post(
      "http://localhost:8080/yourmood/create",
      {
        moodId: moodId,
        date: date,
      },
      {
        headers: {
          Authorization: "Bearer " + tokenStore,
          "Content-Type": "application/json",
        },
      }
    );

    if (tokenStore) {
      // console.log("coucou le token existe !");
      // window.location.href = "/login.html";
      window.open("/dashboard.html", "_blank");
    }
  } catch (error) {
    console.log(error.message);
  }
};

document.querySelector("#moods-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const moodId = document.querySelector(".menu li").getAttribute("data-moodId");
  const date = new Date();
  handleSubmit(moodId, date);
});
