import express from 'express';
import router from './router';
import 'reflect-metadata';
import { AppDataSource } from './db/data-source';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const { PORT } = process.env;
const { FRONTEND_URL } = process.env;
const app = express();

app.use(
	cors({
		origin: FRONTEND_URL,
		methods: ['GET'],
		credentials: true,
	})
);
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
	AppDataSource.initialize()
		.then(() => {
			console.log('La base de données a été initialisée.');
		})
		.catch((error) =>
			console.log(
				"Erreur lors de l'initialisation de la base de données",
				error
			)
		);
	console.log(`Serveur démarré sur le port http://localhost:${PORT}`);
});
