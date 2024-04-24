import { WithId } from 'mongodb';
import * as z from 'zod';

export const Customer = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5)
});

export type Customer = z.infer<typeof Customer>;
export type CustomerWithId = WithId<Customer>;
