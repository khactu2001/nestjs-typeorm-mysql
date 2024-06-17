import { Medicine } from 'src/medicine/entities/medicine.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'like' })
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'int',
  })
  userId: number;

  @Column({
    type: 'int',
  })
  medicineId: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Medicine, (medicine) => medicine.id)
  medicine: Medicine;
}
