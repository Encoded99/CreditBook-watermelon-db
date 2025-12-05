// models/transaction.ts
import { Model } from '@nozbe/watermelondb'
import { field, date, relation } from '@nozbe/watermelondb/decorators'
import { Customer } from './customer'
import { Business } from './business'

export class Transaction extends Model {
  static table = 'transactions'

  // Fields from schema
  @field('amount') amount: number
  @field('type') type: string // 'debt_taken' | 'debt_paid'
  @field('notes') notes?: string
  @field('created_at') createdAt: number
  @field('last_transaction_at') lastTransactionAt?: number
  @field('reminder_days_before') reminderDaysBefore: number
@field('due_date') dueDate: number
@field('business_id') businessId: string
@field('customer_id') customerId: string
  @relation('businesses', 'business_id') business: Business
  @relation('customers', 'customer_id') customer: Customer
  
}
