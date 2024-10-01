import express, { Response, Request } from 'express';
import { Repo } from './repo.entities';
import { AppDataSource } from '../db/data-source';

const repoControllers = express.Router();

repoControllers.get('/', async (req: Request, res: Response) => {
	try {
		const repoRepository = AppDataSource.getRepository(Repo);
		const repos = await repoRepository.find();
		res.json(repos);
	} catch (error) {
		console.error('Erreur lors de la récupération des repos :', error);
		res
			.status(500)
			.json({ message: 'Erreur lors de la récupération des données.' });
	}
});

repoControllers.get('/:id', (req: Request, res: Response) => {});

repoControllers.post('/', async (req: Request, res: Response) => {
	try {
		const repoRepository = AppDataSource.getRepository(Repo);

		const newRepo = new Repo();
		newRepo.id = req.body.id;
		newRepo.name = req.body.name;
		newRepo.url = req.body.url;
		newRepo.isPrivate = req.body.isPrivate;

		const savedRepo = await repoRepository.save(newRepo);

		res.status(201).json(savedRepo);
	} catch (error) {
		console.error('Erreur lors de la création du repo :', error);
		res.status(500).json({ message: 'Erreur lors de la création du repo.' });
	}
});

repoControllers.put('/:id', (req: Request, res: Response) => {});

repoControllers.delete('/:id', (req: Request, res: Response) => {});

export default repoControllers;
