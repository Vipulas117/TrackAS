import { useState } from 'react';
export default function ShipmentCreate(){
  const api = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
  const [form,setForm] = useState({
    title:'', urgency:'NORMAL',
    pickup:{ address:'Noida Sector 62', lat:28.628, lng:77.364, contact_name:'Suresh', contact_phone:'9811111111', contact_email:'suresh@example.com' },
    drops:[{ address:'Gurgaon Cyber City', lat:28.494, lng:77.088, contact_name:'Ravi', contact_phone:'9822222222', contact_email:'ravi@example.com' }],
    goods_description:'Electronics', weight:1200, length:200, width:150, height:120, volume:3.6, handling_flags:['Fragile'], goods_value:500000,
    shipment_cost:10000, payment_mode:'online'
  });
  async function submit(){
    const token = localStorage.getItem('token');
    const r = await fetch(api+'/api/company/shipments',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify(form)});
    const j = await r.json();
    if (j.id){ alert('Shipment created: '+j.id); window.location.href='/company/dashboard'; } else alert('Failed');
  }
  function addDrop(){ setForm({...form, drops:[...form.drops, { address:'', lat:null, lng:null, contact_name:'', contact_phone:'', contact_email:'' }]}); }
  return (<div style={{padding:20}}>
    <h2>Create Shipment (MVP)</h2>
    <label>Title <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></label><br/>
    <label>Urgency 
      <select value={form.urgency} onChange={e=>setForm({...form, urgency:e.target.value})}>
        <option>NORMAL</option><option>EXPRESS</option>
      </select>
    </label>
    <h3>Pickup</h3>
    <input placeholder="Address" value={form.pickup.address} onChange={e=>setForm({...form,pickup:{...form.pickup,address:e.target.value}})}/><br/>
    <input placeholder="Contact Name" value={form.pickup.contact_name} onChange={e=>setForm({...form,pickup:{...form.pickup,contact_name:e.target.value}})}/><br/>
    <input placeholder="Phone" value={form.pickup.contact_phone} onChange={e=>setForm({...form,pickup:{...form.pickup,contact_phone:e.target.value}})}/><br/>
    <input placeholder="Email" value={form.pickup.contact_email} onChange={e=>setForm({...form,pickup:{...form.pickup,contact_email:e.target.value}})}/><br/>
    <h3>Drop-offs</h3>
    {form.drops.map((d,i)=>(<div key={i} style={{border:'1px solid #ddd',padding:10,marginBottom:10}}>
      <input placeholder="Address" value={d.address} onChange={e=>{const ds=[...form.drops]; ds[i].address=e.target.value; setForm({...form,drops:ds});}}/><br/>
      <input placeholder="Name" value={d.contact_name} onChange={e=>{const ds=[...form.drops]; ds[i].contact_name=e.target.value; setForm({...form,drops:ds});}}/><br/>
      <input placeholder="Phone" value={d.contact_phone} onChange={e=>{const ds=[...form.drops]; ds[i].contact_phone=e.target.value; setForm({...form,drops:ds});}}/><br/>
      <input placeholder="Email" value={d.contact_email} onChange={e=>{const ds=[...form.drops]; ds[i].contact_email=e.target.value; setForm({...form,drops:ds});}}/><br/>
    </div>))}
    <button onClick={addDrop}>+ Add Stop</button>
    <h3>Consignment</h3>
    <input placeholder="Description" value={form.goods_description} onChange={e=>setForm({...form,goods_description:e.target.value})}/><br/>
    <input type="number" placeholder="Weight" value={form.weight} onChange={e=>setForm({...form,weight:Number(e.target.value)})}/><br/>
    <div>Dimensions (cm): 
      <input type="number" placeholder="L" value={form.length} onChange={e=>setForm({...form,length:Number(e.target.value)})}/>
      <input type="number" placeholder="W" value={form.width} onChange={e=>setForm({...form,width:Number(e.target.value)})}/>
      <input type="number" placeholder="H" value={form.height} onChange={e=>setForm({...form,height:Number(e.target.value)})}/>
    </div>
    <input type="number" placeholder="Goods Value" value={form.goods_value} onChange={e=>setForm({...form,goods_value:Number(e.target.value)})}/><br/>
    <h3>Pricing</h3>
    <input type="number" placeholder="Shipment Cost (₹)" value={form.shipment_cost} onChange={e=>setForm({...form,shipment_cost:Number(e.target.value)})}/><br/>
    <label>Payment Mode 
      <select value={form.payment_mode} onChange={e=>setForm({...form,payment_mode:e.target.value})}>
        <option value="online">Online</option>
        <option value="cash">Cash</option>
      </select>
    </label><br/>
    <button onClick={submit}>Create</button>
  </div>);
}
