import React, { useEffect, useState } from 'react';
import RepoCard from './components/RepoCard';
import FilterRepos from './components/FilterRepos';
import { useQuery } from '@apollo/client';
import { GetAllRepos } from './services/api';
import { Lang, Repo } from './types/repoTypes';

const App: React.FC = () => {
	// Langages sélectionnés
	const [selectedLangs, setSelectedLangs] = useState<number[]>([]);

	const [availableLangs, setAvailableLangs] = useState<Lang[]>([]);

	console.log('Variables envoyées à la requête:', {
		langs: selectedLangs.length > 0 ? selectedLangs : null,
		// status: selectedStatus || null,
	});

	// Requête GraphQL pour récupérer les repos en fonction des langages sélectionnés
	const { loading, error, data, refetch } = useQuery(GetAllRepos, {
		variables: {
			langs: selectedLangs.length > 0 ? selectedLangs : null, // Utilisation d'un tableau d'entiers ou null
			// status: selectedStatus || null, // Chaîne ou null
		},
	});

	// Une fois les repos récupérés, met à jour la liste des langages
	useEffect(() => {
		if (data?.repos) {
			const allLangs = Array.from(
				new Set(
					data.repos.flatMap((repo: Repo) =>
						repo.langs.map((lang: Lang) => lang)
					)
				)
			);

			// Mets à jour les langages disponibles seulement si ce n'est pas déjà fait
			if (availableLangs.length === 0) {
				setAvailableLangs(allLangs as Lang[]);
			}
		}
	}, [data, availableLangs]);

	// Fonction appelée lorsque l'utilisateur sélectionne ou désélectionne un langage
	const handleLanguageChange = (langId: number, checked: boolean) => {
		const newSelectedLangs = checked
			? [...selectedLangs, langId] // Ajouter l'ID sélectionné
			: selectedLangs.filter((id) => id !== langId); // Retirer l'ID si décoché

		setSelectedLangs(newSelectedLangs);

		console.log('Langages sélectionnés:', newSelectedLangs);

		// Refetch les repos en fonction des nouveaux langages sélectionnés
		refetch({
			langs: newSelectedLangs.length > 0 ? newSelectedLangs : null,
		});
	};

	if (loading) return <p>Chargement...</p>;
	if (error) return <p>Erreur : {error.message}</p>;

	const repos: Repo[] = data?.repos || [];

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-4xl font-bold text-center mb-8 text-primary">
				Mes Repos GitHub
			</h1>

			<FilterRepos
				availableLangs={availableLangs} // Transmettre les langages uniques
				selectedLangs={selectedLangs} // Transmettre les langages sélectionnés
				onLanguageChange={handleLanguageChange} // Gérer les changements de sélection
			/>

			{repos.length === 0 ? (
				<p className="text-center text-lg">Aucun repo trouvé.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{repos.map((repo) => (
						<RepoCard key={repo.id} repo={repo} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
