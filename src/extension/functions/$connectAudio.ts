import { getVoiceConnection } from "@discordjs/voice";
import { ArgType, NativeFunction, Return, ReturnType } from "forgescript";

export default new NativeFunction({
    name: "$connectAudio",
    description: "Request the client to connect guild's voice connection to an audio player",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "guildId",
            description: "The guild of voice's connection",
            rest: false,
            required: true,
            type: ArgType.Guild
        },
        {
            name: "playerId",
            description: "The assigned Audio player id",
            rest: false,
            required: true,
            type: ArgType.String
        }
    ],
    execute(ctx, [guild, id]) {
        const connection = getVoiceConnection(guild.id);
        // if (! connection) return new Return(ReturnType.Error, new ForgeError(null, ErrorType.Custom, `There's no voice connection made with guild`));
        const player = ctx.client.music.harmony.harmonyNodes.get(id);
        // if (! player) return new Return(ReturnType.Error, new ForgeError(null, ErrorType.Custom, `There's no audio player assigned with id of "${id}"`));

        if (! (connection && player)) return new Return(ReturnType.Success, false);
        player.listen(connection);
        return new Return(ReturnType.Success, true);
    }
})