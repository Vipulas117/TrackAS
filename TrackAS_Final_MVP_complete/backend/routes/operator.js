

router.post('/ping', requireAuth('OPERATOR'), async (req,res)=>{
  const { lat, lng, shipment_id } = req.body || {};
  if (typeof lat !== 'number' || typeof lng !== 'number' || !shipment_id){
    return res.status(400).json({ error: 'lat, lng, shipment_id required'});
  }
  const op = await query('SELECT id FROM operators WHERE user_id=$1', [req.user.id]);
  const opId = (op.rows && op.rows[0] && op.rows[0].id) || null;
  if (!opId) return res.status(400).json({ error: 'Operator not found' });
  await query('INSERT INTO pings (shipment_id, operator_id, lat, lng) VALUES ($1,$2,$3,$4)', [shipment_id, opId, lat, lng]);
  res.json({ ok: true });
});

export default router;
