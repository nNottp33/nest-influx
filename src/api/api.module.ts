import { Module } from '@nestjs/common'
import { BookModule } from './book/book.module'
import { AdminModule } from './users/admin/admin.module'
import { MemberModule } from './users/member/member.module'

@Module({
  imports: [BookModule, AdminModule, MemberModule]
})
export class ApiModule {}
