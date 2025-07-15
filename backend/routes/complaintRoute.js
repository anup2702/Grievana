import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {getAllComplaints, createComplaint, getComplaintById, updateComplaint, deleteComplaint, updateStatus, voteComplaint} from '../controllers/complaintController.js'

const router = express.Router()

router.get('/', getAllComplaints)
router.post('/', protect, createComplaint)
router.get('/:id', getComplaintById)
router.put('/:id', protect, updateComplaint)
router.delete('/:id', protect, deleteComplaint)
router.patch('/:id/status', updateStatus)
router.patch('/:id/vote', protect, voteComplaint);



export default router