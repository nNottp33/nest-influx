import { Index, Column, Entity, Unique, PrimaryGeneratedColumn } from 'typeorm'
import { dateTime } from '../../utils'

@Entity()
@Unique('constraint_admin', ['username'])
// @Unique('constraint_admin', ['username', 'fullName'])
export class AdminUsers {
  @PrimaryGeneratedColumn({
    type: 'int8',
    name: 'id'
  })
  id: number

  @Index()
  @Column({
    type: 'text',
    nullable: true,
    name: 'username'
  })
  username: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'password'
  })
  password: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'full_name'
  })
  fullName: string

  @Index()
  @Column({
    type: 'text',
    nullable: true,
    name: 'role'
  })
  role: string

  @Column({
    type: 'text',
    nullable: true,
    name: 'session_token'
  })
  sessionToken: string

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

  @Column({
    type: 'bool',
    default: true,
    name: 'is_active'
  })
  isActive: boolean
}
