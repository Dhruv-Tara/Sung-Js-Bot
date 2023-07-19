//BSD 3-Clause License 
//Copyright (c) 2023, Yash-Sharma-1807



const { curtime } = require("../../index")
const {MongoClient} = require("mongodb")
const { uri } = require("../../config")
const client = new MongoClient(uri)

// DB //
const db = client.db("Sung")
// COLLECTION //
const users = db.collection("users")
const chats = db.collection("chats")
const game = db.collection("game_won")
const daily = db.collection("daily_prize")
const wyr = db.collection("wyr")

// -----------------------------------------------------------------------------------

// Readable Timestamp func //

function timestamp_to_readable(timestamp, type = null) {
    const dt = new Date(timestamp * 1000);
  
    const days = Math.floor(dt / (1000 * 60 * 60 * 24));
    const hours = Math.floor((dt / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((dt / (1000 * 60)) % 60);
    const seconds = Math.floor((dt / 1000) % 60);
  
    if (type === "days") {
      return days;
    } else if (type === "hours") {
      return hours;
    } else if (type === "min") {
      return minutes;
    } else if (type === "sec") {
      return seconds;
    } else if (type === "json") {
        return {
            "days" : days,
            "hours" : hours,
            "min" : minutes,
            "sec" : seconds
        }
    } else {
      const readable_format = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
      return readable_format;
    }
};


// USER BASED DB SYSTEM //


async function check_if_user_exists(userid) {
    const xyz = await users.findOne({
        "user_id" : userid
    })
    if (xyz === null) {
        return false
    } else {
        return true
    }
}

async function add_user(userid,name) {
    const if_exists = await check_if_user_exists(userid)
    if (if_exists === false) {
    await users.insertOne({
        "user_id" : userid,
        "name" : name
    })} else {
        return 
    }
}

async function find_user(userid) {
    const xyz = await users.findOne({
        "user_id" : userid
    })
    console.log(xyz)
    return xyz
}


async function get_total_users() {
    const total_users = await users.countDocuments({})
    return total_users
}

// CHAT BASED DB SYSTEM //

async function check_if_chat_exists(chatid) {
    const exists = await chats.findOne({
        "chat_id" : chatid
    })
    if (exists === null) {
        return false
    } else {
        return true
    }
}

async function add_chat(chatid,chatname) {
    const check = await check_if_chat_exists(chatid)
    if (check === false) {
        await chats.insertOne({
            "chat_id" : chatid,
            "chat_name" : chatname
        })
    } else {
        return
    }
}

async function get_total_chats() {
    const chat = await chats.countDocuments({})
    return chat
}

// DB SYSTEM FOR GAME //


async function check_if_user_in_game(userid) {
    const doc = await game.findOne({
        "user_id" : userid
    });

    if (doc === null) {
        return false
    } else {
        return true
    };
};

async function add_user_in_game(userid) {
    await game.insertOne({
        "user_id" : userid,
        "won" : 100
    });
};

async function add_amount(userid,amount) {

    const check = await check_if_user_in_game(userid);

    if (check === false) {
        await add_user_in_game(userid);
        doc = await game.findOne({"user_id" : userid});
        amt = doc.won;
        add_amt = amt + amount;

        await game.updateOne({"user_id" : userid},{"$set" : {"won" : add_amt}},{upsert : true});

    } else {
        doc = await game.findOne({"user_id" : userid});
        amt = doc.won;
        add_amt = amt + amount;

        await game.updateOne({"user_id" : userid},{"$set" : {"won" : add_amt}},{upsert : true});
    };

};


async function give_won_amount(userid) {
    const check = await check_if_user_in_game(userid)
    if (check === false) {
        await add_user_in_game(userid)
        return 100
    } else {
        const doc = await game.findOne({
            "user_id" : userid
        })
        return doc.won
    }
}


async function add_user_in_daily(userid) {
    
    await daily.insertOne({
        "user_id" : userid,
        "time" : curtime()
    })
}

async function check_if_user_in_daily(userid) {
    const doc = await daily.findOne({
        "user_id" : userid
    });

    if (doc === null) {
        await add_user_in_daily(userid)
        return true
    } else {
        return
    }
}


async function get_time_remain(userid) {
    const can_now = await check_if_user_in_daily(userid)
    if (can_now === true) {
        return true
    } else {
        const doc = await daily.findOne({
            "user_id" : userid
        })
        const cur = curtime()
        const remain = timestamp_to_readable(cur - doc["time"],"json")
        
        if (remain["days"] >= 1) {
            return true;
        }
        else {
            return `Already Collected try again after <code>${23 - remain["hours"]}</code> hour, <code>${ 59 - remain["min"]}</code> minute, <code>${59 - remain["sec"]}</code> seconds.`
        }
    }
}


async function update_remain_time(userid) {

    await check_if_user_in_daily(userid);

    await daily.updateOne({
        "user_id" : userid
    },{
        "$set" : {
            "time" : curtime()
        }
    },{upsert : true});
};


async function add_wyr(chat_id, message_id) {

    await wyr.insertOne({
        "chat_id" : chat_id,
        "message_id" : message_id,
        "blue_wyr" : 0,
        "red_wyr" : 0,
        "users" : [123456,112]
    });

};


async function add_user_wyr(chat_id, message_id , typof , userid) {

    if (typof === "red_wyr") {

        const doc = await wyr.findOne({"chat_id" : chat_id , "message_id" : message_id});
        const upd_1 = doc["red_wyr"]+1
        console.log(doc["users"])
        const upd = doc["users"]
        upd.push(userid)
        await wyr.updateOne({"chat_id" : chat_id , "message_id" : message_id},{"$set" : {"red_wyr" : upd_1}},{upsert : true});
        await wyr.updateOne({"chat_id" : chat_id , "message_id" : message_id},{"$set" : {"users" : upd}},{upsert : true});

    } else if (typof === "blue_wyr") {

        const doc = await wyr.findOne({"chat_id" : chat_id , "message_id" : message_id});
        console.log(doc["users"])
        const usr = doc["users"]
        usr.push(userid)
        const upd_1 = doc["blue_wyr"]+1
        await wyr.updateOne({"chat_id" : chat_id , "message_id" : message_id},{"$set" : {"blue_wyr" : upd_1}},{upsert : true});
        await wyr.updateOne({"chat_id" : chat_id , "message_id" : message_id},{"$set" : {"users" : usr}},{upsert : true});
    };
};


async function get_wyr_userlist(chat_id, message_id) {

    const doc = await wyr.findOne({
        "chat_id" : chat_id, 
        "message_id" : message_id
    });

    const user_lst = doc["users"];

    return user_lst;
};

async function get_wyr_button(chat_id, message_id , typof) {

    if (typof === "red_wyr") {
        
        const doc = await wyr.findOne({"chat_id" : chat_id , "message_id" : message_id});
        return doc["red_wyr"];

    } else {
        const doc = await wyr.findOne({"chat_id" : chat_id , "message_id" : message_id});
        return doc["blue_wyr"];
    };
};

async function delete_wyr(chat_id, message_id) {

    await wyr.deleteOne({
        "chat_id" : chat_id, 
        "message_id" : message_id
    });

};


// MODULE EXPORT AND IMP DEF EXPORT JSON //


const uploading = {
    "add_user" : add_user,
    "get_total_users" : get_total_users,
    "get_total_chat" : get_total_chats,
    "add_chat" : add_chat,
    "add_amount" : add_amount,
    "give_won_amount" : give_won_amount,
    "daily_update_remain_time" : update_remain_time,
    "daily_get_time_remain" : get_time_remain,
    "add_user_wyr" : add_user_wyr,
    "delete_wyr" : delete_wyr,
    "get_wyr_userlist" : get_wyr_userlist,
    "add_wyr" : add_wyr,
    "get_wyr_button" : get_wyr_button
};

module.exports = uploading;