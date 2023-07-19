//BSD 3-Clause License 
//Copyright (c) 2023, Yash-Sharma-1807


const {bot,LOGGER} = require("../index")
const {get_total_users,get_total_chat} = require("./database/index")
const { Owner } = require("../config")


bot.command("stats" , async (ctx) => {
    const users = await get_total_users()
    const chats = await get_total_chat()
    try {
        if (ctx.message.from.id === Owner){
        await ctx.replyWithPhoto(
            "https://graph.org//file/1e2e321668b57ba61d954.jpg",
            {caption : `Sung Jin Woo System Stats\n\nTotal Users : <code>${users}</code>\nTotal Chats : <code>${chats}</code>`,
            parse_mode : "HTML",
            reply_to_message_id : ctx.message.message_id}
        )} else {
            ctx.reply("This is a owner only command",{reply_to_message_id : ctx.message.message_id})
        }
    } catch (eor) {
        await LOGGER(eor)
    }
})