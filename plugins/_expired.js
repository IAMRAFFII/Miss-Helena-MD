export async function all(m) {
    if (!m.isGroup)
        return
    let chats = global.db.data.chats[m.chat]
    if (!chats.expired)
        return !0
    if (+new Date() > chats.expired) {
        await this.reply(m.chat, '𝑩𝒀𝑬 𝑰 𝑨𝑴 𝑮𝑶𝑰𝑵𝑮!!')
        await this.groupLeave(m.chat)
        chats.expired = null
    }
}
