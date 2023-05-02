import { IsNotEmpty, IsString, IsIn, IsInt } from 'class-validator'

export class SignOutDto {
  @IsNotEmpty()
  @IsInt()
  id: number

  @IsNotEmpty()
  @IsString()
  @IsIn(['admin', 'member'])
  source: string
}
