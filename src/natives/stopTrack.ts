import { ArgType, NativeFunction } from "@tryforge/forgescript"
import getNode from "@utils/getNode"

export default new NativeFunction({
    name: "$stopTrack",
    version: "1.0.0",
    description: "Forces to stop the current track.",
    unwrap: false,
    output: ArgType.Boolean,
    execute(ctx) {
        return this.success(getNode(ctx).stop(true))
    }
})