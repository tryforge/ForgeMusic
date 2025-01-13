import { ArgType, NativeFunction } from "@tryforge/forgescript"
import getNode from "@utils/getNode"

export default new NativeFunction({
    name: "$getVolume",
    version: "1.0.0",
    description: "Get the current volume of the music player.",
    unwrap: false,
    output: ArgType.Number,
    execute(ctx) {
        return this.success(getNode(ctx).volume)
    }
})