import { dataSource } from '../config/data-source'
import { User } from '../entities/user.entity'

const userRepo = dataSource.getRepository(User)

export class UserService {
    static async getUser(id: string) : Promise<User | null>  {
        try{
            return await userRepo.findOne({ where: { id } })
        }catch(err) {
            throw err
        }
    }

    static async createUser(data: Partial<User>) : Promise <User> {
        try{
            const user : User = userRepo.create(data)
            return await userRepo.save(user)
        }catch(err){
            throw err
        }

    }

    static async updateUser(id: string, data: Partial<User>): Promise<User | null> {
        try {
            // const result = await userRepo.update(id, data)
            // if (result.affected === 0) return null
            // return await userRepo.findOneBy({ id })

            const user = await userRepo.findOneBy({ id });

            if (!user) return null;

            user.name = data.name as string;
            user.email = data.email as string;
            user.profession = data.profession as string;
            user.metadata = data.metadata as any;

            userRepo.merge(user, data);
            await userRepo.update(user, data);
            return user;

        } catch (err) {
            throw err
        }
    }



    static async patchUser(user: User, data: Partial<User>) : Promise <User> {
        try{
            userRepo.merge(user, data)
            return await userRepo.save(user)
        }catch(err) {
            throw err
        }

    }

    static async deleteUser(id: string) : Promise <User | null>{
        try{
            const user: User | null = await userRepo.findOneBy({ id })
            if (!user) return null
            await userRepo.remove(user)
            return user
        } catch (err) {
            throw err
        }
    }
}
