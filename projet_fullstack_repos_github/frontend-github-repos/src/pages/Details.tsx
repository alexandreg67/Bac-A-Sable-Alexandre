import { useLoaderData } from 'react-router-dom';
import { Repo } from '../types/repoTypes';
import { useState } from 'react';
import { postComment } from '../services/api';

const Details: React.FC = () => {
	// Récupérer les données du loader
	const { repo, comments: initialComments } = useLoaderData() as {
		repo: Repo;
		comments: Comment[];
	};

	// État local pour gérer les commentaires
	const [comments, setComments] = useState<Comment[]>(initialComments);
	const [newComment, setNewComment] = useState<string>('');

	// Gérer la soumission d'un nouveau commentaire
	const handleCommentSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newComment.trim()) return;

		try {
			// Poster le commentaire
			await postComment(repo.id, newComment);
			// Réinitialiser le champ de commentaire
			setNewComment('');
			// Mettre à jour les commentaires en rechargeant ou en ajoutant localement
			const updatedComments = [
				...comments,
				{
					id: Date.now(),
					content: newComment,
					createdAt: new Date().toISOString(),
				},
			];
			setComments(updatedComments);
		} catch (error) {
			console.error("Erreur lors de l'ajout du commentaire", error);
		}
	};

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-4xl font-bold mb-4">{repo.name}</h1>
			<p>
				<strong>Statut :</strong> {repo.status.label}
			</p>
			<p>
				<strong>Langues :</strong>{' '}
				{repo.langs.map((lang) => lang.label).join(', ')}
			</p>
			<p>
				<strong>URL :</strong>{' '}
				<a
					href={repo.url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500"
				>
					Voir sur GitHub
				</a>
			</p>

			{/* Section des commentaires */}
			<div className="mt-8">
				<h2 className="text-2xl font-semibold mb-4">Commentaires</h2>
				{comments.length > 0 ? (
					<div className="space-y-4">
						{comments.map((comment) => (
							<div
								key={comment.id}
								className="p-4 bg-gray-100 rounded-lg shadow-sm"
							>
								<p>{comment.content}</p>
								<small className="text-gray-500">
									{new Date(comment.createdAt).toLocaleString()}
								</small>
							</div>
						))}
					</div>
				) : (
					<p>Aucun commentaire pour ce dépôt.</p>
				)}
			</div>

			{/* Formulaire d'ajout de commentaire */}
			<div className="mt-8">
				<h3 className="text-xl font-semibold mb-4">Ajouter un commentaire</h3>
				<form onSubmit={handleCommentSubmit} className="space-y-4">
					<textarea
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
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
