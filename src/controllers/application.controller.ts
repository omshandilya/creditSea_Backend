import { Request, Response } from 'express';
import {
  createApplication,
  getAllApplications,
  findApplicationById,
  updateApplicationStatus,
} from '../repositories/application.repository';

export const submitApplication = async (req: Request, res: Response): Promise<any> => {
  try {
    const {
      fullName,
      loanTenure,
      reason,
      amount,
      employmentStatus,
      employmentAddress,
    } = req.body;

    const application = await createApplication({
      fullName,
      loanTenure,
      reason,
      amount,
      employmentStatus,
      employmentAddress,
    });

    return res.status(201).json(application);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating application', error });
  }
};

export const listApplications = async (_: Request, res: Response): Promise<any> => {
  const applications = await getAllApplications();
  return res.json(applications);
};

export const verifyApplication = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { action, role } = req.body;

  const application = await findApplicationById(id);
  if (!application) return res.status(404).json({ message: 'Application not found' });

  if (role !== 'verifier') {
    return res.status(403).json({ message: 'Only verifiers can verify or reject.' });
  }

  if (action === 'verify') {
    const updated = await updateApplicationStatus(id, 'verified');
    return res.json(updated);
  } else if (action === 'reject') {
    const updated = await updateApplicationStatus(id, 'rejected_by_verifier');
    return res.json(updated);
  } else {
    return res.status(400).json({ message: 'Invalid action provided' });
  }
};

export const approveApplication = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const { action, role } = req.body;

  const application = await findApplicationById(id);
  if (!application) return res.status(404).json({ message: 'Application not found' });

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can approve or reject.' });
  }

  if (application.status !== 'verified') {
    return res.status(400).json({ message: 'Only verified apps can be approved/rejected' });
  }

  if (action === 'approve') {
    const updated = await updateApplicationStatus(id, 'approved');
    return res.json(updated);
  } else if (action === 'reject') {
    const updated = await updateApplicationStatus(id, 'rejected_by_admin');
    return res.json(updated);
  } else {
    return res.status(400).json({ message: 'Invalid action provided' });
  }
};


