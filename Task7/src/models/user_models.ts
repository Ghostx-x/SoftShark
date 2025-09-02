import { dataSource } from "../database/data_source";
import { User } from "../entities/users_entity";
import { UserNotFound, ValidationError } from "../errors/error_class";

const userRepo = dataSource.getRepository(User);

export const UserModel = {
    async create(data: Partial<User>): Promise<User> {
        try {
            const user = userRepo.create(data);
            return await userRepo.save(user);
        } catch (err: any) {
            throw new ValidationError(err.message);
        }
    },

    async getById(id: number): Promise<User> {
        const user = await userRepo.findOne({ where: { id } });
        if (!user) throw new UserNotFound();
        return user;
    }
};
