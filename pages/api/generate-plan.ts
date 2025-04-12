import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ftp, swimPace, runPace, experience, timePerWeek, apiKey } = req.body;

  if (!ftp || !swimPace || !runPace || !apiKey) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    console.log('Generating plan for:', { ftp, swimPace, runPace, experience, timePerWeek });

    // Simulate success
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Plan generation failed' });
  }
}
