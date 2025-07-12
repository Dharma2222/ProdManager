// routes/userRoutes.js
import express from 'express';
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and registration
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewUser:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - phone
 *         - password
 *         - confirmPassword
 *       properties:
 *         fullName:
 *           type: string
 *           description: The user's full name
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *         phone:
 *           type: string
 *           description: The user's phone number
 *         password:
 *           type: string
 *           format: password
 *           description: The user's password
 *         confirmPassword:
 *           type: string
 *           format: password
 *           description: Must match the password field
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT for authenticated requests
 *         role:
 *           type: string
 *           description: Assigned role of the new user
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation error or missing fields
 *       409:
 *         description: Email already registered
 */
router.post('/register', registerUser);

export default router;
