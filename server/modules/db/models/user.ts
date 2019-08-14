import { Document, Schema, Model, model} from 'mongoose';

export interface UserDocument extends Document {
    username: string;
    fname: string;
    lname: string;
    createdDate: Date;
    password: string;
}

export interface UserModel extends UserDocument {}

export const UserSchema: Schema = new Schema(
    {
        username: String,
        fname: String,
        lname: String,
        createdDate: Date,
        password: String
    },
    { collection: 'users'}
);

UserSchema.pre<UserDocument>('save', async function () {
    this.createdDate =new Date();
});

export const User: Model<UserModel> = model<UserModel>(
    'User',
    UserSchema
);
