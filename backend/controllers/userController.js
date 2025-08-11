// -------------------- controllers/userController.js --------------------
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ message: 'Email already exists' });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

exports.getUserFiles = async (req, res) => {
  res.json({ files: req.user.files });
};

exports.uploadFile = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  req.user.files.push(`/uploads/${req.file.filename}`);
  await req.user.save();
  res.json({ message: 'File uploaded' });
};

exports.deleteFile = async (req, res) => {
  const { filename } = req.params;
  const filePath = `/uploads/${filename}`;
  try {
    // Remove from user's files array
    req.user.files = req.user.files.filter(file => file !== filePath);
    await req.user.save();

    // Remove file from server
    fs.unlink(path.join(__dirname, '..', filePath), (err) => {
      if (err) console.error('File deletion failed:', err.message);
    });

    res.json({ message: 'File deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete error' });
  }
};
