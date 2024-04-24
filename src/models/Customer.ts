import { WithId } from 'mongodb';
import * as z from 'zod';
import { db } from './database';

declare global {
  namespace Express {
    interface User extends CustomerWithId {}
  }
}

export const Customer = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5)
});

export type Customer = z.infer<typeof Customer>;
export type CustomerWithId = WithId<Customer>;
export const Customers = db.collection<Customer>('customers');
