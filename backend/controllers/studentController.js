// controllers/studentController.js
import { pool } from '../db/pool.js';

/**
 * @desc Create a new student
 * @route POST /students
 */
export const createStudent = async (req, res) => {
  try {
    const { name, email, age, parentId } = req.body;
    const result = await pool.query(
      'INSERT INTO students (name, email, age, parent_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, age, parentId]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get all students with pagination
 * @route GET /students?page=&limit=
 */
export const getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const students = await pool.query(
      'SELECT * FROM students ORDER BY id LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    const count = await pool.query('SELECT COUNT(*) FROM students');

    res.status(200).json({
      data: students.rows,
      total: parseInt(count.rows[0].count),
      page,
      limit
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get a student by ID including marks
 * @route GET /students/:id
 */
export const getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
    const marks = await pool.query('SELECT * FROM marks WHERE student_id = $1', [id]);

    if (student.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ ...student.rows[0], marks: marks.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Update a student's details
 * @route PUT /students/:id
 */
export const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, age, parentId } = req.body;

    const result = await pool.query(
      'UPDATE students SET name = $1, email = $2, age = $3, parent_id = $4 WHERE id = $5 RETURNING *',
      [name, email, age, parentId, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Delete a student
 * @route DELETE /students/:id
 */
export const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      'DELETE FROM students WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
