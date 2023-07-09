import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await res.revalidate('/items');
    return res.json({ revalidated: true });
  } catch (err) {
    console.log(err, 'errgg');
    return res.status(500).send('Error revalidating');
  }
}
