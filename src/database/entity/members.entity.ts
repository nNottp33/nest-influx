import { Column, Table, Model, DataType } from 'sequelize-typescript'

@Table({
  tableName: 'members',
  indexes: [
    {
      name: 'constraint_member',
      fields: ['username'],
      unique: true
    },
    {
      name: 'idx_member_full_name',
      fields: ['full_name']
    },
    {
      name: 'idx_member_role',
      fields: ['role']
    },
    {
      name: 'idx_member_is_active',
      fields: ['is_active']
    }
  ]
})
export class Members extends Model<Members> {
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
    field: 'username',
    unique: false
  })
  username: string

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'password'
  })
  password: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'full_name'
  })
  fullName: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'phone_number'
  })
  phoneNumber: string

  @Column({
    type: 'text',
    allowNull: true,
    field: 'role',
    defaultValue: 'member'
  })
  role: string

  @Column({
    type: 'text',
    allowNull: true,
    field: 'session_token'
  })
  sessionToken: string

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
    type: 'bool',
    defaultValue: true,
    field: 'is_active'
  })
  isActive: boolean
}
