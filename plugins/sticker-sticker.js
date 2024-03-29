import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime)) if ((q.msg || q).seconds > 11) return m.reply('10 seconds max!')
      let img = await q.download()
      if (!img) throw `reply image/video/sticker with command${usedPrefix + command}`
      let out
      try {
        if (/webp/g.test(mime)) out = img
        else if (/image/g.test(mime)) out = img
        else if (/video/g.test(mime)) out = img
        if (typeof out !== 'string') out = img
        stiker = await sticker(out, '', global.packname, global.author)
      } catch (e) {
        console.error(e)
      } finally {
        if (!stiker) stiker = await sticker(img, false, global.packname, global.author)
      }
    } else if (args[0]) {
      if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author)
      else return m.reply('URL not valid!')
    }
  } catch (e) {
    console.error(e)
    if (!stiker) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    else throw 'Conversion failed'
  }
}
handler.help = ['sticker', 'stiker', 'stikergif', 'stikergif']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i

export default handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
