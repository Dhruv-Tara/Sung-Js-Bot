//BSD 3-Clause License 
//Copyright (c) 2023, Yash-Sharma-1807

const {bot,LOGGER} = require("../index")



async function getUser(ctx, userId) {

    const userProfilePhotos = await ctx.telegram.getUserProfilePhotos(userId);
    const userProfilePic = userProfilePhotos.total_count > 0 ? userProfilePhotos.photos[0][2].file_id : '';

    return {
      userProfilePic
    };
  };


const keyboard = [[
  {
    text : "Delete",
    callback_data : "delete_me"
  }
]];

const reply_mark = {
  inline_keyboard : keyboard
};

bot.command("info", async (ctx) => {
    try{
  if (ctx.message.reply_to_message) {
    const user = await getUser(ctx,ctx.message.reply_to_message.from.id)
    if (ctx.message.reply_to_message.from.id === 5146000168){
      await ctx.replyWithPhoto(
        user.userProfilePic,
        {
          caption : `Name : ${ctx.message.reply_to_message.from.first_name}\nUser id : <code>5146000168</code>\nMention : <a href="tg://user?id=${ctx.message.reply_to_message.from.id}">${ctx.message.reply_to_message.from.first_name}</a>\n\nYash Sharma is my owner and has total control over me.`,
          parse_mode : "HTML",
          reply_to_message_id : ctx.message.message_id,
          reply_markup : reply_mark
        }
      )
    } else if (ctx.message.reply_to_message.from.is_bot === true){
      await ctx.replyWithPhoto(
        user.userProfilePic,
        {
          caption : `Name : ${ctx.message.reply_to_message.from.first_name}\nUser id : <code>${ctx.message.reply_to_message.from.id}</code>\nMention : <a href="tg://user?id=${ctx.message.reply_to_message.from.id}">${ctx.message.reply_to_message.from.first_name}</a>\n\n${ctx.message.reply_to_message.from.first_name} is a bot.`,
          parse_mode : "HTML",
          reply_to_message_id : ctx.message.message_id,
          reply_markup : reply_mark
        }
      )
    }else if (user.userProfilePic != ""){
      await ctx.replyWithPhoto(
        user.userProfilePic,
        {
          caption : `Name : ${ctx.message.reply_to_message.from.first_name}\nUser id : <code>${ctx.message.reply_to_message.from.id}</code>\nMention : <a href="tg://user?id=${ctx.message.reply_to_message.from.id}">${ctx.message.reply_to_message.from.first_name}</a>`,
          parse_mode : "HTML",
          reply_to_message_id : ctx.message.message_id,
          reply_markup : reply_mark
        }
      )
    }
    else {
      await ctx.reply(
        `Name : ${ctx.message.reply_to_message.from.first_name}\nUser id : <code>${ctx.message.reply_to_message.from.id}</code>\nMention : <a href="tg://user?id=${ctx.message.reply_to_message.from.id}">${ctx.message.reply_to_message.from.first_name}</a>`,
        {parse_mode : "HTML",reply_to_message_id : ctx.message.message_id,reply_markup : reply_mark}
      )
    }
  } else {
    const user = await getUser(ctx,ctx.message.from.id)
    if (user.userProfilePic != ""){
      await ctx.replyWithPhoto(
        user.userProfilePic,
        {
          caption : `Name : ${ctx.message.from.first_name}\nUser id : <code>${ctx.message.from.id}</code>\nMention : <a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`,
          parse_mode : "HTML",
          reply_to_message_id : ctx.message.message_id,
          reply_markup : reply_mark
        }
      )
    } else {
      await ctx.reply(
        `Name : ${ctx.message.from.first_name}\nUser id : <code>${ctx.message.from.id}</code>\<a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>`,
        {parse_mode : "HTML",reply_to_message_id : ctx.message.message_id,reply_markup : reply_mark}
      )
    }
  }} catch (eor) {
    await LOGGER(eor)
  }
});