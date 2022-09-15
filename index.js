const { default: axios } = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');
const schedule = require('node-schedule');
const { token, channelId } = require('./config.json');
const LEETCODE_URL = 'https://leetcode.com';
const LEETCODE_DATA = {"query":"query questionOfToday {\n\tactiveDailyCodingChallengeQuestion {\n\t\tdate\n\t\tuserStatus\n\t\tlink\n\t\tquestion {\n\t\t\tacRate\n\t\t\tdifficulty\n\t\t\tfreqBar\n\t\t\tfrontendQuestionId: questionFrontendId\n\t\t\tisFavor\n\t\t\tpaidOnly: isPaidOnly\n\t\t\tstatus\n\t\t\ttitle\n\t\t\ttitleSlug\n\t\t\thasVideoSolution\n\t\t\thasSolution\n\t\t\ttopicTags {\n\t\t\t\tname\n\t\t\t\tid\n\t\t\t\tslug\n\t\t\t}\n\t\t}\n\t}\n}\n","operationName":"questionOfToday"}
// daily URL
// https://jerrynsh.com/how-i-sync-daily-leetcoding-challenge-to-todoist/
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// // Login to Discord with your client's token
client.login(token);
// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('I am ready!');

    // run dailyChallenge() every day at 8:00 AM
    const job = schedule.scheduleJob('27 * * * *', async function(){
        const response = await axios.post(LEETCODE_URL + '/graphql', LEETCODE_DATA);
        const msg = 'Today\'s Leetcode Daily Challenge: ' + LEETCODE_URL + response.data.data.activeDailyCodingChallengeQuestion.link;
        client.channels.cache.get(channelId).send(msg);
      });
});