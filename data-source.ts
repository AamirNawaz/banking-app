import { DataSource } from 'typeorm';
import { User } from './src/entities/User.entity';
import { Role } from './src/entities/Role.entity';
import { Booking } from './src/entities/Booking.entity';
import { Review } from './src/entities/Review.entity';
import { Payment } from './src/entities/Payment.entity';
import { QRCode } from './src/entities/QRCode.entity';
import { Notification } from 'src/entities/Notification.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'aamirnawaz',
  password: 'aamirnawaz',
  database: 'banking-app',
  entities: [User, Role, Booking, Review, Payment, QRCode, Notification],
  migrations: [`${'dist/migrations/*.ts,.js'}`],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
