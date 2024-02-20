import { Router, Request, Response } from 'express'

export const router = Router()

// Public route

router.get('/', (request: Request, response: Response) => {
    return response.status(200).json({ message: 'This is the public route' })
})