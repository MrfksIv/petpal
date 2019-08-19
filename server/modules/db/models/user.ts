import { Document, Schema, Model, model} from 'mongoose';

const ObjectId = Schema.Types.ObjectId;
export interface UserDocument extends Document {

    username: string;
    fname: string;
    lname: string;
    createdDate: Date;
    password: string;
    pets: [typeof ObjectId]
}

export interface UserModel extends UserDocument {
    id?: typeof ObjectId
}

export const UserSchema: Schema = new Schema(
    {
        username: String,
        fname: String,
        lname: String,
        createdDate: Date,
        password: String,
        pets: [ObjectId]
    },
    { collection: 'users'}
);

UserSchema.pre<UserDocument>('save', async function () {
    this.createdDate =new Date();
});

export const User: Model<UserModel> = model<UserModel>(
    'users',
    UserSchema
);
