import { AppErrors } from '../errors/error-class'
import { NextFunction, Request, Response } from 'express'

export function ErrorHandler(err: Error, req: Request, res: Response,  next: NextFunction) {
    if ((err as any).code === '23505') {
        return res.status(409).json({ message: 'Email already exists' })
    }

    if (err instanceof AppErrors) {
        return res.status(err.statusCode).json({ message: err.message })
    }

    return res.status(500).json({ message: 'Internal Server Error' })

}