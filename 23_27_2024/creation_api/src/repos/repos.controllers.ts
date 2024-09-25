import express, { Response, Request } from 'express';
import repos from '../../data/repos.json';

const repoControllers = express.Router();

repoControllers.get('/', (_: Request, res: Response) => {
	res.status(200).json(repos);
});

repoControllers.get('/:id', (req: Request, res: Response) => {
	const repo = repos.find((rep) => rep.id === req.params.id);
	if (repo) {
		res.status(200).json(repo);
	} else {
		res.sendStatus(404);
	}
});

export default repoControllers;
