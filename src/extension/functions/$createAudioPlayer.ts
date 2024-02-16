import { ArgType, NativeFunction, Return, ReturnType } from "forgescript";
import AudioPlayerNode = require("../../structures/AudioPlayerNode");

export default new NativeFunction({
    name: "$createAudioPlayer",
    description: "Creates a new Audio player with id if one doesn't exists.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "id",
            description: "The id that will be assigned to the Audio player",
            rest: false,
            required: true,
            type: ArgType.String
        }
    ],
    execute(ctx, [id]) {
        if (ctx.client.music.nodes.has(id))
            return new Return(ReturnType.Success, false);
        ctx.client.music.nodes.set(id, new AudioPlayerNode(id));

        return new Return(ReturnType.Success, true);
    }
})