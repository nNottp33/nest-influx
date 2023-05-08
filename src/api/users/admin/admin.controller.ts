import {
  Body,
  Controller,
  Post,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { AdminService } from './admin.service'
import { NewAdminDto, PatchAdminDto } from '../../../dtos'
import { SessionGuard } from '../../../guards'

@Controller('api/admin')
@UseGuards(SessionGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createAdmin(@Body() newAdminDto: NewAdminDto) {
    return this.adminService.createAdmin(newAdminDto)
  }

  @Patch()
  @UsePipes(ValidationPipe)
  updateAdmin(@Body() patchAdminDto: PatchAdminDto) {
    return this.adminService.updateUser(patchAdminDto)
  }
}
