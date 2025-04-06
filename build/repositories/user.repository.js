"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.deleteUserById = exports.getAdmins = exports.getAllUsers = exports.getUserByEmail = exports.createUserRepo = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const createUserRepo = (data) => {
    const user = new user_model_1.default(data);
    return user.save();
};
exports.createUserRepo = createUserRepo;
const getUserByEmail = (email) => {
    return user_model_1.default.findOne({ email });
};
exports.getUserByEmail = getUserByEmail;
const getAllUsers = () => {
    return user_model_1.default.find();
};
exports.getAllUsers = getAllUsers;
const getAdmins = () => {
    return user_model_1.default.find({ role: 'admin' });
};
exports.getAdmins = getAdmins;
const deleteUserById = (id) => {
    return user_model_1.default.findByIdAndDelete(id);
};
exports.deleteUserById = deleteUserById;
const getUserById = (id) => {
    return user_model_1.default.findById(id);
};
exports.getUserById = getUserById;
