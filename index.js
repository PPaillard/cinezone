import express from "express";
import dotenv from "dotenv";
// On lance la lecture du .env
dotenv.config();

const app = express();

const serverPort = process.env.SERVER_PORT;

app.get("/", (request, response) => {
  response.send("L'api fonctionne !");
});

app.listen(serverPort, () => {
  console.log("Serveur en écoute");
});
