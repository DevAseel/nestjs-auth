import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async hashValue(value: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(value, salt);
    return hash;
  }

  async verify(value: string, hash: string) {
    return await bcrypt.compare(value, hash);
  }
}
