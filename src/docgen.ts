import { generateMetadata, Logger } from "@tryforge/forgescript"
import { handlerName } from "@managers/MusicCommandManager"
import { join } from "path"

generateMetadata(
    join(__dirname, "natives"),
    "natives",
    handlerName,
    true,
    void 0,
    join(__dirname, "events")
)
.then(() => Logger.info("Documentation generation done"))
.catch((e) => Logger.error(e));