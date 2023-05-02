import { Index, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { dateTime } from '../../utils'

@Entity()
export class Members {
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

  @Index()
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
    name: 'phone_number'
  })
  phoneNumber: string

  @Index()
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
