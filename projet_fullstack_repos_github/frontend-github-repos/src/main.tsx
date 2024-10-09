import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Details from './pages/Details';
import { fetchCommentsByRepo, fetchRepoById, fetchRepos } from './services/api';
import App from './App';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		loader: async () => {
			const repos = await fetchRepos(); // Charger les dépôts
			// Extraire et fixer la liste des languages disponibles
			const repoLangs = repos.map((repo) => repo.langs);
			const allLangs = repoLangs.flat().map((lang) => lang.label);
			const availableLangs = [...new Set(allLangs)]; // Suppression des doublons
			return { repos, availableLangs };
		},
	},
	{
		path: '/details/:id',
		element: <Details />,
		loader: async ({ params }) => {
			const { id } = params;
			if (id) {
				const repo = await fetchRepoById(id);
				const comments = await fetchCommentsByRepo(id);
				return { repo, comments };
			}
			throw new Error('ID du dépôt manquant');
		},
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
