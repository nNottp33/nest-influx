import * as bcrypt from 'bcrypt'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { AdminUsers } from '../../../database/entity'
import { dateTime } from '../../../utils'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminUsers)
    private readonly adminModel: Repository<AdminUsers>,
    @InjectDataSource() private dataSource: DataSource,
    private config: ConfigService
  ) {}

  getUserByUsername = async (username: string) => {
    try {
      const result = await this.adminModel.findOne({
        where: { username: username }
      })

      return {
        statusCode: 200,
        message: ['successfully'],
        data: result
      }
    } catch (error) {
      console.error('[ERROR] getAdminUserByUsername CATCH:', error)
      const message = error?.message || 'System error occurred'
      throw new UnprocessableEntityException(message)
    }
  }

  createAdmin = async (newAdminDto) => {
    try {
      const { full_name, password, verify_payload, ...restObj } = newAdminDto
      const salt = await bcrypt.genSalt(11)
      const passwordHash = await bcrypt.hash(password, salt)
      const createdBy = verify_payload?.username || 'systemadmin'

      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(AdminUsers)
        .values({
          createdBy: createdBy,
          password: passwordHash,
          fullName: full_name,
          ...restObj
        })
        .orUpdate(
          [
            'username',
            'password',
            'full_name',
            'role',
            'updated_at',
            'created_by'
          ],
          ['username'],
          {
            skipUpdateIfNoValuesChanged: true
          }
        )
        .execute()

      return { statusCode: 200, message: ['Admin created successfully'] }
    } catch (error) {
      console.log('[ERROR] createAdmin CATCH:', error)
      const message = error?.message || 'System error occurred'
      throw new UnprocessableEntityException(message)
    }
  }

  updateUser = async (patchAdminDto) => {
    try {
      const { id, password, full_name, role, session_token, is_active } =
        patchAdminDto
      const updateData = {
        updatedAt: dateTime.now()
      }

      if (password) {
        Object.assign({ password })
      }

      if (full_name) {
        Object.assign(updateData, { fullName: full_name })
      }

      if (role) {
        Object.assign(updateData, { role })
      }

      if (typeof session_token !== 'undefined') {
        Object.assign(updateData, { sessionToken: session_token })
      }

      if (typeof is_active === 'boolean') {
        Object.assign(updateData, { isActive: is_active })
      }

      const result = await this.dataSource
        .createQueryBuilder()
        .update(AdminUsers)
        .set(updateData)
        .where('id = :id', { id: id })
        .execute()

      if (result.affected === 0) {
        return { statusCode: 422, message: ['Unprocessable Entity'] }
      }

      return { statusCode: 200, message: ['Updated data successfully'] }
    } catch (error) {
      console.log('[ERROR] updateAdminUser CATCH:', error)
      const message = error?.message || 'System error occurred'
      throw new UnprocessableEntityException(message)
    }
  }

  checkExitsUser = async ({ username, token }) => {
    try {
      const isExists = await this.adminModel
        .createQueryBuilder('admin_users')
        .where('username = :username AND session_token = :token ', {
          username,
          token
        })
        .getCount()
      return isExists === 1
    } catch (error) {
      console.error('[ERROR] AdminUsers checkExitsUser CATCH:', error)
      return false
    }
  }
}
