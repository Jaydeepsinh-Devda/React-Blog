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
  }

  // Login Method
  async login({ email, password }) {
    await this.account.createEmailPasswordSession({ email, password });
  }

  // Get User Account Method
  async getCurrentUser() {
    await this.account.get();
  }

  // Logout Method
  async logout() {
    await this.account.deleteSessions();
  }
}

const authService = new AuthService();

export default authService;
