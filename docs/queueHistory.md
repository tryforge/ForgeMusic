# $queueHistory
Returns queue history songs resolving the given text placeholders.
## Usage
```
$queueHistory[startIndex?;limit?;text?;separator?]
```
## Fields
|    Name     |                    Description                     |  Type  | Required | Rest |
|-------------|----------------------------------------------------|--------|----------|------|
| Start Index | The queue song start index.                        | Number | No       | No   |
| Limit       | The amount of queue history songs to be retrieved. | Number | No       | No   |
| Text        | The text to be resolved.                           | String | No       | No   |
| Separator   | The separator for each result.                     | String | No       | No   |

## Output
> String
View source on [GitHub](https://github.com/Cyberghxst/forgemusic/blob/dev/src/natives/queueHistory.ts)