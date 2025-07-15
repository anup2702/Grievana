import express from 'express'
import { loginStudent, registerStudent } from '../controllers/studentController.js'


const router = express.Router()

router.post('/login', loginStudent)
router.post('/register', registerStudent)

export default router