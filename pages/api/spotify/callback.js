const CLIENT_ID = '775baf2176a0426d99dc852bf98772d2';
const CLIENT_SECRET = '797a5608ff4c471a8d68ffaa2b6139e2';
const REDIRECT_URI = process.env.NODE_ENV === 'production' 
  ? 'https://mahesh18.live/api/spotify/callback'
  : 'https://mahesh-zeta.vercel.app/api/spotify/callback';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    const homeUrl = process.env.NODE_ENV === 'production' 
      ? 'https://mahesh18.live/?spotify_error=no_code'
      : 'https://mahesh-zeta.vercel.app/?spotify_error=no_code';
    return res.redirect(homeUrl);
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
      const homeUrl = process.env.NODE_ENV === 'production' 
        ? 'https://mahesh18.live/?spotify_error=auth_failed'
        : 'https://mahesh-zeta.vercel.app/?spotify_error=auth_failed';
      return res.redirect(homeUrl);
    }

    // If you're in development and need to see the refresh token, show it
    if (process.env.NODE_ENV !== 'production') {
      return res.status(200).json({
        message: 'Success! Add this refresh token to your environment variables:',
        refresh_token: data.refresh_token,
        access_token: data.access_token,
        note: 'In production, this will redirect to your homepage with success indicator'
      });
    }

    // In production, redirect to homepage with success indicator
    const homeUrl = process.env.NODE_ENV === 'production' 
      ? 'https://mahesh18.live/?spotify_connected=true'
      : 'https://mahesh-zeta.vercel.app/?spotify_connected=true';
    
    res.redirect(homeUrl);

  } catch (error) {
    console.error('Error exchanging code for token:', error);
    const homeUrl = process.env.NODE_ENV === 'production' 
      ? 'https://mahesh18.live/?spotify_error=server_error'
      : 'https://mahesh-zeta.vercel.app/?spotify_error=server_error';
    return res.redirect(homeUrl);
  }
}
