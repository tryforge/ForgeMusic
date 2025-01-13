import { ArgType, NativeFunction } from "@tryforge/forgescript"
import getNode from "@utils/getNode"

export default new NativeFunction({
    name: "$currentTrackTotalDuration",
    version: "1.0.0",
    description: "Returns the total duration of the current audio track.",
    unwrap: false,
    output: ArgType.Number,
    execute(ctx) {
        return this.success(getNode(ctx).totalDuration)
    }
})