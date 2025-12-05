import { Database } from '@nozbe/watermelondb';

import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';


import { Customer } from './model/customer';
import { CustomerSchema } from './schema/customer';
import { BusinessSchema } from './schema/business';
import { TransactionSchema } from './schema/transaction';
import { appSchema } from '@nozbe/watermelondb/Schema';
import { Business } from './model/business';
import { Transaction } from './model/transaction';
const schema = appSchema({
  version: 2,
  tables: [CustomerSchema,BusinessSchema,TransactionSchema],
});

const adapter = new SQLiteAdapter({
  schema,
});

export const database = new Database({
  adapter,
  modelClasses: [Customer,Business,Transaction],
});
