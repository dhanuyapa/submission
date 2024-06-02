const Submission = require('../models/submission');
const Student = require('../models/student');

exports.addSubmission = async (req, res) => {
    const { qrCodeData } = req.body;
    const { registrationNo } = req.params; 

    try {
        const student = await Student.findOne({ registrationNo });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const newSubmission = new Submission({
            student: student._id,
            qrCodeData,
            scanTime: new Date()
        });

        await newSubmission.save();

        res.status(201).json({ message: 'Submission added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


exports.fetchSubmissionsByRegistrationNo = async (req, res) => {
    try {
        const { registrationNo } = req.params;

        // Find the student by registration number
        const student = await Student.findOne({ registrationNo });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Fetch all submissions for the student
        const submissions = await Submission.find({ student: student._id }).populate('student', 'fname lname accYear registrationNo indexNo phone email');

        res.status(200).json({ submissions });
    } catch (err) {
        console.error('Error fetching submissions:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.fetchSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find().populate('student', 'fname lname accYear registrationNo indexNo phone email');
        res.status(200).json({ submissions });
    } catch (err) {
        console.error('Error fetching submissions:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};