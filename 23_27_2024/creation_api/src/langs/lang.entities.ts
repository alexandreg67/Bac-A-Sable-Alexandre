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

@Entity()
export class Lang extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	@IsString()
	label: string = '';

	@ManyToMany(() => Repo, (repo) => repo.langs)
	@JoinTable()
	repos?: Repo[];
}
