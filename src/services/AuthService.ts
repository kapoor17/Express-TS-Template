import { InsertOneResult } from 'mongodb';
import bcrypt from 'bcrypt';

import { Customers, CustomerWithId, Customer } from '../models/Customer';
import { BadRequestError, NotFoundError } from '../errors';

class AuthService {
  public static async register(
    data: Customer
  ): Promise<InsertOneResult<CustomerWithId>> {
    try {
      const { password } = data;
      const hashPassword = await this.hashPassword(password);
      const customer = await Customers.insertOne({
        ...data,
        password: hashPassword
      });
      console.log({ customer });
      return customer;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public static async login(
    data: Pick<Customer, 'email' | 'password'>
  ): Promise<CustomerWithId> {
    const { email, password } = data;
    const customer = await Customers.findOne({ email });
    if (customer == null) {
      throw new NotFoundError('User does not exist');
    }

    const passwordMatch = await this.comparePassword(
      customer.password,
      password
    );
    if (passwordMatch) {
      throw new BadRequestError('Wrong Password');
    }
    return customer;
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
  }

  public static async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export default AuthService;
