import { Injectable } from '@nestjs/common'
import { dateTime } from './utils'

@Injectable()
export class AppService {
  getRootApp(): object {
    return { now: dateTime.now() }
  }
}
