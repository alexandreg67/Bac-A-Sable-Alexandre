import express, { Response, Request, NextFunction } from 'express';
import repos from '../../data/repos.json';
import Joi from 'joi';
import { Repo } from './repo.type';

const repoControllers = express.Router();

const schema = Joi.object({
	id: Joi.string().required(),
	name: Joi.string().required(),
	url: Joi.string().required(),
	isPrivate: Joi.number().min(1).max(2).required(),
});

const validateRepo = (req: Request, res: Response, next: NextFunction) => {
	// on valide le body de la requête
	const { error } = schema.validate(req.body);

	if (error == null) {
		// si pas d'erreur, on passe au middleware suivant
		next();
	} else {
		// si erreur, on renvoie une erreur 422
		res.status(422).json(error);
	}
};

repoControllers.get('/', (_: Request, res: Response) => {
	// on renvoie la liste des repos
	res.status(200).json(repos);
});

repoControllers.get('/:id', (req: Request, res: Response) => {
	// on cherche le repo dans le tableau en mémoire
	const repo = (repos as Repo[]).find((rep) => rep.id === req.params.id);
	if (repo) {
		// on renvoie le repo trouvé
		res.status(200).json(repo);
	} else {
		// on renvoie une erreur 404 si le repo n'est pas trouvé
		res.sendStatus(404);
	}
});

repoControllers.post('/', validateRepo, (req: Request, res: Response) => {
	// typage du body de la requête
	const newRepo: Repo = req.body;
	// on ajoute le repo dans le tableau en mémoire
	(repos as Repo[]).push(newRepo);
	// on renvoie le repo ajouté
	res.status(201).json(newRepo);
});

export default repoControllers;
