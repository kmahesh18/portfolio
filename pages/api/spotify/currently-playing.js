const CLIENT_ID = '775baf2176a0426d99dc852bf98772d2';
const CLIENT_SECRET = '797a5608ff4c471a8d68ffaa2b6139e2';
const REFRESH_TOKEN = "AQDGy5VMW9TEOqzXrxMfIJ5filIFzV02C-__DJXgd7f8lTPNZ_m9w8ZpDIYZ0UQOSI4NkxB4qSE8ZM7r3RKBac0CwVz2RPzPiHDT0XiC1bUGi2hS6_1RXRj9Bz5Egobmfig";

const getAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });

  return response.json();
};

export default async function handler(req, res) {
  try {
    if (!REFRESH_TOKEN) {
      return res.status(200).json({ 
        connected: false,
        isPlaying: false, 
        error: 'Spotify not connected' 
      });
    }

    const { access_token } = await getAccessToken();

    if (!access_token) {
      return res.status(200).json({ 
        connected: false,
        isPlaying: false, 
        error: 'Failed to get access token' 
      });
    }

    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      // Try to get recently played as fallback
      const recentResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (recentResponse.ok) {
        const recentData = await recentResponse.json();
        if (recentData.items && recentData.items.length > 0) {
          const track = recentData.items[0].track;
          return res.status(200).json({
            connected: true,
            isPlaying: false,
            name: track.name,
            artist: track.artists.map(artist => artist.name).join(', '),
            album: track.album.name,
            image: track.album.images[0]?.url,
            songUrl: track.external_urls.spotify,
          });
        }
      }

      return res.status(200).json({ 
        connected: true,
        isPlaying: false,
        message: 'No track currently playing' 
      });
    }

    const song = await response.json();

    if (!song.item) {
      return res.status(200).json({ 
        connected: true,
        isPlaying: false,
        message: 'No track data available' 
      });
    }

    const data = {
      connected: true,
      isPlaying: song.is_playing,
      name: song.item.name,
      artist: song.item.artists.map(artist => artist.name).join(', '),
      album: song.item.album.name,
      image: song.item.album.images[0]?.url,
      songUrl: song.item.external_urls.spotify,
    };

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching currently playing:', error);
    res.status(500).json({ 
      connected: false,
      isPlaying: false,
      error: 'Failed to fetch currently playing track' 
    });
  }
}
