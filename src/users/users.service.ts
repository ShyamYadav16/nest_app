import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

  private users: any = [{id: 1}];

  findAll() {
    return this.users;
  }

}
