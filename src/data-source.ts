import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'data/database.db',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: [],
  subscribers: [],
});
