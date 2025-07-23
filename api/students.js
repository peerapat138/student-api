import express from 'express';
import { openDb } from '../db.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  const db = await openDb();
  const { firstName, lastName, studentId, birthDate, gender } = req.body;
  await db.run('INSERT INTO students (firstName, lastName, studentId, birthDate, gender) VALUES (?, ?, ?, ?, ?)', 
    [firstName, lastName, studentId, birthDate, gender]);
  res.status(201).json({ message: 'Student created' });
});

// READ all
router.get('/', async (req, res) => {
  const db = await openDb();
  const students = await db.all('SELECT * FROM students');
  res.json(students);
});

// READ one
router.get('/:id', async (req, res) => {
  const db = await openDb();
  const student = await db.get('SELECT * FROM students WHERE id = ?', [req.params.id]);
  res.json(student);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const db = await openDb();
  const { firstName, lastName, studentId, birthDate, gender } = req.body;
  await db.run(
    'UPDATE students SET firstName = ?, lastName = ?, studentId = ?, birthDate = ?, gender = ? WHERE id = ?',
    [firstName, lastName, studentId, birthDate, gender, req.params.id]
  );
  res.json({ message: 'Student updated' });
});

// DELETE
router.delete('/:id', async (req, res) => {
  const db = await openDb();
  await db.run('DELETE FROM students WHERE id = ?', [req.params.id]);
  res.json({ message: 'Student deleted' });
});

export default router;
