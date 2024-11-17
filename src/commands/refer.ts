import { Context, InlineKeyboard } from 'grammy';
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || '';

const refer = () => async (ctx: Context) => {
  const url = MONGODB_URI as string;
  if (!url) {
    throw new Error('Please add your Mongo URI to .env.local')
  }
  const client = new MongoClient(url);
  client.connect().then(() => console.log("Server is connected!"));
  const db = client.db("ragdoll");
  const usersCollection = db.collection("users");

  const keyboard = new InlineKeyboard()
    .url('Open App', 'https://t.me/PerfectLearnBot');

  const user = await usersCollection.findOne({ TgId: String(ctx?.from?.id) });
  if (!user?.ReferCode) {
    return ctx.reply(`<b>Hi ${ctx.from?.first_name}!</b> \n\n It seems like you haven't opened our mini app yet. \n Could you please open the app, complete your registration, and get your referral link?`, { reply_markup: keyboard, parse_mode: "HTML" })
  };

  return ctx.reply(`<b>Hi ${ctx.from?.first_name}!</b> \n\n <b>Invitintion link:</b> https://t.me/Ragdoll_App_Bot/app?startparam=${user?.ReferCode}  \n\n<u>Refer list:</u> \n 1. Siam Sheikh \n 2. Naim Kha`, { reply_markup: keyboard, parse_mode: "HTML" })
};

export { refer };
