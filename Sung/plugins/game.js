//BSD 3-Clause License 
//Copyright (c) 2023, Yash-Sharma-1807

const { bot , LOGGER } = require("../index");
const { add_amount , give_won_amount, daily_get_time_remain, daily_update_remain_time, add_user} = require("./database/index");
const { Owner } = require("../config")

async function multiply(number , multiply) {
    const num = await parseInt(number);
    return num * multiply;
}


// Daily Command //


bot.command("daily", async (ctx) =>{

    try {
        await add_user(ctx.message.from.id,ctx.message.from.first_name);
        const can = await daily_get_time_remain(ctx.message.from.id);
        
        if (can === true) {
        const value = await ctx.replyWithDice({emoji : "🎰",reply_to_message_id : ctx.message.message_id});
        const amount_to_add = await multiply(value.dice.value,10);
        await add_amount(ctx.message.from.id,amount_to_add);
        await daily_update_remain_time(ctx.message.from.id);
        await ctx.reply(`You have recieved <code>${amount_to_add}</code> ₩ as a daily reward.`,{reply_to_message_id : ctx.message.message_id,parse_mode : "HTML"});
        
    } else {
        await ctx.reply(can,{reply_to_message_id : ctx.message.message_id,parse_mode : "HTML"});
    };
} catch (eor) {
    await LOGGER(eor);
};
});

// Betting command //

bot.command("bet",async (ctx) => {

    try {
        const amount_to_gamble = ctx.message.text.split(" ")[1];
        const wons = await give_won_amount(ctx.message.from.id);
        
        if (typeof amount_to_gamble === "undefined") {

            await ctx.reply("Correct way to use <code>/bet {amount}</code>",{
                reply_to_message_id : ctx.message.message_id,
                parse_mode : "HTML"
            });

        } else if (isNaN(parseInt(amount_to_gamble))) {

            await ctx.reply("Correct way to use <code>/bet {amount}</code>",{
                reply_to_message_id : ctx.message.message_id,
                parse_mode : "HTML"
            });
            
        } else if (wons === 0){
          
            await ctx.reply("You have <code>0</code> ₩ you can't play this game.",{
                reply_to_message_id : ctx.message.message_id,
                parse_mode : "HTML"
            });

        } else if (parseInt(amount_to_gamble) > wons) {

            await ctx.reply(`You have less than <code>${amount_to_gamble}</code> ₩`,{
                reply_to_message_id : ctx.message.message_id,
                parse_mode : "HTML"
            });

        } else {

            const random = Math.floor(Math.random() * 3)

            if ( random === 0) {
                
                await add_amount(ctx.message.from.id , -parseInt(amount_to_gamble));

                await ctx.reply(`Too bad you just lost <code>${wons}</code> ₩`,{
                    reply_to_message_id : ctx.message.message_id,
                    parse_mode : "HTML"
                });

            } else {

                const reward_amount = Math.floor(parseInt(amount_to_gamble) * 2);

                await add_amount(ctx.message.from.id , reward_amount);

                await ctx.reply(`You won <code>${reward_amount}</code> ₩`,{
                    reply_to_message_id : ctx.message.message_id,
                    parse_mode : "HTML"
                });

            };
        };

    } catch (eor) {
        await LOGGER(eor);
    };
});


// Owner only adding command //

bot.command("give", async (ctx) => {

    const add = ctx.message.text.split(" ")[1]

    if (ctx.message.from.id === Owner) {

        if (typeof add === "undefined") {

            await ctx.reply("Correct way to use <code>/give {amount}</code>",{
                reply_to_message_id : ctx.message.message_id,
                parse_mode : "HTML"
            });

        } else if (isNaN(parseInt(add))) {

            await ctx.reply("Correct way to use <code>/give {amount}</code>",{
                reply_to_message_id : ctx.message.message_id,
                parse_mode : "HTML"
            });
            
        } else {
            
            await add_amount(ctx.message.reply_to_message.from.id,parseInt(add))
            await ctx.reply(`Sucessfully gave <code>${add}</code> ₩`,{
                reply_to_message_id : ctx.message.message_id,
                parse_mode : "HTML"
            });

        };
    };
});

// User wallet check //

bot.command("wallet", async (ctx) => {
    try {
        await add_user(ctx.message.from.id,ctx.message.from.first_name);
        const won = await give_won_amount(ctx.message.from.id);
        await ctx.reply(`Your wallet have <code>${won}</code> ₩`,{reply_to_message_id : ctx.message.message_id,parse_mode : "HTML"});
    } catch (eor) {
        await LOGGER(eor);
    };
});