import {Body, Controller, Get, HttpCode, Param, Post} from '@nestjs/common';
import {UsersService} from "../service/users.service";
import {ApiTags} from "@nestjs/swagger";
import {UserI} from "../models/users.interface";
import {Observable} from "rxjs/index";
import {CreateUserDto} from "../models/dto/CreateUser.dto";
import {LoginUserDto} from "../models/dto/LoginUser.dto";

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get(':id')
  getUserById(@Param('id') id: string): any {
    return {
      id: Number(id)
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserI> {
    return await this.usersService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto): Promise<string> {
    return this.usersService.login(loginUserDto);
  }

}
