import type { IRawForgeClientOptions } from "@tryforge/forgescript";
import type { GatewayIntentsString } from "discord.js"
import { Extension } from '@tryforge/music'

const Intents: GatewayIntentsString[] = 
    [
        "MessageContent",
        "Guilds",
        "GuildMessages",
        "GuildMembers",
        "GuildVoiceStates" // Important!
    ]
const Prefixes = ["!"]

export default <IRawForgeClientOptions>{
    intents: Intents,
    prefixes: Prefixes,
    events: ["ready", "messageCreate"],
    extensions: [ Extension ]
}