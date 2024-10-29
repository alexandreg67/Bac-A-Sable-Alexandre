import express, { Response, Request } from 'express';

const langByRepoControllers = express.Router();

langByRepoControllers.get('/', (_: Request, res: Response) => {});

langByRepoControllers.get(
	'/repo/:repo_id',
	(req: Request, res: Response) => {}
);

langByRepoControllers.get(
	'/lang/:lang_id',
	(req: Request, res: Response) => {}
);

export default langByRepoControllers;
