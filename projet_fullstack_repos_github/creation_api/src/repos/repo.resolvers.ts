import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Repo } from './repo.entities';
import { Status } from '../status/status.entities';
import { Lang } from '../langs/lang.entities';
import { Comment } from '../comments/comment.entities';
import { In } from 'typeorm';
import { AddRepoInput } from './repo.inputs';

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
		// Si des langues ou un statut sont fournis, on les utilise pour filtrer les repos
		if (status) {
			// Utilisation de QueryBuilder pour gérer les filtres sur les statuts
			const query = Repo.createQueryBuilder('repo').leftJoinAndSelect(
				'repo.status',
				'status'
			);
			return await query.getMany();
		}

		if (langs) {
			// Utilisation de QueryBuilder pour gérer les filtres sur les langues
			const query = Repo.createQueryBuilder('repo')
				.leftJoinAndSelect('repo.langs', 'langs')
				.where('langs.name IN (:...langs)', { langs });
			return await query.getMany();
		}

		return await Repo.find({
			relations: ['status', 'langs', 'comments'],
		});
	}

	// Requête pour obtenir un repo spécifique par ID
	@Query(() => Repo)
	async repo(@Arg('id') id: string): Promise<Repo> {
		// Utilisation de findOne pour récupérer le repo avec ses relations
		return await Repo.findOneOrFail({
			where: { id },
			relations: ['status', 'langs', 'comments'],
		});
	}

	// Mutation pour ajouter un nouveau repo
	@Mutation(() => Repo)
	async addRepo(@Arg('data') data: AddRepoInput): Promise<Repo> {
		const status = await Status.findOneBy({ id: Number(data.statusId) });

		const langs = await Lang.findBy({ id: In(data.langIds) });

		if (!status) {
			throw new Error('Invalid status');
		}

		// Création d'un nouveau repo
		const repo = new Repo();
		repo.name = data.name;
		repo.url = data.url;
		repo.status = status;
		repo.langs = langs;

		// Si un commentaire est fourni, on l'ajoute au repo
		if (data.commentText) {
			const comment = new Comment();
			comment.content = data.commentText;
			comment.createdAt = new Date();

			repo.comments = [comment]; // On associe le commentaire au repo
		}

		// Sauvegarde du repo dans la base de données avec les commentaires
		return await repo.save();
	}

	// Mutation pour mettre à jour un repo existant
	// @Mutation(() => Repo)
	// async updateRepo(@Arg('data') data: UpdateRepoInput): Promise<Repo | null> {
	// 	const repo = await Repo.findOne({
	// 		where: { id: data.id },
	// 		relations: ['status', 'langs', 'comments'],
	// 	});

	// 	if (!repo) throw new Error('Repo not found');

	// 	if (data.name) repo.name = data.name;
	// 	if (data.url) repo.url = data.url;

	// 	if (data.statusId) {
	// 		const status = await Status.findOneByOrFail({
	// 			id: Number(data.statusId),
	// 		});
	// 		repo.status = status;
	// 	}

	// 	if (data.langIds) {
	// 		const langs = await Lang.findBy({ id: In(data.langIds) });
	// 		repo.langs = langs;
	// 	}

	// 	if (data.commentText) {
	// 		const comment = new Comment();
	// 		comment.content = data.commentText;
	// 		comment.createdAt = new Date();
	// 		comment.repo = repo;

	// 		await comment.save();
	// 		repo.comments.push(comment);
	// 	}

	// 	return await repo.save();
	// }

	// Mutation pour supprimer un repo par ID
	@Mutation(() => String)
	async deleteRepo(@Arg('id') id: string): Promise<string> {
		const repo = await Repo.findOneBy({ id });
		if (!repo) throw new Error('Repo not found');

		await repo.remove();
		return `Repo with ID ${id} deleted`;
	}
}
