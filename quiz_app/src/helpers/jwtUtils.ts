import jwt from 'jsonwebtoken';

const secretKey = 'quizportalkey19962024';

export function generateToken(payload: any): string {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, secretKey);
}
