import express, { Response, Request } from 'express';
import langs from '../../data/langs.json';

const langsControllers = express.Router();

langsControllers.get('/', (_: Request, res: Response) => {
	res.status(200).json(langs);
});

langsControllers.get('/:id', (req: Request, res: Response) => {
	const lang = langs.find((lg) => lg.id === parseInt(req.params.id, 10));
	if (lang) {
		res.status(200).json(lang);
	} else {
		res.sendStatus(404);
	}
});

export default langsControllers;
