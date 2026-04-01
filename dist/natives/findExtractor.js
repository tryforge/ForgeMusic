"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ForgeMusic_1 = require("../classes/structures/ForgeMusic");
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$findExtractor',
    version: '1.0.0',
    description: 'Find an extractor by name.',
    brackets: true,
    unwrap: true,
    args: [forgescript_1.Arg.requiredString('Name', 'The name of the extractor to find.')],
    async execute(ctx, [query]) {
        const globalPlayer = ctx.getExtension(ForgeMusic_1.ForgeMusic).player;
        if (!globalPlayer)
            return this.customError('Unable to find an instance of player!');
        const extractors = Array.from(globalPlayer.extractors.store.values());
        let result;
        result = extractors.find((ex) => ex.identifier.toLowerCase().includes(query.toLowerCase()) ||
            ex.constructor.name.toLowerCase().includes(query.toLowerCase()))?.identifier;
        return this.success(result);
    },
});
