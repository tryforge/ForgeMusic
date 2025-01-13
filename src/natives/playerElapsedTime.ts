import { ArgType, NativeFunction } from "@tryforge/forgescript"
import getNode from "@utils/getNode"

export default new NativeFunction({
    name: "$playerElapsedTime",
    version: "1.0.0",
    description: "Returns the elapsed time of the current song in milliseconds.",
    unwrap: false,
    output: ArgType.Number,
    execute(ctx) {
        return this.success(getNode(ctx).getTimestamp().progress * 1000)
    }
})