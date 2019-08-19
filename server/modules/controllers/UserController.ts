import { User, UserModel } from '../db/models/user';

export class UserController {
    public static async getUserById(id: string): Promise<UserModel | null> {
        const user = await User.findOne({_id: id});
        return user;
    }

    public static async getUsers(): Promise<UserModel[] | null> {
        const users = await User.find();
        return users;
    }

    public static async addUser(userToAdd: UserModel): Promise<UserModel | null> {
        try {
            const user = new User(userToAdd);
            const newUser = await user.save();
            return newUser;
        } catch (err) {
            throw err;
        }
    }

    public static async updateUser(userToUpdate: UserModel): Promise<UserModel | null> {
        const id = userToUpdate.id;
        console.log(id, userToUpdate);
        const update = await User.findByIdAndUpdate(id, userToUpdate, { new: true });
        return update;
    }

    public static async deleteUser(userId: string): Promise<UserModel | null> {
        return await User.findByIdAndDelete(userId);


    }

}
