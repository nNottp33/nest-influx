import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { DatabaseModule } from '../../../database/database.module'
import { ConfigModule } from '@nestjs/config'
import { MemberService } from '../member/member.service'
import { JwtModule } from '@nestjs/jwt'
import { modelProviders } from '../../../database/entity'
@Module({
  imports: [DatabaseModule, JwtModule, ConfigModule],
  controllers: [AdminController],
  providers: [AdminService, ...modelProviders, MemberService],
  exports: [AdminService]
})
export class AdminModule {}
