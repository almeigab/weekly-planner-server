import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { AppDataSource } from './data-source';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(morgan('tiny'));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server!');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err: unknown) =>
    console.error('Error during Data Source initialization', err)
  );
