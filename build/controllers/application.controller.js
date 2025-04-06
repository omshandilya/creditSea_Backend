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
exports.approveApplication = exports.verifyApplication = exports.listApplications = exports.submitApplication = void 0;
const application_repository_1 = require("../repositories/application.repository");
const submitApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, loanTenure, reason, amount, employmentStatus, employmentAddress, } = req.body;
        const application = yield (0, application_repository_1.createApplication)({
            fullName,
            loanTenure,
            reason,
            amount,
            employmentStatus,
            employmentAddress,
        });
        return res.status(201).json(application);
    }
    catch (error) {
        return res.status(500).json({ message: 'Error creating application', error });
    }
});
exports.submitApplication = submitApplication;
const listApplications = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const applications = yield (0, application_repository_1.getAllApplications)();
    return res.json(applications);
});
exports.listApplications = listApplications;
const verifyApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { action, role } = req.body;
    const application = yield (0, application_repository_1.findApplicationById)(id);
    if (!application)
        return res.status(404).json({ message: 'Application not found' });
    if (role !== 'verifier') {
        return res.status(403).json({ message: 'Only verifiers can verify or reject.' });
    }
    if (action === 'verify') {
        const updated = yield (0, application_repository_1.updateApplicationStatus)(id, 'verified');
        return res.json(updated);
    }
    else if (action === 'reject') {
        const updated = yield (0, application_repository_1.updateApplicationStatus)(id, 'rejected_by_verifier');
        return res.json(updated);
    }
    else {
        return res.status(400).json({ message: 'Invalid action provided' });
    }
});
exports.verifyApplication = verifyApplication;
const approveApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { action, role } = req.body;
    const application = yield (0, application_repository_1.findApplicationById)(id);
    if (!application)
        return res.status(404).json({ message: 'Application not found' });
    if (role !== 'admin') {
        return res.status(403).json({ message: 'Only admins can approve or reject.' });
    }
    if (application.status !== 'verified') {
        return res.status(400).json({ message: 'Only verified apps can be approved/rejected' });
    }
    if (action === 'approve') {
        const updated = yield (0, application_repository_1.updateApplicationStatus)(id, 'approved');
        return res.json(updated);
    }
    else if (action === 'reject') {
        const updated = yield (0, application_repository_1.updateApplicationStatus)(id, 'rejected_by_admin');
        return res.json(updated);
    }
    else {
        return res.status(400).json({ message: 'Invalid action provided' });
    }
});
exports.approveApplication = approveApplication;
