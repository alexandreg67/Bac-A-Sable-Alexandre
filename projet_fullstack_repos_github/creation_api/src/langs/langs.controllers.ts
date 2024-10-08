import express, { Request, Response } from 'express';
import { AppDataSource } from '../db/data-source';
import { Lang } from './lang.entities';

const langsControllers = express.Router();

langsControllers.get('/', async (_: Request, res: Response) => {
	try {
		const langRepository = AppDataSource.getRepository(Lang);
		const langs = await langRepository.find();
		res.status(200).json(langs);
	} catch (error) {
		console.error('Erreur lors de la récupération des langages :', error);
		res
			.status(500)
			.json({ message: 'Erreur lors de la récupération des langages.' });
	}
});

langsControllers.get('/:id', async (req: Request, res: Response) => {
	try {
		const langRepository = AppDataSource.getRepository(Lang);
		const lang = await langRepository.findOneBy({
			id: parseInt(req.params.id),
		});

		if (!lang) {
			return res.status(404).json({ message: 'Langage non trouvé.' });
		}

		res.status(200).json(lang);
	} catch (error) {
		console.error('Erreur lors de la récupération du langage :', error);
		res
			.status(500)
			.json({ message: 'Erreur lors de la récupération du langage.' });
	}
});

langsControllers.post('/', async (req: Request, res: Response) => {
	try {
		const langRepository = AppDataSource.getRepository(Lang);
		const newLang = new Lang();
		newLang.label = req.body.label;

		const savedLang = await langRepository.save(newLang);
		res.status(201).json(savedLang);
	} catch (error) {
		console.error('Erreur lors de la création du langage :', error);
		res.status(500).json({ message: 'Erreur lors de la création du langage.' });
	}
});

export default langsControllers;
