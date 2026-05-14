const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables (useful for AWS RDS later)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simple In-Memory Database for local testing
// This will be replaced by MySQL in production/RDS
let students = [
    { id: 1, name: "John Doe", roll: "CS101", dept: "Computer Science" },
    { id: 2, name: "Jane Smith", roll: "EC102", dept: "Electronics" }
];

// --- API ROUTES ---

// 1. Get all students
app.get('/api/students', (req, res) => {
    console.log("Fetching all students...");
    res.json(students);
});

// 2. Add a new student
app.post('/api/students', (req, res) => {
    const { name, roll, dept } = req.body;
    
    if (!name || !roll || !dept) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        roll,
        dept
    };

    students.push(newStudent);
    console.log(`Added student: ${name}`);
    res.status(201).json(newStudent);
});

// 3. Health Check (Crucial for AWS Load Balancers)
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Serve the main frontend page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`==========================================`);
    console.log(`Student Management System Running!`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`AWS Status: Ready for EC2 Deployment`);
    console.log(`==========================================`);
});
