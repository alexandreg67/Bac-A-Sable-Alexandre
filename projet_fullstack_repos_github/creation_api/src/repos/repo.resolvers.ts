import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Repo } from './repo.entities';
import { Status } from '../status/status.entities';
import { Lang } from '../langs/lang.entities';
import { In } from 'typeorm';
import { AddRepoInput, UpdateRepoInput } from './repo.inputs';

// Utilisation du décorateur @Resolver pour définir un résolveur pour l'entité Repo
@Resolver(Repo)
export class RepoResolver {
	// Requête pour obtenir la liste des repos
	@Query(() => [Repo])
	async repos(
		// Utilisation des arguments pour filtrer les repos par langues et statuts
		@Arg('langs', () => [String], { nullable: true }) langs?: string[],
		@Arg('status', { nullable: true }) status?: string
	): Promise<Repo[]> {
		// Utilisation de QueryBuilder pour gérer les filtres sur les langues et statuts
		const query = Repo.createQueryBuilder('repo')
			.leftJoinAndSelect('repo.status', 'status')
			.leftJoinAndSelect('repo.langs', 'langs');

		if (langs) {
			query.where('langs.label IN (:...langs)', { langs });
		}

		if (status) {
			query.andWhere('status.label = :status', { status });
		}

		return await query.getMany();
	}

	// Requête pour obtenir un repo spécifique par ID
	@Query(() => Repo, { nullable: true })
	async repo(@Arg('id') id: string): Promise<Repo | null> {
		// Utilisation de findOne pour récupérer le repo avec ses relations
		return await Repo.findOne({
			where: { id },
			relations: ['status', 'langs'],
		});
	}

	// Mutation pour ajouter un nouveau repo
	@Mutation(() => Repo)
	async addRepo(@Arg('data') data: AddRepoInput): Promise<Repo> {
		// Récupération du statut et des langues à partir des ID fournis
		const status = await Status.findOneBy({ id: Number(data.statusId) });
		const langs = await Lang.findBy({ id: In(data.langIds) });

		if (!status || langs.length === 0) {
			throw new Error('Invalid status or langs');
		}

		// Création et initialisation du repo
		const repo = Repo.create({
			name: data.name,
			url: data.url,
			status,
			langs,
		});

		// Sauvegarde du repo dans la base de données
		return await repo.save();
	}

	// Mutation pour mettre à jour un repo existant
	@Mutation(() => Repo)
	async updateRepo(@Arg('data') data: UpdateRepoInput): Promise<Repo | null> {
		const repo = await Repo.findOne({
			where: { id: data.id },
			relations: ['status', 'langs'],
		});

		if (!repo) throw new Error('Repo not found');

		// Mise à jour des champs modifiables
		if (data.name) repo.name = data.name;
		if (data.url) repo.url = data.url;
		if (data.statusId) {
			const status = await Status.findOneBy({ id: Number(data.statusId) });
			if (status) repo.status = status;
		}
		if (data.langIds) {
			const langs = await Lang.findBy({ id: In(data.langIds) });
			repo.langs = langs;
		}

		return await repo.save();
	}

	// Mutation pour supprimer un repo par ID
	@Mutation(() => String)
	async deleteRepo(@Arg('id') id: string): Promise<string> {
		const repo = await Repo.findOneBy({ id });
		if (!repo) throw new Error('Repo not found');

		// Suppression du repo de la base de données
		await repo.remove();
		return `Repo with ID ${id} deleted`;
	}
}
