import { getVoiceConnection } from "@discordjs/voice";
import { ArgType, ErrorType, ForgeError, NativeFunction, Return, ReturnType } from "forgescript";
import AudioNode = require("../../structures/AudioNode");

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
        const conn = getVoiceConnection(guild.id);
        if (! conn) return new Return(ReturnType.Error, new ForgeError(null, ErrorType.Custom, `There's no voice connection made with guild`));

        const player = AudioNode.Instances.get(id);
        if (! player) return new Return(ReturnType.Error, new ForgeError(null, ErrorType.Custom, `There's no audio player assigned with id of "${id}"`));

        player.listen(conn);
        return new Return(ReturnType.Success, "");
    }
})