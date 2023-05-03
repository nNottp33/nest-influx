import { Module } from '@nestjs/common'
import { MemberController } from './member.controller'
import { MemberService } from './member.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { AdminUsers, Members } from '../../../database/entity'
import { JwtModule } from '@nestjs/jwt'
import { AdminService } from '../admin/admin.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Members, AdminUsers]),
    ConfigModule,
    JwtModule
  ],
  controllers: [MemberController],
  providers: [MemberService, AdminService],
  exports: [MemberService]
})
export class MemberModule {}
