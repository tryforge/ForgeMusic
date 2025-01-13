import { readFileSync } from "fs"
import { join } from "path"

/**
 * Returns the package version.
 * @returns {string}
 */
export function getVersion() {
    const stringContent = readFileSync(
        join(
            process.cwd(),
            "package.json"
        ),
        "utf-8"
    )
    const data = JSON.parse(stringContent)

    return data.version as string
}