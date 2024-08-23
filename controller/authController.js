const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth = require('../modal/authModal');


exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const existingUser = await Auth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already in use'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Auth({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            token
        });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
