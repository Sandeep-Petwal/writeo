import config from "../config/config.js"
import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId, author, authorEmail }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, // using slug as an id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    author,
                    authorEmail
                }
            );
        } catch (error) {
            console.log("Error ! Appwrite Service :: createPost - ", error);
            return { error: error.message } // return the error message
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Error ! Appwrite Service :: updatePost - ", error);
            return { error: error.message } // return the error message
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
            return true;

        } catch (error) {
            console.log("Error ! Appwrite Service :: deletePost - ", error);
            return false;
        }
    }

    async getPost(slug) {
        console.log("=> inside config :: getPost");
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug

            )
        } catch (error) {
            console.log("Error ! Appwrite Service :: getPost - ", error);
            return false
        }
    }

    async getPosts() {
        console.log("=> inside config :: getPosts");
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal("status", "active")
                ]
            )
        } catch (error) {
            console.log("Error ! Appwrite Service :: getPosts - ", error);
            return false
        }
    }

    // storage service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error ! Appwrite Service :: uploadFile - ", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
        // console.log("Loading file preview.. ");
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();
export default service;