import { useLoaderData } from 'react-router-dom';
import { Repo } from './types/repoTypes';
import RepoCard from './components/RepoCard';
import FilterRepos from './components/FilterRepos';
import FilterStatus from './components/FilterStatus';
import { useState } from 'react';

const App: React.FC = () => {
	// Récupérer les données du loader
	const { repos, availableLangs } = useLoaderData() as {
		repos: Repo[];
		availableLangs: string[];
	};

	const [filteredRepos, setFilteredRepos] = useState<Repo[]>(repos); // repos filtrés
	const [selectedLangs, setSelectedLangs] = useState<string[]>([]); // Langages sélectionnés
	const [selectedStatus, setSelectedStatus] = useState<string | null>(null); // Statut sélectionné

	// Appliquer les filtres de langue et de statut
	const applyFilters = async (langs: string[], status: string | null) => {
		// Filtrer les dépôts en fonction des langues et du statut sélectionnés
		const filtered = repos.filter((repo) => {
			const matchesLangs =
				langs.length === 0 ||
				repo.langs.some((lang) => langs.includes(lang.label));
			const matchesStatus = status === null || repo.status.label === status;
			return matchesLangs && matchesStatus;
		});
		setFilteredRepos(filtered);
	};

	// Gestion du changement de langage
	const handleLanguageChange = (lang: string, checked: boolean) => {
		const newSelectedLangs = checked
			? [...selectedLangs, lang] // Ajouter un langage
			: selectedLangs.filter((selectedLang) => selectedLang !== lang); // Retirer un langage

		setSelectedLangs(newSelectedLangs); // Mettre à jour les langages sélectionnées
		applyFilters(newSelectedLangs, selectedStatus); // Appliquer les filtres
	};

	// Gestion du changement de statut
	const handleStatusChange = (status: string | null) => {
		setSelectedStatus(status); // Mettre à jour le statut
		applyFilters(selectedLangs, status); // Appliquer les filtres
	};

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-4xl font-bold text-center mb-8 text-primary">
				Mes Repos GitHub
			</h1>

			<FilterRepos
				availableLangs={availableLangs} // Liste des langages
				selectedLangs={selectedLangs} // Langages sélectionnés
				onLanguageChange={handleLanguageChange} // Gestion des changements de langages
			/>

			<FilterStatus
				selectedStatus={selectedStatus} // Statut sélectionné
				onStatusChange={handleStatusChange} // Gestion des changements de statut
			/>

			{filteredRepos.length === 0 ? (
				<p className="text-center text-lg">Aucun repo trouvé.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredRepos.map((repo) => (
						<RepoCard key={repo.id} repo={repo} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
