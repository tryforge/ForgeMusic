"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersion = getVersion;
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Returns the package version.
 * @returns {string}
 */
function getVersion() {
    const stringContent = (0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), "package.json"), "utf-8");
    const data = JSON.parse(stringContent);
    return data.version;
}
