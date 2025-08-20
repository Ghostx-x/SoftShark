import { dataSource } from "../config/data-source";
import { User } from "../entities/user.entity";

const userRepo = dataSource.getRepository(User);

export class UserService {
    static async getUser(id: string) {
        return await userRepo.findOne({ where: { id } });
    }

    static async createUser(data: Partial<User>) {
        const user = userRepo.create(data);
        return await userRepo.save(user);
    }

    static async updateUser(id: string, data: Partial<User>) {
        const result = await userRepo.update(id, data);
        if (result.affected === 0) return null;
        return await userRepo.findOneBy({ id });
    }

    static async patchUser(user: User, data: Partial<User>) {
        userRepo.merge(user, data);
        return await userRepo.save(user);
    }

    static async deleteUser(id: string) {
        const result = await userRepo.delete(id);
        return result.affected !== 0;
    }
}
