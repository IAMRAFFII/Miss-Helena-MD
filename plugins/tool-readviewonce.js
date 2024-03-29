let handler = async (m, { conn }) => {
    if (!m.quoted) throw 'where\'s message?'
    if (m.quoted.mtype !== 'viewOnceMessage') throw 'Thats not a viewOnce message'
    const msg = await conn.loadMessage(m.quoted.id)
    if (!msg) throw 'can\'t open message!'
    await conn.copyNForward(m.chat, msg, true, { readViewOnce: true })
}

handler.help = ['vv']
handler.tags = ['tools']
handler.command = /^vv/i

export default handler
