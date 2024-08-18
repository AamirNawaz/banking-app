import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Payment } from './Payment.entity';

@Entity()
export class QRCode {
  @PrimaryGeneratedColumn()
  qr_code_id: number;

  @ManyToOne(() => User, (user) => user.qrCodes)
  user: User;

  @ManyToOne(() => Payment, (payment) => payment.qrCodes, {
    nullable: true,
    cascade: true,
    onDelete: 'SET NULL',
  })
  payment?: Payment;

  @Column()
  imageUrl: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
