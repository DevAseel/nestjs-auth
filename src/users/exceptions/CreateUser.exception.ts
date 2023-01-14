import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateUserException extends HttpException {
  constructor(msg?: string, status?: HttpStatus) {
    super(msg || "Can't create user", status || HttpStatus.BAD_REQUEST);
  }
}
