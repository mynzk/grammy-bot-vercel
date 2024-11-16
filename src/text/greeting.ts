import { Context } from 'grammy';
import createDebug from 'debug';

const debug = createDebug('bot:greeting_text');

const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.reply(string);

const greeting = () => async (ctx: Context) => {
  debug('Triggered "greeting" text command');

  const messageId = ctx.message?.message_id;
  const userName = `${ctx.message?.from.first_name} ${ctx.message?.from.last_name || ''}`;

  if (messageId) {
    await replyToMessage(ctx, messageId, `Hello, ${userName} 🎉🎆🧨`);
  }
};

export { greeting };
