import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Enquiry } from './models/Enquiry';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment variables.');
  process.exit(1);
}
console.log('Connecting to MongoDB...');
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error", err));

// API Enquiry Route
app.post('/api/enquiry', async (req, res) => {
  try {
    const { studentName, parentEmail, parentPhone } = req.body;

    // Create a new Enquiry document (this will automatically run Mongoose validations)
    const newEnquiry = new Enquiry({
      studentName,
      parentEmail,
      parentPhone
    });
    

    // Save to database
    const savedEnquiry = await newEnquiry.save();

    return res.status(201).json({
      success: true,
      message: 'Enquiry registered successfully!',
      data: {
        id: savedEnquiry._id,
        studentName: savedEnquiry.studentName,
        parentEmail: savedEnquiry.parentEmail,
        parentPhone: savedEnquiry.parentPhone,
        createdAt: savedEnquiry.createdAt
      }
    });

  } catch (error: any) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errorMap: Record<string, string> = {};
      
      Object.keys(error.errors).forEach((key) => {
        errorMap[key] = error.errors[key].message;
      });

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMap
      });
    }

    // General internal errors
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred.'
    });
  }
});

// Simple root status check
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'offline',
    timestamp: new Date()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Express server is listening on port ${PORT}`);
});
