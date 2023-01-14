import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', nullable: false, length: 64 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: false, length: 64 })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', nullable: false, length: 64, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: false, length: 64 })
  password: string;

  @Column({ name: 'company_name', type: 'varchar', nullable: false, length: 64 })
  companyName: string;

  @Column({ name: 'phone_number', type: 'varchar', nullable: false, length: 30 })
  phoneNumber: string;

  @Column({ name: 'number_of_employees', type: 'integer', nullable: false })
  numberOfEmployees: number;

  @Column({ name: 'created_at', type: 'varchar', nullable: false, length: 64 })
  createdAt: string;

  @Column({ name: 'refresh_token', type: 'varchar', length: 260, nullable: true })
  rtHash: string;
}
