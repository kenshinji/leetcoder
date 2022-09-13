const { Client, GatewayIntentBits } = require('discord.js');
const schedule = require('node-schedule');
const { token } = require('./config.json');

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

    // const channel = client.channels.cache.get('931596633454563368');
    // channel
    const job = schedule.scheduleJob('*/2 * * * *', function(){
        console.log('I will ping every 2 minutes');
        client.channels.cache.get('931596633454563368').send('I will ping every 2 minutes');
      });
});

const getLeetCodeDailyChallenge = async () => {
    const url = 'https://leetcode.com/api/problems/algorithms/';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}

getLeetCodeDailyChallenge();


