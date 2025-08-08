import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {
  insert,
  list,
  remove,
  show,
  update,
} from "./src/controllers/moviesController.js";
import {
  insert as insertUser,
  login,
  myProfile,
} from "./src/controllers/usersController.js";
import { logger } from "./src/middlewares/logger.js";
import { validateMovies } from "./src/middlewares/validateMovies.js";
import { requireAdminQuery } from "./src/middlewares/requireAdminQuery.js";
import { validateUser } from "./src/middlewares/userValidators.js";
import {
  checkEmailNotTaken,
  findUserByEmail,
  hashPassword,
  requireAuth,
  validateLogin,
  verifyPassword,
} from "./src/middlewares/authValidator.js";

// On lance la lecture du .env
dotenv.config();

const app = express();

const serverPort = process.env.SERVER_PORT ?? 3000;

app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.get("/movies", list);

app.get("/movies/:id", show);

app.post("/movies", requireAuth, validateMovies, insert);

app.put("/movies/:id", requireAuth, validateMovies, update);

app.delete("/movies/:id", requireAuth, requireAdminQuery, remove);
// Inscription
app.post("/users", validateUser, checkEmailNotTaken, hashPassword, insertUser);
// connexion
app.post("/login", validateLogin, findUserByEmail, verifyPassword, login);
// myprofile
app.get("/profile", requireAuth, myProfile);

// Pour verifier que l'api est opérationnelle
app.get("/", (request, response) => {
  response.send("L'api fonctionne !");
});

app.listen(serverPort, () => {
  console.log("Serveur en écoute");
});
