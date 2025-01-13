import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import getNode from "@utils/getNode"

export default new NativeFunction({
    name: "$seekTrack",
    version: "1.0.0",
    description: "Seeks a track.",
    brackets: true,
    unwrap: true,
    args: [Arg.requiredTime("Duration", "Seek duration to be applied.")],
    output: ArgType.Boolean,
    async execute(ctx, [duration]) {
        return this.success(await getNode(ctx).seek(duration))
    }
})