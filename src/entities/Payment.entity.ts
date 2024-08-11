import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Booking } from './Booking.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @ManyToOne(() => Booking, (booking) => booking.payments)
  booking: Booking;

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
