//BSD 3-Clause License 
//Copyright (c) 2023, Yash-Sharma-1807

// SOME IMPORTS //



// ADDING HELP DESC HERE BECAUSE IDK WHERE ELSE TO ADD //

const help = {
    "owner" : "/stats - to get my stats\n",
    "game" : "Currently there are only two commands in this\n\n1) <code>/daily</code> - Get the daily won (₩) for your usage.\n\n2) <code>/wallet</code> - To check how many won (₩) are there in your wallet.\n\n3) <code>/bet {amount}</code> - To bet the amount of won (₩) you wanna bet.",
    "user" : "There are some command for daily usage like \n\n<code>/id</code> - Gives id of chat and message if replied gives id of both replied userid and replied messageid\n\n<code>/info</code> - as the name suggests if you still don't know then try it out yourself.\n\n<code>/getjson</code> - gives a json for the message.\n\n<code>/wyr</code> A would you rather question.\n\n<code>/nsfwyr</code> Gives a would you rather but nsfw version.",
    "admins" : "Currently there are very less commands for admins.\n\n<code>/del</code> - Deletes the message that you replied to.\n\n<code>/wipethread</code> - This command can delete multiple messages also can delete the number of message you give. Ex : <code>/wipethread 3</code>"
};

// CONSTANTS //

const Config = {
    'Token' : "Bot Token here",
    'Start_P' : "https://graph.org//file/6a197da7a1e166e62cbda.jpg",
    'Support_id' : "Support GROUP",
    "Owner" : 5146000168,
    "Help_data" : help,
    "Mongo_DB" : "Your Mongo Db uri"
} ;


// EXPORTING THE CONFIG //

module.exports = Config ;