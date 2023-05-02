import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsJWT,
  IsString,
  IsPositive
} from 'class-validator'

export class PatchAdminDto {
  @IsOptional()
  @IsString()
  username: string

  @IsOptional()
  @IsString()
  full_name: string

  @IsOptional()
  @IsString()
  role: string

  @IsOptional()
  @IsBoolean()
  is_active: boolean

  @IsOptional()
  @IsJWT()
  session_token: string

  @IsOptional()
  password: string

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  admin_id: number
}
