import { getVoiceConnection } from "@discordjs/voice";
import { ArgType, NativeFunction, Return, ReturnType } from "forgescript";

export default new NativeFunction({
    name: "$voiceDc",
    description: "Request the client to disconnect from guild's voice channel.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "guildId",
            description: "A guild for the client to disconnect voice connection.",
            rest: false,
            required: true,
            type: ArgType.Guild,
        }
    ],
    execute(ctx, [guild]) {
        const conn = getVoiceConnection(guild.id);
        conn?.destroy();

        return new Return(ReturnType.Success, "");
    }
})