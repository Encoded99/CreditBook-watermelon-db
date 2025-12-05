import { tableSchema } from '@nozbe/watermelondb/Schema';

export const CustomerSchema = tableSchema({
  name: 'customers',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'business_id', type: 'string' },

    { name: 'total_debt_given', type: 'number' },
    { name: 'total_debt_paid', type: 'number' },   // fixed
    { name: 'total_debt', type: 'number' },        // fixed

    { name: 'phone', type: 'string', isOptional: true },
    { name: 'address', type: 'string', isOptional: true },
    { name: 'avatar', type: 'string', isOptional: true },
    { name: 'notes', type: 'string', isOptional: true },

    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
    { name: 'last_transaction_at', type: 'number', isOptional: true },
    { name: 'deleted_at', type: 'number', isOptional: true },
{ name: 'due_date', type: 'number',  },
    { name: 'reminder_days_before', type: 'number', isOptional: true },
    { name: 'credit_limit', type: 'number', isOptional: true },
    { name: 'score_last_updated', type: 'number', isOptional: true },
      { name: 'due_reminder', type: 'boolean', isOptional: true },
         { name: 'almost_due_reminder', type: 'boolean', isOptional: true },
  ],
});
