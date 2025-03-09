const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name:{type: String, required: true},
  last_name:{type: String, required: true},
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['Admin', 'HR', 'Employee', 'Sales Manager', 'Purchase Manager', 'Financial Analyst', 'IT Manager'] },
  employee_id:{type: String},
  status:{type:String},
  createdAt:{type:Date,required:true},
  updatedAt:{type:Date}
});

const User = mongoose.model('User', userSchema);

module.exports = User;