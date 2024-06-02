const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    qrCodeData: {
        type: String,
        required: true
    },
    scanTime: {
        type: Date,
        default: () => moment().tz('Asia/Colombo').toDate()
    }
});

module.exports = mongoose.model('Submission', submissionSchema);
