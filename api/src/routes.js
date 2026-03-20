import { Router } from 'express';
import pool from './db.js';

const router = Router();

// GET todos los jugadores
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM players ORDER BY id');
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET un jugador por id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM players WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST crear jugador
router.post('/', async (req, res) => {
  const { campo1, campo2, campo3, campo4, campo5, campo6 } = req.body;
  if (campo1 === undefined || campo2 === undefined || campo3 === undefined ||
      campo4 === undefined || campo5 === undefined || campo6 === undefined) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO players (campo1, campo2, campo3, campo4, campo5, campo6) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [campo1, campo2, campo3, parseInt(campo4), parseFloat(campo5), campo6]
    );
    res.status(201).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT actualizar jugador completo
router.put('/:id', async (req, res) => {
  const { campo1, campo2, campo3, campo4, campo5, campo6 } = req.body;
  if (campo1 === undefined || campo2 === undefined || campo3 === undefined ||
      campo4 === undefined || campo5 === undefined || campo6 === undefined) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  try {
    const result = await pool.query(
      'UPDATE players SET campo1=$1, campo2=$2, campo3=$3, campo4=$4, campo5=$5, campo6=$6 WHERE id=$7 RETURNING *',
      [campo1, campo2, campo3, parseInt(campo4), parseFloat(campo5), campo6, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PATCH actualizar jugador parcial
router.patch('/:id', async (req, res) => {
  const fields = [];
  const values = [];
  let i = 1;

  if (req.body.campo1 !== undefined) { fields.push(`campo1=$${i++}`); values.push(req.body.campo1); }
  if (req.body.campo2 !== undefined) { fields.push(`campo2=$${i++}`); values.push(req.body.campo2); }
  if (req.body.campo3 !== undefined) { fields.push(`campo3=$${i++}`); values.push(req.body.campo3); }
  if (req.body.campo4 !== undefined) { fields.push(`campo4=$${i++}`); values.push(parseInt(req.body.campo4)); }
  if (req.body.campo5 !== undefined) { fields.push(`campo5=$${i++}`); values.push(parseFloat(req.body.campo5)); }
  if (req.body.campo6 !== undefined) { fields.push(`campo6=$${i++}`); values.push(req.body.campo6); }

  if (fields.length === 0) return res.status(400).json({ error: 'No hay campos para actualizar' });

  values.push(req.params.id);
  try {
    const result = await pool.query(
      `UPDATE players SET ${fields.join(', ')} WHERE id=$${i} RETURNING *`,
      values
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE eliminar jugador
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM players WHERE id=$1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;