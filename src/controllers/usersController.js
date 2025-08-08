import database from "../../database.js";

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
