import { Request, Response } from 'express'
import { CourseService } from '../services/CourseService'

const courseService = new CourseService()

export class CourseController {

    createCourse(request: Request, response: Response) {

        const { title, educator, description } = request.body

        courseService.createCourse(title, educator, description)

        try {
            return response.status(200).json({ message: 'Course created!' })
        } catch(error) {
            return response.status(400).json(error)      
        }

    }

}