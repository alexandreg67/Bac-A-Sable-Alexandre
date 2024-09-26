import express, { Response, Request } from 'express';
import langs from '../../data/langs.json';
import { Lang } from './lang.type';

const langsControllers = express.Router();

langsControllers.get('/', (_: Request, res: Response) => {
	// on renvoie la liste des langages
	res.status(200).json(langs);
});

langsControllers.get('/:id', (req: Request, res: Response) => {
	// on cherche le langage dans le tableau en mémoire
	const lang = (langs as Lang[]).find(
		(lg) => lg.id === parseInt(req.params.id, 10)
	);
	if (lang) {
		// on renvoie le langage trouvé
		res.status(200).json(lang);
	} else {
		// on renvoie une erreur 404 si le langage n'est pas trouvé
		res.sendStatus(404);
	}
});

export default langsControllers;
