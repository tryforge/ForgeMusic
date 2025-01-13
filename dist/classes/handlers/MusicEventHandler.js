"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicEventHandler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const ForgeMusic_1 = require("../structures/ForgeMusic");
/**
 * The generic music event handler.
 */
class MusicEventHandler extends forgescript_1.BaseEventHandler {
    /**
     * Register this event.
     * @param client - ForgeClient instance.
     */
    register(client) {
        client.getExtension(ForgeMusic_1.ForgeMusic).player.events.on(this.name, this.listener.bind(client));
    }
}
exports.MusicEventHandler = MusicEventHandler;
