import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm'
import { dateTime } from '../../utils'

@Entity()
export class Books {
  @PrimaryGeneratedColumn({
    type: 'int8',
    name: 'id'
  })
  id: number

  @Index()
  @Column({
    type: 'text',
    nullable: true,
    name: 'book_name_th'
  })
  bookNameTh: string

  @Index()
  @Column({
    type: 'text',
    nullable: true,
    name: 'book_name_en'
  })
  bookNameEn: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'image_url'
  })
  imageUrl: string

  @Index()
  @Column({
    type: 'float8',
    nullable: true,
    name: 'price'
  })
  price: number

  @Index()
  @Column({
    type: 'text',
    nullable: true,
    name: 'author'
  })
  author: string

  @Index()
  @Column({
    type: 'text',
    nullable: true,
    name: 'publisher'
  })
  publisher: string

  @Column({
    type: 'timestamptz',
    default: dateTime.now(),
    name: 'created_at'
  })
  createdAt: any

  @Column({
    type: 'timestamptz',
    default: dateTime.now(),
    name: 'updated_at'
  })
  updatedAt: any

  @Index()
  @Column({
    type: 'bool',
    default: true,
    name: 'is_active'
  })
  isActive: boolean
}
