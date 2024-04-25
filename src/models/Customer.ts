import bcrypt from 'bcrypt';
import mongoose, { HydratedDocument, Model } from 'mongoose';

declare global {
  namespace Express {
    interface User extends HydratedDocument<Customer> {}
  }
}

type ICustomerMethods = {
  comparePassword: (password: string) => Promise<boolean>;
};

type CustomerModel = Model<Customer, {}, ICustomerMethods>;

const CustomerSchema = new mongoose.Schema<
  Customer,
  CustomerModel,
  ICustomerMethods
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
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email'
    ],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 5
  }
});

CustomerSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(this.password, salt);
  this.password = passwordHash;
});

CustomerSchema.methods.comparePassword = async function (password: string) {
  const doesPasswordMatch = await bcrypt.compare(password, this.password);
  return doesPasswordMatch;
};

export const Customer = mongoose.model('Customers', CustomerSchema);
export type Customer = {
  name: string;
  email: string;
  password: string;
};
