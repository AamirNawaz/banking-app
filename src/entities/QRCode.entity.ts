import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User.entity';
import { Payment } from './Payment.entity';

@Entity()
export class QRCode {
  @PrimaryGeneratedColumn()
  qr_code_id: number;

  @ManyToOne(() => User, (user) => user.qrCodes)
  user: User;

  @ManyToOne(() => Payment, (payment) => payment.qrCodes, { nullable: true })
  payment?: Payment;

  @Column()
  qr_code_data: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
