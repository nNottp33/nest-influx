import {
  Injectable,
  Inject,
  UnprocessableEntityException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Members } from '../../../database/entity'
import { dateTime } from '../../../utils'
import { Sequelize, QueryTypes } from '../../../database/database.provider'

@Injectable()
export class MemberService {
  constructor(
    @Inject('MEMBERS_REPOSITORY')
    private readonly memberModel: typeof Members,
    private config: ConfigService,
    @Inject('SEQUELIZE')
    private readonly rawQuery: Sequelize
  ) {}

  getUserByUsername = async (username: string) => {
    try {
      const result = await this.memberModel.findOne({
        where: { username: username }
      })

      return {
        statusCode: 200,
        message: ['successfully'],
        data: result
      }
    } catch (error) {
      console.error('[ERROR] getUserByUsername CATCH:', error)
      const message = error?.message || 'System error occurred'
      throw new UnprocessableEntityException(message)
    }
  }

  updateUser = async (patchMemberDto) => {
    try {
      const { id, password, full_name, role, session_token, is_active } =
        patchMemberDto
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

      const [effectedCount] = await this.memberModel.update(updateData, {
        where: { id: id }
      })

      if (effectedCount === 0) {
        return { statusCode: 422, message: ['Unprocessable Entity'] }
      }

      return { statusCode: 200, message: ['Updated data successfully'] }
    } catch (error) {
      console.log('[ERROR] updateMemberUser CATCH:', error)
      const message = error?.message || 'System error occurred'
      throw new UnprocessableEntityException(message)
    }
  }

  checkExitsUser = async ({ username, token }) => {
    try {
      const isExists = await this.memberModel.count({
        where: { username: username, sessionToken: token }
      })

      return isExists === 1
    } catch (error) {
      console.error('[ERROR] Members checkExitsUser CATCH:', error)
      return false
    }
  }
}
