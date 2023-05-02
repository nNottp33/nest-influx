import { IsNotEmpty, IsString } from 'class-validator'

export class NewAdminDto {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  full_name: string

  @IsNotEmpty()
  @IsString()
  role: string
}
