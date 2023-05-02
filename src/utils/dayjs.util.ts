import * as dayjs from 'dayjs'

export const dateTime = {
  now: (): any => {
    return dayjs().format()
  }
}
