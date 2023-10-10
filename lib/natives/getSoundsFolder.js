"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$getSoundsFolder",
    description: "Returns the sounds directory folder specified in options",
    version: 'v0.0.1',
    unwrap: false,
    async execute(ctx) {
        return forgescript_1.Return.success(ctx.client.music.options.soundsFolder);
    }
});
