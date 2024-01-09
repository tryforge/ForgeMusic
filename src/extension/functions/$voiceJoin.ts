import { joinVoiceChannel } from "@discordjs/voice";
import { BaseChannel, VoiceChannel } from "discord.js";
import { ArgType, NativeFunction, Return, ReturnType } from "forgescript";

export default new NativeFunction({
    name: "$voiceJoin",
    description: "Request the client to connect to a voice channel.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "channelId",
            description: "A voice channel to connect",
            rest: false,
            required: true,
            type: ArgType.Channel,
            check: (i: BaseChannel) => i.isVoiceBased()
        }
    ],
    execute(ctx, [c]) {
        const channel = <VoiceChannel>c;
        joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guildId,
            adapterCreator: channel.guild.voiceAdapterCreator
        });

        return new Return(ReturnType.Success, "");
    }
})