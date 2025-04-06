import Application, { IApplication } from '../models/application.model';

export const createApplication = async (data: Partial<IApplication>): Promise<IApplication> => {
  const application = new Application(data);
  return await application.save();
};

export const getAllApplications = async (): Promise<IApplication[]> => {
  return await Application.find();
};

export const findApplicationById = async (id: string): Promise<IApplication | null> => {
  return await Application.findById(id);
};

export const updateApplicationStatus = async (
  id: string,
  status: IApplication['status']
): Promise<IApplication | null> => {
  return await Application.findByIdAndUpdate(id, { status }, { new: true });
};

