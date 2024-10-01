import express, { Response, Request } from 'express';
import { Status } from './status.type';

const statusControllers = express.Router();

statusControllers.get('/', (_: Request, res: Response) => {});

statusControllers.get('/:id', (req: Request, res: Response) => {});

export default statusControllers;
