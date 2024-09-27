import express, { Response, Request, NextFunction } from 'express';
import repos from '../../data/repos.json';
import Joi from 'joi';
import { Repo } from './repo.type';

const repoControllers = express.Router();

// let repos: Repo[] = require('../../data/repos.json');

// règles de validation pour le body de la requête
const schema = Joi.object({
	// id doit être une chaîne de caractères obligatoire
	id: Joi.string().required(),
	// name doit être une chaîne de caractères obligatoire
	name: Joi.string().required(),
	// url doit être une chaîne de caractères obligatoire
	url: Joi.string().required(),
	// isPrivate doit être un nombre entre 1 et 2
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

repoControllers.get('/', (req: Request, res: Response) => {
	const { name, isPrivate } = req.query;

	let filteredRepos = repos as Repo[];

	if (name) {
		filteredRepos = filteredRepos.filter((repo) =>
			repo.name.toLowerCase().includes((name as string).toLowerCase())
		);
	}

	if (isPrivate) {
		filteredRepos = filteredRepos.filter(
			(repo) => repo.isPrivate === parseInt(isPrivate as string, 10)
		);
	}

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

repoControllers.put('/:id', validateRepo, (req: Request, res: Response) => {
	const repo = (repos as Repo[]).find((rep) => rep.id === req.params.id);

	if (repo) {
		// typage du body de la requête
		const updatedRepo: Repo = req.body;
		// on met à jour le repo dans le tableau en mémoire
		Object.assign(repo, updatedRepo);
		// on renvoie le repo mis à jour
		res.status(200).json(updatedRepo);
	} else {
		// on renvoie une erreur 404 si le repo n'est pas trouvé
		res.sendStatus(404);
	}
});

repoControllers.delete('/:id', (req: Request, res: Response) => {
	// on cherche le repo dans le tableau en mémoire
	const repoIndex = (repos as Repo[]).findIndex(
		(rep) => rep.id === req.params.id
	);

	// repos = repos.filter((rep) => rep.id !== req.params.id);

	if (repoIndex !== -1) {
		(repos as Repo[]).splice(repoIndex, 1);
		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

export default repoControllers;
