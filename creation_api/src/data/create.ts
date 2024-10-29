import * as fs from 'fs/promises';
import * as path from 'path';

type Repo = {
	id: string;
	name: string;
	url: string;
	isPrivate: number;
};

type Lang = {
	id: number;
	label: string;
};

type LangBy = { repo_id: string; lang_id: number };

type LangRaw = { node: { name: string } };

(async () => {
	try {
		const dataDir = __dirname;

		const rawPath = path.join(dataDir, 'raw.json');
		const raw = await fs.readFile(rawPath, { encoding: 'utf-8' });
		const parsedData = JSON.parse(raw);

		if (!Array.isArray(parsedData) || parsedData.length === 0) {
			throw new Error('Le fichier raw.json ne contient aucune donnée valide.');
		}

		const repo: Repo[] = parsedData.map(
			(rep: { id: string; isPrivate: boolean; name: string; url: string }) => ({
				id: rep.id,
				isPrivate: rep.isPrivate ? 1 : 2, // Convertir en statut numérique (1 pour Privé, 2 pour Public)
				name: rep.name,
				url: rep.url,
			})
		);

		const langs: Lang[] = [];
		const lang_by_repo: LangBy[] = [];
		let langId: number = 1;

		parsedData.forEach((rep: any) => {
			if (
				rep.languages &&
				Array.isArray(rep.languages) &&
				rep.languages.length > 0
			) {
				rep.languages.forEach((lang: LangRaw) => {
					if (!langs.some((lg: Lang) => lg.label === lang.node.name)) {
						langs.push({ id: langId, label: lang.node.name });
						langId++;
					}

					const myLang = langs.find(
						(lg: Lang) => lg.label === lang.node.name
					) as Lang;
					lang_by_repo.push({ repo_id: rep.id, lang_id: myLang.id });
				});
			} else {
				console.warn(`Le dépôt "${rep.name}" n'a pas de langues spécifiées.`);
			}
		});

		await Promise.all([
			fs.writeFile(
				path.join(dataDir, 'repos.json'),
				JSON.stringify(repo, null, 2)
			),
			fs.writeFile(
				path.join(dataDir, 'langs.json'),
				JSON.stringify(langs, null, 2)
			),
			fs.writeFile(
				path.join(dataDir, 'lang_by_repo.json'),
				JSON.stringify(lang_by_repo, null, 2)
			),
			fs.writeFile(
				path.join(dataDir, 'status.json'),
				JSON.stringify(
					[
						{
							id: 1,
							label: 'Privé',
						},
						{
							id: 2,
							label: 'Public',
						},
					],
					null,
					2
				)
			),
		]);

		console.log('Tous les fichiers JSON ont été créés avec succès !');
	} catch (err) {
		console.error('Erreur lors de la création des fichiers :', err);
	}
})();
