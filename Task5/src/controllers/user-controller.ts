import { Request, Response } from "express";
import { UserService } from "../services/user-service";
import userSchema from "../validations/validations";

export class UserController {
    static async getUser(req: Request, res: Response) {
        try {
            const user = await UserService.getUser(req.params.id);
            if (!user) return res.status(404).json({ message: "User not found" });
            res.json(user);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    static async createUser(req: Request, res: Response) {
        try {
            const { value, error } = userSchema.validate(req.body);
            if (error) return res.status(400).json({ message: error.message });

            const user = await UserService.createUser(value);
            res.status(201).json(user);
        } catch (err: any) {
            if (err.code === "23505")
                return res.status(409).json({ message: "Email already exists" });
            res.status(500).json({ message: err.message });
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const { value, error } = userSchema.validate(req.body);
            if (error) return res.status(400).json({ message: error.message });

            const updatedUser = await UserService.updateUser(req.params.id, value);
            if (!updatedUser) return res.status(404).json({ message: "User not found" });

            res.json(updatedUser);
        } catch (err: any) {
            if (err.code === "23505")
                return res.status(409).json({ message: "Email already exists" });
            res.status(500).json({ message: err.message });
        }
    }

    static async patchUser(req: Request, res: Response) {
        try {
            const user = await UserService.getUser(req.params.id);
            if (!user) return res.status(404).json({ message: "User not found" });

            const { value, error } = userSchema.validate(req.body);
            if (error) return res.status(400).json({ message: error.message });

            const updatedUser = await UserService.patchUser(user, value);
            res.json(updatedUser);
        } catch (err: any) {
            if (err.code === "23505")
                return res.status(409).json({ message: "Email already exists" });
            res.status(500).json({ message: err.message });
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const deleted = await UserService.deleteUser(req.params.id);
            if (!deleted) return res.status(404).json({ message: "User not found" });
            res.json({ message: "User deleted" });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }
}
