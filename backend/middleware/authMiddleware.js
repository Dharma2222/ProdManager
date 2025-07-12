// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';

export const authMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer'))
      return res.status(401).json({ error: 'No token provided' });

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, email, role } = decoded;
    if (!role) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }
    req.user = { id, email, role };
    next()                
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
