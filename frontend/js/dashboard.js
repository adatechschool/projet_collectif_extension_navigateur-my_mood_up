const fetchMyMoods = async () => {
  const tokenStore = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:8080/yourmood", {
      headers: {
        Authorization: "Bearer " + tokenStore,
        "Content-Type": "application/json",
      },
    });

    if (tokenStore) {
      // Sauvegarde de l'API moods dans le localStorage
      const myData = localStorage.getItem("myMoodsData");
      const moodsDataList = JSON.parse(myData);
      console.log(moodsDataList);

      // Sauvegarde des moods enregistré dans le compte utilisateur
      const myMoodsData = await response.data;

      // ------------------------ AFFICHAGE DES MOOODS ------------------------
      const myMoodsContainer = document.querySelector(".my-moods");

      myMoodsData.map((myMood) => {
        // Création de la div globale du mood
        const moodContent = document.createElement("div");
        moodContent.classList.add("mood-content");
        myMoodsContainer.appendChild(moodContent);

        moodsDataList.forEach((element) => {
          if (myMood.moodId === element._id) {
            // Afficher l'icon
            const iconObj = element.icon;
            const iconContent = document.createElement("div");
            iconContent.classList.add("icon-content");
            moodContent.appendChild(iconContent);
            const insertIcon = document.createTextNode(iconObj);
            iconContent.appendChild(insertIcon);

            // Afficher le title
            const titleObj = element.title;
            const titleContent = document.createElement("div");
            titleContent.classList.add("title-content");
            moodContent.appendChild(titleContent);
            const insertTitle = document.createTextNode(titleObj);
            titleContent.appendChild(insertTitle);

            // Afficher les besoins
            const needsObj = element.needs;
            const needsContent = document.createElement("div");
            needsContent.classList.add("needs-content");
            moodContent.appendChild(needsContent);
            const insertNeeds = document.createTextNode(needsObj);
            needsContent.appendChild(insertNeeds);
          }
        });

        // Rajouter la date
        const DateContent = document.createElement("div");
        DateContent.classList.add("date-content");
        moodContent.appendChild(DateContent);
        const dateObj = myMood.date;
        const insertDate = document.createTextNode(dateObj);
        DateContent.appendChild(insertDate);
      });
    } else {
      alert("Veuillez vous connecter");
    }
  } catch (error) {
    console.log(error.message);
  }
};

fetchMyMoods();
