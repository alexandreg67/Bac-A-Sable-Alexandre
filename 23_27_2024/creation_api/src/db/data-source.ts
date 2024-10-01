import { DataSource } from 'typeorm';
import { Repo } from '../repos/repo.entities';
import { Status } from '../status/status.entities';

export const AppDataSource = new DataSource({
	type: 'sqlite',
	database: './src/db/mydatabase.sqlite',
	synchronize: true,
	// logging: true,
	entities: [Repo, Status],
});
