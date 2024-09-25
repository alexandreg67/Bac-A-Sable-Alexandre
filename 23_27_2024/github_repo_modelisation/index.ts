import * as fs from 'fs';

const GIT_API_URL = 'https://api.github.com/users/alexandreg67/repos';

async function fetchRepos() {
	try {
		const response = await fetch(GIT_API_URL);
		const repos = await response.json();

		const reposList = repos.map((repo: any) => {
			return {
				name: repo.name,
			};
		});

		fs.writeFile(
			'repos-data.json',
			JSON.stringify(reposList, null, 2),
			(err) => {
				if (err) {
					console.error("Erreur lors de l'écriture dans le fichier", err);
				} else {
					console.log('Les données ont été sauvegardées dans repos-data.json');
				}
			}
		);

		return reposList;
	} catch (error) {
		console.error('Erreur lors de la récupération des repositories :', error);
	}
}

fetchRepos();
