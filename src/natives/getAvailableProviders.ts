import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { useMainPlayer } from "discord-player"

export default new NativeFunction({
    name: "$getAvailableProviders",
    version: "1.0.0",
    description: "Get the available audio providers.",
    unwrap: false,
    output: ArgType.String,
    execute(ctx) {
        const names = [...useMainPlayer().extractors.store.values()]
        .map((x) => x.constructor.name.replace("Extractor", "").replace(/[^a-zA-Z+]/g, ""))

        return this.success(names.join(","))
    }
})