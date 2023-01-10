//créer le serveur avec express:
const express = require('express')
const app = express()
app.use(express.json())

//package mongoose pour faire le lien entre le projet et la BDD mongoDB
const mongoose = require('mongoose')

mongoose
.set("strictQuery", false)
.connect("mongodb://localhost/my_mood_up") // pour connecter avec la BDD mongoDB "mymoodup"
.then(() => console.log("Connected to the DB!")); // avoir un message quand c'est bien connecté

//Je créer le modèle 
// les deux arguments de la fonction .model() sont (leNomDeMaCollection"users", {le model d'un element(chaque user) de la collection})
const User = mongoose.model("Users", {
    username : String, // username = une propriété d'un élément user
    password : String,
    email : String,
}) 
//  model user : username, password, email


app.post("/user/signup", async (req, res) => {
try {
    const newUser = new User ({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
})
await newUser.save()
res.json("Votre compte a bien été créé !") 

} catch (error) {
    console.log(error.message)
}

})

app.get('/', function (req, res) {
    res.send('Hello World')
  })
  
  app.listen(8080, () => {
    console.log("server has started")
  }) 

  // pour lancer serveur : nodemon server.js