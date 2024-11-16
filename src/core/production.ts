import { VercelRequest, VercelResponse } from '@vercel/node';
import createDebug from 'debug';
import { Bot, webhookCallback } from 'grammy';

const debug = createDebug('bot:dev');

const PORT = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;
const VERCEL_URL = `${process.env.VERCEL_URL}`;

function runMiddleware(req: VercelRequest, res: VercelResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const production = async (
  req: VercelRequest,
  res: VercelResponse,
  bot: Bot,
) => {
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

  if (req.method === 'POST') {
    await runMiddleware(req, res, webhookCallback(bot, 'https'));
  } else {
    res.status(200).json('Listening to bot events...');
  }
  debug(`starting webhook on port: ${PORT}`);
};
export { production };
