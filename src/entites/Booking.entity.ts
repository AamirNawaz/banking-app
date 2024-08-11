import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './User.entity';
import { Review } from './Review.entity';
import { Payment } from './Payment.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @Column()
  service: string;

  @Column()
  status: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToMany(() => Review, (review) => review.booking)
  reviews: Review[];

  @OneToMany(() => Payment, (payment) => payment.booking)
  payments: Payment[];
}
