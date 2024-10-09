import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	BaseEntity,
} from 'typeorm';
import { Repo } from '../repos/repo.entities';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column('text')
	content!: string;

	@Field()
	@Column()
	createdAt!: Date;

	@Field(() => Repo)
	@ManyToOne(() => Repo, (repo) => repo.comments)
	repo!: Repo;
}
