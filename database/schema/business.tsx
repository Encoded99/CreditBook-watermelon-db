// schema/business.ts
import { tableSchema } from '@nozbe/watermelondb/Schema';

export const BusinessSchema = tableSchema({
  name: 'businesses',
  columns: [
 
    { name: 'name', type: 'string' },
    { name: 'owner_name', type: 'string',isOptional: true },
      { name: 'password', type: 'string' },

    { name: 'address', type: 'string', isOptional: true },
    { name: 'phone', type: 'string', isOptional: true },
    { name: 'email', type: 'string', isOptional: true },
   { name: 'currency_name', type: 'string' },
     { name: 'total_debt_given', type: 'number' },
          { name: 'total_debt_paid', type: 'number' },
{ name: 'currency_symbol', type: 'string' },
    { name: 'notes', type: 'string', isOptional: true },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
        { name: 'total_customer', type: 'number' },
    { name: 'deleted_at', type: 'number', isOptional: true },
  ],
});
