import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { databaseUser, databasePassword, databaseName } from './constants';
import { Users } from '../entities';

export const dataSourceOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: databaseUser,
  password: databasePassword,
  database: databaseName,
  synchronize: true,
  logging: false,
  entities: [Users],
  migrations: [],
  subscribers: [],
  extra: { max: 30 },
};
