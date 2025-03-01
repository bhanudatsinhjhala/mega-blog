import { Client, Databases, ID } from 'appwrite';
import { envConfig } from '../config/env.config';

export class PostService {
  client = new Client();
  database;
  constructor() {
    this.client = this.client.setEndpoint(envConfig.appwriteApiUrl).setProject(envConfig.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async createPost(post) {
    try {
      const userData = localStorage.getItem('userData');
      const data = await this.database.createDocument(
        envConfig.appwriteDatabaseId,
        envConfig.appwriteCollectionId,
        ID.unique(),
        {
          title: post.title,
          content: post.content,
          featuredImage: post.featuredImage,
          status: false,
          userId: JSON.parse(userData).$id,
        }
      );
      return data;
    } catch (error) {
      throw Error(error);
    }
  }

  async updatePost(id, { title, content, featureImage, status }) {
    try {
      const data = await this.database.updateDocument(
        envConfig.appwriteDatabaseId,
        envConfig.appwriteCollectionId,
        id,
        {
          title,
          content,
          featureImage,
          status,
        }
      );
      return data;
    } catch (error) {
      throw Error(error);
    }
  }

  async getPostById(id) {
    try {
      const data = await this.database.getDocument(envConfig.appwriteDatabaseId, envConfig.appwriteCollectionId, id);
      return data;
    } catch (error) {
      return false;
    }
  }

  async getPosts(query) {
    try {
      return this.database.listDocuments(envConfig.appwriteDatabaseId, envConfig.appwriteCollectionId, query);
    } catch (error) {
      return false;
    }
  }

  async deletePostById(id) {
    try {
      await this.database.deleteDocument(envConfig.appwriteDatabaseId, envConfig.appwriteCollectionId, id);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new PostService();
