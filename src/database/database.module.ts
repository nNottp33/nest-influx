import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import entities from './entity'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB.host'),
        port: config.get('DB.port'),
        username: config.get('DB.user'),
        password: config.get('DB.pass'),
        database: config.get('DB.name'),
        entities: entities,
        synchronize: true
      })
    })
  ]
})
export class DatabaseModule {}
