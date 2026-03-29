import config from "../config/config";
import { Client, TablesDB, Query } from "appwrite";

export class PostService {
  client = new Client();
  tableDB;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);

    this.tableDB = new TablesDB(this.client);
  }

  // Create Post Method
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tableDB.createRow({
        databaseId: config.appWriteDatabaseId,
        tableId: config.appWriteCollectionId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (e) {
      console.log(`Appwrite Service :: createPost :: Error: ${e}`);
    }
  }

  // Update Post Method
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tableDB.updateRow({
        databaseId: config.appWriteDatabaseId,
        tableId: config.appWriteCollectionId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });
    } catch (e) {
      console.log(`Appwrite Service :: updatePost :: Error: ${e}`);
    }
  }

  // Delete Post Method
  async deletePost(slug) {
    try {
      await this.tableDB.deleteRow({
        databaseId: config.appWriteDatabaseId,
        tableId: config.appWriteCollectionId,
        rowId: slug,
      });
      return true;
    } catch (e) {
      console.log(`Appwrite Service :: deletePost :: Error: ${e}`);
      return false;
    }
  }

  // Get Post Method
  async getPost(slug) {
    try {
      return await this.tableDB.getRow({
        databaseId: config.appWriteDatabaseId,
        tableId: config.appWriteCollectionId,
        rowId: slug,
      });
    } catch (e) {
      console.log(`Appwrite Service :: getPost :: Error: ${e}`);
      return false;
    }
  }

  // Get All Posts whose status is active Method
  async getPosts({ queries = [Query.equal("status", "active")] }) {
    try {
      return await this.tableDB.listRows({
        databaseId: config.appWriteDatabaseId,
        tableId: config.appWriteCollectionId,
        queries: queries,
      });
    } catch (e) {
      console.log(`Appwrite Service :: getPosts :: Error: ${e}`);
      return false;
    }
  }
}

const postService = new PostService();

export default postService;
