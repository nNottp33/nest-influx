import { IsNotEmpty, IsString, IsIn } from 'class-validator'

export class SignInDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  @IsString()
  @IsIn(['admin', 'member'])
  source: string
}
