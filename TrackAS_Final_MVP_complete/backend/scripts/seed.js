import { query } from '../db.js';
(async ()=>{
  try {
    await query("INSERT INTO users(id,email,password,role) VALUES('00000000-0000-0000-0000-000000000001','admin@trackas.local','admin123','ADMIN') ON CONFLICT DO NOTHING");
    await query("INSERT INTO users(id,email,password,role) VALUES('00000000-0000-0000-0000-000000000002','company1@trackas.local','company123','COMPANY') ON CONFLICT DO NOTHING");
    await query("INSERT INTO companies(user_id,name,email,address,status) VALUES ('00000000-0000-0000-0000-000000000002','FastMove Logistics','company1@trackas.local','Delhi Warehouse','APPROVED') ON CONFLICT DO NOTHING");
    await query("INSERT INTO users(id,email,password,role) VALUES('00000000-0000-0000-0000-000000000003','driver1@trackas.local','driver123','OPERATOR') ON CONFLICT DO NOTHING");
    await query("INSERT INTO operators(user_id,name,license_no,online,status,mobile) VALUES ('00000000-0000-0000-0000-000000000003','Arjun Kumar','DL-XXXX-1234',false,'APPROVED','9899999999') ON CONFLICT DO NOTHING");
    await query("INSERT INTO vehicles(id,company_id,type,reg_no,capacity_weight,capacity_volume,status,vcode) SELECT gen_random_uuid(), id, 'Truck', 'DL01AB1234', 5000, 20, 'APPROVED', 'VCODE-TRK123' FROM companies WHERE email='company1@trackas.local' LIMIT 1");
    const sres = await query("INSERT INTO shipments(company_id,pickup,destination,length,width,height,weight,instructions,customer_name,customer_phone,customer_email,cost,commission_amount,status) SELECT id,'Delhi Warehouse','Mumbai Store',2,1,1,300,'Fragile','Rahul Mehta','98xxxxxx','rahul@gmail.com',5000,250,'CREATED' FROM companies WHERE email='company1@trackas.local' RETURNING id");
    await query("INSERT INTO app_settings(key,value) VALUES('commission_pct','5') ON CONFLICT (key) DO NOTHING");
    await query("INSERT INTO payouts(shipment_id,operator_id,amount,status) SELECT id, (SELECT id FROM operators LIMIT 1), cost, 'PENDING' FROM shipments LIMIT 1");
    console.log('Seed done', sres.rows[0]);
    process.exit(0);
  } catch(e){ console.error(e); process.exit(1); }
})();
