import { webhookCallback } from 'grammy';
import { bot } from '../src';
const express = require('express')

const app = express();

app.use(express.json());
app.use(`/api`, webhookCallback(bot, 'express'));
