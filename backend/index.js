const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
};

// Connect to MongoDB
mongoose.connect(mongodb+srv://ezmill16:osa4QlPEm7t22e5z@musicguesser.id1dc.mongodb.net/?retryWrites=true&w=majority&appName=musicguesser
).then(() => {
    console.log('connected to the database');
}).catch((e) => {
    console.log('database not connected', e);
});

// Define User model
const { Schema } = mongoose;
const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});
const User = mongoose.model('User', userSchema);

const scoreSchema = new Schema({
    userId: String,
    score: Number
});

const Score = mongoose.model('Score', scoreSchema);

// Define controller functions
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: "No user found"
            });
        }

        // check if password matches
        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                    throw err;
                }
                res.cookie('token', token, { httpOnly: true }).json(user);
            });
        } else {
            return res.status(400).json({
                error: "Passwords don't match"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const test = (req, res) => {
    res.json('test is working');
};

const getScore = async (req, res) => {
    const userId = req.body.userId;

    try {
        const existingScore = await Score.findOne({ userId: userId });
        if (existingScore) {
            return res.json({ score: existingScore.score });
        } else {
            return res.json({ score: "you haven't played yet! get some reps in!" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const postScore = async (req, res) => {
    const userId = req.body.userId;
    const score = req.body.score;

    if (!userId) {
        return res.status(400).json({ error: 'No user ID provided' });
    }

    try {
        const existingUserScore = await Score.findOne({ userId: userId });
        if (existingUserScore) {
            if (existingUserScore.score < score) {
                await Score.findOneAndUpdate({ userId: userId }, { score: score });
                console.log('Score updated');
                return res.json({ message: 'Score updated successfully' });
            } else {
                console.log('Score not updated as it is lower or the same');
                return res.json({ message: 'Score not updated as it is lower or the same' });
            }
        } else {
            const newScore = new Score({ userId: userId, score: score });
            await newScore.save();
            console.log('New score saved');
            res.json({ message: 'New score saved successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name) {
        return res.status(400).json({ error: "You need a name" });
    }
    if (!email) {
        return res.status(400).json({ error: "You need an email" });
    }
    if (!password) {
        return res.status(400).json({ error: "You need a password" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already in use" });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) {
                throw err;
            }
            res.json(user);
        });
    } else {
        res.json(null);
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
    res.status(200).json({ message: 'Logged out successfully' });
};

// Initialize Express app
const app = express();
app.use(express.json());

// CORS configuration
app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Define routes
app.get('/', test);
app.post('/register', registerUser);
app.post('/scorepost', postScore);
app.post('/login', loginUser);
app.get('/profile', getProfile);
app.post('/logout', logoutUser);
app.post('/getscore', getScore); // Use POST for getScore

const port = 8000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
