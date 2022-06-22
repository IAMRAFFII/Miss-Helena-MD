
let fetch = require('node-fetch')
let handler = async(m, { conn, text }) => {
  if (!text) throw `Enter the music title!`
  let res = await fetch(global.API('zeks', '/api/spotify', { q: text }, 'apikey'))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  if(!json.data[0]) throw json
  let { title, artists, album, thumb, url, preview_mp3 } = json.data[0]
let spotifyinfo = `✨️ *𝑻𝒊𝒕𝒍𝒆:* ${title}
🗣️ *𝑨𝒓𝒕𝒊𝒔𝒕𝒔:* ${artists}
🎆️ *𝑨𝒍𝒃𝒖𝒎:* ${album}
🌐️ *𝑼𝑹𝑳*: ${url}
💚️ *𝑫𝒊𝒓𝒆𝒄𝒕 𝒖𝒓𝒍:* ${preview_mp3}\n\n@Sibssssss`

  await conn.sendFile(m.chat, thumb, '', spotifyinfo, m)
  await conn.sendFile(m.chat, preview_mp3, 'spotify.mp3', spotifyinfo, m)
}
handler.help = ['spotify <query>']
handler.tags = ['internet']
handler.command = /^(spotify|music)$/i
module.exports = handler
