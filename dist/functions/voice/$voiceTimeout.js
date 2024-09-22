"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: "$voiceTimeout",
    description: "A timeout configuration for the client to leave the voice channel.",
    unwrap: true,
    brackets: true,
    args: [],
    async execute(context) {
        return this.success("");
    }
});
