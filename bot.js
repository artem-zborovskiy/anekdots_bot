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
        {command: '/open_keyboard', description: 'open keyboard'},
        {command: '/close_keyboard', description: 'close keyboard'},
    ]);
    
    BOT.on('message', async (message) => {
        const TEXT = message.text;
        const CHAT_ID = message.chat.id;

        if(message.from.last_name !== undefined) {
            console.log(`NAME: ${message.from.first_name} ${message.from.last_name}; CHAT_ID: ${CHAT_ID}; MESSAGE: ${TEXT}`);
        } else {
            console.log(`NAME: ${message.from.first_name}; CHAT_ID: ${CHAT_ID}; MESSAGE: ${TEXT}`);
        }

        if(TEXT === '/start' || TEXT === '/start@proANEKDOTSbot') {
            BOT.sendMessage(CHAT_ID, 'привет');
            openKeyboard(CHAT_ID);
            return;
        }

        if(TEXT === '/open_keyboard' || TEXT === '/open_keyboard@proANEKDOTSbot' || TEXT === 'открыть клавиатуру') {
            openKeyboard(CHAT_ID);
            return;
        }

        if(TEXT === '/close_keyboard' || TEXT === '/close_keyboard@proANEKDOTSbot' || TEXT === 'закрыть клавиатуру') {
            remove_keyboard(CHAT_ID);
            return;
        }

        if(TEXT === '/anekdot' || TEXT === '/anekdot@proANEKDOTSbot' || TEXT === 'анекдот') {
            return BOT.sendMessage(CHAT_ID, await PARSER());
        }

        return BOT.sendMessage(CHAT_ID, 'я тебя не понял');
    });
}

function openKeyboard(chatID) {
    BOT.sendMessage(chatID, 'что мне сделать?', {reply_markup: {
            keyboard: [
                ['анекдот'],
                ['закрыть клавиатуру']
            ]
        }
    })
}

function remove_keyboard(chatID) {
    BOT.sendMessage(chatID, 'клавиатура закрыта', {reply_markup: {
            remove_keyboard: true
        }
    })
}

start();