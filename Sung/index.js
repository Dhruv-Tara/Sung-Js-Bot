//BSD 3-Clause License 
//Copyright (c) 2023, Yash-Sharma-1807

// ---------------Imports------------------

const Config = require("./config");
const telegraf = require("telegraf");
const bot = new telegraf.Telegraf(Config.Token);
const fs = require("fs");
const path = require("path");

// -----------------------Main-------------------

async function uptime() {
  const uptime = process.uptime();
  const seconds = uptime.toFixed(0);
  const totalMinutes = Math.floor(seconds / 60);
  const minutes = totalMinutes % 60;
  const remainingSeconds = seconds % 60;
  const hours = Math.floor((totalMinutes / 60) % 24);
  const days = Math.floor(totalMinutes / (60 * 24));

  if (days <= 0) {
    if (hours <= 0) {
      return `Current uptime: <code>${minutes}</code> minutes, <code>${remainingSeconds}</code> seconds`;
    } else {
      return `Current uptime: <code>${hours}</code> hours, <code>${minutes}</code> minutes, <code>${remainingSeconds}</code> seconds`;
    }
  } else {
    return `Current uptime: <code>${days}</code> days, <code>${hours}</code> hours, <code>${minutes}</code> minutes, <code>${remainingSeconds}</code> seconds`;
  };
};

// Serves as a work of Error logger //

async function LOGGER (error) {
  try {
  await bot.telegram.sendMessage(Config.Support_id,`An Error has Occured :\n${error}`);
  console.log(error)} catch (eor) {
    console.warn(error);
  };
};



// !----------LOADING MODULES-----------! //

const pluginsDir = path.join(__dirname, "/plugins/");
fs.readdir(pluginsDir, (err, files) => {
  if (err) {
    console.error("Error reading plugins directory:", err);
    return;
  }
  const modules = files.filter((file) => file.endsWith(".js"));
  modules.forEach((module) => {
    const modulePath = path.join(pluginsDir, module);
    const plugin = require(modulePath);

    if (plugin) {
      console.log(`Loaded plugin module: ${module}`);
    } else {
      console.log(`Invalid plugin module: ${module}`);
    };
  });
});



// OTHER SHITS 

bot.telegram.sendMessage(Config.Support_id ,"Js bot has started");

// --------------------Starting Bot------------------------

/* Added Drop Pending Updates because if any older update are 
remaining then bot will spam them all at once. */

bot.launch({dropPendingUpdates : true});

// Current time for the main db and other usage //

function get_current() {
  const dat = new Date();
  const xyz = Math.floor(+dat / 1000);  
  return xyz ;
};

// Exporting bot and other required func for the plugin usage //

const bomt = {
  "bot" : bot,
  "uptime" : uptime,
  "LOGGER" : LOGGER,
  "curtime" : get_current
};

// Exporting //

module.exports = bomt;