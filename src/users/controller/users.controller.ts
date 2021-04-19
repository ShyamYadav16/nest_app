import {Body, Controller, Get, HttpCode, Param, Post, Req, UseGuards} from '@nestjs/common';
import {UsersService} from "../service/users.service";
import {ApiTags} from "@nestjs/swagger";
import {UserI} from "../models/users.interface";
import {Observable} from "rxjs/index";
import {CreateUserDto} from "../models/dto/CreateUser.dto";
import {LoginUserDto} from "../models/dto/LoginUser.dto";
import {ConfigService} from "@nestjs/config";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService,
              private configService: ConfigService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() request): Promise<UserI[]> {
    console.log(request.user);
    return await this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserI> {
    return await this.usersService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto): Promise<Object> {
    const jwt = await this.usersService.login(loginUserDto);
    return {
      access_token: jwt,
      token_type: 'JWT',
      expires_in: this.configService.get('JWT_EXPIRES_IN')
    }
  }

}
