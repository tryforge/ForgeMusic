import { ArgType, NativeFunction, Return, ReturnType } from "forgescript";
import AudioNode = require("../../structures/AudioNode");

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
        if (! AudioNode.Instances.has(id)) {
            AudioNode.Instances.set(id, new AudioNode(id));
        }

        return new Return(ReturnType.Success, "");
    }
})