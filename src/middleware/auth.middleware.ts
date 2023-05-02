import {
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { HeadersDto } from '../dtos'
import { validate } from 'class-validator'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService, private config: ConfigService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const headersDto = new HeadersDto()
      headersDto.authorization =
        req?.headers?.authorization?.split(' ')[1] || ''

      const errors = await validate(headersDto)
      if (errors && errors.length > 0) {
        console.error(
          '[ERROR] books middleware validate headers CATCH:',
          errors
        )
        return res
          .status(401)
          .send({ statusCode: 401, message: errors?.[0]?.constraints })
      }

      const payload = await this.jwtService.verifyAsync(
        headersDto.authorization,
        {
          secret: this.config.get('JWT_SECRET')
        }
      )
      payload.token = headersDto.authorization
      req.body['verify_payload'] = payload

      next()
    } catch (error) {
      console.error('[ERROR] books middleware CATCH:', error)
      const message =
        error?.message?.replace(/jwt|JWT|Jwt/gim, 'token') || 'Error'
      throw new UnauthorizedException(message)
    }
  }
}
