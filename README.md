# forge-music
> A standard music extension library for forgescript 

[![ForgeMusic](https://img.shields.io/github/package-json/v/tryforge/ForgeMusic/main?label=forge-music&color=5c16d4)](https://github.com/tryforgeForgeMusic/)
[![forgescript](https://img.shields.io/github/package-json/v/tryforge/ForgeScript/main?label=forgescript&color=5c16d4)](https://github.com/tryforge/ForgeScript/)
[![Discord](https://img.shields.io/discord/739934735387721768?logo=discord)](https://discord.gg/hcJgjzPvqb)

## Usage
You can install from github:
```bash
npm install https://github.com/tryforge/ForgeMusic.git
```
From Node.js Package Manager:
```bash
# NPM
npm install forge-music
# YARN
yarn add forge-music
```

## How to use
Add package to your client initialization
```js
const { ForgeMusic } = require('forge-music');
const { ForgeClient } = require('forgescript');

const client = new ForgeClient({
    // "GuildVoiceStates" is important for music
    intents: [
        "Guilds", 
        "GuildMessages", 
        "MessageContent", 
        "GuildVoiceStates"
    ],
    extension: [
        new ForgeMusic({ soundsFolder: `${process.cwd()}/sounds` })
    ]
});
```

<br>

The `ForgeMusic` instantiated class is exposed in `client.music` and available as typings.

The `ForgeMusic` extension registers functions listed below:
- `$vcJoin[voiceChannel]` - Connects to a voice channel
    - `voiceChannel (Channel)` - The voice channel to establish connection
- `$defaultProvider[providerName]` - Changes the default provider of current execution
    - `providerName (String)` - The provider to use for searching tracks
- `$getSoundsFolder` - Returns the `soundsFolder` from specified options in `ForgeMusic.options`
- `$getTrackInfo[track encoded id;record key]` - Returns information about record key from track
    - `track encoded id (String)` - The encoded id to get track from cache
    - `record key (String)` - The key from object record to retreive information
- `$loadTracks[query;loadType;providerName?]` - Search tracks from specified provider. Returns an array of `track encoded id`
    - `query (String)` - The query to search for tracks
    - `loadType (Enum: LoadResultType)` - The type to filter result. Enum: `Search`, `Track`, `Playlist`.
- `$playTrack[track encoded id]` - Sends request to the Audio player to play track
    - `track encoded id (String)` - The encoded id to get track from cache
- `$playerStop` - Sends request to the Audio player to stop playing


## API
### ForgeMusic
The extension which manages music handlers for forgescript
- `ForgeMusic.options` - The options that is provided to constructor
    - `soundsFolder` - The path to folder for sounds
- `ForgeMusic.manager` - The music manager which manages tracks and audio players.
    - `.manager is MusicManager` - The class manager from [![NaokoPlayer](https://img.shields.io/github/package-json/v/KairoKunazuki/NaokoPlayer/main?label=naoko-player&color=5c16d4)](https://github.com/KairoKunazuki/NaokoPlayer/)
- `ForgeMusic.addProvider(Provider)` - Adds a provider to collecton
    - `Provider is Providers.Provider` - The class provider from [![NaokoPlayer](https://img.shields.io/github/package-json/v/KairoKunazuki/NaokoPlayer/main?label=naoko-player&color=5c16d4)](https://github.com/KairoKunazuki/NaokoPlayer/)

### Providers
The provider which the service that serves tracks and audios. <br>
Provider can be custom created, and it is not limited to any service.

Current providers is added within package:
- `Providers.LocalProvider` - A local provider added from [![NaokoPlayer](https://img.shields.io/github/package-json/v/KairoKunazuki/NaokoPlayer/main?label=naoko-player&color=5c16d4)](https://github.com/KairoKunazuki/NaokoPlayer/)
## Roadmap
The goal for future updates:
- A track queue system
- Audio player features for `filter`, `seek`, and etc
- Music Events `playing`, `resumed`, `paused`, `stopped`, `filters`, and etc
- Extensive Provider support.