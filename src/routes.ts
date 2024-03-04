import { Router, Request, Response } from 'express'
import { CourseController } from './controllers/CourseController'
import { VerifyExistence } from './middlewares/verifyExistence'

export const router = Router()
const courseController = new CourseController()
const verifyExistence = new VerifyExistence()

// Public route

router.get('/', (request: Request, response: Response) => {
    return response.status(200).json({ message: 'This is the public route' })
})

// Course Routes

router.post('/course', verifyExistence.verifyIfCourseAlreadyExists, courseController.createCourse)
router.get('/course', verifyExistence.verifyIfCourseExists, courseController.getCourseByEducator)
router.delete('/course', verifyExistence.verifyIfCourseExists, courseController.deleteCourseByTitle)
router.put('/course/:id', verifyExistence.verifyIfCourseExists, courseController.updateCourse)