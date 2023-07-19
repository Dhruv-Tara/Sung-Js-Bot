//BSD 3-Clause License 
//Copyright (c) 2023, Yash-Sharma-1807


const { bot , LOGGER } = require("../index");
const { sfw,nsfw } = require("../assets/would_you_rather_sfw");
const { add_wyr } = require("./database/index")
"use-strict";


// Inline //

const wyr_keyboard = [[
    {
        text : "🔵 : 0",
        callback_data : "blue_wyr_0"
    },
    {
        text : "🔴 : 0",
        callback_data : "red_wyr_0"
    }
  ]];
  
  
  const wyr_reply_markup = {
    inline_keyboard : wyr_keyboard
  };
  



// SFW COMMAND //

bot.command("wyr", async (ctx) => {

        if (ctx.message.chat.type === "private"){
            await ctx.reply("This is a group only Command.");
        } else {
        try {
            const randomIndex = Math.floor(Math.random() * sfw.length);
            const randomItem = sfw[randomIndex];

            await ctx.reply(`Question : ${randomItem.question}\n\n🔵 ${randomItem.Answer[0]}\n🔴 ${randomItem.Answer[1]}` ,{
                reply_to_message_id : ctx.message.message_id,
                parse_mode : "HTML",
                reply_markup : wyr_reply_markup
            });

            await add_wyr(ctx.message.chat.id,ctx.message.message_id);
        
        } catch (eor) {
            await LOGGER(eor);
        };
    };
});


// NSFW COMMAND //

bot.command("nsfwyr", async (ctx) => {
    if (ctx.message.chat.type === "private") {
        await ctx.reply("This is a group only Command.");
    } else {
        try {
            const randomIndex = Math.floor(Math.random() * nsfw.length);
            const randomItem = nsfw[randomIndex];

            await ctx.reply(`Question : ${randomItem.question}\n\n🔵 ${randomItem.Answer[0]}\n🔴 ${randomItem.Answer[1]}` ,{
                reply_to_message_id : ctx.message.message_id,
                parse_mode : "HTML",
                reply_markup : wyr_reply_markup
            });
            
            await add_wyr(ctx.message.chat.id,ctx.message.message_id);

        } catch (eor) {
            await LOGGER(eor);
        };
    };

});