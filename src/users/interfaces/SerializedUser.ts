import { Exclude } from 'class-transformer';

export class SerializedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  numberOfEmployees: number;
  createdAt: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
