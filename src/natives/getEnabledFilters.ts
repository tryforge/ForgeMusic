import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$getEnabledFilters",
    version: "1.0.0",
    description: "Return the enabled FFMPEG filters.",
    unwrap: false,
    output: ArgType.String,
    execute(ctx) {
        const queue = useQueue(ctx.guild)
        return this.success(queue.filters.ffmpeg.getFiltersEnabled().join(","))
    }
})