import bcrypt from 'bcrypt';
import mongoose, { HydratedDocument, Model } from 'mongoose';
import * as z from 'zod';

declare global {
  namespace Express {
    interface User extends HydratedDocument<Customer> {}
  }
}

export const ZodCustomerSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Must be minimum of 5 characters' })
    .max(20, { message: 'Must be maximum of 20 characters' }),
  email: z.string().email(),
  password: z.string().min(5, { message: 'Must be minimum of 5 characters' })
});

export type Customer = z.infer<typeof ZodCustomerSchema> & CustomerMethods;

type CustomerMethods = {
  comparePassword: (password: string) => Promise<boolean>;
};

type CustomerModel = Model<Customer, {}, CustomerMethods>;

const CustomerSchema = new mongoose.Schema<
  Customer,
  CustomerModel,
  CustomerMethods
>({
  name: {
    type: String,
    minLength: 5,
    maxLength: 20,
    required: [true, 'Please provide a name']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 5
  }
});

CustomerSchema.pre('save', async function genHash() {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(this.password, salt);
  this.password = passwordHash;
});

CustomerSchema.methods.comparePassword = async function comparePassword(
  password: string
) {
  const doesPasswordMatch = await bcrypt.compare(password, this.password);
  return doesPasswordMatch;
};

export const Customer = mongoose.model<Customer, CustomerModel>(
  'Customers',
  CustomerSchema
);
