import { sql } from '../database/connection'

export class CourseService {

    async createCourse(title: string, educator: string, description: string) {

        const courseId: any = crypto.randomUUID()
        
        await sql`INSERT INTO courses (id, title, educator, description) VALUES (${courseId},${title},${educator},${description})`

    }

    async getCourseByEducator(educator: string) {

        const courseDatabase = await sql`SELECT * FROM courses WHERE educator = ${educator}`

        return courseDatabase

    }

    async deleteCourseByTitle(title: string) {

        await sql`DELETE FROM courses WHERE title = ${title}`

    }

}