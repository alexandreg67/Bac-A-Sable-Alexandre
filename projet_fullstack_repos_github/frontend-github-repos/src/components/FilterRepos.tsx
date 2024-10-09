import React from 'react';

interface FilterReposProps {
	availableLangs: string[];
	selectedLangs: string[];
	onLanguageChange: (lang: string, checked: boolean) => void;
}

const FilterRepos: React.FC<FilterReposProps> = ({
	availableLangs,
	selectedLangs,
	onLanguageChange,
}) => {
	return (
		<div className="mb-6 mx-auto p-4 bg-base-100 shadow-lg rounded-lg max-w-4xl">
			<h2 className="text-2xl font-bold text-center mb-4 text-primary">
				Filtrer par langage
			</h2>
			<div className="flex flex-wrap justify-center space-x-4 space-y-2">
				{availableLangs.map((lang) => (
					<label key={lang} className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={selectedLangs.includes(lang)}
							onChange={(e) => onLanguageChange(lang, e.target.checked)}
							className="checkbox checkbox-primary"
						/>
						<span className="text-sm text-gray-700">{lang}</span>
					</label>
				))}
			</div>
		</div>
	);
};

export default FilterRepos;
