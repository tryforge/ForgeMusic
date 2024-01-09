enum AudioNodeEvents {
    ConnectionAdded = "connectionAdded"
}

interface AudioSoundMetadata {
    title: string;
    identifier: string;
    sourceName: string;
    author: string;
    artworkId: string;
    isStream: boolean;
}



export {
    AudioNodeEvents,
    AudioSoundMetadata
}