import complaintModel from '../models/complaintModel.js'

// fetch all complaints
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await complaintModel.find().sort({ createdAt: -1 })
        res.status(200).json(complaints)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching complaints', error: error })
    }
}

// create complaints
const createComplaint = async (req, res) => {
    try {
        const { title, description, place, category, user } = req.body

        const newComplaint = new complaintModel({
            title,
            description,
            place,
            category,
            user
        })

        const savedComplaint = await newComplaint.save()
        res.status(201).json(savedComplaint)

    } catch (error) {
        res.status(500).json({ message: 'Error creating complaint', error: error })
    }
}

const getComplaintById = async (req, res) => {
    try {
        const complaint = await complaintModel.findById(req.params.id)
        if(!complaint){
            return res.status(404).json({message: 'Complaint not found'})
            res.status(200).json(complaint)
        }
    } catch (error) {
        res.status(500).json({message: 'Error fetching complaint', error: error})
    }
}

const updateComplaint = async (req, res) => {
    try {
        const updated = await complaintModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!updated) return res.status(404).json({message: 'Complaint not found'})
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({message: 'Error updating complaint', error: error})
    }
}

const deleteComplaint = async (req, res) => {
    try {
        const deleted = await complaintModel.findByIdAndDelete(req.params.id)
        if(!deleted) return res.status(404).json({message: 'Complaint not found'})
        res.status(200).json({message: 'Complaint deleted successfully'})
    } catch (error) {
        res.status(500).json({message: 'Error deleting complaint', error: error})
    }
}

const updateStatus = async (req, res) => {
    try {
        const {status} = req.body
        if(!["pending", "resolved"].includes(status)){
            return res.status(400).json({message: 'Invalid status'})
        }

        const complaint = await complaintModel.findById(req.params.id, {status}, {new: true})
        res.status(200).json(complaint)
    } catch (error) {
        res.status(500).json({message: 'Error updating status', error: error})
    }
}

const voteComplaint = async (req, res) => {
  try {
    const complaint = await complaintModel.findById(req.params.id)
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' })
    }

    const userId = req.user._id

    if (complaint.votedBy.includes(userId)) {
      return res.status(400).json({ message: 'You have already voted on this complaint' })
    }

    complaint.voted += 1
    complaint.votedBy.push(userId)
    await complaint.save()

    res.json({ message: 'Vote registered', voted: complaint.voted })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


export {getAllComplaints, createComplaint, getComplaintById, updateComplaint, deleteComplaint, updateStatus, voteComplaint}