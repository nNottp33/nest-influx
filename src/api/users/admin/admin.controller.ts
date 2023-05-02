import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { AdminService } from './admin.service'
import { NewAdminDto } from '../../../dtos'

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createAdmin(@Body() newAdminDto: NewAdminDto) {
    return this.adminService.createAdmin(newAdminDto)
  }
}
