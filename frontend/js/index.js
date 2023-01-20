// -------------------- DROPDOWN + DISPLAY MOODS --------------------

const dropdowns = document.querySelectorAll(".dropdown");

const fetchData = async () => {
  const response = await axios.get("http://localhost:8080/moods");
  const moodsDataList = await response.data;

  moodsDataList.map((mood) => {
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

  if (moodsDataList) {
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

    // J'enregistre mes humeurs dans le local storage.
    let myMoodsData = JSON.stringify(moodsDataList);
    localStorage.setItem("myMoodsData", myMoodsData);
  }
};

fetchData();

// -------------------- SUBMIT SELECT MOOD IN DATABASE --------------------

const handleSubmit = async (moodId, date) => {
  const tokenStore = localStorage.getItem("token");
  try {
    const response = await axios.post(
      "http://localhost:8080/usermood/create",
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
      window.open("/dashboard.html", "_blank");
    } else {
      alert("Veuillez vous connecter");
    }
  } catch (error) {
    console.log(error.message);
  }
};

document.querySelector("#moods-form").addEventListener("submit", (event) => {
  event.preventDefault();

  // Display creation date
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const hour = dateObj.getHours();
  const min = dateObj.getMinutes();
  const date = `Posté le ${day}/${month}/${year} à ${hour}h${min}`;

  const moodId = document
    .querySelector(".menu li.active")
    .getAttribute("data-moodId");
  handleSubmit(moodId, date);
});
