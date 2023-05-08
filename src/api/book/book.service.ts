import {
  Injectable,
  Inject,
  UnprocessableEntityException
} from '@nestjs/common'
import { Books } from '../../database/entity'
import { Sequelize, QueryTypes } from '../../database/database.provider'
@Injectable()
export class BookService {
  constructor(
    @Inject('BOOKS_REPOSITORY')
    private bookModel: typeof Books,
    @Inject('SEQUELIZE')
    private readonly rawQuery: Sequelize
  ) {}

  getBooks = async () => {
    try {
      const result = await this.bookModel.findAll()

      return {
        statusCode: 200,
        message: ['successfully'],
        data: result || []
      }
    } catch (error) {
      console.error('[ERROR] getBooks CATCH:', error)
      const message = error?.message || 'System error occurred'
      throw new UnprocessableEntityException(message)
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
      const message = error?.message || 'System error occurred'
      throw new UnprocessableEntityException(message)
    }
  }

  addNewBooks = async (newBooksDto) => {
    try {
      const { verify_payload, ...newDtoData } = newBooksDto
      const createdBy = verify_payload?.username || 'systemadmin'

      await this.bookModel.upsert({
        bookNameTh: newDtoData?.book_name_th || null,
        bookNameEn: newDtoData?.book_name_en || null,
        imageUrl: newDtoData?.image_url || null,
        price: newDtoData?.price || null,
        author: newDtoData?.author || null,
        publisher: newDtoData?.publisher || null,
        createdBy,
        bookCode: newDtoData?.book_code || null
      })

      return { statusCode: 200, message: ['Save book data successfully'] }
    } catch (error) {
      console.error('[ERROR] addNewBooks CATCH:', error)
      const message = error?.message || 'System error occurred'
      throw new UnprocessableEntityException(message)
    }
  }
}
