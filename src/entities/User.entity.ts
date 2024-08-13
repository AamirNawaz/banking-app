import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Role } from './Role.entity';
import { Booking } from './Booking.entity';
import { AppNotification } from './AppNotification.entity';
import { QRCode } from './QRCode.entity';
import { Review } from './Review.entity';
import { Payment } from './Payment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone_number: string;

  @Column({ nullable: true })
  profile_picture: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => AppNotification, (appNotification) => appNotification.user)
  appNotification: AppNotification[];

  @OneToMany(() => QRCode, (qrCode) => qrCode.user)
  qrCodes: QRCode[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @Column({ nullable: true })
  address: string;
}
