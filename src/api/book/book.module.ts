import { Module } from '@nestjs/common'
import { BookController } from './book.controller'
import { BookService } from './book.service'
import { JwtModule } from '@nestjs/jwt'
import { AdminService } from '../users/admin/admin.service'
import { MemberService } from '../users/member/member.service'
import { DatabaseModule } from '../../database/database.module'
import { ConfigModule } from '@nestjs/config'
import { modelProviders } from '../../database/entity'

@Module({
  imports: [DatabaseModule, JwtModule, ConfigModule],
  controllers: [BookController],
  providers: [BookService, ...modelProviders, AdminService, MemberService]
})
export class BookModule {}
