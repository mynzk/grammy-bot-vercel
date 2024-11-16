import { Bot } from 'grammy'
import { about } from './commands';
import { greeting } from './text';
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

export const bot = new Bot(BOT_TOKEN);

bot.command('about', about());
bot.on('message', greeting());


//dev mode
ENVIRONMENT !== 'production' ? development(bot) : production(bot);
