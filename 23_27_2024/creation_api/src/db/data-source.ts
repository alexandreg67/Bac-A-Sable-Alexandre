import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Repo } from '../repos/repo.entities';
import { Status } from '../status/status.entities';
import { Lang } from '../langs/lang.entities';

dotenv.config();
const { BACKEND_FILE } = process.env;

// On crée une instance de DataSource
export const AppDataSource = new DataSource({
	type: 'sqlite',
	database: `${BACKEND_FILE}`,
	synchronize: true,
	// logging: true,
	entities: [Repo, Status, Lang],
});
