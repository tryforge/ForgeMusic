import { ArgType, NativeFunction, Return, ReturnType } from "forgescript";
import AudioNode = require("../../structures/AudioNode");

export default new NativeFunction({
    name: "$createAudioPlayer",
    description: "Creates an Audio player.",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "id",
            description: "Assigned id for created Audio player",
            rest: false,
            required: true,
            type: ArgType.String
        }
    ],
    execute(ctx, [id]) {
        if (! ctx.client.music.nodes.has(id)) {
            ctx.client.music.nodes.set(id, new AudioNode())
        }

        return new Return(ReturnType.Success, "");
    }
})