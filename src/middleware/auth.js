import jwt from 'jsonwebtoken';
export function auth(req,res,next){
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if(!token) return res.status(401).json({message:'No token'});
  try{
    const u = jwt.verify(token, process.env.JWT_SECRET);
    req.user = u;
    next();
  }catch(e){ res.status(401).json({message:'Invalid token'}); }
}
export const role = roles => (req,res,next)=>{
  if(!roles.includes(req.user?.role)) return res.status(403).json({message:'Forbidden'});
  next();
};
