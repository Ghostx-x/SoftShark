import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/user-service'
import { NotFound } from '../errors/error-class'
import { User } from '../entities/user.entity'

export class UserController {

    /**
     * Get a user by their ID
     * @throws {NotFound} If the user was not found
     * @throws {AppErrors} For expected app errors
     * @throws {Error} For unexpected db or runtime errors
     */
    static async getUser(req: Request, res: Response, next: NextFunction) : Promise <void>{
        try {
            const user: User | null = await UserService.getUser(req.params.id)
            if (!user) return next(new NotFound())
            res.json(user)
        } catch (err) {
            next(err)
        }
    }

    /**
     * Create (post) a new user
     * @throws {AppErrors} For expected app errors
     * @throws {Error} For unexpected db or runtime errors
     */
    static async createUser(req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const user : User = await UserService.createUser(req.body)
            res.status(201).json(user)
        } catch (err) {
            next(err)
        }
    }

    /**
     * Update (put) a user by their id
     * @throws {NotFound} If the user was not found
     * @throws {AppErrors} For expected app errors
     * @throws {Error} For unexpected db or runtime errors
     */
    static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const updatedUser = await UserService.updateUser(req.params.id, req.body)
            if (!updatedUser) return next(new NotFound())

            res.json(updatedUser)
        } catch (err) {
            next(err)
        }
    }


    /**
     * Update the only provided fields (patch)
     * @throws {NotFound} If the user was not found
     * @throws {AppErrors} For expected app errors
     * @throws {Error} For unexpected db or runtime errors
     */
    static async patchUser(req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const user : User | null= await UserService.getUser(req.params.id)
            if (!user) return next(new NotFound())

            const updatedUser = await UserService.patchUser(user, req.body)
            res.json(updatedUser)
        } catch (err) {
            next(err)
        }
    }

    /**
     * Delete a user by their id
     * @throws {NotFound} If the user was not found
     * @throws {AppErrors} For expected app errors
     * @throws {Error} For unexpected db or runtime errors
     */
    static async deleteUser(req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const deleted : User | null = await UserService.deleteUser(req.params.id)
            if (!deleted) return next(new NotFound())
            res.json({ message: 'User deleted' })
        } catch (err) {
            next(err)
        }
    }
}
