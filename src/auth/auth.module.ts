import { Module } from '@nestjs/common';
import { AuthService } from './service/auth/auth.service';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtStrategy} from "./strategies/jwt.strategies";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {expiresIn: configService.get('JWT_EXPIRES_IN')}
      })
    })
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, ConfigService],
  exports: [AuthService]
})
export class AuthModule {}
