const lib = require("./lib");
const fs = require("forgescript");
const client = new fs.ForgeClient({
    intents: ["GuildVoiceStates", "Guilds", "GuildMessages", "MessageContent"],
    events: ["ready", "messageCreate"],
    extensions: [new lib.MusicExtension()],
    prefixes: ["!"]
});

client.music.harmony.registerSource(new lib.Youtube())

client.commands.load("./commands")
client.login(process.env.TOKEN)