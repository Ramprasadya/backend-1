import {env} from "@/app/env"

import {Client, Storage, Users, Avatars, Databases} from 'node-appwrite'

let client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apikey) // Your secret API key
;
