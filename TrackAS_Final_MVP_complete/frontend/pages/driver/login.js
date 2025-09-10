import { useState } from 'react';
export default function DriverLogin(){
  const [email,setEmail] = useState('driver1@trackas.local');
  const [password,setPassword] = useState('driver123');
  const api = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';
  async function login(){
    const r = await fetch(api+'/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});
    const j = await r.json();
    if(j.token){ localStorage.setItem('token', j.token); window.location.href='/driver/dashboard'; } else alert('fail');
  }
  return (<div style={{padding:20}}><h2>Driver Login</h2>
    <input value={email} onChange={e=>setEmail(e.target.value)}/><br/>
    <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/><br/>
    <button onClick={login}>Login</button>
  </div>);
}
