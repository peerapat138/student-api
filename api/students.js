import express from 'express';
import pool from '../db.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, studentId, birthDate, gender } = req.body;
    const result = await pool.query(
      'INSERT INTO students (firstName, lastName, studentId, birthDate, gender) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [firstName, lastName, studentId, birthDate, gender]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ one
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Student not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, studentId, birthDate, gender } = req.body;
    await pool.query(
      'UPDATE students SET firstName=$1, lastName=$2, studentId=$3, birthDate=$4, gender=$5 WHERE id=$6',
      [firstName, lastName, studentId, birthDate, gender, req.params.id]
    );
    res.json({ message: 'Student updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM students WHERE id=$1', [req.params.id]);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
