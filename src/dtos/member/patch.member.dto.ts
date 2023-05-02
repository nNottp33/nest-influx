import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsJWT,
  IsString,
  IsPositive
} from 'class-validator'

export class PatchMemberDto {
  @IsOptional()
  @IsString()
  username: string

  @IsOptional()
  @IsString()
  full_name: string

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
  member_id: number
}
