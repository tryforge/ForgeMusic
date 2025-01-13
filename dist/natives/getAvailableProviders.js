"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: "$getAvailableProviders",
    version: "1.0.0",
    description: "Get the available audio providers.",
    unwrap: false,
    output: forgescript_1.ArgType.String,
    execute(ctx) {
        const names = [...(0, discord_player_1.useMainPlayer)().extractors.store.values()]
            .map((x) => x.constructor.name.replace("Extractor", "").replace(/[^a-zA-Z+]/g, ""));
        return this.success(names.join(","));
    }
});
