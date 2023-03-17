import { connectDatabase, insertDoc } from '@/utils/mongo';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
      console.log('Connected successfully to server');
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDoc(client, 'newsletter', { email });
      res.status(201).json({ message: 'Signed up!' });
    } catch (error) {
      res.status(500).json({ message: 'Inserting email failed!' });
    }

    client.close().then(() => console.log('Connection to MongoDB closed'));
  }
}
