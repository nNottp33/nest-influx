import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { ApiModule } from './api/api.module'
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module'
import config from './configs/base.config'
import { AuthMiddleware } from './middleware'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    ApiModule,
    DatabaseModule,
    AuthModule,
    JwtModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      // กำหนดเฉพาะ route '/auth/admin/login' ให้ไม่ใช้ global middleware
      .exclude(
        { path: '/auth/admin/login', method: RequestMethod.POST },
        { path: '/auth/admin/logout', method: RequestMethod.PATCH }
      )
      .forRoutes('*')
  }
}
