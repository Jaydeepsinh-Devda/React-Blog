import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);

    this.account = new Account(this.client);
  }

  // Create Account Method
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique,
        email,
        password,
        name,
      });
      if (userAccount) {
        // Add Another Method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (e) {
      console.log(`Appwrite Service :: createAccount :: Error: ${e}`);
    }
  }

  // Login Method
  async login({ email, password }) {
    try {
      await this.account.createEmailPasswordSession({ email, password });
    } catch (e) {
      console.log(`Appwrite Service :: login :: Error: ${e}`);
    }
  }

  // Get User Account Method
  async getCurrentUser() {
    try {
      await this.account.get();
    } catch (e) {
      console.log(`Appwrite Service :: getCurrentUser :: Error: ${e}`);
    }
  }

  // Logout Method
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (e) {
      console.log(`Appwrite Service :: logout :: Error: ${e}`);
    }
  }
}

const authService = new AuthService();

export default authService;
