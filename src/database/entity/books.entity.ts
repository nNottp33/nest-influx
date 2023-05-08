import {
  Column,
  Table,
  Model,
  PrimaryKey,
  DataType
} from 'sequelize-typescript'
@Table({
  tableName: 'books',
  indexes: [
    { name: 'constraint_books', unique: true, fields: ['book_code'] },
    { name: 'idx_book_name_th', fields: ['book_name_th'] },
    { name: 'idx_book_name_en', fields: ['book_name_en'] },
    { name: 'idx_book_price', fields: ['price'] },
    { name: 'idx_book_author', fields: ['author'] },
    { name: 'idx_book_publisher', fields: ['publisher'] },
    { name: 'idx_book_is_active', fields: ['is_active'] }
  ]
})
export class Books extends Model<Books> {
  @PrimaryKey
  @Column({
    type: DataType.BIGINT,
    field: 'id',
    primaryKey: true,
    autoIncrement: true
  })
  id: number

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'book_code'
  })
  bookCode: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'book_name_th'
  })
  bookNameTh: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'book_name_en'
  })
  bookNameEn: string

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'image_url'
  })
  imageUrl: string

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
    field: 'price'
  })
  price: number

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'author'
  })
  author: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'publisher'
  })
  publisher: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'created_by'
  })
  createdBy: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'updated_by'
  })
  updatedBy: string

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'created_at'
  })
  createdAt: any

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'updated_at'
  })
  updatedAt: any

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  })
  isActive: boolean
}
