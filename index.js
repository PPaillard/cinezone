import express from "express";
import dotenv from "dotenv";
import database from "./database.js";

// On lance la lecture du .env
dotenv.config();

const app = express();

const serverPort = process.env.SERVER_PORT ?? 3000;

// Pour verifier que l'api est opérationnelle
app.get("/", (request, response) => {
  response.send("L'api fonctionne !");
});

app.listen(serverPort, () => {
  console.log("Serveur en écoute");
});
