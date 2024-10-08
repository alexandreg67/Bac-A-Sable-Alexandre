import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Repo } from '../repos/repo.entities';

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column('text')
	content!: string;

	@Column()
	createdAt!: Date;

	// @ManyToOne(() => Repo, (repo) => repo.comments)
	// repo!: Repo;
}
