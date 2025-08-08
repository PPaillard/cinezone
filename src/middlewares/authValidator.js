import { body } from "express-validator";
import database from "../../database.js";
import bcrypt from "bcrypt";
import { handleValidationErrors } from "./handleValidationErrors.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function checkEmailNotTaken(req, res, next) {
  try {
    const { email } = req.body;

    const [users] = await database.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (users.length > 0) {
      return res.status(409).json({ error: "Email déjà utilisé" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function hashPassword(req, res, next) {
  try {
    const { password } = req.body;

    req.body.hashedPassword = await bcrypt.hash(password, 10);

    delete req.body.password; // On supprime le mdp en clair

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 10 })
    .withMessage("Password must have at least 10 caracters"),
  handleValidationErrors,
];

export async function findUserByEmail(req, res, next) {
  const { email } = req.body;

  const [[user]] = await database.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (!user) {
    return res.status(401).json({ error: "Identifiants invalides" });
  }
  // On passe le user aux prochains middleware.
  req.user = user;
  next();
}

export async function verifyPassword(req, res, next) {
  const { password } = req.body;
  const { user } = req;

  const ok = await bcrypt.compare(password, user.password);
  // Si la comparaison s'est mal passée
  if (!ok) {
    return res.status(401).json({ error: "Identifiants invalides" });
  }
  next();
}

export function requireAuth(req, res, next) {
  const { access_token } = req.cookies;

  if (!access_token) {
    return res.status(401).json({ error: "Token manquant" });
  }
  try {
    // on fait passer au prochain middleware
    req.auth = jwt.verify(access_token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Token invalide ou expiré" });
  }
}
