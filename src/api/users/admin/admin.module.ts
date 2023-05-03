import { Module } from '@nestjs/common'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Members, AdminUsers } from '../../../database/entity'
import { ConfigModule } from '@nestjs/config'
import { MemberService } from '../member/member.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUsers, Members]),
    JwtModule,
    ConfigModule
  ],
  controllers: [AdminController],
  providers: [AdminService, MemberService],
  exports: [AdminService]
})
export class AdminModule {}
