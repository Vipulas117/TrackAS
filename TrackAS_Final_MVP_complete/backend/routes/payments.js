import express from 'express';
import { query } from '../db.js';
const router = express.Router();
router.post('/create', async (req,res)=>{ const { shipment_id, amount } = req.body; const pid='pay_'+Math.random().toString(36).slice(2,8); await query('INSERT INTO payments(id,shipment_id,amount,status) VALUES($1,$2,$3,$4)',[pid,shipment_id,amount,'CREATED']); res.json({ ok:true, payment_id:pid }); });
router.post('/webhook', async (req,res)=>{ console.log('webhook',req.body); res.json({ ok:true }); });
export default router;
