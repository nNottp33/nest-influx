import { IsNotEmpty, Min } from 'class-validator'

export class NewBooksDto {
  @IsNotEmpty()
  book_name_th: string

  @IsNotEmpty()
  book_name_en: string

  @Min(0)
  @IsNotEmpty()
  price: number

  image_url: string
  author: string
  publisher: string
}
