import * as bcrypt from 'bcrypt'
import { Injectable, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AdminService } from '../api/users/admin/admin.service'
import { MemberService } from '../api/users/member/member.service'

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private memberService: MemberService,
    private jwtService: JwtService
  ) {}

  usersSignIn = async (signInDto) => {
    try {
      const connectService =
        signInDto.source === 'admin' ? this.adminService : this.memberService
      const result = await connectService.getUserByUsername(signInDto.username)

      const isMatch = await bcrypt.compare(
        signInDto.password,
        result?.data?.password || 'password'
      )

      if (!isMatch) {
        return {
          statusCode: 401,
          message: 'Please check your username or password and try again.',
          error: 'Unauthorized'
        }
      }

      const { id, username, role, fullName } = result.data
      const payloadJWT = {
        id,
        username,
        role,
        full_name: fullName
      }

      const session_token = await this.jwtService.signAsync(payloadJWT)
      const resultUpdated = await connectService.updateUser({
        id,
        session_token
      })

      if (resultUpdated?.statusCode !== 200) {
        return {
          statusCode: 400,
          message: ['SignIn failed', 'System error occurred']
        }
      }

      return {
        statusCode: 200,
        message: ['SignIn successfully'],
        data: { ...payloadJWT, session_token }
      }
    } catch (error) {
      console.error('[ERROR] Auth SignIn CATCH:', error)
      throw new BadRequestException(error.message)
    }
  }

  usersSignOut = async ({ id, source }) => {
    try {
      const connectService =
        source === 'admin' ? this.adminService : this.memberService
      const resultUpdated = await connectService.updateUser({
        id,
        session_token: null
      })

      if (resultUpdated.statusCode !== 200) {
        return {
          statusCode: 400,
          message: ['SignOut failed', 'System error occurred']
        }
      }

      return {
        statusCode: 200,
        message: ['SignOut successfully']
      }
    } catch (error) {
      console.error('[ERROR] Auth SignOut CATCH:', error)
      throw new BadRequestException(error.message)
    }
  }
}
