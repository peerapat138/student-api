import express from 'express';
import studentsRoutes from './api/students.js';

const app = express();
app.use(express.json());

app.use('/api/students', studentsRoutes);

app.get('/', (req, res) => {
  res.send('Student API is running');
});

export default app;
