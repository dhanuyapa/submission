const Student = require("../models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerStudent = async (req, res) => {
    const { fname, lname, accYear, registrationNo, indexNo, phone, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newStudent = new Student({
            fname,
            lname,
            accYear,
            registrationNo,
            indexNo,
            phone,
            email,
            password: hashedPassword,
        });

        await newStudent.save();
        res.json("Student Added");
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await Student.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
        res.status(200).json({ message: `${user.registrationNo} login successfully`, token, registrationNo: user.registrationNo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
