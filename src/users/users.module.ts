import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from "./models/users.entity";
import {AuthModule} from "../auth/auth.module";
import {ConfigService} from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService, ConfigService]
})
export class UsersModule {}
