const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");

// Créer une base de donnée MongoDB qui s'appelle leboncoin.
mongoose.connect("mongodb://localhost/leboncoin");

// Créer un modèle pour nos éléments dans notre base de donnée.
const Annonce = mongoose.model("Annonce", {
  title: String,
  description: String,
  price: Number,
  image: String,
});

// GET / Permet de lire/reccupérer/afficher toutes les annonces via les paramètres de type query
app.get("/annonces", async function (req, res) {
  const annonces = await Annonce.find();
  res.json(annonces);
});

// POST / Permet d'envoyer des infos au serveur via les paramètres POST.
app.post("/creermonannonce", async function (req, res) {
  const newAnnonce = new Annonce({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  });

  await newAnnonce.save();
  res.json("Votre annonce a bien été créée.");
});

// PUT / Permet de modifier un élément de ma base de donnée.
app.put("/modifier/:id", async function (req, res) {
  const annonce = await Annonce.findById(req.params.id);
  annonce.title = req.body.title;
  await annonce.save();
  res.json("L'annonce a bien été modifiée");
});

// DELETE / Permet de supprimer un élément de ma base de donnée.
app.delete("/supprimer/:id", async function (req, res) {
  await Annonce.findByIdAndDelete(req.params.id);
  res.json("Votre annonce a bien été supprimée.");
});

// Permet de créer un serveur virtuel sur mon ordinateur. Le serveur écoutera toutes les requêtes sur le port 8080/3000.
app.listen(8080, () => {
  console.log("Server has started");
});
