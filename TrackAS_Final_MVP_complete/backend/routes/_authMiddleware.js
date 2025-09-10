import jwt from 'jsonwebtoken';

export function requireAuth(role=null) {
  return (req,res,next)=>{
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error:'No token' });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
      if (role && decoded.role !== role) return res.status(403).json({ error:'Forbidden' });
      req.user = decoded;
      next();
    } catch(e) {
      return res.status(401).json({ error:'Invalid token' });
    }
  }
}
