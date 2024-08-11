import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Role } from './Role.entity';
import { Booking } from './Booking.entity';
import { Notification } from './Notification.entity';
import { QRCode } from './QRCode.entity';

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

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => QRCode, (qrCode) => qrCode.user)
  qrCodes: QRCode[];

  @Column({ nullable: true })
  address: string;
}
