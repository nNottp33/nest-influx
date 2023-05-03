import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards
} from '@nestjs/common'
import { BookService } from './book.service'
import { NewBooksDto } from '../../dtos'
import { SessionGuard } from '../../guards'

@Controller()
@UseGuards(SessionGuard)
export class BookController {
  constructor(private readonly booksService: BookService) {}

  @Get('api/books')
  getBooks(): object {
    return this.booksService.getBooks()
  }

  @Get('api/book/:id')
  getBookById(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.getBookById(id)
  }

  @Post('api/book')
  @UsePipes(ValidationPipe)
  newBook(@Body() newBooksDto: NewBooksDto) {
    return this.booksService.addNewBooks(newBooksDto)
  }
}
