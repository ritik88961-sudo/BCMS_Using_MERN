const express = require('express');
const { registerUser, loginUser } = require('../services/userService');
const router = express.Router();
const User = require("../models/user")
// Registration route
router.post('/register', async (req, res) => {
    try{
        const response = await registerUser(req.body)
        res.status(201).json(response)
    }catch(err){
        res.status(400).json({error:err.message});
    }
  });


// User Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Call loginUser function to validate credentials and get token
    const result = await loginUser(username, password);

    // Send success response with token and role
    res.status(200).json({ message: 'Login successful', token: result.token, role: result.role, username:username });

  } catch (error) {
    console.log('Error during login:', error.message); // Log the actual error

    // Handle specific error types
    if (error.message === 'Invalid Username') {
      res.status(400).json({ message: 'Invalid username' });
    } else if (error.message === 'Invalid Password') {
      res.status(400).json({ message: 'Invalid password' });
    } 
    else {
      // Handle other unexpected errors
      res.status(500).json({ message: 'Something went wrong', error: error.message }); // Send the error message
    }
  }
});
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
