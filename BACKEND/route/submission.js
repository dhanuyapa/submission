const express = require('express');
const router = express.Router();
const submissionController = require('../controller/submissionController');

// Add Submission Route
router.post('/add/:registrationNo', submissionController.addSubmission);

// Fetch Submissions by Registration Number Route
router.get('/fetch/:registrationNo', submissionController.fetchSubmissionsByRegistrationNo);
router.get('/fetch', submissionController.fetchSubmissions);


module.exports = router;
