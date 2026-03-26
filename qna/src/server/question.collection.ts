import { databases } from "./config";
import { db, questionCollection } from "@/name";
import { Permission, IndexType } from "node-appwrite";

export default async function createQuestionCollection() {
  await databases.createCollection(
    db,
    questionCollection,
    questionCollection,
    [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]
  );

  console.log("Question Collection is created");

  await Promise.all([
    databases.createStringAttribute(db, questionCollection, "title", 100, true),
    databases.createStringAttribute(db, questionCollection, "content", 1000, true),
    databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
    databases.createStringAttribute(db, questionCollection, "tags", 100, true, undefined, true),
    databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false),
  ]);

  console.log("Question attribute created");

//  Promise.all([
//     await databases.createIndex(
//         db, questionCollection, "title", IndexType.Fulltext, ["title"],
//     ),
//     await databases.createIndex(
//         db, questionCollection, "content", IndexType.Fulltext, ["content"]
//     )
//  ])
}