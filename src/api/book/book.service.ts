import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'
import { Books } from '../../database/entity'

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Books) private readonly bookModel: Repository<Books>,
    @InjectDataSource() private dataSource: DataSource
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
      const {
        book_name_th,
        book_name_en,
        image_url,
        verify_payload,
        book_code,
        ...newDtoData
      } = newBooksDto

      const createdBy = verify_payload?.username || 'systemadmin'
      const updatedBy = createdBy
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(Books)
        .values({
          bookNameTh: book_name_th,
          bookNameEn: book_name_en,
          imageUrl: image_url,
          createdBy,
          updatedBy,
          bookCode: book_code,
          ...newDtoData
        })
        .orUpdate(
          [
            'book_name_th',
            'book_name_en',
            'image_url',
            'price',
            'author',
            'publisher',
            'updated_at',
            'updated_by'
          ],
          ['book_code']
        )
        .execute()

      return { statusCode: 200, message: ['Save book data successfully'] }
    } catch (error) {
      console.error('[ERROR] addNewBooks CATCH:', error)
      const message = error?.message || 'System error occurred'
      throw new UnprocessableEntityException(message)
    }
  }
}
