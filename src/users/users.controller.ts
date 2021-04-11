import {Controller, Get, Param} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): any {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): any {
    return {
      id: Number(id)
    }
  }

}
