import { Client, ID, Storage } from 'appwrite';
import { envConfig } from '../config/env.config';

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client = this.client.setEndpoint(envConfig.appwriteApiUrl).setProject(envConfig.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      const data = await this.storage.createFile(envConfig.appwriteAssetStorageId, ID.unique(), file);
      return data;
    } catch (error) {
      throw Error(error);
    }
  }

  async getFile(fileId) {
    try {
      const data = await this.storage.getFileView(envConfig.appwriteAssetStorageId, fileId);
      return data;
    } catch (error) {
      throw Error(error);
    }
  }

  async deleteFile(fileId) {
    try {
      const data = await this.storage.deleteFile(envConfig.appwriteAssetStorageId, fileId);
      return data;
    } catch (error) {
      throw Error(error);
    }
  }
}

export default new StorageService();
