import { VercelRequest, VercelResponse } from '@vercel/node';
import createDebug from 'debug';
import { Bot, webhookCallback } from 'grammy';

const debug = createDebug('bot:dev');

const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;
const VERCEL_URL = `${process.env.VERCEL_URL}`;

const production = async (bot: Bot) => {
  debug('Bot runs in production mode');
  debug(`setting webhook: ${VERCEL_URL}`);
  if (!VERCEL_URL) {
    throw new Error('VERCEL_URL is not set.');
  }
  const getWebhookInfo = await bot.api.getWebhookInfo();
  if (getWebhookInfo.url !== VERCEL_URL + '/api') {
    debug(`deleting webhook ${VERCEL_URL}`);
    await bot.api.deleteWebhook();
    debug(`setting webhook: ${VERCEL_URL}/api`);
    await bot.api.setWebhook(`${VERCEL_URL}/api`);
  }
};
export { production };
