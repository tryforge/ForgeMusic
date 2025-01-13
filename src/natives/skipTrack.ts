import { ArgType, NativeFunction } from "@tryforge/forgescript"
import getNode from "@utils/getNode"

export default new NativeFunction({
    name: "$skipTrack",
    version: "1.0.0",
    description: "Skip the current track.",
    unwrap: false,
    output: ArgType.Boolean,
    execute(ctx) {
        return this.success(getNode(ctx).skip())
    }
})