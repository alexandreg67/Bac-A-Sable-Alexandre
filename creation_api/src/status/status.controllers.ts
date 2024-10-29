import express, { Response, Request } from 'express';
import { Status } from './status.entities';
import { AppDataSource } from '../db/data-source';

const statusControllers = express.Router();

statusControllers.get('/', async (req: Request, res: Response) => {});

statusControllers.get('/:id', async (req: Request, res: Response) => {});

statusControllers.post('/', async (req: Request, res: Response) => {
	try {
		const repoStatus = AppDataSource.getRepository(Status);

		const newStatus = new Status();
		newStatus.id = req.body.id;
		newStatus.label = req.body.label;

		const savedStatus = await repoStatus.save(newStatus);

		res.status(201).json(savedStatus);
	} catch (error) {
		console.error('Erreur lors de la création du status :', error);
		res.status(500).json({ message: 'Erreur lors de la création du status.' });
	}
});

statusControllers.put('/:id', async (req: Request, res: Response) => {});

statusControllers.delete('/:id', async (req: Request, res: Response) => {});

export default statusControllers;
