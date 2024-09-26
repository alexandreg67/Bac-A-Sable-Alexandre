import express from 'express';
import router from './router';

const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

app.use('/api', router);

const port = 3000;
app.listen(port, () => {
	console.log(`Serveur démarré sur le port ${port}`);
});
