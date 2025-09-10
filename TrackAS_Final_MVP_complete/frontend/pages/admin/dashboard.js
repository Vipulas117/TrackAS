import { useEffect, useState } from 'react';
export default function AdminDashboard(){
  const [pending,setPending] = useState({});
  const api = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
  useEffect(()=>{
    const token = localStorage.getItem('token');
    fetch(api+'/api/admin/approvals/pending',{headers:{Authorization:'Bearer '+token}})
      .then(r=>r.json()).then(setPending).catch(console.error);
  },[]);
  return (<div style={{padding:20}}>
    <h2>Admin Dashboard</h2>
    <div style={{display:'flex', gap:10}}>
      <a href="/admin/settings">Commission Settings</a>
      <a href="/admin/payments">Payments</a>
    </div>
    <pre>{JSON.stringify(pending,null,2)}</pre>
  </div>);
}
