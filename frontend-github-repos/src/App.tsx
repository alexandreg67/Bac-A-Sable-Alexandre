import React from "react";
import RepoCard from "./components/RepoCard";
import { Repo } from "./generated/graphql-type";
import { useGetReposQuery } from "./generated/graphql-type";

const App: React.FC = () => {
  // Requête GraphQL pour récupérer les repos
  const { loading, error, data } = useGetReposQuery();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl font-semibold text-primary animate-bounce">
          Chargement...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-red-500">Erreur : {error.message}</p>
      </div>
    );

  // Traiter les données récupérées pour afficher les repos
  const repos: Repo[] =
    data?.repos?.map((repo) => ({
      ...repo,
      comments: [],
    })) || [];

  return (
    <div className="min-h-screen bg-hero-gradient bg-cover p-6">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-10 text-white font-headline drop-shadow-lg">
          Mes Repos GitHub
        </h1>

        {repos.length === 0 ? (
          <p className="text-center text-lg text-white">Aucun repo trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
