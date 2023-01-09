// J'importe mes différents package npm.
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Permet à mon serveur express de réceptionner des paramètres de type body.
app.use(express.json());

// Permet de se connecter à la base de donnée "leboncoin".
mongoose.connect("mongodb://localhost/leboncoin");

// Créer un modèle. Le premier argument est le nom que l'on veut donner à notre collection("Annonce"), et le 2e argument est la structure de notre modèle.
const Annonce = mongoose.model("Annonce", {
  title: String,
  description: String,
  price: Number,
  image: String,
});

// GET / Permet de lire/reccupérer/afficher toutes les annonces via les paramètres de type query.
app.get("/annonces", async function (req, res) {
  // Je cherche (via la méthode mongoose .find()) toutes mes annonces dans ma base de donnée "Annonce", que j'enregistre dans la variable annonces.
  const annonces = await Annonce.find();
  // En réponse, le serveur me renvoit la liste de toutes les annonces au format json.
  res.json(annonces);
});

// POST / Permet de créer une annonce en transmettant des infos (title, description, price, image) au serveur via le "corps" de la requête (paramètres de type body).
app.post("/creermonannonce", async function (req, res) {
  // Je crée une nouvelle instance de ma collection Annonce.
  const newAnnonce = new Annonce({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  });
  // Je sauvegarde ma nouvelle annonce dans la base de donnée en utilisant la méthode mongoose save().
  await newAnnonce.save();
  // En réponse, le serveur me renvoit le message "Votre annonce a bien été créée".
  res.json("Votre annonce a bien été créée.");
});

// PUT / Permet de modifier un élément de ma base de donnée.
app.put("/modifier/:id", async function (req, res) {
  // Je recherche dans ma BD "Annonce", une annonce via son ID (req.params.id).
  const annonce = await Annonce.findById(req.params.id);
  // Ce que j'écris via le champs de type body (req.body.title) remplacera le titre dans l'annonce (annonce.title) en BD.
  annonce.title = req.body.title;
  // Je sauvegarde mon annonce dans la BD avec la méthode mongoose save() après ma modification.
  await annonce.save();
  // En réponse, le serveur me renvoit le message "L'annonce a bien été modifiée".
  res.json("L'annonce a bien été modifiée");
});

// DELETE / Permet de supprimer un élément de ma base de donnée.
app.delete("/supprimer/:id", async function (req, res) {
  // Je recherche dans ma BD "Annonce", une annonce via son ID et je la supprime. J'utilise la méthode mongoose findByIdAndDelete().
  await Annonce.findByIdAndDelete(req.params.id);
  // En réponse, le serveur me renvoit le message "Votre annonce a bien été supprimée".
  res.json("Votre annonce a bien été supprimée.");
});

// Le serveur écoute toutes les requêtes qui s'effectuent sur le port 8080.
app.listen(8080, () => {
  console.log("Server has started");
});
