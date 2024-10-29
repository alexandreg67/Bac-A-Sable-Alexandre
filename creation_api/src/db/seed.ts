import { AppDataSource } from "./data-source";
import { Lang } from "../langs/lang.entities";
import langs from "../data/langs.json";
import status from "../data/status.json";
import { Status } from "../status/status.entities";
import repos from "../data/repos.json";
import { Repo } from "../repos/repo.entities";
import lang_by_repo from "../data/lang_by_repo.json";

(async () => {
  // On initialise la connexion à la base de données
  await AppDataSource.initialize();
  // On récupère un QueryRunner pour pouvoir effectuer des transactions
  const queryRunner = AppDataSource.createQueryRunner();

  console.log("Connexion à la base de données établie");

  try {
    // On démarre une transaction
    await queryRunner.startTransaction();

    await queryRunner.query("DELETE FROM lang_repos_repo");
    console.log("Table de liaison vidée");
    await queryRunner.query("DELETE FROM lang");
    console.log("Table lang vidée");
    await queryRunner.query("DELETE FROM repo");
    console.log("Table repo vidée");
    await queryRunner.query("DELETE FROM status");
    console.log("Table status vidée");
    await queryRunner.query("DELETE FROM comment");
    console.log("Table comment vidée");

    console.log("Base de données vidées");

    // On insère les langues
    const savedlangs = await Promise.all(
      langs.map(async (el) => {
        const lang = new Lang();
        lang.label = el.label;

        return await lang.save();
      })
    );
    console.log("Langues insérées");

    // On insère les status
    const savedStatus = await Promise.all(
      status.map(async (el) => {
        const status = new Status();
        status.label = el.label;

        return await status.save();
      })
    );
    console.log("Status insérés");

    // On insère les repos
    const savedRepos = await Promise.all(
      repos.map(async (el) => {
        const repo = new Repo();
        repo.id = el.id;
        repo.name = el.name;
        repo.url = el.url;

        // On associe le status
        const status = savedStatus.find(
          (st) => st.id === el.isPrivate
        ) as Status;
        repo.status = status;

        // On associe les langues
        const mylangs = savedlangs.filter((svLg) => {
          const associatedlang = lang_by_repo.filter(
            (lgbyrep) => lgbyrep.repo_id === el.id
          );
          const langLabel = langs.filter((lg) =>
            associatedlang.some((assolg) => assolg.lang_id === lg.id)
          );
          return langLabel.some((lgLabel) => lgLabel.label === svLg.label);
        });
        repo.langs = mylangs;
        // On sauvegarde le repo
        return await repo.save();
      })
    );
    console.log("Repos insérés");

    // On commit la transaction
    await queryRunner.commitTransaction();
  } catch (error) {
    console.error("Erreur lors de l'insertion des données :", error);
    if (queryRunner.isTransactionActive) {
      // On rollback la transaction
      await queryRunner.rollbackTransaction();
    }
  } finally {
    // On libère le QueryRunner
    await queryRunner.release();
  }
})();
