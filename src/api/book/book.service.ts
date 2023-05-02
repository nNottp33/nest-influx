import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Books } from '../../database/entity'

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Books) private readonly bookModel: Repository<Books>
  ) {}

  getBooks = async () => {
    try {
      const result = await this.bookModel.find()

      return {
        statusCode: 200,
        message: ['successfully'],
        data: result || []
      }
    } catch (error) {
      console.error('[ERROR] getBooks CATCH:', error)
      throw new UnprocessableEntityException(error.message)
    }
  }

  getBookById = async (id: number) => {
    try {
      const result = await this.bookModel.findOne({
        where: { id: id }
      })

      return {
        statusCode: 200,
        message: ['successfully'],
        data: result || []
      }
    } catch (error) {
      console.error('[ERROR] getBookById CATCH:', error)
      throw new UnprocessableEntityException(error.message)
    }
  }

  addNewBooks = async (newBooksDto) => {
    try {
      const { book_name_th, book_name_en, image_url, ...newDtoData } =
        newBooksDto

      const newBooks = await this.bookModel.create({
        bookNameTh: book_name_th,
        bookNameEn: book_name_en,
        imageUrl: image_url,
        ...newDtoData
      })
      await this.bookModel.insert(newBooks)

      return { statusCode: 200, message: ['Save book data successfully'] }
    } catch (error) {
      console.error('[ERROR] addNewBooks CATCH:', error)
      throw new UnprocessableEntityException(error.message)
    }
  }
}
