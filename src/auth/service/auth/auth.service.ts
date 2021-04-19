import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserI} from "../../../users/models/users.interface";
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(user: UserI): Promise<string> {
    return await this.jwtService.signAsync({user: user});
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(password: string, storePasswordHash: string): Promise<any> {
    return await bcrypt.compare(password, storePasswordHash);
  }

}
