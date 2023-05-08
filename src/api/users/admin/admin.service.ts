import * as bcrypt from 'bcrypt'
import {
  Injectable,
  Inject,
  UnprocessableEntityException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AdminUsers } from '../../../database/entity'
import { dateTime } from '../../../utils'
import { Sequelize, QueryTypes } from '../../../database/database.provider'

@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_USERS_REPOSITORY')
    private readonly adminModel: typeof AdminUsers,
    private config: ConfigService,
    @Inject('SEQUELIZE')
    private readonly rawQuery: Sequelize
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
      const { username, role, full_name, password, verify_payload } =
        newAdminDto
      const salt = await bcrypt.genSalt(11)
      const passwordHash = await bcrypt.hash(password, salt)
      const createdBy = verify_payload?.username || 'systemadmin'

      const values = { username, passwordHash, full_name, role, createdBy }
      const queryString = `INSERT INTO admin_users ( username, password, full_name, role, created_by ) VALUES ( :username, :passwordHash, :full_name, :role, :createdBy ) ON CONFLICT ( username ) DO NOTHING`
      const [instance, effectedCount] = await this.rawQuery.query(queryString, {
        replacements: values,
        type: QueryTypes.INSERT
      })

      if (effectedCount === 0)
        return { statusCode: 200, message: ['Admin already exits'] }

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

      const [effectedCount] = await this.adminModel.update(updateData, {
        where: { id: id }
      })

      if (effectedCount === 0) {
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
      const isExists = await this.adminModel.count({
        where: { username: username, sessionToken: token }
      })

      return isExists === 1
    } catch (error) {
      console.error('[ERROR] AdminUsers checkExitsUser CATCH:', error)
      return false
    }
  }
}
