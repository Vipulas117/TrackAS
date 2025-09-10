import express from 'express';
import { query } from '../db.js';
import jwt from 'jsonwebtoken';
const router = express.Router();
router.post('/login', async (req,res)=>{
  const { email,password } = req.body;
  const r = await query('SELECT id,role FROM users WHERE email=$1 AND password=$2',[email,password]);
  if (!r.rows.length) return res.status(401).json({ error:'Invalid' });
  const token = jwt.sign({ id:r.rows[0].id, role:r.rows[0].role }, process.env.JWT_SECRET || 'supersecret');
  res.json({ token, role: r.rows[0].role });
});
export default router;
