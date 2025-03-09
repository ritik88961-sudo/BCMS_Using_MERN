const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Employee = require("../models/employee")
// User registration service
const registerUser = async (userData) => {
    const { username, password, email, first_name,last_name,status,createdAt,role } = userData; // Include paymentID
    // Check if username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) throw new Error('Username or Email already exists');
    
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the provided data
    const user = new User({
        username,
        password: hashedPassword,
        email,
        first_name,
        last_name,
        status,
        createdAt,
        role
    });

    // Save the user to the database
    await user.save();

    return user;
};

// Login service (returns JWT token)
const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('Invalid Username');
  if(user.role.toLowerCase() === "hr" || user.role.toLowerCase() === "admin"){
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid Password');
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {token,role:user.role};  
  }else{
    const emp = await Employee.findOne({username})
    if(!emp) throw new Error('Invalid Username')
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid Password');
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return {token,role:user.role}; 
  }
};


module.exports = { registerUser, loginUser};
