import React from 'react';

interface FilterStatusProps {
	selectedStatus: string | null; // "Public", "Privé", ou null (pour tous les dépôts)
	onStatusChange: (status: string | null) => void;
}

const FilterStatus: React.FC<FilterStatusProps> = ({
	selectedStatus,
	onStatusChange,
}) => {
	return (
		<div className="mb-6 mx-auto p-4 bg-base-100 shadow-lg rounded-lg max-w-4xl">
			<h2 className="text-2xl font-bold text-center mb-4 text-primary">
				Filtrer par statut
			</h2>
			<div className="flex justify-center space-x-4">
				<label className="flex items-center space-x-2">
					<input
						type="radio"
						name="status"
						value="all"
						checked={selectedStatus === null}
						onChange={() => onStatusChange(null)} // Choisir tous les dépôts
						className="radio radio-primary"
					/>
					<span className="text-sm text-gray-700">Tous</span>
				</label>
				<label className="flex items-center space-x-2">
					<input
						type="radio"
						name="status"
						value="Public"
						checked={selectedStatus === 'Public'}
						onChange={() => onStatusChange('Public')}
						className="radio radio-primary"
					/>
					<span className="text-sm text-gray-700">Public</span>
				</label>
				<label className="flex items-center space-x-2">
					<input
						type="radio"
						name="status"
						value="Privé"
						checked={selectedStatus === 'Privé'}
						onChange={() => onStatusChange('Privé')}
						className="radio radio-primary"
					/>
					<span className="text-sm text-gray-700">Privé</span>
				</label>
			</div>
		</div>
	);
};

export default FilterStatus;
