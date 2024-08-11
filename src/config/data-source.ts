import { Booking } from 'src/entities/Booking.entity';
import { Notification } from 'src/entities/Notification.entity';
import { Payment } from 'src/entities/Payment.entity';
import { QRCode } from 'src/entities/QRCode.entity';
import { Review } from 'src/entities/Review.entity';
import { Role } from 'src/entities/Role.entity';
import { User } from 'src/entities/User.entity';
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
