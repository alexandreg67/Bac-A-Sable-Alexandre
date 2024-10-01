import express from 'express';
import router from './router';
import 'reflect-metadata';
import { AppDataSource } from './db/data-source';

const app = express();

app.use(express.json());

app.use('/api', router);

const port = 3000;
app.listen(port, () => {
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
	console.log(`Serveur démarré sur le port http://localhost:${port}`);
});
