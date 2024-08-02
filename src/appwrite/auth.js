/* eslint-disable no-unused-vars */
import config from "../config/config.js"
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            // creating the user
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // login the user when account is created or you can show the msg that account is created
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Error ! Appwrite Authservice :: creatAccount ", error);
            return { error: error.message }; // Return the error message

        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            console.log("Error ! Appwrite Authservice :: login ", error);
            return { error: error.message }; // Return the error message
        }
    }

    async logout() {
        try {
            const logout = await this.account.deleteSessions();
            return logout;

        } catch (error) {
            console.log("Error ! Appwrite Authservice :: logout ", error);
        }
    }

    async getCurrentUser() {
        console.log("=> inside auth.js :: getCurrentUser");

        try {
            const user = await this.account.get();
            return user;
        } catch (err) {
            console.log("Error ! Appwrite Authservice :: getCurrentUser ", err);
        }
        return null;
    }

}

const authService = new AuthService();
export default authService;