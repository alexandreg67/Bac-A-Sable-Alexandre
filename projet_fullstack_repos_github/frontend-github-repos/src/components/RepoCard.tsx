import { Link } from 'react-router-dom';
import { Repo } from '../types/repoTypes';

interface RepoCardProps {
	repo: Repo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
	return (
		<div className="card shadow-lg compact bg-base-100">
			<div className="card-body">
				<h2 className="card-title text-primary">{repo.name}</h2>
				<p className="text-gray-600">
					<strong>Statut:</strong> {repo.status.label}
				</p>
				<p className="text-gray-600">
					<strong>Langages:</strong>{' '}
					{repo.langs.map((lang) => lang.label).join(', ')}
				</p>
				<div className="card-actions justify-end">
					<Link to={`/details/${repo.id}`} className="btn btn-primary">
						Voir les détails
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RepoCard;
