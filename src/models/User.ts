import mongoose, {Model, Types} from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * Declaring a global namespace for 
 * Express.User to access methods and 
 * properties on a User instance
 */
declare global {
    namespace Express {
      interface User extends IUser, IUserMethods {
        _id: Types.ObjectId
      }
    }
}

interface IUser {
    name: string;
    email: string;
    password: string;
}

interface IUserMethods {
    verifyPassword: (password: string) => Promise<boolean>
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
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

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.verifyPassword = async function(password: string){
    return bcrypt.compare(password, this.password);
}

export default mongoose.model<IUser, UserModel>('Users', UserSchema);