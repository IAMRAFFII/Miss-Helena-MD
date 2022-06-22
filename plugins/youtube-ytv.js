import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) throw '𝑾𝑯𝑬𝑹𝑬 𝑰𝑺 𝑻𝑯𝑬 𝑳𝑰𝑵𝑲 𝑴𝑨𝑵?'
  let { thumbnail, video, title } = await youtubedl(args[0])
      .catch(async () => await youtubedlv2(args[0]))
  let link = await video['360p'].download()
  const isY = /y(es)/gi.test(args[1])
  const limitedSize = (isPrems || isOwner ? 99 : 70) * 1024
  let isLimit = limitedSize < video['360p'].fileSize
  if (!isY) await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
*🔮𝙏𝙄𝙏𝙇𝙀:* ${title}
*🔮𝙁𝙄𝙇𝙀𝙎𝙄𝙕𝙀:* ${video['360p'].fileSizeH}
*${isLimit ? 'Uasge ' : ''}Link:* ${link}
`.trim(), m)
if (!isLimit) await conn.sendFile(m.chat, link, title + '.mp3', `
*🔮𝙏𝙄𝙏𝙇𝙀:* ${title}
*🔮𝙁𝙄𝙇𝙀𝙎𝙄𝙕𝙀:* ${video['360p'].fileSizeH}
`.trim(), m, null, {
  asDocument: 0
})
}
handler.help = ['video', 'v'].map(v => 'yt' + v + ``)
handler.tags = ['downloader']
handler.command = /^yt(v|video)?$/i
handler.limit = 1
handler.exp = 0


export default handler

