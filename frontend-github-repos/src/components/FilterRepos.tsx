import React from 'react';

interface FilterReposProps {
	availableLangs: { id: number; label: string }[]; // Tableau d'objets avec ID et label
	selectedLangs: number[]; // Stockage des IDs sélectionnés
	onLanguageChange: (langId: number, checked: boolean) => void; // Méthode pour changer la sélection
}

const FilterRepos: React.FC<FilterReposProps> = ({
	availableLangs,
	selectedLangs,
	onLanguageChange,
}) => {
	console.log('Langages disponibles passés à FilterRepos:', availableLangs);

	return (
		<div className="mb-6 mx-auto p-4 bg-base-100 shadow-lg rounded-lg max-w-4xl">
			<h2 className="text-2xl font-bold text-center mb-4 text-primary">
				Filtrer par langage
			</h2>
			<div className="flex flex-wrap justify-center space-x-4 space-y-2">
				{availableLangs.map((lang) => (
					<label key={lang.id} className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={selectedLangs.includes(lang.id)} // Utilise l'ID du langage pour savoir s'il est sélectionné
							onChange={(e) => onLanguageChange(lang.id, e.target.checked)} // Passe l'ID du langage
							className="checkbox checkbox-primary"
						/>
						<span className="text-sm text-gray-700">{lang.label}</span>
					</label>
				))}
			</div>
		</div>
	);
};

export default FilterRepos;
