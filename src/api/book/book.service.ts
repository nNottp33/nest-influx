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
      const { verify_payload, ...newDtoData } = newBooksDto
      const createdBy = verify_payload?.username || 'systemadmin'

      const queryString = `INSERT INTO books ( book_name_th, book_name_en, image_url, price, author, publisher, created_at, updated_at, created_by, updated_by, book_code ) 
      VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $7, $7, $8) 
      ON CONFLICT (book_code) 
      DO UPDATE 
      SET book_name_th=EXCLUDED.book_name_th, book_name_en=EXCLUDED.book_name_en, image_url=EXCLUDED.image_url, price=EXCLUDED.price, author=EXCLUDED.author, publisher=EXCLUDED.publisher, updated_at=CURRENT_TIMESTAMP, updated_by=EXCLUDED.updated_by`

      const values = [
        newDtoData?.book_name_th || null,
        newDtoData?.book_name_en || null,
        newDtoData?.image_url || null,
        newDtoData?.price || null,
        newDtoData?.author || null,
        newDtoData?.publisher || null,
        createdBy,
        newDtoData?.book_code || null
      ]
      await this.dataSource.query(queryString, values)

      return { statusCode: 200, message: ['Save book data successfully'] }
    } catch (error) {
      console.error('[ERROR] addNewBooks CATCH:', error)
      const message = error?.message || 'System error occurred'
      throw new UnprocessableEntityException(message)
    }
  }
}
