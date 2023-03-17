import { connectDatabase, getAllDocs, insertDoc } from '@/utils/mongo';

export default async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;

  try {
    client = await connectDatabase();
    console.log('Connected successfully to server');
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid data' });
      client.close().then(() => console.log('Connection to MongoDB closed'));
      return;
    }

    const comment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      await insertDoc(client, 'comments', comment);
      res.status(201).json({ message: 'comment added', comment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' });
    }
  }

  if (req.method === 'GET') {
    try {
      const comments = await getAllDocs(
        client,
        'comments',
        { _id: -1 },
        { eventId }
      );
      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ message: 'Getting comment failed!' });
    }
  }

  client.close().then(() => console.log('Connection to MongoDB closed'));
}
