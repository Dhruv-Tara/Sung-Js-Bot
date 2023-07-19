//BSD 3-Clause License 
//Copyright (c) 2023, Yash-Sharma-1807

const { Start_P } = require("../config")
const {bot} = require("../index")
const { add_user,add_chat } = require("./database/index")


// Inline Keyboards //


const keyboard = [
    [
      {
        text : "Help",
        callback_data : "help_back"
      }
    ],[
      {
        text: "Support",
        url: "https://t.me/monarchs_alley"
      }
      ],
  ];
  


const reply_markup_P = {
    inline_keyboard: keyboard,
  };


  // ------------------//

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


// Main start Code //


bot.command("start", async (ctx) => {
    try {
      await add_user(ctx.message.from.id,ctx.message.from.first_name)
    if (ctx.message.chat.type === "private") {

      if (ctx.message.text.split(" ")[1] === "help"){

        await ctx.replyWithAnimation("https://graph.org//file/4edd9a1561715bd6a5e99.mp4",{
          caption : "Hello I'm Sung Jin Woo.\n\nClick on the button below to get description.",
          reply_markup : help_total_markup});

      } else{

        await ctx.replyWithAnimation("https://graph.org//file/4edd9a1561715bd6a5e99.mp4",{
          caption : "Hello I am Sung Jin Woo\nI am under development",
          reply_markup : reply_markup_P
        });};

    }else if (ctx.message.chat.type === "group" || ctx.message.chat.type === "supergroup") {
        
      await add_chat(ctx.message.chat.id,ctx.message.chat.first_name)
      await ctx.replyWithPhoto(Start_P,{caption : "Hello I am alive",reply_to_message_id : ctx.message.message_id})

    };} catch (eor) {console.warn(eor)}
});