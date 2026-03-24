
import { databases } from '@/client/config'
import { db, questionCollection } from '@/name'
import { Permission } from 'appwrite'
import  {} from 'node-appwrite'

export default async function createQuestionCollection(){
    await databases.createCollection(db, questionCollection, questionCollection, [
        Permission.read("any"),
        Permission.read("user"),
          Permission.create("user"),
            Permission.update("user"),
              Permission.delete("user"),
        
    ])

    console.log("Question Collection is created ")

    await Promise.all([
        databases.createAttribute(db, questionCollection, "title", 100, true),
        databases.createAttribute(db, questionCollection, "content", 1000, true),
        databases.createAttribute(db, questionCollection, "authorId", 50, true),
        databases.createAttribute(db, questionCollection, "tags", 100, true, undefined, true),
        databases.createAttribute(db, questionCollection, "attachmentId", 50, false),
        
        
    ])

    console.log("Question attribute created ")

    // create indexes

    await Promise.all([
        databases?.createIndex(db, questionCollection, "title", IndexType.Fulltext)
    ])
}