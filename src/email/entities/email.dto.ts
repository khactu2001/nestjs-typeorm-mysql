import { IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum SEND_STATUS {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
}

@Entity('send-mail')
export class SendEmailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  fromEmail: string;

  @Column()
  @IsEmail()
  toEmail: string;

  @Column({
    type: 'varchar',
  })
  subject: string;

  @Column({
    type: 'varchar',
  })
  content: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: SEND_STATUS,
    default: SEND_STATUS.PENDING,
  })
  status: SEND_STATUS;

  @Column({
    type: 'timestamp',
  })
  deliveredAt: Date;
}
