import { Medicine } from 'src/medicine/entities/medicine.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum UserRole {
  ADMIN = 'admin',
  NORMAL = 'normal',
  PHARMACIST = 'pharmacist',
}

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40 })
  name: string;

  @Column()
  age: number;

  @Column({ type: 'varchar', length: 40, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 40 })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dob: Date;

  @Column({ type: 'enum', enum: UserRole, nullable: false })
  role: UserRole;

  @ManyToMany(() => Medicine)
  @JoinTable()
  medicines: Medicine[];
}
