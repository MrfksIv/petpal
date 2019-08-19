import { Pet, PetModel } from '../db/models/pet';

export class PetController {
    public static async getPetById(id: string): Promise<PetModel | null> {
        return await Pet.findOne({_id: id});
    }

    public static async getPets(): Promise<PetModel[] | null> {
        return await Pet.find();
    }
}
