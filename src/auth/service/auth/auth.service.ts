import { Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(password: string, storePasswordHash: string): Promise<any> {
    return await bcrypt.compare(password, storePasswordHash);
  }

}
