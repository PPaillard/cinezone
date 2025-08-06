import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const database = mysql2.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

database.getConnection().catch((err) => {
  console.warn(
    "Attention:",
    "Impossible d'obtenir une connexion à la DB.",
    "Avez vous créé un .env avec de bonnes informations de connexion?",
    "\n",
    err.sqlMessage
  );
});

export default database;
