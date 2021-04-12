import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "../models/users.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "../models/dto/CreateUser.dto";
import {UserI} from "../models/users.interface";
import {AuthService} from "../../auth/service/auth/auth.service";
import {LoginUserDto} from "../models/dto/LoginUser.dto";

@Injectable()
export class UsersService {

  // private users: any = [{id: 1}];
  //
  // findAll() {
  //   return this.users;
  // }
  //
  //

  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private authService: AuthService
  ) {}

  async create(createdUserDto: CreateUserDto): Promise<UserI> {
    if(await this.mailExists(createdUserDto.email)) {
      throw new HttpException('Email already exist', HttpStatus.CONFLICT);
    }
    else {
      const passwordHash = await this.authService.hashPassword(createdUserDto.password);
      // Overwrite the user password with hash
      createdUserDto.password = passwordHash;
      const savedUser = await this.userRepository.save(createdUserDto);
      const {password, ...user} = savedUser;
      return user;
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const user = await this.findUserByEmail(loginUserDto.email);
    if(user) {
      const isPasswordMatches = await this.validatePassword(loginUserDto.password, user.password);
      if (isPasswordMatches) {
        return 'Login was successful';
      } else {
        throw new HttpException('Email/Password combination is wrong', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  private async findUserByEmail(email: string): Promise<UserI> {
    return await this.userRepository.findOne({email}, {select: ['id', 'email', 'name', 'password']});
  }

  private async validatePassword(password: string, storedPasswordHash: string): Promise <boolean> {
    return await this.authService.comparePassword(password, storedPasswordHash);
  }

  private async mailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({email});
    return (user) ? true: false;
  }

}
