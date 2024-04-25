import { HydratedDocument } from 'mongoose';
import { Customer } from '../models/Customer';
import { NotFoundError } from '../errors';

class CustomerService {
  public static async createOne(
    data: Customer
  ): Promise<HydratedDocument<Customer>> {
    try {
      const customer = await Customer.create(data);
      return customer;
    } catch (err) {
      console.error('Could not create a new User!');
      throw err;
    }
  }

  public static findOne(data: Record<'email', string> | Record<'id', string>) {
    const customer = Customer.findOne(data);
    if (!customer) {
      throw new NotFoundError('User does not exist!');
    }
    return customer;
  }

  public static updateOne() {}
}

export default CustomerService;