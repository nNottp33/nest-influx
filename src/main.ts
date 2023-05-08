import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { json, urlencoded } from 'body-parser'
import config from './configs/base.config'

async function bootstrap() {
  const appConfig = config()
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    }
  })

  // middleware for body parser
  app.use(json())
  app.use(urlencoded({ extended: true }))
  // app.setGlobalPrefix('/api')

  // server running
  await app.listen(appConfig.PORT)
}
bootstrap()
