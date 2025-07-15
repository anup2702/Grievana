import studentModel from "../models/studentModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


// create token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}


// register user
const registerStudent = async (req, res) => {
    const { name, email, password, phone } = req.body
    const studentExists = await studentModel.findOne({ email })
    if (studentExists) {
        return res.json({ success: false, message: 'User already exists' })
    }

    const student = await studentModel.create({ name, email, password, phone })
    res.status(201).json({
        _id: student._id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        token: generateToken(student._id)
    })
}

// login
const loginStudent = async (req, res) => {
    const { email, password } = req.body
    const student = await studentModel.findOne({ email })
    if (!student || !(await student.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }
   res.json({
    _id: student._id,
    name: student.name,
    email: student.email,
    phone: student.phone,
    token: generateToken(student._id)
   })
}

export { loginStudent, registerStudent}