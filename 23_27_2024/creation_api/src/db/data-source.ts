import { DataSource } from 'typeorm';
import { Repo } from '../repos/repo.entities';

export const AppDataSource = new DataSource({
	type: 'sqlite',
	database: 'mydatabase.sqlite',
	synchronize: true,
	logging: true,
	entities: [Repo],
});
