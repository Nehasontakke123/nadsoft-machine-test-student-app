// routes/studentRoutes.js

import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';

const router = express.Router();

/**
 * @route   POST /students
 * @desc    Create a new student
 * @access  Public
 */
router.post('/', createStudent);

/**
 * @route   GET /students
 * @desc    Get all students with pagination
 * @access  Public
 */
router.get('/', getAllStudents);

/**
 * @route   GET /students/:id
 * @desc    Get a single student by ID (with marks)
 * @access  Public
 */
router.get('/:id', getStudentById);

/**
 * @route   PUT /students/:id
 * @desc    Update student information by ID
 * @access  Public
 */
router.put('/:id', updateStudent);

/**
 * @route   DELETE /students/:id
 * @desc    Delete a student by ID
 * @access  Public
 */
router.delete('/:id', deleteStudent);

export default router;
