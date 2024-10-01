import express, { Response, Request } from 'express';
import { Lang } from './lang.type';

const langsControllers = express.Router();

langsControllers.get('/', (_: Request, res: Response) => {});

langsControllers.get('/:id', (req: Request, res: Response) => {});

export default langsControllers;
