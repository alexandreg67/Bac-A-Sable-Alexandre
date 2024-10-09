import axios from 'axios';
import { Repo } from '../types/repoTypes';

const API_URL = import.meta.env.VITE_API_URL;

// Fonction pour récupérer tous les dépôts, avec possibilité de filtrer par langues et statut
export const fetchRepos = async (
	langs?: string[],
	status?: string | null
): Promise<Repo[]> => {
	try {
		const response = await axios.get(`${API_URL}/repos`, {
			params: {
				langs: langs ? langs.join(',') : undefined,
				status: status || undefined,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Erreur lors du chargement des dépôts :', error);
		throw new Error('Erreur lors du chargement des dépôts');
	}
};

// Fonction pour récupérer un dépôt par ID
export const fetchRepoById = async (id: string | undefined): Promise<Repo> => {
	if (!id) throw new Error('ID du dépôt manquant');

	try {
		const response = await axios.get(`${API_URL}/repos/${id}`);
		return response.data;
	} catch (error) {
		console.error('Erreur lors du chargement du dépôt par ID :', error);
		throw new Error('Erreur lors du chargement du dépôt');
	}
};

// Fonction pour récupérer les commentaires associés à un dépôt
export const fetchCommentsByRepo = async (
	repoId: string
): Promise<Comment[]> => {
	try {
		const response = await axios.get(`${API_URL}/repos/${repoId}/comments`);
		return response.data;
	} catch (error) {
		console.error('Erreur lors du chargement des commentaires :', error);
		throw new Error('Erreur lors du chargement des commentaires');
	}
};

// Fonction pour poster un commentaire associé à un dépôt
export const postComment = async (
	repoId: string,
	content: string
): Promise<void> => {
	try {
		await axios.post(`${API_URL}/comments`, {
			repoId,
			content,
		});
	} catch (error) {
		console.error("Erreur lors de l'ajout du commentaire :", error);
		throw new Error("Erreur lors de l'ajout du commentaire");
	}
};
