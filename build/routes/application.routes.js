"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const application_controller_1 = require("../controllers/application.controller");
const router = express_1.default.Router();
router.post('/', application_controller_1.submitApplication);
router.get('/', application_controller_1.listApplications);
router.put('/:id/verify', application_controller_1.verifyApplication);
router.put('/:id/approve', application_controller_1.approveApplication);
exports.default = router;
