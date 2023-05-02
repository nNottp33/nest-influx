import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AdminModule } from '../api/users/admin/admin.module'
import { MemberModule } from '../api/users/member/member.module'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    AdminModule,
    MemberModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        global: true,
        signOptions: { expiresIn: '24h' }
        // signOptions: { expiresIn: '5s' }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {
  constructor(private config: ConfigService) {}
}
