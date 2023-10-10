import { ForgeClient, ForgeExtension } from "forgescript";
import { Providers, MusicManager } from "naoko-player";
interface MusicExtensionOptions {
    soundsFolder?: string;
    defaultProvider?: string;
    addLocalProvider?: boolean;
}
declare class ForgeMusic extends ForgeExtension {
    name: string;
    description: string;
    version: string;
    manager: MusicManager;
    options: MusicExtensionOptions;
    constructor(options: MusicExtensionOptions);
    init(client: ForgeClient): void;
    addProvider(provider: Providers.Provider): void;
    get registeredProviders(): string[];
    static buildBaseOptions(): MusicExtensionOptions;
}
declare module 'discord.js' {
    interface Client {
        music: ForgeMusic;
    }
}
export = ForgeMusic;
