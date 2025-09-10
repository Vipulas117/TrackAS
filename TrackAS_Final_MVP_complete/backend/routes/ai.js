import express from 'express';
import { handleMessage } from '../services/ai_bot.js';
import { sendWhatsApp, sendSMS } from '../services/notifications.js';
const router = express.Router();
router.post('/message', async (req,res)=>{ const { from, text } = req.body; const reply = await handleMessage(from, text); res.json({ reply }); });
router.post('/twilio-webhook', express.urlencoded({ extended:true }), async (req,res)=>{ const from=req.body.From||req.body.from; const body=req.body.Body||req.body.body||''; const reply=await handleMessage(from,body); try{ await sendWhatsApp(from.replace('whatsapp:','').replace('+',''), reply); }catch(e){ await sendSMS(from.replace('+',''), reply); } res.send('<Response></Response>'); });
export default router;
