<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSUzclkbLsI7SU-bpLU87LWTP3YN9g7oFkQ2vOJqhirn03qEeex9M2vo5N&s=10" align="right" height=100 alt="cat" />

# ForgeMusic
An standard music library tailored for [ForgeScript](https://npmjs.com/package/@tryforge/forgescript).

<a href="https://github.com/tryforge/ForgeDB/"><img src="https://img.shields.io/github/package-json/v/tryforge/ForgeMusic/main?label=@tryforge/forge.music&color=5c16d4" alt="@tryforge/forge.music"></a>
<a href="https://github.com/tryforge/ForgeScript/"><img src="https://img.shields.io/github/package-json/v/tryforge/ForgeScript/main?label=@tryforge/forgescript&color=5c16d4" alt="@tryforge/forgescript"></a>
<a href="https://discord.gg/hcJgjzPvqb"><img src="https://img.shields.io/discord/739934735387721768?logo=discord" alt="Discord"></a>

-----
## Features
- Easy to use API.
- Various amount of events.
- Support for various filters.
- Support for most audio providers.

----
## Contents
1. [Installation](#installation)
2. [Setup](#setup)
	1. [Listening Events](#listening-events)
        1. [Disallowed Events](#disallowed-events)
	2. [Commands](#commands)
		1. [Event Data: Types and Interfaces](#event-data-types-and-interfaces)
			1. [Example](#example)
3. [Advices](#advices)
4. [Tips](#tips)
    1. [Adding support for YouTube](#adding-support-for-youtube)
5. [Contributors](#contributors)
----
## Installation
In your project, navigate to your terminal and write the following command.
```bash
npm install @tryforge/forge.music
```
If you are using another package manager than npm, Google how to install Node.js dependencies.

----
## Setup
Now, you must require the `ForgeMusic` class in your main file.
```js
const { ForgeMusic } = require("@tryforge/forge.music");
```
As it is required, now you are allowed to create an instance of it.
```js
// Without options.
const music = new ForgeMusic();

// With options.
const music = new ForgeMusic({
    events: []
});
```
Now, extension is defined and ready to be attached to the client.
```js
const client = new ForgeClient({
    extensions: [music],
    // ...client options
});
```
> [!CAUTION]
> Your `ForgeClient` instance requires the following intent in order for ForgeMusic to work: **GuildVoiceStates**.
### Listening Events
ForgeMusic provides a simple interface to declare the events to listen to.
First, we need to require the `GuildQueueEvent` enumerator.
```js
const { ForgeMusic, GuildQueueEvent } = require("@tryforge/forge.music");
```
As it is required, now you must pass an array of values of this enumerator under `events` property in ForgeMusic constructor.
```js
const music = new ForgeMusic({
    events: [
        GuildQueueEvent.PlayerFinish,
        GuildQueueEvent.PlayerStart,
        GuildQueueEvent.PlayerError,
        GuildQueueEvent.Error
    ]
});
```
Current setup must look like this.
```js
const { ForgeMusic, GuildQueueEvent } = require("@tryforge/forge.music");
const music = new ForgeMusic({
    events: [
        GuildQueueEvent.PlayerFinish,
        GuildQueueEvent.PlayerStart,
        GuildQueueEvent.PlayerError,
        GuildQueueEvent.Error
    ]
});

const client = new ForgeClient({
    extensions: [music],
    // ...client options
});
```
#### Disallowed Events
The following events are not supported by the extension.
- VoiceStateUpdate
- WillAutoPlay
- WillPlayTrack
### Commands
To add event commands, ForgeMusic provides an integrated command manager to take care of this.
You must define your commands after your ForgeClient definition to prevent errors.
```js
// Adding directly.
music.commands.add({
    name: "commandName",
    type: GuildQueueEvent.PlayerStart,
    code: "$log[A track started playing.]"
});

// Loading from a path tree.
music.commands.load("./path/to/commands");
```
#### Event Data: Types and Interfaces
In each music event, you can access to that event data using the JSON Dump ([$env](https://github.com/tryforge/ForgeScript/blob/main/src%2Fnative%2Fvariable%2Fenv.ts)).
The following, is a list of event with its accessible properties.
- [AudioFiltersUpdate](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FaudioFiltersUpdate.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
    - `oldFilters`: [FiltersName](https://discord-player.js.org/docs/discord-player/type/FiltersName)
    - `newFilters`: [FiltersName](https://discord-player.js.org/docs/discord-player/type/FiltersName)
- [AudioTrackAdd](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FaudioTrackAdd.ts)
	- `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
	- `track`: [Track](https://discord-player.js.org/docs/discord-player/class/Track)
- [AudioTrackRemove](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FaudioTrackRemove.ts)
	- `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
	- `track`: [Track](https://discord-player.js.org/docs/discord-player/class/Track)
- [BiquadFiltersUpdate](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FbiquadFiltersUpdate.ts)
	- `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
	- `oldFilters`: [BiquadFilters](https://discord-player.js.org/docs/discord-player/type/BiquadFilters)
    - `newFilters`: [BiquadFilters](https://discord-player.js.org/docs/discord-player/type/BiquadFilters)
- [ChannelPopulate](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FchannelPopulate.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
- [Connection](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2Fconnection.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
- [ConnectionDestroyed](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FconnectionDestroyed.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
- [Debug](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2Fdebug.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
    - `message`: string
- [Disconnect](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2Fdisconnect.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
- [DSPUpdate](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FdspUpdate.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
    - `oldFilters`: [PCMFilters[]](https://discord-player.js.org/docs/discord-player/type/PCMFilters)
    - `newFilters`: [PCMFilters[]](https://discord-player.js.org/docs/discord-player/type/PCMFilters)
- [EmptyChannel](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FemptyChannel.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
- [EmptyQueue](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FemptyQueue.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
- [EqualizerUpdate](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FequalizerUpdate.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
    - `oldFilters`: [EqualizerBand[]](https://discord-player.js.org/docs/%40discord-player%2Fequalizer/type/EqualizerBand)
    - `newFilters`: [EqualizerBand[]](https://discord-player.js.org/docs/%40discord-player%2Fequalizer/type/EqualizerBand)
- [Error](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2Ferror.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
    - `error`: Error
- [PlayerError](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FplayerError.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
    - `error`: Error
    - `track`: [Track](https://discord-player.js.org/docs/discord-player/class/Track)
- [PlayerFinish](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FplayerFinish.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
	- `track`: [Track](https://discord-player.js.org/docs/discord-player/class/Track)
- [PlayerPause](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FplayerPause.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
- [PlayerResume](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FplayerResume.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
- [PlayerSkip](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FplayerSkip.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
	- `track`: [Track](https://discord-player.js.org/docs/discord-player/class/Track)
    - `reason`: [TrackSkipReason]()
    - `description`: string
- [PlayerStart](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FplayerStart.ts)
	- `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
	- `track`: [Track](https://discord-player.js.org/docs/discord-player/class/Track)
- [PlayerTrigger](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FplayerTrigger.ts)
	- `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
	- `track`: [Track](https://discord-player.js.org/docs/discord-player/class/Track)
    - `reason`: [PlayerTriggeredReason](https://discord-player.js.org/docs/discord-player/type/PlayerTriggeredReason)
- [QueueCreate](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FqueueCreate.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
- [QueueDelete](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FqueueDelete.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
- [VolumeChange](https://github.com/tryforge/ForgeMusic/blob/main/src%2Fevents%2FvolumeChange.ts)
    - `queue`: [GuildQueue](https://discord-player.js.org/docs/discord-player/class/GuildQueue)
    - `oldVolume`: number
    - `newVolume`: number
##### Example
```js
{
    name: "myCommand",
    type: GuildQueueEvent.PlayerStart,
    code: "$!sendMessage[$env[queue;metadata;text;id];A track started playing.]"
}
```
## Advices
- You must add the following events to the extension in order to work properly.
    - GuildQueueEvent.Error
    - GuildQueueEvent.PlayerError
## Tips
### Default Extractors
The base framework provides some base music sources you can use. You must load them like follows.
```js
const { DefaultExtractors } = require("@tryforge/forge.music");
const music = new ForgeMusic({
    // ...
    includeExtractors: DefaultExtractors
});
```
### Adding Support for YouTube
ForgeMusic by default provides support for streaming from YouTube, but the native method is not stable as intended.
For this, you must omit the registration of the default **YouTube Extractor** by doing the following step.
You must install `discord-player-youtubei` and then require `YoutubeiExtractor` from it.
```bash
npm install discord-player-youtubei
```
then, do the following step.
```js
const { DefaultExtractors, ForgeMusic, GuildQueueEvent } = require("@tryforge/forge.music");
const { YoutubeiExtractor } = require("discord-player-youtubei");
const music = new ForgeMusic({
    events: [
        GuildQueueEvent.AudioTrackAdd,
        GuildQueueEvent.Connection,
        GuildQueueEvent.PlayerError,
        GuildQueueEvent.Error
    ],
    includeExtractors: DefaultExtractors
});
```
With the previous step done, register the **YoutubeiExtractor** into the extension registry.
```js
music.player.extractors.register(YoutubeiExtractor, {});
```
And now, you're ready to use YouTube provider as smooth as possible.
## Contributors
Many thanks for the contributors for making this extension the best choice out there.
[![tryforge/ForgeMusic](https://contrib.rocks/image?repo=tryforge/ForgeMusic)](https://github.com/tryforge/ForgeMusic)
