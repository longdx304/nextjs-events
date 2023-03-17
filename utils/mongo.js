import { MongoClient } from 'mongodb';

function getCol(client, collectionName) {
  const dbName = 'events';
  const db = client.db(dbName);
  return db.collection(collectionName);
}

export async function connectDatabase() {
  const url =
    'mongodb+srv://longdo:Zxcvdef1@cluster0.hhygpom.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);

  return await client.connect();
}

export async function insertDoc(client, collectionName, data) {
  const dbName = 'events';
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  return await collection.insertOne(data);
}

export async function getAllDocs(client, collectionName, sort, filter = {}) {
  const dbName = 'events';
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  return await collection.find(filter).sort(sort).toArray();
}
