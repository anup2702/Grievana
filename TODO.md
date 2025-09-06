# TODO: Fix Anonymous Complaint User Details Display

## Tasks
- [x] Update frontend RegisterComplaintPage.jsx to send "sendAnonymously" flag in the request
- [x] Update backend createComplaint to check "sendAnonymously" flag and skip assigning user if true
- [x] Ensure getAllComplaints and getComplaintById handle anonymous complaints correctly
- [ ] Test anonymous complaint submission and verify user details are hidden

## Status
- Current: All code changes implemented
- Next: Test the functionality
