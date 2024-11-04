import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Repo } from "../repos/repo.entities";
import { Status } from "../status/status.entities";
import { Lang } from "../langs/lang.entities";
import { Comment } from "../comments/comment.entities";

dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// On crée une instance de DataSource
// export const AppDataSource = new DataSource({
//   type: "sqlite",
//   database: `mydatabase.sqlite`,
//   synchronize: true,
//   // logging: true,
//   entities: [Repo, Status, Lang, Comment],
// });

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST, // Nom du conteneur PostgreSQL
  port: 5432, // Port par défaut de PostgreSQL
  username: process.env.DB_USER, // Nom d'utilisateur de PostgreSQL
  password: process.env.DB_PASSWORD, // Mot de passe PostgreSQL
  database: process.env.DB_NAME, // Nom de la base de données
  synchronize: true, // Pour synchroniser les entités
  // logging: false,
  entities: [Repo, Status, Lang, Comment],
});
