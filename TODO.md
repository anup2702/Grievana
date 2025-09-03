# Anonymous Complaint Feature Implementation

## Backend Changes
- [x] Modify `backend/models/Complaint.js` to make user field optional
- [x] Update `backend/controllers/complaintController.js` createComplaint function to handle optional user ID

## Frontend Changes
- [x] Add "Send Anonymously" checkbox to `frontend/src/sections/RegisterComplaintPage.jsx`
- [x] Conditionally send user ID only if not anonymous
- [x] Update `frontend/src/components/ComplaintDetails.jsx` to handle anonymous complaints

## Testing
- [ ] Test anonymous complaint submission
- [ ] Verify anonymous complaints don't show user details
- [ ] Ensure regular complaints still work as before
