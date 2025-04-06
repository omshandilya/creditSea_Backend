"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = exports.loginUser = exports.deleteUser = exports.createUser = void 0;
const user_repository_1 = require("../repositories/user.repository");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, role, password, byAdmin } = req.body;
    // Ensure role is one of the accepted roles
    if (!['admin', 'verifier', 'user'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role specified.' });
    }
    // Restrict admin creation
    if (role === 'admin') {
        const admins = yield (0, user_repository_1.getAdmins)();
        if (admins.length === 0 || byAdmin === true) {
            const user = yield (0, user_repository_1.createUserRepo)({ name, email, password, role });
            return res.status(201).json(user);
        }
        const user = yield (0, user_repository_1.createUserRepo)({ name, email, password, role });
        return res.status(201).json(user);
    }
    // Verifier or User creation
    const user = yield (0, user_repository_1.createUserRepo)({ name, email, password, role });
    return res.status(201).json(user);
});
exports.createUser = createUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { byAdmin } = req.body;
    const user = yield (0, user_repository_1.getUserById)(id);
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    yield (0, user_repository_1.deleteUserById)(id);
    return res.json({ message: 'User deleted' });
});
exports.deleteUser = deleteUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, user_repository_1.getUserByEmail)(email);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    return res.status(200).json({
        userId: user._id,
        role: user.role,
        message: `Login successful as ${user.role}`,
    });
});
exports.loginUser = loginUser;
const listUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_repository_1.getAllUsers)();
    return res.json(users);
});
exports.listUsers = listUsers;
