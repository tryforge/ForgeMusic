import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import getNode from "@utils/getNode"

export default new NativeFunction({
    name: "$skipTo",
    version: "1.0.0",
    description: "Skip the current track to the given position.",
    brackets: true,
    unwrap: true,
    args: [Arg.requiredNumber("Position", "The track position to be played.")],
    output: ArgType.Boolean,
    execute(ctx, [position]) {
        return this.success(getNode(ctx).skipTo(position))
    }
})