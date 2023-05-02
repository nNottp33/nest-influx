import {
  Controller,
  Post,
  Body,
  Patch,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto, SignOutDto } from '../dtos'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('admin/login')
  @UsePipes(ValidationPipe)
  adminSignIn(@Body() signInDto: SignInDto) {
    return this.authService.usersSignIn(signInDto)
  }

  @Patch('admin/logout')
  @UsePipes(ValidationPipe)
  adminSignOut(@Body() patchData: SignOutDto) {
    return this.authService.usersSignOut(patchData)
  }

  @Post('member/login')
  @UsePipes(ValidationPipe)
  memberSignIn(@Body() signInDto: SignInDto) {
    return this.authService.usersSignIn(signInDto)
  }

  @Patch('member/logout')
  @UsePipes(ValidationPipe)
  memberSignOut(@Body() patchData: SignOutDto) {
    return this.authService.usersSignOut(patchData)
  }
}
