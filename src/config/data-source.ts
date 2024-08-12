import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'aamirnawaz',
  password: 'aamirnawaz',
  database: 'banking-app',
  // entities: [User, Role, Booking, Review, Payment, QRCode, Notification],
  entities: ['dist/**/*.entity{ .ts,.js}'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'app-migrations',
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(AppDataSource);
export default dataSource;
