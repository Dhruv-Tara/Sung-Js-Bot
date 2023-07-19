//BSD 3-Clause License 
//Copyright (c) 2023, Yash-Sharma-1807

const { bot , LOGGER } = require("../index")
const {Help_data , Owner} = require("../config")

const { get_wyr_userlist , add_user_wyr , get_wyr_button} = require("./database/index")

// SOME IMP INLINE KEYBOARDS //


const help_back_keyboard = [[
  {
      text : "Back",
      callback_data : "help_back"
  }
]];

const help_back_markup = {
  inline_keyboard : help_back_keyboard
};

//-------------------//


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
},
],[
  {
      text : "Back",
      callback_data : "main_caption"
  }
]];

const help_total_markup = {
  inline_keyboard : help_total_keyboard
};

// =================== //

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


// ---------------------------- //





// MAIN CODE TO HANDLE INLINE QUERY // 


bot.on("callback_query",async (ctx) => {
  try {
  if (ctx.callbackQuery.data === "delete_me"){
    if(ctx.callbackQuery.from.id === ctx.callbackQuery.message.reply_to_message.from.id || ctx.callbackQuery.from.id === Owner){
      await ctx.telegram.deleteMessage(ctx.callbackQuery.message.chat.id,ctx.callbackQuery.message.message_id)
      await ctx.answerCbQuery("Deleted",{show_alert : true})
      
    }else {await ctx.answerCbQuery("You can't delete this.",{show_alert : true})}
  }

  else if (ctx.callbackQuery.data === "user_help") {
    await ctx.telegram.editMessageCaption(
      ctx.callbackQuery.message.chat.id,
      ctx.callbackQuery.message.message_id,
      undefined,
      Help_data.user,
      {parse_mode : "HTML",reply_markup : help_back_markup}
    )
  }

  else if (ctx.callbackQuery.data === "game_help") {
    await ctx.telegram.editMessageCaption(
      ctx.callbackQuery.message.chat.id,
      ctx.callbackQuery.message.message_id,
      undefined,
      Help_data.game,
      {parse_mode : "HTML",reply_markup : help_back_markup}
    )
  }


  else if (ctx.callbackQuery.data === "owner_help") {
    if (ctx.callbackQuery.from.id === 5146000168){
    await ctx.telegram.editMessageCaption(
      ctx.callbackQuery.message.chat.id,
      ctx.callbackQuery.message.message_id,
      undefined,
      Help_data.owner,
      {parse_mode : "HTML",reply_markup : help_back_markup}
    );
  } else {
      await ctx.answerCbQuery("This is only for owner.",{show_alert : true})
    }
  }

  else if (ctx.callbackQuery.data === "help_back") {

    await ctx.telegram.editMessageCaption(
      ctx.callbackQuery.message.chat.id,
      ctx.callbackQuery.message.message_id,
      undefined,
      "Hello I'm Sung Jin Woo.\n\nClick on the button below to get description.",
      {parse_mode : "HTML",reply_markup : help_total_markup}
    );
  } else if (ctx.callbackQuery.data === "main_caption") {

    await ctx.telegram.editMessageCaption(
      ctx.callbackQuery.message.chat.id,
      ctx.callbackQuery.message.message_id,
      undefined,
      "Hello I am Sung Jin Woo\nI am under development",
      {parse_mode : "HTML",reply_markup : reply_markup_P}
    );

  } else if (ctx.callbackQuery.data === "admins_help") {

    await ctx.telegram.editMessageCaption(
      ctx.callbackQuery.message.chat.id,
      ctx.callbackQuery.message.message_id,
      undefined,
      Help_data.admins,
      {
        parse_mode : "HTML",
        reply_markup : help_back_markup
      }
    );

  } else if (ctx.callbackQuery.data.startsWith("red_wyr_")) {

    const msg = ctx.callbackQuery.message.reply_to_message ;

    const user_lst = await get_wyr_userlist(msg.chat.id,msg.message_id);
    if (user_lst.includes(ctx.callbackQuery.from.id)) {

      await ctx.answerCbQuery("You have already answered",{show_alert : true});

    } else {
      const usrid = ctx.callbackQuery.from.id
      await add_user_wyr(msg.chat.id,msg.message_id,"red_wyr",usrid);
      const blue_wyr_ = await get_wyr_button(msg.chat.id,msg.message_id,"blue_wyr");
      const red_wyr_ = await get_wyr_button(msg.chat.id,msg.message_id,"red_wyr");
      await ctx.telegram.editMessageReplyMarkup(
        ctx.callbackQuery.message.chat.id,
        ctx.callbackQuery.message.message_id,
        undefined,
        {
          inline_keyboard : [[
            {
              text : `🔵 : ${blue_wyr_}`,
              callback_data : `blue_wyr_${blue_wyr_}`
            },{
              text : `🔴 : ${red_wyr_}`,
              callback_data : `red_wyr_${red_wyr_}`
            }
          ]]
        }
      );
    };

  }  else if (ctx.callbackQuery.data.startsWith("blue_wyr_")) {

    const msg = ctx.callbackQuery.message.reply_to_message ;

    const user_lst = await get_wyr_userlist(msg.chat.id,msg.message_id);
    if (user_lst.includes(ctx.callbackQuery.from.id)) {

      await ctx.answerCbQuery("You have already answered",{show_alert : true});

    } else {
      const usid = ctx.callbackQuery.from.id
      await add_user_wyr(msg.chat.id,msg.message_id,"blue_wyr",usid);
      const blue_wyr_ = await get_wyr_button(msg.chat.id,msg.message_id,"blue_wyr");
      const red_wyr_ = await get_wyr_button(msg.chat.id,msg.message_id,"red_wyr");
      await ctx.telegram.editMessageReplyMarkup(
        ctx.callbackQuery.message.chat.id,
        ctx.callbackQuery.message.message_id,
        undefined,
        {
          inline_keyboard : [[
            {
              text : `🔵 : ${blue_wyr_}`,
              callback_data : `blue_wyr_${blue_wyr_}`
            },{
              text : `🔴 : ${red_wyr_}`,
              callback_data : `red_wyr_${red_wyr_}`
            }
          ]]
        }
      );
    };
  }    // Next from here -----




} catch (eor) {
    await LOGGER(eor)
  };

});
