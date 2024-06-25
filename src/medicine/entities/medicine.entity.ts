import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'medicine' })
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
