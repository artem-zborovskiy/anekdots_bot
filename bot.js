const TOKEN = "token";
const TELEGRAM_API = require('node-telegram-bot-api');
const PARSER = require('./parser.js');
const BOT = new TELEGRAM_API(TOKEN, {polling: true});

const Promise = require('bluebird');
Promise.config({
    cancellation: true
});

const start = () => {
    BOT.setMyCommands([
        {command: '/anekdot', description: 'get anekdot'}
    ]);
    
    BOT.on('message', async (message) => {
        const TEXT = message.text;
        const CHAT_ID = message.chat.id;

        var string;

        if(message.from.last_name !== undefined) {
            string = `NAME: ${message.from.first_name} ${message.from.last_name}; CHAT_ID: ${CHAT_ID}; MESSAGE: ${TEXT}`;
            console.log(string);
            BOT.sendMessage(-514100681, string);
        } else {
            string = `NAME: ${message.from.first_name}; CHAT_ID: ${CHAT_ID}; MESSAGE: ${TEXT}`;
            console.log(string);
            BOT.sendMessage(-514100681, string);
        }

        if(TEXT !== undefined) {
            if(TEXT === '/start') {
                BOT.sendMessage(CHAT_ID, 'привет');
                return;
            }
    
            if(TEXT === '/anekdot' || TEXT === '/anekdot@proANEKDOTSbot' || TEXT === 'анекдот') {
                var anekdot = await PARSER();
                BOT.sendMessage(-514100681, `RESPONSE: ${anekdot}`);
                return BOT.sendMessage(CHAT_ID, anekdot);
            }
    
            return BOT.sendMessage(CHAT_ID, 'я тебя не понял');
        }
    });
}

start();
