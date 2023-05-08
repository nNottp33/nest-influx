import { Module } from '@nestjs/common'
import { MemberController } from './member.controller'
import { MemberService } from './member.service'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AdminService } from '../admin/admin.service'
import { DatabaseModule } from '../../../database/database.module'
import { modelProviders } from '../../../database/entity'

@Module({
  imports: [DatabaseModule, ConfigModule, JwtModule],
  controllers: [MemberController],
  providers: [MemberService, ...modelProviders, AdminService],
  exports: [MemberService]
})
export class MemberModule {}
