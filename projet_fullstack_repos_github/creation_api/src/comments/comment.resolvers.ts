import { Resolver, Mutation, Arg } from 'type-graphql';
import { Repo } from '../repos/repo.entities';
import { Comment } from './comment.entities'; // Assure-toi que l'importation de Comment est correcte

@Resolver(Comment)
export class CommentResolver {
	@Mutation(() => Comment)
	async addComment(
		@Arg('repoId') repoId: string,
		@Arg('content') content: string
	): Promise<Comment> {
		// Vérifie si le repo existe
		const repo = await Repo.findOne({
			where: { id: repoId },
			relations: ['comments'], // Charge également les commentaires existants
		});

		if (!repo) {
			throw new Error('Repo not found');
		}

		// Crée le nouveau commentaire
		const comment = new Comment();
		comment.content = content;
		comment.createdAt = new Date();
		comment.repo = repo; // Relie le commentaire au repo

		// Sauvegarde du commentaire
		await comment.save();

		// Ajoute le commentaire à la liste des commentaires existants du repo
		if (repo.comments) {
			repo.comments.push(comment);
		} else {
			repo.comments = [comment]; // Si aucun commentaire n'existe encore
		}

		// Sauvegarde du repo avec les nouveaux commentaires
		await repo.save();

		return comment;
	}
}
