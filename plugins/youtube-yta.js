let limit = 80
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
let handler = async (m, { conn, args, isPrems, isOwner }) => {
    if (!args || !args[0]) throw '𝑾𝑯𝑬𝑹𝑬 𝑰𝑺 𝑻𝑯𝑬 𝑳𝑰𝑵𝑲 𝑴𝑨𝑵?'
let { thumbnail, audio, title } = await youtubedl(args[0])
    .catch(async () => await youtubedlv2(args[0]))
let link = await audio['128kbps'].download()
const isY = /y(es)/gi.test(args[1])
const limitedSize = (isPrems || isOwner ? 99 : 70) * 1024
let isLimit = limitedSize < audio['128kbps'].fileSize
if (!isY) await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', `
*🔮𝑻𝑰𝑻𝑳𝑬:* ${title}
*🔮𝑭𝑰𝑳𝑬𝑺𝑰𝒁𝑬 :* ${audio['128kbps'].fileSizeH}
*${isLimit ? 'Use ' : ''}Link:* ${link}
`.trim(), m)
if (!isLimit) await conn.sendFile(m.chat, link, title + '.mp3', `
*🔮𝑻𝑰𝑻𝑳𝑬:* ${title}
*🔮𝑭𝑰𝑳𝑬𝑺𝑰𝒁𝑬:* ${audio['128kbps'].fileSizeH}
`.trim(), m, null, {
asDocument: 1
})
}
handler.help = ['song', 'yta'].map(v => 'yt' + v + ` <ur`)
handler.tags = ['downloader']
handler.command = /^yt(a|song)$/i
handler.limit = 1

handler.exp = 0

export default handler

