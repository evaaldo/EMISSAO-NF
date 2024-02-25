import { Router, Request, Response } from 'express'
import { CourseController } from './controllers/CourseController'

export const router = Router()
const courseController = new CourseController()

// Public route

router.get('/', (request: Request, response: Response) => {
    return response.status(200).json({ message: 'This is the public route' })
})

// Course Routes

router.post('course', courseController.createCourse)
router.get('course', courseController.getCourseByEducator)