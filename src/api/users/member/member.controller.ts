import { Controller, UseGuards } from '@nestjs/common'
import { SessionGuard } from '../../../guards'

@Controller('api/member')
@UseGuards(SessionGuard)
export class MemberController {}
