import { ForgeClient, ForgeExtension } from "forgescript";
import path = require("node:path");
import AudioPlayerNode = require("../structures/AudioPlayerNode");

const { version }: { version: string } = require(path.join(__dirname, "../..", "package.json"));

declare module "forgescript" {
    interface ForgeClient {
        music: MusicExtension;
    }
}

class MusicExtension extends ForgeExtension {
    public name = "ForgeMusic";
    public description = "A music extension for forgescript.";
    public version = version;

    public readonly nodes = new Map<string, AudioPlayerNode>();
    public readonly config = new Map<string, string | number | boolean>();
    public init(client: ForgeClient) {
        client.music = this;
    }
}

export = MusicExtension;