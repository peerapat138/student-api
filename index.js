import express from 'express';
import studentsRoutes from './api/students.js';
import pool from './db.js';

const app = express();
app.use(express.json());

app.use('/api/students', studentsRoutes);

// ✅ สร้างตาราง students ถ้ายังไม่มี (PostgreSQL)
async function init() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(255),
        lastName VARCHAR(255),
        studentId VARCHAR(255),
        birthDate DATE,
        gender VARCHAR(10)
      );
    `);
    console.log('✅ Table "students" is ready.');
  } catch (err) {
    console.error('❌ Error creating table:', err.message);
  }
};

init();

app.get('/', (req, res) => {
  res.send('Student API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
