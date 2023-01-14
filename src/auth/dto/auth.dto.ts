import { IsString, IsEmail, IsNumber, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(4)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(4)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsNumber()
  @IsNotEmpty()
  numberOfEmployees: number;

  @IsString()
  @IsNotEmpty()
  createdAt: string;
}
