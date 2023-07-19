//BSD 3-Clause License 
//Copyright (c) 2023, Yash-Sharma-1807

const { bot,LOGGER } = require("../index")


// INLINE KEYBOARDS 



const help_group_keyboard = [[
    {
        text : "help",
        url : "https://t.me/Sung_Jin_Bot?start=help"
    }
]];

const help_group_markup = {
    inline_keyboard : help_group_keyboard
};

// ------------------------------------------------ //

const help_total_keyboard = [[
    {
        text : "User",
        callback_data : "user_help"
    },{
        text : "Game",
        callback_data : "game_help"
    }
],[
    {
        text : "Admins",
        callback_data : "admins_help"
    },{
        text : "Owner",
        callback_data : "owner_help"
    }
],[
    {
        text : "Back",
        callback_data : "main_caption"
    }
]];

const help_total_markup = {
    inline_keyboard : help_total_keyboard
};


//   Main Help command

bot.command("help",async (ctx)=>{
    try {
    if (ctx.message.chat.type === "private") {
        await ctx.replyWithAnimation("CgACAgUAAxkDAANKZJwu03HDH92oVpZM1YnVIy716IUAAnYJAAL0SuFUHoAMRPgdexIvBA",{
            caption : "Hello I'm Sung Jin Woo.\n\nClick on the button below to get description.",
            reply_markup : help_total_markup
        }) 
        }else {
            await ctx.reply("Click on the button below to get help.",{
                reply_markup : help_group_markup,
                reply_to_message_id : ctx.message.message_id
            })
        }} catch (eor) {
            await LOGGER(eor)
        }
});