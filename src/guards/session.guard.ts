import { AdminService } from '../api/users/admin/admin.service'
import { MemberService } from '../api/users/member/member.service'
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common'

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    private adminService: AdminService,
    private memberService: MemberService
  ) {}
  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest()
      const token = request?.headers?.authorization?.split(' ')[1] || 'Bearer'
      const username = request?.body?.verify_payload?.username || ''
      const role = request?.body?.verify_payload?.role || ''

      const connectService =
        role === 'member' ? this.memberService : this.adminService
      const result = await connectService.checkExitsUser({
        username,
        token
      })

      if (!result) throw new Error('Session expired!')

      return result
    } catch (error) {
      console.error('[ERROR] SessionGuard CATCH:', error)
      const message = error?.message || 'System error occurred'
      if (message.includes('Session expired!'))
        throw new UnauthorizedException(message)

      throw new BadRequestException(message)
    }
  }
}
