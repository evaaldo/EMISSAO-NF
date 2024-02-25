import { sql } from '../database/connection'

export class CourseService {

    async createCourse(title: string, educator: string, description: string) {

        const courseId: any = crypto.randomUUID()
        
        await sql`INSERT INTO courses (id, title, educator, description) VALUES (${courseId},${title},${educator},${description})`

    }

}