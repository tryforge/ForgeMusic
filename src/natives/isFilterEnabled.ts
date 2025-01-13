import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { FFMPEGFilters } from "@utils/constants"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$isFilterEnabled",
    version: "1.0.0",
    description: "Check whether the provided filter is enabled.",
    brackets: true,
    unwrap: true,
    args: [Arg.requiredEnum(FFMPEGFilters, "Filters", "Filter names to be toggled.")],
    output: ArgType.Boolean,
    async execute(ctx, [filter]) {
        const queue = useQueue(ctx.guild)
        const allFilters = queue.filters.ffmpeg.getFiltersEnabled().concat(queue.filters.ffmpeg.getFiltersDisabled())

        const foundFilter = allFilters.find((fil) => fil.toLowerCase() === filter.toLowerCase())

        return this.success(queue.filters.ffmpeg.isEnabled(foundFilter))
    }
})