import express from "express";
import dotenv from "dotenv";
import {
  insert,
  list,
  remove,
  show,
  update,
} from "./src/controllers/moviesController.js";
import { logger } from "./src/middlewares/logger.js";
import { validateMovies } from "./src/middlewares/validateMovies.js";

// On lance la lecture du .env
dotenv.config();

const app = express();

const serverPort = process.env.SERVER_PORT ?? 3000;

app.use(express.json());
app.use(logger);

app.get("/movies", list);

app.get("/movies/:id", show);

app.post("/movies", validateMovies, insert);

app.put("/movies/:id", update);

app.delete("/movies/:id", remove);

// Pour verifier que l'api est opérationnelle
app.get("/", (request, response) => {
  response.send("L'api fonctionne !");
});

app.listen(serverPort, () => {
  console.log("Serveur en écoute");
});
