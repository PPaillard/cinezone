import database from "../../database.js";
import bcrypt from "bcrypt";

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
