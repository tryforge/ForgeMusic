import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { generateMetadata, Logger } from "@tryforge/forgescript"
import { handlerName } from "@managers/MusicCommandManager"
import { AsciiTable3 } from "ascii-table3"
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

function toCamelCase(text: string): string {
    return text.split(' ').map(
        (part, i) => i === 0 
            ? part.toLowerCase()
            : `${part[0].toUpperCase()}${part.slice(1)}`
    ).join("")
}

/**
 * Generates markdown documentation for every function in the library.
 */
function generateFunctionDocs() {
    const dataPath = join(process.cwd(), "metadata", "functions.json")
    const data = JSON.parse(readFileSync(dataPath, "utf-8"))

    if (!existsSync(join(process.cwd(), "docs"))) {
        mkdirSync(join(process.cwd(), "docs"))
    }

    for (const func of data) {
        Logger.info("Parsing", func.name)

        let content = [
            `# ${func.name}`,
            func.description,
            '## Usage',
            `\`\`\`\n${func.name}${!!func.args ? ('[' + `${func.args.map(t => `${t.rest ? '...' : ''}${toCamelCase(t.name)}${t.required ? '' : '?'}`).join(";")}` + ']') : ''}\n\`\`\``,
        ]

        if (func.args) {
            const args = func.args.map(f => [f.name, f.description, f.type, f.required ? 'Yes' : 'No', f.rest ? 'Yes' : 'No'])

            const table = new AsciiTable3()
            .setStyle('github-markdown')
            .setHeading('Name', 'Description', 'Type', 'Required', 'Rest')
            .addRowMatrix(args)

            content.push('## Fields', table.toString())
        }

        if (func.output) {
            content.push('## Output', `> ${func.output.join(', ')}`)
        }

        content.push(`View source on [GitHub](https://github.com/Cyberghxst/forgemusic/blob/dev/src/natives/${func.name.slice(1)}.ts)`)

        writeFileSync(join(process.cwd(), "docs", `${func.name.slice(1)}.md`), content.join("\n"), "utf-8")
    }

    return true
}

generateFunctionDocs()