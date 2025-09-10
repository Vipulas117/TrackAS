import fs from 'fs';
import path from 'path';
import url from 'url';
import { query } from '../db.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'migrations');

(async ()=>{
  const files = fs.readdirSync(dir).filter(f=>f.endsWith('.sql')).sort();
  for (const f of files) {
    const sql = fs.readFileSync(path.join(dir, f),'utf8');
    console.log('Running migration', f);
    await query(sql);
  }
  console.log('Migrations complete');
  process.exit(0);
})().catch(e=>{ console.error(e); process.exit(1); });
