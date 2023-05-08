import {
  Controller,
  UseGuards,
  ValidationPipe,
  Patch,
  UsePipes,
  Body
} from '@nestjs/common'
import { SessionGuard } from '../../../guards'
import { MemberService } from './member.service'
import { PatchMemberDto } from '../../../dtos'

@Controller('api/member')
@UseGuards(SessionGuard)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Patch()
  @UsePipes(ValidationPipe)
  updateMember(@Body() patchMemberDto: PatchMemberDto) {
    return this.memberService.updateUser(patchMemberDto)
  }
}
