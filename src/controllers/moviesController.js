import database from "../../database.js";

export function list(req, res) {
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
}

export function show(req, res) {
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
}

export function insert(req, res) {
  if (!req.body) {
    res.sendStatus(400);
  }

  const { title, director, rating, release_year, category_id } = req.body;
  database
    .query(
      "INSERT INTO movies (title, director, rating, release_year, category_id) VALUES(?,?,?,?,?)",
      [title, director, rating, release_year, category_id]
    )
    .then(([result]) => {
      res.status(201).json({
        id: result.insertId,
      });
    })
    .catch((error) => {
      // serait bien de l'enregistrer dans un fichier de log
      console.error(error);
      res.sendStatus(500);
    });
}

export async function update(req, res) {
  try {
    if (!req.body) {
      res.sendStatus(400);
    }
    const id = parseInt(req.params.id);
    const { title, director, rating, release_year, category_id } = req.body;
    // requête vers la BDD
    const [result] = await database.query(
      "UPDATE movies SET title=?, director=?, rating=?, release_year=?, category_id=? WHERE id=?",
      [title, director, rating, release_year, category_id, id]
    );

    if (result.affectedRows === 0) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function remove(req, res) {
  try {
    const id = parseInt(req.params.id);
    const [result] = await database.query("DELETE FROM movies WHERE id=?", [
      id,
    ]);
    if (result.affectedRows === 0) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus;
  }
}
