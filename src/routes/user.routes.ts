import express from 'express';
import { createUser, deleteUser, listUsers, loginUser } from '../controllers/user.controller';

const router = express.Router();

router.post('/', createUser);       
router.delete('/:id', deleteUser);  
router.get('/', listUsers);
router.post('/login', loginUser);

export default router;
