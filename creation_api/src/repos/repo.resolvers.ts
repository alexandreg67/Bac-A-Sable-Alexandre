import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { Repo } from "./repo.entities";
import { Status } from "../status/status.entities";
import { Lang } from "../langs/lang.entities";
import { In } from "typeorm";
import { AddRepoInput } from "./repo.inputs";

// Utilisation du décorateur @Resolver pour définir un résolveur pour l'entité Repo
@Resolver(Repo)
export class RepoResolver {
  // Requête pour obtenir la liste des repos
  @Query(() => [Repo])
  async repos(
    @Arg("langs", () => [Int], { nullable: true }) langs?: number[],
    @Arg("status", { nullable: true }) status?: string
  ): Promise<Repo[]> {
    const query = Repo.createQueryBuilder("repo")
      .leftJoinAndSelect("repo.status", "status")
      .leftJoinAndSelect("repo.langs", "langs");

    if (langs && langs.length > 0) {
      query.andWhere("langs.id IN (:...langs)", { langs });
    }

    if (status) {
      query.andWhere("status.label = :status", { status });
    }

    return await query.getMany();
  }

  // Requête pour obtenir un repo spécifique par ID
  @Query(() => Repo)
  async repo(@Arg("id") id: string): Promise<Repo> {
    // Supprimer la relation avec les 'comments'
    return await Repo.findOneOrFail({
      where: { id },
      relations: ["status", "langs"], // Enlever 'comments' ici
    });
  }

  // Mutation pour ajouter un nouveau repo
  @Mutation(() => Repo)
  async addRepo(@Arg("data") data: AddRepoInput): Promise<Repo> {
    const status = await Status.findOneBy({ id: Number(data.statusId) });

    const langs = await Lang.findBy({ id: In(data.langIds) });

    if (!status) {
      throw new Error("Invalid status");
    }

    // Création d'un nouveau repo
    const repo = new Repo();
    repo.name = data.name;
    repo.url = data.url;
    repo.status = status;
    repo.langs = langs;

    // Supprimer la gestion des commentaires
    // Si un commentaire est fourni, il sera ignoré pour l'instant
    // if (data.commentText) {
    //     const comment = new Comment();
    //     comment.content = data.commentText;
    //     comment.createdAt = new Date();
    //     repo.comments = [comment];
    // }

    // Sauvegarde du repo dans la base de données
    return await repo.save();
  }

  // Mutation pour supprimer un repo par ID
  @Mutation(() => String)
  async deleteRepo(@Arg("id") id: string): Promise<string> {
    const repo = await Repo.findOneBy({ id });
    if (!repo) throw new Error("Repo not found");

    await repo.remove();
    return `Repo with ID ${id} deleted`;
  }
}
