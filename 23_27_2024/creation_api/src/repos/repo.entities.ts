import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { IsInt, IsString } from 'class-validator';
import { Status } from '../status/status.entities';

@Entity()
export class Repo extends BaseEntity {
	@PrimaryGeneratedColumn()
	@IsInt()
	id: number = 1;

	@Column()
	@IsString()
	githubKey: string = '';

	@Column()
	@IsString()
	name: string = '';

	@Column()
	@IsString()
	url: string = '';

	@ManyToOne(() => Status, (status) => status.id)
	status?: Status;
}
