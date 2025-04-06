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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationStatus = exports.findApplicationById = exports.getAllApplications = exports.createApplication = void 0;
const application_model_1 = __importDefault(require("../models/application.model"));
const createApplication = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const application = new application_model_1.default(data);
    return yield application.save();
});
exports.createApplication = createApplication;
const getAllApplications = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield application_model_1.default.find();
});
exports.getAllApplications = getAllApplications;
const findApplicationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield application_model_1.default.findById(id);
});
exports.findApplicationById = findApplicationById;
const updateApplicationStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield application_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
});
exports.updateApplicationStatus = updateApplicationStatus;
