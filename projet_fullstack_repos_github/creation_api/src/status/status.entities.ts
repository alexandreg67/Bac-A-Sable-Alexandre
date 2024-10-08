import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { Repo } from '../repos/repo.entities';
import { ObjectType, Field } from 'type-graphql';

@ObjectType() // Ajout du décorateur TypeGraphQL
@Entity()
export class Status extends BaseEntity {
	@Field() // Ce champ sera exposé dans le schéma GraphQL
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	@IsString()
	label: string = '';

	@Field(() => [Repo], { nullable: true }) // Indique que 'repos' est un tableau de 'Repo'
	@OneToMany(() => Repo, (repo) => repo.status)
	repos?: Repo[];
}
