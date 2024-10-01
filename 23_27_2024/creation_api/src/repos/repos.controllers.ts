import express, { Response, Request } from 'express';
import { Repo } from './repo.entities';
import { AppDataSource } from '../db/data-source';
import { Status } from '../status/status.entities';

const repoControllers = express.Router();

repoControllers.get('/', async (req: Request, res: Response) => {
	try {
		const repoRepository = AppDataSource.getRepository(Repo);
		const repos = await repoRepository.find({
			relations: ['status'],
		});
		res.json(repos);
	} catch (error) {
		console.error('Erreur lors de la récupération des repos :', error);
		res
			.status(500)
			.json({ message: 'Erreur lors de la récupération des données.' });
	}
});

repoControllers.get('/:id', async (req: Request, res: Response) => {
	try {
		const repoRepository = AppDataSource.getRepository(Repo);
		const repo = await repoRepository.findOne({
			where: { id: parseInt(req.params.id) },
			relations: ['status'],
		});

		if (!repo) {
			return res.status(404).json({ message: 'Repo non trouvé' });
		}

		res.json(repo);
	} catch (error) {
		console.error('Erreur lors de la récupération du repo :', error);
		res
			.status(500)
			.json({ message: 'Erreur lors de la récupération du repo.' });
	}
});

repoControllers.post('/', async (req: Request, res: Response) => {
	try {
		const repoRepository = AppDataSource.getRepository(Repo);

		const newRepo = new Repo();
		newRepo.id = req.body.id;
		newRepo.name = req.body.name;
		newRepo.url = req.body.url;

		const status = await AppDataSource.getRepository(Status).findOneByOrFail({
			id: req.body.statusId,
		});

		newRepo.status = status;

		const savedRepo = await repoRepository.save(newRepo);

		res.status(201).json(savedRepo);
	} catch (error) {
		console.error('Erreur lors de la création du repo :', error);
		res.status(500).json({ message: 'Erreur lors de la création du repo.' });
	}
});

repoControllers.put('/:id', async (req: Request, res: Response) => {
	try {
		const repoRepository = AppDataSource.getRepository(Repo);
		const repo = await repoRepository.findOneBy({
			id: parseInt(req.params.id),
		});

		if (!repo) {
			return res.status(404).json({ message: 'Repo non trouvé' });
		}
		repo.name = req.body.name || repo.name;
		repo.url = req.body.url || repo.url;
		repo.status =
			req.body.isPrivate !== undefined ? req.body.isPrivate : repo.status;

		const updatedRepo = await repoRepository.save(repo);
		res.json(updatedRepo);
	} catch (error) {
		console.error('Erreur lors de la mise à jour du repo :', error);
		res.status(500).json({ message: 'Erreur lors de la mise à jour du repo.' });
	}
});

repoControllers.delete('/:id', async (req: Request, res: Response) => {
	try {
		const repoRepository = AppDataSource.getRepository(Repo);
		const repo = await repoRepository.findOneBy({
			id: parseInt(req.params.id),
		});

		if (!repo) {
			return res.status(404).json({ message: 'Repo non trouvé' });
		}

		await repoRepository.remove(repo);
		res.status(204).json({ message: 'Repo supprimé avec succès' });
	} catch (error) {
		console.error('Erreur lors de la suppression du repo :', error);
		res.status(500).json({ message: 'Erreur lors de la suppression du repo.' });
	}
});

export default repoControllers;
