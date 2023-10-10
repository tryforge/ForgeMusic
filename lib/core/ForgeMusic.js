"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const forgescript_1 = require("forgescript");
const naoko_player_1 = require("naoko-player");
const node_path_1 = __importDefault(require("node:path"));
class ForgeMusic extends forgescript_1.ForgeExtension {
    constructor(options) {
        super();
        this.name = 'ForgeMusic';
        this.description = 'A standard music extension library for forgescript';
        this.version = 'v0.0.1';
        this.manager = new naoko_player_1.MusicManager({ providers: [] });
        this.options = ForgeMusic.buildBaseOptions();
        this.options = { ...this.options, ...options };
    }
    init(client) {
        forgescript_1.FunctionManager.load(node_path_1.default.join(__dirname, '..', 'natives'));
        client['music'] = this;
        if (this.options.addLocalProvider) {
            this.addProvider(new naoko_player_1.Providers.LocalProvider());
        }
    }
    addProvider(provider) {
        this.manager.providers.set(provider.provider, provider);
    }
    get registeredProviders() {
        return Array.from(this.manager.providers.keys());
    }
    static buildBaseOptions() {
        return {
            soundsFolder: node_path_1.default.join(process.cwd(), 'sounds'),
            defaultProvider: 'local',
            addLocalProvider: true
        };
    }
}
module.exports = ForgeMusic;
