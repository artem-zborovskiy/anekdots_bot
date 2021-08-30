const TOKEN = "1933153230:AAGMq4P5s1lnetft2I7yeyLcIzz7IFZHVLY";
const TELEGRAM_API = require('node-telegram-bot-api');
const { Keyboard } = require('puppeteer');
const PARSER = require('./parser.js');
const BOT = new TELEGRAM_API(TOKEN, {polling: true});

const Promise = require('bluebird');
Promise.config({
    cancellation: true
});

const start = () => {
    BOT.setMyCommands([
        {command: '/start', description: 'start'},
        {command: '/anekdot', description: 'get anekdot'},
    ]);
    
    BOT.on('message', async (message) => {
        const TEXT = message.text;
        const CHAT_ID = message.chat.id;

        if(message.from.last_name !== undefined) {
            console.log(`NAME: ${message.from.first_name} ${message.from.last_name}; CHAT_ID: ${CHAT_ID}; MESSAGE: ${TEXT}`);
        } else {
            console.log(`NAME: ${message.from.first_name}; CHAT_ID: ${CHAT_ID}; MESSAGE: ${TEXT}`);
        }

        if(TEXT !== undefined) {
            if(TEXT === '/start' || TEXT === '/start@proANEKDOTSbot') {
                BOT.sendMessage(CHAT_ID, 'привет');
                openKeyboard(CHAT_ID);
                return;
            }
    
            if(TEXT === '/anekdot' || TEXT === '/anekdot@proANEKDOTSbot' || TEXT === 'анекдот') {
                return BOT.sendMessage(CHAT_ID, await PARSER());
            }
    
            return BOT.sendMessage(CHAT_ID, 'я тебя не понял');
        }
    });
}

start();