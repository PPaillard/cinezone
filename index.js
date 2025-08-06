import express from "express";
import dotenv from "dotenv";
import database from "./database.js";

// On lance la lecture du .env
dotenv.config();

const app = express();

const serverPort = process.env.SERVER_PORT ?? 3000;

app.get("/movies", function (req, res) {
  database
    .query("SELECT * FROM movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((error) => {
      // serait bien de l'enregistrer dans un fichier de log
      console.error(error);
      res.sendStatus(500);
    });
});

app.get("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  database
    .query("SELECT * FROM movies WHERE id=?", [id])
    .then(([movies]) => {
      if (movies.length === 0) {
        res.sendStatus(404);
      } else {
        res.json(movies[0]);
      }
    })
    .catch((error) => {
      // serait bien de l'enregistrer dans un fichier de log
      console.error(error);
      res.sendStatus(500);
    });
});

// Pour verifier que l'api est opérationnelle
app.get("/", (request, response) => {
  response.send("L'api fonctionne !");
});

app.listen(serverPort, () => {
  console.log("Serveur en écoute");
});
