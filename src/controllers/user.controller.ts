import { Request, Response } from 'express';
import {
  createUserRepo,
  deleteUserById,
  getAllUsers,
  getAdmins,
  getUserByEmail,
  getUserById
} from '../repositories/user.repository';

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { name, email, role, password, byAdmin } = req.body;

  // Ensure role is one of the accepted roles
  if (!['admin', 'verifier', 'user'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified.' });
  }

  // Restrict admin creation
  if (role === 'admin') {
    const admins = await getAdmins();
    if (admins.length === 0 || byAdmin === true) {
      const user = await createUserRepo({ name, email, password, role });
      return res.status(201).json(user);
    }
    const user = await createUserRepo({ name, email, password, role });
    return res.status(201).json(user);
  }

  // Verifier or User creation
  const user = await createUserRepo({ name, email, password, role });
  return res.status(201).json(user);
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { byAdmin } = req.body;

  const user = await getUserById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await deleteUserById(id);
  return res.json({ message: 'User deleted' });
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.status(200).json({
    userId: user._id,
    role: user.role,
    message: `Login successful as ${user.role}`,
  });
};

export const listUsers = async (_: Request, res: Response): Promise<any> => {
  const users = await getAllUsers();
  return res.json(users);
};
