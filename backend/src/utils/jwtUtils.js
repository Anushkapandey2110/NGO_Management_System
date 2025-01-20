import jwt from 'jsonwebtoken';

const secret = 'mysecretkey';

export const generateToken = (user) => {
  return jwt.sign({ id: user.user_id, email: user.email, role: user.role }, secret, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
