import { 
  getServices, 
  getDoctors, 
  getAllDoctors, 
  bookAppointment, 
  getTheme, 
  getText, 
  getConfig, 
  getDiagnostics, 
  getBranches,
  getSlots
} from '../../../widget/services/api';

export interface IWidgetRepository {
  getServices(): Promise<any[]>;
  getDoctors(serviceName?: string): Promise<any[]>;
  getAllDoctors(): Promise<any[]>;
  getSlots(city: string, doctorId: string, month: string, specialty?: string): Promise<any>;
  bookAppointment(data: any): Promise<any>;
  getTheme(): Promise<any>;
  getText(): Promise<any>;
  getConfig(): Promise<any>;
  getDiagnostics(): Promise<any>;
  getBranches(): Promise<Record<string, any>>;
}

export class APIWidgetRepository implements IWidgetRepository {
  async getServices() { return getServices(); }
  async getDoctors(serviceName?: string) { return getDoctors(serviceName); }
  async getAllDoctors() { return getAllDoctors(); }
  async getSlots(city: string, doctorId: string, month: string, specialty?: string) {
    return getSlots(city, doctorId, month, specialty);
  }
  async bookAppointment(data: any) { return bookAppointment(data); }
  async getTheme() { return getTheme(); }
  async getText() { return getText(); }
  async getConfig() { return getConfig(); }
  async getDiagnostics() { return getDiagnostics(); }
  async getBranches() { return getBranches(); }
}
