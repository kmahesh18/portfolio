const CLIENT_ID = '775baf2176a0426d99dc852bf98772d2';
const REDIRECT_URI = process.env.NODE_ENV === 'production' 
  ? 'https://mahesh18.live/api/spotify/callback'
  : 'https://mahesh-zeta.vercel.app/api/spotify/callback';

export default function handler(req, res) {
  const scope = 'user-read-currently-playing user-read-playback-state user-read-recently-played';
  
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
}
