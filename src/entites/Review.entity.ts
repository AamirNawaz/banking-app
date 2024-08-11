import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Booking } from './Booking.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  review_id: number;

  @ManyToOne(() => Booking, (booking) => booking.reviews)
  booking: Booking;

  @Column()
  rating: number;

  @Column()
  review: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
