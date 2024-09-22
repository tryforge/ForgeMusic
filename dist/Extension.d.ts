import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";
declare const SymbolGet: unique symbol;
declare module "@tryforge/forgescript" {
    interface ForgeClient {
        [SymbolGet]: Extension;
    }
}
export declare class Extension extends ForgeExtension {
    readonly name = "Forge.Music";
    readonly description = "";
    readonly version = "v1.0.0";
    init(client: ForgeClient): void;
    static getInstance(client: ForgeClient): Extension;
}
export {};
