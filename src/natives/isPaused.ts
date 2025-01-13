import { ArgType, NativeFunction } from "@tryforge/forgescript"
import getNode from "@utils/getNode"

export default new NativeFunction({
    name: "$isPaused",
    version: "1.0.0",
    description: "Check whether the music player is paused.",
    unwrap: false,
    output: ArgType.Boolean,
    execute(ctx) {
        return this.success(getNode(ctx).isPaused())
    }
})