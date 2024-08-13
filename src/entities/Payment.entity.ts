import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Booking } from './Booking.entity';
import { QRCode } from './QRCode.entity';
import { User } from './User.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @ManyToOne(() => Booking, (booking) => booking.payments)
  booking: Booking;

  @OneToMany(() => QRCode, (qrCode) => qrCode.payment)
  qrCodes: QRCode[];

  @Column()
  payment_method: string;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
