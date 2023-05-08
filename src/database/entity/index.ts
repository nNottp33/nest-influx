import { Books } from './books.entity'
import { Members } from './members.entity'
import { AdminUsers } from './admins.entity'

const entities = [Books, Members, AdminUsers]

export const modelProviders = [
  {
    provide: 'BOOKS_REPOSITORY',
    useValue: Books
  },
  {
    provide: 'ADMIN_USERS_REPOSITORY',
    useValue: AdminUsers
  },
  {
    provide: 'MEMBERS_REPOSITORY',
    useValue: Members
  }
]

export { Books, Members, AdminUsers }
export default entities
