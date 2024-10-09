import { InputType, Field } from 'type-graphql';

@InputType() // Marque cette classe comme un type d'entrée pour GraphQL
export class AddRepoInput {
	@Field() // Expose le champ 'name' dans le schéma GraphQL
	name!: string;

	@Field() // Expose le champ 'url' dans le schéma GraphQL
	url!: string;

	@Field() // Expose le champ 'statusId' dans le schéma GraphQL
	statusId!: Number;

	@Field(() => [Number]) // Expose le champ 'langIds' dans le schéma GraphQL
	langIds!: Number[];

	@Field({ nullable: true }) // Le commentaire est optionnel
	commentText?: string; // Champ pour le texte du commentaire
}

// @InputType() // Marque cette classe comme un type d'entrée pour GraphQL
// export class UpdateRepoInput {
// 	@Field() // L'ID du repo à mettre à jour
// 	id!: string;

// 	@Field({ nullable: true }) // Le champ 'name' est optionnel
// 	name?: string;

// 	@Field({ nullable: true }) // Le champ 'url' est optionnel
// 	url?: string;

// 	@Field({ nullable: true }) // Le champ 'statusId' est optionnel
// 	statusId?: string;

// 	@Field(() => [String], { nullable: true }) // Liste des IDs de langues, optionnel
// 	langIds?: string[];

// 	@Field({ nullable: true }) // Le commentaire est optionnel
// 	commentText?: string; // Champ pour le texte du commentaire
// }
