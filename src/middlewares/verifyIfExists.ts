import { Request, Response, NextFunction } from "express";
import { sql } from "../database/connection";

export class verifyExistence {

    async verifyIfCourseExists(request: Request, response: Response, next: NextFunction) {

        const { title } = request.body

        try {

            const course = await sql`SELECT * FROM courses WHERE title = ${title}`

            if(course && course.length > 0) {
                next()
            } else {
                return response.status(400).json({ error: "The course doesn't exists!" })
            }

        } catch(error) {

            return response.status(500).json({ error: `Internal server error: ${error}` })

        }

    }

    async verifyIfCourseAlreadyExists(request: Request, response: Response, next: NextFunction) {

        const { title } = request.body

        try {

            const course = await sql`SELECT * FROM courses WHERE title = ${title}`

            if(course && course.length > 0) {
                return response.status(400).json({ error: "The course already exists!" })
            } else {
                next()
            }

        } catch(error) {

            return response.status(500).json({ error: `Internal server error: ${error}` })

        }

    }

}