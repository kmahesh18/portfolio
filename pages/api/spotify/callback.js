const CLIENT_ID = '775baf2176a0426d99dc852bf98772d2';
const CLIENT_SECRET = '797a5608ff4c471a8d68ffaa2b6139e2';
const REDIRECT_URI = process.env.NODE_ENV === 'production' 
  ? 'https://mahesh18.live/api/spotify/callback'
  : 'https://mahesh-zeta.vercel.app/api/spotify/callback';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error_description });
    }

    // In production, you'd want to store the refresh_token securely
    // For now, we'll return it so you can add it to your environment variables
    res.status(200).json({
      message: 'Success! Add this refresh token to your environment variables:',
      refresh_token: data.refresh_token,
      access_token: data.access_token,
    });

  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).json({ error: 'Failed to exchange authorization code' });
  }
}
