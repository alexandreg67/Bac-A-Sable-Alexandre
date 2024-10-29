import { Link } from "react-router-dom";
import { Repo } from "../generated/graphql-type"; // Utiliser les types générés

interface RepoCardProps {
  repo: Repo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <div className="card shadow-lg compact bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="card-body p-6">
        <h2 className="card-title text-2xl font-semibold text-primary mb-4">
          {repo.name}
        </h2>

        <p className="text-gray-700 mb-2">
          <span className="font-bold">Statut:</span>{" "}
          {repo.status?.label || "Inconnu"}
        </p>

        <p className="text-gray-700 mb-4">
          <span className="font-bold">Langages:</span>{" "}
          {repo.langs?.length > 0
            ? repo.langs.map((lang) => (
                <span key={lang.id} className="badge badge-secondary mr-2">
                  {lang.label}
                </span>
              ))
            : "Aucun"}
        </p>

        <div className="card-actions justify-end">
          <Link
            to={`/details/${repo.id}`}
            className="btn btn-accent text-white hover:bg-accent-focus"
          >
            Voir les détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
