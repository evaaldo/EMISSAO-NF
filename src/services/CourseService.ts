import { sql } from '../database/connection'

export class CourseService {

    async createCourse(title: string, educator: string, description: string) {
        
        await sql`INSERT INTO courses (title, educator, description) VALUES (${title},${educator},${description})`

    }

    async getCourseByEducator(educator: string) {

        const courseDatabase = await sql`SELECT * FROM courses WHERE educator = ${educator}`

        return courseDatabase

    }

    async getAllCourses() {

        const coursesDatabase = await sql`SELECT * FROM courses`

        return coursesDatabase

    }

    async deleteCourseByTitle(title: string) {

        await sql`DELETE FROM courses WHERE title = ${title}`

    }

    async updateCourse(id: any, title: string, educator: string) {

        await sql`UPDATE courses SET title = ${title}, educator = ${educator} WHERE id = ${id}`

    }

    async deleteCourseByEducator(educator: string) {

        await sql`DELETE * FROM courses WHERE educator = ${educator}`

    }

}