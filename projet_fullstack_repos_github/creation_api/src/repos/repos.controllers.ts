// import express, { Response, Request } from 'express';
// import { Repo } from './repo.entities';
// import { AppDataSource } from '../db/data-source';
// import { Lang } from '../langs/lang.entities';
// import { In } from 'typeorm';
// import { Status } from '../status/status.entities';

// const repoControllers = express.Router();

// repoControllers.get('/', async (req: Request, res: Response) => {
// 	// Récupération du paramètre de requête
// 	const { langs, status } = req.query;

// 	try {
// 		// Construction de la requête avec jointure sur les relations
// 		let query = AppDataSource.getRepository(Repo)
// 			.createQueryBuilder('repo')
// 			.leftJoinAndSelect('repo.status', 'status') // Jointure avec le statut
// 			.innerJoinAndSelect('repo.langs', 'langs'); // Jointure avec les langages

// 		// Si un langage est spécifiée, on applique le filtre
// 		if (langs) {
// 			const langsArray = typeof langs === 'string' ? langs.split(',') : langs; // Convertir en tableau si c'est une chaîne séparée par des virgules
// 			console.log(`Filtrage par langues : ${langsArray}`);

// 			// On utilise IN pour vérifier que le label de langue est dans la liste des langues spécifiées
// 			query = query.where('langs.label IN (:...langsArray)', { langsArray });
// 		} else {
// 			// Sinon, on ne filtre pas par langue
// 			console.log('Pas de filtre par langue');
// 		}

// 		// Si un statut est spécifié (Public ou Privé), on applique le filtre de statut
// 		if (status) {
// 			console.log(`Filtrage par statut : ${status}`);

// 			// On vérifie que le label de statut correspond à ce qui est spécifié
// 			query = query.andWhere('status.label = :status', { status });
// 		} else {
// 			console.log('Pas de filtre par statut');
// 		}

// 		// Exécution de la requête
// 		const repos = await query.getMany(); // Utilisation de getMany() pour exécuter la requête
// 		res.json(repos);
// 	} catch (error) {
// 		console.error('Erreur lors de la récupération des repos :', error);
// 		res
// 			.status(500)
// 			.json({ message: 'Erreur lors de la récupération des données.' });
// 	}
// });

// repoControllers.get('/:id', async (req: Request, res: Response) => {
// 	console.log('ID du repo à récupérer:', req.params.id);

// 	try {
// 		const repoRepository = AppDataSource.getRepository(Repo);

// 		const repo = await repoRepository.findOne({
// 			where: { id: req.params.id },
// 			relations: ['status', 'langs'],
// 		});

// 		if (!repo) {
// 			return res.status(404).json({ message: 'Repo non trouvé' });
// 		}

// 		res.json(repo);
// 	} catch (error) {
// 		console.error('Erreur lors de la récupération du repo :', error);
// 		res
// 			.status(500)
// 			.json({ message: 'Erreur lors de la récupération du repo.' });
// 	}
// });

// repoControllers.post('/', async (req: Request, res: Response) => {
// 	try {
// 		const { name, url, statusId, langIds } = req.body;

// 		if (!name || !url || !statusId || !Array.isArray(langIds)) {
// 			return res
// 				.status(400)
// 				.json({ message: 'Des informations sont manquantes ou incorrectes.' });
// 		}

// 		const repo = new Repo();
// 		repo.name = name;
// 		repo.url = url;

// 		const status = await Status.findOneBy({ id: statusId });
// 		if (!status) {
// 			return res.status(400).json({ message: 'Statut invalide.' });
// 		}
// 		repo.status = status;

// 		const langs = await Lang.find({
// 			where: { id: In(langIds) },
// 		});

// 		if (!langs || langs.length === 0) {
// 			return res
// 				.status(400)
// 				.json({ message: 'Langues invalides ou non trouvées.' });
// 		}

// 		repo.langs = langs;

// 		await repo.save();

// 		res.status(201).json(repo);
// 	} catch (error) {
// 		console.error('Erreur lors de la création du repo :', error);
// 		res.status(500).json({ message: 'Erreur lors de la création du repo.' });
// 	}
// });

// repoControllers.put('/:id', async (req: Request, res: Response) => {
// 	try {
// 		const { name, url, statusId, langIds } = req.body;

// 		const repoRepository = AppDataSource.getRepository(Repo);
// 		const repo = await repoRepository.findOne({
// 			where: { id: req.params.id },
// 			relations: ['status', 'langs'],
// 		});

// 		if (!repo) {
// 			return res.status(404).json({ message: 'Repo non trouvé' });
// 		}

// 		console.log('Repo avant modification:', repo);

// 		repo.name = name || repo.name;
// 		repo.url = url || repo.url;

// 		if (statusId) {
// 			console.log('StatusID envoyé:', statusId);
// 			const status = await Status.findOneBy({ id: statusId });
// 			if (!status) {
// 				return res.status(400).json({ message: 'Statut invalide.' });
// 			}
// 			repo.status = status;
// 			console.log('Nouveau statut:', status);
// 		}

// 		if (Array.isArray(langIds) && langIds.length > 0) {
// 			console.log('Langues envoyées:', langIds);
// 			const langs = await Lang.find({
// 				where: { id: In(langIds) },
// 			});
// 			if (!langs || langs.length === 0) {
// 				return res
// 					.status(400)
// 					.json({ message: 'Langues invalides ou non trouvées.' });
// 			}
// 			repo.langs = langs;
// 			console.log('Nouvelles langues:', langs);
// 		}

// 		const updatedRepo = await repoRepository.save(repo);
// 		console.log('Repo après modification:', updatedRepo);
// 		res.json(updatedRepo);
// 	} catch (error) {
// 		console.error('Erreur lors de la mise à jour du repo :', error);
// 		res.status(500).json({ message: 'Erreur lors de la mise à jour du repo.' });
// 	}
// });

// repoControllers.delete('/:id', async (req: Request, res: Response) => {
// 	try {
// 		const repoRepository = AppDataSource.getRepository(Repo);
// 		const repo = await repoRepository.findOneBy({
// 			id: req.params.id,
// 		});

// 		if (!repo) {
// 			return res.status(404).json({ message: 'Repo non trouvé' });
// 		}

// 		await repoRepository.remove(repo);
// 		res.status(204).json({ message: 'Repo supprimé avec succès' });
// 	} catch (error) {
// 		console.error('Erreur lors de la suppression du repo :', error);
// 		res.status(500).json({ message: 'Erreur lors de la suppression du repo.' });
// 	}
// });

// export default repoControllers;
