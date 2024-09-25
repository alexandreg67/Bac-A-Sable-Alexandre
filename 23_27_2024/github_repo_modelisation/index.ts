import * as fs from 'fs';

type Repo = {
	id: string;
	name: string;
	url: string;
	isPrivate: number;
};

(async () => {
	const raw = await JSON.parse(
		fs.readFileSync('./data/raw.json', { encoding: 'utf-8' })
	);

	const repo: Repo[] = raw.map((rep: any) => ({
		id: rep.id,
		isPrivate: rep.isPrivate ? 1 : 2,
		name: rep.name,
		url: rep.url,
	}));

	raw.forEach((rep: any) => {});
})();
