import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";
import { RepoResolver } from "./repos/repo.resolvers";
import { AppDataSource } from "./db/data-source";
import cors from "cors";

(async () => {
  // Connexion à la base de données
  AppDataSource.initialize()
    .then(() => {
      console.log("💽  Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  // Création du schéma GraphQL
  const schema = await buildSchema({
    resolvers: [RepoResolver],
  });

  // Création du serveur Apollo
  const server = new ApolloServer({ schema });

  // Démarrage du serveur Apollo
  await server.start();

  // Création de l'application Express
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      origin: "*", // Autoriser toutes les origines
    })
  );

  app.use("/graphql", expressMiddleware(server));

  app.listen(4000, () => {
    console.log("🚀 Server ready at http://localhost:4000/graphql");
  });
})();
