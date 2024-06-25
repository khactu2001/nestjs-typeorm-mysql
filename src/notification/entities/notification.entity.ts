import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notification')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  fcmToken: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
