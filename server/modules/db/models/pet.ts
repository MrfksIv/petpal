import { Document, Schema, Model, model } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

export interface PetDocument extends Document {
    petName: string;
    animal: string;
    age: number;
    ownerId: typeof ObjectId;
}

export interface PetModel extends PetDocument {}

export const PetSchema: Schema = new Schema(
    {
        petName: String,
        animal: String,
        age: Number,
        ownerId: ObjectId
    }, {collection: 'pets'}
);

export const Pet: Model<PetModel> = model<PetModel>(
    'pets',
    PetSchema
);
