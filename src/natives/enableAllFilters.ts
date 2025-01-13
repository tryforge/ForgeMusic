import { Arg, NativeFunction } from "@tryforge/forgescript"
import { FFMPEGFilters } from "@utils/constants"
import { useQueue } from "discord-player"

export default new NativeFunction({
    name: "$enableAllFilters",
    version: "1.0.0",
    description: "Enable the provided FFMPEG filters.",
    brackets: true,
    unwrap: true,
    args: [Arg.restEnum(FFMPEGFilters, "Filters", "Filter names to be enabled.")],
    async execute(ctx, [filters]) {
        const queue = useQueue(ctx.guild)
        const allFilters = queue.filters.ffmpeg.getFiltersDisabled()

        for (const filter of filters) {
            const foundFilter = allFilters.find((fil) => fil.toLowerCase() === filter.toLowerCase())
            await queue.filters.ffmpeg.toggle(foundFilter);
        }

        return this.success()
    }
})