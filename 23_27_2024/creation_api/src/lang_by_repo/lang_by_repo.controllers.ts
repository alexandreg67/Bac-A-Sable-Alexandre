import express, { Response, Request } from 'express';
import langByRepo from '../../data/lang_by_repo.json'; // Importation du fichier JSON

const langByRepoControllers = express.Router();

langByRepoControllers.get('/', (_: Request, res: Response) => {
	res.status(200).json(langByRepo);
});

langByRepoControllers.get('/repo/:repo_id', (req: Request, res: Response) => {
	const repoLangs = langByRepo.filter(
		(lb) => lb.repo_id === req.params.repo_id
	);
	if (repoLangs.length > 0) {
		res.status(200).json(repoLangs);
	} else {
		res.sendStatus(404);
	}
});

langByRepoControllers.get('/lang/:lang_id', (req: Request, res: Response) => {
	const langRepos = langByRepo.filter(
		(lb) => lb.lang_id === parseInt(req.params.lang_id, 10)
	);
	if (langRepos.length > 0) {
		res.status(200).json(langRepos);
	} else {
		res.sendStatus(404);
	}
});

export default langByRepoControllers;
