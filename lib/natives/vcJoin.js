"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
const voice_1 = require("@discordjs/voice");
exports.default = new forgescript_1.NativeFunction({
    name: "$vcJoin",
    description: "Connects to a voice channel",
    version: "v0.0.1",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "voiceChannel",
            description: "The voice channel of guild",
            type: forgescript_1.ArgType.Channel,
            rest: false,
            required: true,
            check: (i) => i.isVoiceBased()
        },
    ],
    async execute(ctx, [voiceChannel]) {
        const con = (0, voice_1.joinVoiceChannel)({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guildId,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator
        });
        const node = ctx.client.music.manager.getNode(ctx.guild.id, true);
        con.subscribe(node['_player']);
        return forgescript_1.Return.success();
    }
});
