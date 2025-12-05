import { Model } from '@nozbe/watermelondb'
import { field, relation,children } from '@nozbe/watermelondb/decorators'
import { Business } from './business'
import { Transaction } from './transaction'

export class Customer extends Model {
  static table = 'customers'

  @field('name') name: string
  @field('phone') phone?: string

  @field('total_debt_given') totalDebtGiven: number
  @field('total_debt') totalDebt: number
  @field('total_debt_paid') totalDebtPaid: number
 @field('address') address?: string


  @field('due_reminder') dueReminder?: boolean
    @field('almost_due_reminder') almostDueReminder?: boolean

  @field('avatar') avatar?: string
  @field('notes') notes?: string
  @field('reminder_days_before') reminderDaysBefore?: number
@field('due_date') dueDate: number
  @field('created_at') createdAt: number
  @field('updated_at') updatedAt: number
  @field('last_transaction_at') lastTransactionAt?: number
  @field('deleted_at') deletedAt?: number
  @field('credit_limit') creditLimit?: number
  @field('score_last_updated') scoreLastUpdated?: number
@field('business_id') businessId: string
  @relation('businesses', 'business_id') business: Business
   @children('transactions') transaction: Transaction[];
}
