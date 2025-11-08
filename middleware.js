const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'default_secret';
function auth(req,res,next){
  const header = req.headers.authorization;
  if(!header) return res.status(401).json({error:'No token'});
  const parts = header.split(' ');
  if(parts.length !==2) return res.status(401).json({error:'Bad token'});
  const token = parts[1];
  jwt.verify(token, SECRET, (err, payload)=>{
    if(err) return res.status(401).json({error:'Invalid token'});
    req.user = payload;
    next();
  });
}
module.exports = { auth, SECRET };
