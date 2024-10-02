import * as fs from 'fs';
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
		const raw = await JSON.parse(
			fs.readFileSync(rawPath, { encoding: 'utf-8' })
		);

		const repo: Repo[] = raw.map(
			(rep: { id: string; isPrivate: boolean; name: string; url: string }) => ({
				id: rep.id,
				isPrivate: rep.isPrivate ? 1 : 2,
				name: rep.name,
				url: rep.url,
			})
		);

		const langs: Lang[] = [];
		const lang_by_repo: LangBy[] = [];
		let langId: number = 1;
		raw.forEach((rep: any) => {
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
		});

		await fs.writeFile(
			path.join(dataDir, 'repos.json'),
			JSON.stringify(repo),
			(err) =>
				err ? console.error(err) : console.log('File repos.json is ready')
		);

		await fs.writeFile(
			path.join(dataDir, 'langs.json'),
			JSON.stringify(langs),
			(err) =>
				err ? console.error(err) : console.log('File langs.json is ready')
		);

		await fs.writeFile(
			path.join(dataDir, 'lang_by_repo.json'),
			JSON.stringify(lang_by_repo),
			(err) =>
				err
					? console.error(err)
					: console.log('File lang_by_repo.json is ready')
		);

		await fs.writeFile(
			path.join(dataDir, 'status.json'),
			JSON.stringify([
				{
					id: 1,
					label: 'Privé',
				},
				{ id: 2, label: 'Public' },
			]),
			(err) =>
				err ? console.error(err) : console.log('File status.json is ready')
		);
	} catch (err) {
		console.error('Erreur lors de la création des fichiers :', err);
	}
})();
