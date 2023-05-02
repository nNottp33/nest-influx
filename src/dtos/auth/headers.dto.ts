import { IsJWT, IsNotEmpty, IsString } from 'class-validator'

export class HeadersDto {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  authorization: string
}
