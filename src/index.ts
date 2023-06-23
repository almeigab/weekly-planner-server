import express, { Express } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { AppDataSource } from './data-source';
import router from './router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api', router);

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
