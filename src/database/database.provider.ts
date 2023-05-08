import { Sequelize } from 'sequelize-typescript'
import entities from './entity'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Op, QueryTypes } from 'sequelize'

export { Sequelize, QueryTypes }

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: config.get('DB.host'),
        port: config.get('DB.port'),
        username: config.get('DB.user'),
        password: config.get('DB.pass'),
        database: config.get('DB.name'),
        define: {
          underscored: true // Set the naming convention of tables and columns to snake_case
        },
        models: entities,
        logging: (msg) => console.log('[LOG] Executing query:', msg),
        operatorsAliases: {
          $and: Op.and,
          $or: Op.or,
          $eq: Op.eq,
          $ne: Op.ne,
          $gt: Op.gt,
          $gte: Op.gte,
          $lt: Op.lt,
          $lte: Op.lte,
          $in: Op.in,
          $notIn: Op.notIn,
          $is: Op.is,
          $like: Op.like,
          $notLike: Op.notLike,
          $iLike: Op.iLike,
          $notILike: Op.notILike,
          $regexp: Op.regexp,
          $notRegexp: Op.notRegexp,
          $iRegexp: Op.iRegexp,
          $notIRegexp: Op.notIRegexp,
          $between: Op.between,
          $notBetween: Op.notBetween,
          $overlap: Op.overlap,
          $contains: Op.contains,
          $contained: Op.contained,
          $adjacent: Op.adjacent,
          $strictLeft: Op.strictLeft,
          $strictRight: Op.strictRight,
          $noExtendRight: Op.noExtendRight,
          $noExtendLeft: Op.noExtendLeft,
          $any: Op.any,
          $all: Op.all,
          $values: Op.values,
          $col: Op.col
        }
      })
      await sequelize.sync()
      return sequelize
    }
  }
]
