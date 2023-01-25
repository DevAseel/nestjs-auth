import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The user first name',
    example: 'Aseel',
  })
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(4)
  firstName: string;

  @ApiProperty({
    description: 'The user last name',
    example: 'Al Rawahi',
  })
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(4)
  lastName: string;

  @ApiProperty({
    description: 'The user email name',
    example: 'aseel.alrawahi@phaze.ro',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The user password',
    example: 'this-is-a-secret-password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The company name',
    example: 'PhazeRo',
  })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({
    description: 'The phone number',
    example: '+9689999999',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'current number of employees',
    example: '50',
  })
  @IsNumber()
  @IsNotEmpty()
  numberOfEmployees: number;

  @ApiProperty({
    description: 'Date of user signup',
    example: 'Wed Jan 25 2023 20:09:26 GMT+0400',
  })
  @IsString()
  @IsNotEmpty()
  createdAt: string;
}
