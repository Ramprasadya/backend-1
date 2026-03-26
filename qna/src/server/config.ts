import { Client, Databases } from "node-appwrite";
import { env } from "@/app/env";

const client = new Client();

client
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId)
  .setKey(env.appwrite.apikey);

export const databases = new Databases(client);