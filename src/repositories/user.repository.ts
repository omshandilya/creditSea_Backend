import User, { IUser } from '../models/user.model';

export const createUserRepo = (data: Partial<IUser>) => {
  const user = new User(data);
  return user.save();
};

export const getUserByEmail = (email: string) => {
  return User.findOne({ email });
};

export const getAllUsers = () => {
  return User.find();
};

export const getAdmins = () => {
  return User.find({ role: 'admin' });
};

export const deleteUserById = (id: string) => {
  return User.findByIdAndDelete(id);
};

export const getUserById = (id: string) => {
  return User.findById(id);
};
