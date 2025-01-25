const User = require("../models/usermodel")

const CreateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = await new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });

    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
}

module.exports = {
    CreateUser
}