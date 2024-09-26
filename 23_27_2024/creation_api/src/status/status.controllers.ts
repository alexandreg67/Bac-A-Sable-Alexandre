import express, { Response, Request } from 'express';
import statuses from '../../data/status.json';
import { Status } from './status.type';

const statusControllers = express.Router();

statusControllers.get('/', (_: Request, res: Response) => {
	// on renvoie la liste des status
	res.status(200).json(statuses);
});

statusControllers.get('/:id', (req: Request, res: Response) => {
	// on cherche le status dans le tableau en mémoire
	const status = (statuses as Status[]).find(
		(st) => st.id === parseInt(req.params.id, 10)
	);
	if (status) {
		// on renvoie le status trouvé
		res.status(200).json(status);
	} else {
		// on renvoie une erreur 404 si le status n'est pas trouvé
		res.sendStatus(404);
	}
});

export default statusControllers;
