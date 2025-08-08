import database from "../../database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function insert(req, res) {
  const { name, email, hashedPassword } = req.body;

  try {
    const [result] = await database.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export function login(req, res) {
  const { user } = req;
  // On prend le timestamp actuel (milliseconde)
  // on convertit en seconde et on arrondi
  const now = Math.floor(Date.now() / 1000);
  // dans le token, on place l'identifiant de l'user connecté
  // ainsi que le timestamp de création et d'expiration
  const token = jwt.sign(
    {
      sub: user.id,
      iat: now,
      exp:
        now +
        60 *
          60 *
          24 /* idéal serait que la durée d'expiration soit dans le .env*/,
    },
    process.env.JWT_SECRET
  );
  // httponly pour qu'il ne soit pas accessible via Javascript
  // secure pour préciser que ns n'utilisons pas HTTPS
  // expire dans 1 jr (à mettre dans le .env)
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 1000,
  });
  res.sendStatus(200);
}

export async function myProfile(req, res) {
  // qui est en train d'accèder à cette fonction?
  const { sub } = req.auth;
  try {
    const [[user]] = await database.query(
      "SELECT * FROM users WHERE id = ?",
      [sub]
    );
    res.json(user);
  } catch (error) {
    // serait bien de l'enregistrer dans un fichier de log
    console.error(error);
    res.sendStatus(500);
  }
}
