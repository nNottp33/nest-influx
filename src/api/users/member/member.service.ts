import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { Members } from '../../../database/entity'
import { dateTime } from '../../../utils'

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Members)
    private readonly memberModel: Repository<Members>,
    @InjectDataSource() private dataSource: DataSource,
    private config: ConfigService
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
      throw new UnprocessableEntityException(error.message)
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

      const result = await this.dataSource
        .createQueryBuilder()
        .update(Members)
        .set(updateData)
        .where('id = :id', { id: id })
        .execute()

      if (result.affected === 0) {
        return { statusCode: 422, message: ['Unprocessable Entity'] }
      }

      return { statusCode: 200, message: ['Updated data successfully'] }
    } catch (error) {
      console.log('[ERROR] updateMemberUser CATCH:', error)
      throw new UnprocessableEntityException(error.message)
    }
  }
}
