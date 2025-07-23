import express from 'express';
import studentsRoutes from './api/students.js';
import { openDb } from './db.js';

const app = express();
app.use(express.json());

app.use('/api/students', studentsRoutes);

// สร้างตารางถ้ายังไม่มี
const init = async () => {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      studentId TEXT,
      birthDate TEXT,
      gender TEXT
    )
  `);
};

init();

app.get('/', (req, res) => {
  res.send('Student API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
