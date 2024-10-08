import {
	BaseEntity,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { Repo } from '../repos/repo.entities';
import { ObjectType, Field } from 'type-graphql';

@ObjectType() // Ajout du décorateur TypeGraphQL
@Entity()
export class Lang extends BaseEntity {
	@Field() // Ce champ sera exposé dans le schéma GraphQL
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	@IsString()
	label: string = '';

	@Field(() => [Repo], { nullable: true }) // Indique que 'repos' est un tableau de 'Repo'
	@ManyToMany(() => Repo, (repo) => repo.langs)
	@JoinTable()
	repos?: Repo[];
}
