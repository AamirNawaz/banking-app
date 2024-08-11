import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  notification_id: number;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @Column()
  message: string;

  @Column()
  type: string;

  @Column()
  created_at: Date;

  @Column({ nullable: true })
  read_at: Date;
}
