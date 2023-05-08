import { Column, Table, Model, DataType } from 'sequelize-typescript'
@Table({
  tableName: 'admin_users',
  indexes: [
    // {
    //   name: 'constraint_admin',
    //   unique: true,
    //   fields: ['username', 'full_name']
    // },
    {
      name: 'constraint_admin',
      fields: ['username'],
      unique: true
    },
    {
      name: 'idx_admin_full_name',
      fields: ['full_name']
    },
    {
      name: 'idx_admin_role',
      fields: ['role']
    },
    {
      name: 'idx_admin_is_active',
      fields: ['is_active']
    }
  ]
})
export class AdminUsers extends Model<AdminUsers> {
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
    field: 'role'
  })
  role: string

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'session_token'
  })
  sessionToken: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'created_by'
  })
  createdBy: string

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
