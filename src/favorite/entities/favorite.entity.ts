import { Medicine } from 'src/medicine/entities/medicine.entity';
import { User } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'favorite' })
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  medicineId: number;

  @ManyToOne(() => User, (user) => user.id)
  users: User[];

  @ManyToOne(() => Medicine, (medicine) => medicine.id)
  medicines: Medicine[];
}
