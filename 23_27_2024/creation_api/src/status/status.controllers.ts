import express, { Response, Request } from 'express';
import statuses from '../../data/status.json';

const statusControllers = express.Router();

statusControllers.get('/', (_: Request, res: Response) => {
	res.status(200).json(statuses);
});

statusControllers.get('/:id', (req: Request, res: Response) => {
	const status = statuses.find((st) => st.id === parseInt(req.params.id, 10));
	if (status) {
		res.status(200).json(status);
	} else {
		res.sendStatus(404);
	}
});

export default statusControllers;
