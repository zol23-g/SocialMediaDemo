// --- src/middlewares/auth.ts ---
import jwt from 'jsonwebtoken';
export const getUserId = (req: any): number | null => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.replace('Bearer ', '');
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    return (verified as any).userId;
  }
  return null;
};