import { ArgType, NativeFunction, Return } from "forgescript";
import { joinVoiceChannel } from "@discordjs/voice";
import type { GuildChannel } from "discord.js";

export default new NativeFunction({
    name: "$vcJoin",
    description: "Connects to a voice channel",
    version: "v0.0.1",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "voiceChannel",
            description: "The voice channel of guild",
            type: ArgType.Channel,
            rest: false,
            required: true,
            check: (i: GuildChannel) => i.isVoiceBased()
        },
    ],
    async execute(ctx, [voiceChannel]: [GuildChannel]) {
        const con = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guildId,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator
        });

        const node = ctx.client.music.manager.getNode(ctx.guild.id, true);
        con.subscribe(node['_player']);
        return Return.success();
    }
});