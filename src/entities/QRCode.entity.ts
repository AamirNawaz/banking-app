import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class QRCode {
  @PrimaryGeneratedColumn()
  qr_code_id: number;

  @ManyToOne(() => User, (user) => user.qrCodes)
  user: User;

  @Column()
  qr_code_data: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
