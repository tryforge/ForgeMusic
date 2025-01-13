# $searchTrack
Search for a track using the given query.
## Usage
```
$searchTrack[query;textResult;separator?;engine?;fallbackEngine?;limit?;addToPlayer?;...blockExtractors?]
```
## Fields
|       Name       |                                    Description                                     |  Type   | Required | Rest |
|------------------|------------------------------------------------------------------------------------|---------|----------|------|
| Query            | The query to search for.                                                           | String  | Yes      | No   |
| Text Result      | The formatted text result to return.                                               | String  | Yes      | No   |
| Separator        | The result separator.                                                              | String  | No       | No   |
| Engine           | The query search engine, can be extractor name to target an specific one. (custom) | String  | No       | No   |
| Fallback Engine  | Fallback search engine to use.                                                     | Enum    | No       | No   |
| Limit            | The maximum number of results to return.                                           | Number  | No       | No   |
| Add To Player    | Whether add the results to the music player.                                       | Boolean | No       | No   |
| Block Extractors | List of extractors to block.                                                       | String  | No       | Yes  |

View source on [GitHub](https://github.com/Cyberghxst/forgemusic/blob/dev/src/natives/searchTrack.ts)