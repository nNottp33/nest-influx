import { IsNotEmpty, IsNumber, Min } from 'class-validator'

export class NewBooksDto {
  @IsNotEmpty()
  book_name_th: string

  @IsNotEmpty()
  book_name_en: string

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number

  @IsNotEmpty()
  book_code: string

  image_url: string
  author: string
  publisher: string
}
