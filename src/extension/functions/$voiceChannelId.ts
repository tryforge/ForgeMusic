import { getVoiceConnection } from "@discordjs/voice";
import { ArgType, NativeFunction, Return, ReturnType } from "forgescript";

export default new NativeFunction({
    name: "$voiceChannelId",
    description: "Request the client to return a voice connection's channelId from `guildId`.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "guildId",
            description: "The voice channel for the client to create a connection.",
            rest: false,
            required: true,
            type: ArgType.Guild
        }
    ],
    execute(ctx, [guild]) {
        const connection = getVoiceConnection(guild.id);
        if (!connection) return new Return(ReturnType.Success, "");

        return new Return(ReturnType.Success, connection.joinConfig.channelId);
    }
})