import { Request, Response } from 'express'
import { CourseService } from '../services/CourseService'

const courseService = new CourseService()

export class CourseController {

    async createCourse(request: Request, response: Response) {

        const { title, educator, description } = request.body

        await courseService.createCourse(title, educator, description)

        try {
            return response.status(200).json({ message: 'Course created!' })
        } catch(error) {
            return response.status(400).json(error)      
        }

    }

    async getCourseByEducator(request: Request, response: Response) {

        const { educator } = request.body

        const courseDatabase = await courseService.getCourseByEducator(educator)

        try {
            return response.status(200).json(courseDatabase)
        } catch(error) {
            return response.status(400).json(error)
        }

    }

    async deleteCourseByTitle(request: Request, response: Response) {

        const { title } = request.body

        await courseService.deleteCourseByTitle(title)

        try {
            return response.status(200).json({ message: `Course ${title} deleted!` })
        } catch(error) {
            return response.status(400).json(error)
        }

    }

}