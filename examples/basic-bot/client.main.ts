import { ForgeClient } from '@tryforge/forgescript'
import config from './config.js'
import path from 'path'

const client = new ForgeClient(config)
// client.commands.load(path.join(__dirname, "./commands"))
// Load all commands here because im lazy to transpile ts to js

client.commands.add({
    name: "ping",
    type: "messageCreate",
    code: "Pong! My ping is $pingms."
})

client.commands.add({
    name: 'play',
    type: "messageCreate",
    code: "Acknowledged"
})

client.login(process.env.TOKEN)