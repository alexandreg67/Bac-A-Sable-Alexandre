// import express from 'express';
// import router from './router';
// import 'reflect-metadata';
// import { AppDataSource } from './db/data-source';
// import cors from 'cors';
// import dotenv from 'dotenv';

// import { ApolloServer } from '@apollo/server';

// import repos from './data/repos.json';

// dotenv.config();
// const { PORT } = process.env;
// const { FRONTEND_URL } = process.env;
// const app = express();

// app.use(
// 	cors({
// 		origin: FRONTEND_URL,
// 		methods: ['GET'],
// 		credentials: true,
// 	})
// );
// app.use(express.json());
// app.use('/api', router);

// app.listen(PORT, () => {
// 	AppDataSource.initialize()
// 		.then(() => {
// 			console.log('La base de données a été initialisée.');
// 		})
// 		.catch((error) =>
// 			console.log(
// 				"Erreur lors de l'initialisation de la base de données",
// 				error
// 			)
// 		);
// 	console.log(`Serveur démarré sur le port http://localhost:${PORT}`);
// });

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSchema } from 'type-graphql';
import { RepoResolver } from './repos/repo.resolvers';
import { AppDataSource } from './db/data-source';

(async () => {
	// Connexion à la base de données
	AppDataSource.initialize()
		.then(() => {
			console.log('Data Source has been initialized!');
		})
		.catch((err) => {
			console.error('Error during Data Source initialization', err);
		});

	// Création du schéma GraphQL
	const schema = await buildSchema({
		// Ajout des résolveurs
		resolvers: [RepoResolver],
	});

	// Création du serveur Apollo
	const server = new ApolloServer({ schema });
	// Démarrage du serveur
	const { url } = await startStandaloneServer(server, {
		listen: { port: 4000 },
	});
	console.log(`🚀  Server ready at: ${url}`);
})();
