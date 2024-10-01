import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { Repo } from '../repos/repo.entities';

@Entity()
export class Status extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number = 1;

	@Column()
	@IsString()
	label: string = '';

	@OneToMany(() => Repo, (repo) => repo.status)
	repos?: Repo[];
}
