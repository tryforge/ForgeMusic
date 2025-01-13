import { ArgType, NativeFunction } from "@tryforge/forgescript"
import getNode from "@utils/getNode"

export default new NativeFunction({
    name: "$resumeTrack",
    version: "1.0.0",
    description: "Resumes the current paused track.",
    unwrap: false,
    output: ArgType.Boolean,
    execute(ctx) {
        return this.success(getNode(ctx).resume())
    }
})