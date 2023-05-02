import { Module } from '@nestjs/common'
import { BookController } from './book.controller'
import { BookService } from './book.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Books } from '../../database/entity'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([Books]), JwtModule],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
