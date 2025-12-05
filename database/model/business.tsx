// model/business.ts
import { Model } from '@nozbe/watermelondb';
import { field,children  } from '@nozbe/watermelondb/decorators';
import { Customer } from './customer';
export class Business extends Model {
  static table = 'businesses';
 
  @field('name') name: string;
  @field('password') password: string;
   @field('total_debt_given') total_debt_given: number;
      @field('total_debt_paid') total_debt_paid: number;
      @field('total_customer') total_customer: number;
  @field('owner_name') ownerName?: string;
  @field('address') address?: string;
  @field('phone') phone?: string;
  @field('email') email?: string;
  @field('currency_name') currency_name: string;
    @field('currency_symbol')currency_symbol: string;
  @field('notes') notes?: string;
  @field('created_at') createdAt: number;
  @field('updated_at') updatedAt: number;
  @field('deleted_at') deletedAt?: number;
  @children('customers') customers: Customer[];
  // Example custom method
 
}
