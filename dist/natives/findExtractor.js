"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_player_1 = require("discord-player");
exports.default = new forgescript_1.NativeFunction({
    name: '$findExtractor',
    version: '1.0.0',
    description: 'Find an extractor by name.',
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredString('Name', 'The name of the extractor to find.'),
    ],
    async execute(ctx, [query]) {
        const queue = (0, discord_player_1.useQueue)(ctx.guild.id);
        const extractors = Array.from(queue.player.extractors.store.values());
        let result;
        result = extractors.find((ex) => ex.identifier.toLowerCase() === query.toLowerCase() || ex.constructor.name.toLowerCase() === query.toLowerCase())?.identifier;
        return this.success(result);
    },
});
