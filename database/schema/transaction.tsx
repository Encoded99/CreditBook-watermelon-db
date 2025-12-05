import { tableSchema } from '@nozbe/watermelondb/Schema';

export const TransactionSchema = tableSchema({
  name: 'transactions',
  columns: [
   { name: 'amount', type: 'number'},
 { name: 'type', type: 'string' },
      { name: 'business_id', type: 'string' },
        { name: 'customer_id', type: 'string' },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'last_transaction_at', type: 'number', isOptional: true },  
 { name: 'reminder_days_before', type: 'number',},
  { name: 'due_date', type: 'number'},



  ],
});
