import { ObjectType, Field } from 'type-graphql';
import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { Status } from '../status/status.entities';
import { Lang } from '../langs/lang.entities';
import { Comment } from '../comments/comment.entities';

// Ajout du décorateur ObjectType pour définir une classe GraphQL
@ObjectType()
@Entity()
export class Repo extends BaseEntity {
	@Field() // Déclare que le champ `id` doit être exposé dans le schéma GraphQL
	@PrimaryColumn('uuid')
	id!: string;

	@Field()
	@Column()
	@IsString()
	name: string = '';

	@Field()
	@Column()
	@IsString()
	url: string = '';

	// Relation avec Status (un repo a un statut)
	@Field(() => Status) // Indique que `status` est un objet `Status`
	@ManyToOne(() => Status, (status) => status.id)
	status?: Status;

	@Field(() => [Lang]) // Relation avec les langues
	@ManyToMany(() => Lang, (lang) => lang.repos)
	langs!: Lang[];

	// @Field(() => [Comment])
	// @OneToMany(() => Comment, (comment) => comment.repo)
	// comments!: Comment[];
}
