import { GetRepoDetails } from '../services/api';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { Repo } from '../types/repoTypes';

const Details: React.FC = () => {
	const { id } = useParams<{ id: string }>(); // Récupère l'id du repo à partir de l'URL
	const { loading, error, data } = useQuery(GetRepoDetails, {
		variables: { id },
	});

	// Vérifie si la requête est en cours ou a échoué
	if (loading) return <p>Chargement...</p>;
	if (error) return <p>Erreur lors du chargement des détails du dépôt.</p>;

	// Récupérer les détails du repo et les commentaires
	const repo: Repo = data.repo;

	return (
		<div className="container mx-auto p-6 max-w-3xl">
			{/* Bouton pour revenir à la liste des repos */}
			<Link
				to="/"
				className="text-blue-500 hover:text-blue-700 mb-6 inline-block"
			>
				← Retour à la liste des dépôts
			</Link>

			{/* Titre du repo */}
			<h1 className="text-5xl font-bold mb-6 text-primary">{repo.name}</h1>

			{/* Statut */}
			<p className="text-lg mb-4">
				<strong>Statut :</strong>{' '}
				<span className="badge badge-primary badge-lg">
					{repo.status.label}
				</span>
			</p>

			{/* Langages */}
			<div className="mb-6">
				<strong>Langages :</strong>
				{repo.langs.length > 0 ? (
					<div className="flex space-x-2 mt-2">
						{repo.langs.map((lang) => (
							<span key={lang.label} className="badge badge-info">
								{lang.label}
							</span>
						))}
					</div>
				) : (
					<p className="text-gray-500">
						Aucun langage disponible pour ce dépôt.
					</p>
				)}
			</div>

			{/* URL du repo */}
			<p className="mb-6">
				<strong>URL :</strong>{' '}
				<a
					href={repo.url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500 hover:underline"
				>
					Voir sur GitHub
				</a>
			</p>

			{/* Formulaire pour ajouter un commentaire (esthétique, logique à implémenter plus tard) */}
			<div className="mt-8">
				<h3 className="text-2xl font-semibold mb-4">Ajouter un commentaire</h3>
				<form className="space-y-4">
					<textarea
						placeholder="Écrire un commentaire"
						className="textarea textarea-bordered w-full"
					/>
					<button type="submit" className="btn btn-primary">
						Ajouter un commentaire
					</button>
				</form>
			</div>
		</div>
	);
};

export default Details;
