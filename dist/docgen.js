"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const forgescript_1 = require("@tryforge/forgescript");
const MusicCommandManager_1 = require("./classes/managers/MusicCommandManager");
const ascii_table3_1 = require("ascii-table3");
const path_1 = require("path");
(0, forgescript_1.generateMetadata)((0, path_1.join)(__dirname, "natives"), "natives", MusicCommandManager_1.handlerName, true, void 0, (0, path_1.join)(__dirname, "events"))
    .then(() => forgescript_1.Logger.info("Documentation generation done"))
    .catch((e) => forgescript_1.Logger.error(e));
function toCamelCase(text) {
    return text.split(' ').map((part, i) => i === 0
        ? part.toLowerCase()
        : `${part[0].toUpperCase()}${part.slice(1)}`).join("");
}
/**
 * Generates markdown documentation for every function in the library.
 */
function generateFunctionDocs() {
    const dataPath = (0, path_1.join)(process.cwd(), "metadata", "functions.json");
    const data = JSON.parse((0, fs_1.readFileSync)(dataPath, "utf-8"));
    if (!(0, fs_1.existsSync)((0, path_1.join)(process.cwd(), "docs"))) {
        (0, fs_1.mkdirSync)((0, path_1.join)(process.cwd(), "docs"));
    }
    for (const func of data) {
        forgescript_1.Logger.info("Parsing", func.name);
        let content = [
            `# ${func.name}`,
            func.description,
            '## Usage',
            `\`\`\`\n${func.name}${!!func.args ? ('[' + `${func.args.map(t => `${t.rest ? '...' : ''}${toCamelCase(t.name)}${t.required ? '' : '?'}`).join(";")}` + ']') : ''}\n\`\`\``,
        ];
        if (func.args) {
            const args = func.args.map(f => [f.name, f.description, f.type, f.required ? 'Yes' : 'No', f.rest ? 'Yes' : 'No']);
            const table = new ascii_table3_1.AsciiTable3()
                .setStyle('github-markdown')
                .setHeading('Name', 'Description', 'Type', 'Required', 'Rest')
                .addRowMatrix(args);
            content.push('## Fields', table.toString());
        }
        if (func.output) {
            content.push('## Output', `> ${func.output.join(', ')}`);
        }
        content.push(`View source on [GitHub](https://github.com/Cyberghxst/forgemusic/blob/dev/src/natives/${func.name.slice(1)}.ts)`);
        (0, fs_1.writeFileSync)((0, path_1.join)(process.cwd(), "docs", `${func.name.slice(1)}.md`), content.join("\n"), "utf-8");
    }
    return true;
}
generateFunctionDocs();
