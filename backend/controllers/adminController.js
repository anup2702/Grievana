import adminModel from "../models/adminModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


// create token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}


// register user
const registerAdmin = async (req, res) => {
    const { name, email, password, phone } = req.body
    const adminExists = await adminModel.findOne({ email })
    if (adminExists) {
        return res.json({ success: false, message: 'User already exists' })
    }

    const admin = await adminModel.create({ name, email, password, phone })
    res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        token: generateToken(admin._id)
    })
}

// login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body
    const admin = await adminModel.findOne({ email })
    if (!admin || !(await admin.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }
   res.json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    token: generateToken(admin._id)
   })
}

export { loginAdmin, registerAdmin}