import config from "../config/config";
import { ID, Client, Storage } from "appwrite";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);

    this.storage = new Storage(this.client);
  }

  // Create File Method
  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: config.appWriteBucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (e) {
      console.log(`Appwrite Service :: uploadFile :: Error: ${e}`);
      return false;
    }
  }

  // Delete File Method
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: config.appWriteBucketId,
        fileId: fileId,
      });
      return true;
    } catch (e) {
      console.log(`Appwrite Service :: deleteFile :: Error: ${e}`);
      return false;
    }
  }

  // Get File Preview Method
  getFilePreview(fileId) {
    return this.storage.getFilePreview({
      bucketId: config.appWriteBucketId,
      fileId: fileId,
    });
  }
}

const storageService = new StorageService();

export default storageService;
