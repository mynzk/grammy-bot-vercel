import { VercelRequest, VercelResponse } from '@vercel/node';
import { bot } from '../src';
import { webhookCallback } from 'grammy';

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

export default async function handle(req: VercelRequest, res: VercelResponse) {
  await runMiddleware(req, res, webhookCallback(bot, 'https'));
}
