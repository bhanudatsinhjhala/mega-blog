import { Account, Client, ID } from 'appwrite';
import { envConfig } from '../config/env.config';
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client = this.client.setEndpoint(envConfig.appwriteApiUrl).setProject(envConfig.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async signup({ email, password, name }) {
    try {
      const data = await this.account.create(ID.unique(), email, password);
      return data;
    } catch (error) {
      throw Error(error);
    }
  }

  async login({ email, password }) {
    try {
      const data = await this.account.createEmailPasswordSession(email, password);
      return data;
    } catch (error) {
      throw Error(error);
    }
  }

  async getCurrentUser() {
    try {
      const data = await this.account.get();
      return data;
    } catch (error) {
      return null;
    }
  }

  async logout() {
    try {
      const data = await this.account.deleteSession('current');
      return data;
    } catch (error) {
      throw Error(error);
    }
  }
}

export const authService = new AuthService();
