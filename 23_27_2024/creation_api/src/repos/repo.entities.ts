import {
	BaseEntity,
	Column,
	Entity,
	ManyToMany,
	ManyToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { IsInt, IsString } from 'class-validator';
import { Status } from '../status/status.entities';
import { Lang } from '../langs/lang.entities';

@Entity()
export class Repo extends BaseEntity {
	@PrimaryColumn('uuid')
	id!: string;

	@Column()
	@IsString()
	name: string = '';

	@Column()
	@IsString()
	url: string = '';

	@ManyToOne(() => Status, (status) => status.id)
	status?: Status;

	@ManyToMany(() => Lang, (lang) => lang.repos)
	langs!: Lang[];
}
