import { Module } from '@nestjs/common'
import { BookController } from './book.controller'
import { BookService } from './book.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminUsers, Books, Members } from '../../database/entity'
import { JwtModule } from '@nestjs/jwt'
import { AdminService } from '../users/admin/admin.service'
import { MemberService } from '../users/member/member.service'
@Module({
  imports: [TypeOrmModule.forFeature([Books, AdminUsers, Members]), JwtModule],
  controllers: [BookController],
  providers: [BookService, AdminService, MemberService]
})
export class BookModule {}
