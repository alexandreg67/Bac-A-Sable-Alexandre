import * as fs from 'fs';
import { exec } from 'child_process';

async function fetchRepos() {
	try {
		// exec(command, callback);
		exec('gh repo list alexandreg67', (error, stdout, stderr) => {
			try {
				const repos = stdout;
				console.log('Liste des repositories :', stdout);

				fs.writeFile('raw.json', JSON.stringify(repos, null, 2), (err) => {
					if (err) {
						console.error("Erreur lors de l'écriture dans le fichier", err);
					} else {
						console.log('Les données ont été sauvegardées dans raw.json');
					}
				});
			} catch (parseError) {
				console.error('Erreur lors du parsing de la sortie gh :', parseError);
			}
		});
	} catch (error) {
		console.error('Erreur lors de la récupération des repositories :', error);
	}
}

fetchRepos();
