import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Booking } from './Booking.entity';
import { User } from './User.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  review_id: number;

  @ManyToOne(() => Booking, (booking) => booking.reviews)
  booking: Booking;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
  @Column()
  rating: number;

  @Column()
  review: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
