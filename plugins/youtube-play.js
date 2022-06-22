import { youtubeSearch } from '@bochilteam/scraper'
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `Use example ${usedPrefix}${command} Minecraft`
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'Video/Audio Not found'
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
  await conn.sendHydrated(m.chat, `
🌎 *𝑻𝑰𝑻𝑳𝑬:* ${title}
🌍 *𝑼𝑹𝑳:* ${url}
🌞 *𝑫𝑬𝑺𝑪𝑹𝑰𝑷𝑻𝑰𝑶𝑵:* ${description}
⏲️ *𝑃𝑈𝐵𝐿𝐼𝑆𝐻𝐸𝐷:* ${publishedTime}
⌚ *𝐷𝑈𝑅𝐴𝑇𝐼𝑂𝑁:* ${durationH}
👁️ *𝑉𝐼𝐸𝑊𝑆:* ${viewH}
  `.trim(), author, thumbnail, url, 'Go to YouTube', null, null, [
    ['SONG', `${usedPrefix}yta ${url} yes`],
    ['VIDEO', `${usedPrefix}ytv ${url} yes`],
    ['Youtube Search🔎', `${usedPrefix}yts ${url}`]
  ], m)
}
handler.help = ['play', 'play2'].map(v => v + '')
handler.tags = ['downloader']
handler.command = /^play2?$/i

handler.exp = 0
handler.limit = false

export default handler

