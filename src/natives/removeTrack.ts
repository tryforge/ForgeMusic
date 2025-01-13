import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import getNode from "@utils/getNode"

export default new NativeFunction({
    name: "$removeTrack",
    version: "1.0.0",
    description: "Removes the track that is located at the given position.",
    brackets: true,
    unwrap: true,
    args: [Arg.requiredNumber("Position", "The track position to be removed.")],
    output: ArgType.Boolean,
    execute(ctx, [position]) {
        return this.success(!!getNode(ctx).remove(position))
    }
})