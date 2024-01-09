import path = require("node:path");
import AudioNode = require("./structures/AudioNode");

// Sources
import Soundcloud = require("./sources/soundcloud/Soundcloud");

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            /**
             * Downloads audio automatically on created class
             */
            sound_auto_prepare: boolean;
            /**
             * The path to cache downloaded audio
             */
            sound_cache_dir: string;
        }
    }
}

process.env.sound_auto_prepare = true;
process.env.sound_cache_dir = path.join(process.cwd(), '.cache');


export {
    AudioNode,

    // Sources
    Soundcloud
}