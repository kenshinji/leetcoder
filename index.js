const { Client, GatewayIntentBits } = require('discord.js');
const schedule = require('node-schedule');
const { token } = require('./config.json');
const channelId = '123456789012345678';
// daily URL
// https://jerrynsh.com/how-i-sync-daily-leetcoding-challenge-to-todoist/
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token);

client.once('ready', () => {
	console.log('I am ready!');
    //send message to a channel

    // send message periodically
    // like every 2 mins
    const job = schedule.scheduleJob('*/2 * * * *', function(){
        console.log('I will ping every 2 minutes');
        client.channels.cache.get(channelId).send('I will ping every 2 minutes');
      });
});



