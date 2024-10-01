import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Repo {
	@PrimaryGeneratedColumn()
	id: number = 0;

	@Column()
	githubKey: string = '';

	@Column()
	name: string = '';

	@Column()
	url: string = '';

	@Column()
	isPrivate: number = 1;
}
