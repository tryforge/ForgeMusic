"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLACEHOLDER_PATTERN = exports.FFMPEGFilters = void 0;
/**
 * The list including the names of valid filters.
 */
var FFMPEGFilters;
(function (FFMPEGFilters) {
    FFMPEGFilters["Bassboost_low"] = "Bassboost_low";
    FFMPEGFilters["Bassboost"] = "Bassboost";
    FFMPEGFilters["Bassboost_high"] = "Bassboost_high";
    FFMPEGFilters["8d"] = "8d";
    FFMPEGFilters["Vaporwave"] = "Vaporwave";
    FFMPEGFilters["Nightcore"] = "Nightcore";
    FFMPEGFilters["Lofi"] = "Lofi";
    FFMPEGFilters["Phaser"] = "Phaser";
    FFMPEGFilters["Tremolo"] = "Tremolo";
    FFMPEGFilters["Vibrato"] = "Vibrato";
    FFMPEGFilters["Reverse"] = "Reverse";
    FFMPEGFilters["Treble"] = "Treble";
    FFMPEGFilters["Normalizer2"] = "Normalizer2";
    FFMPEGFilters["Normalizer"] = "Normalizer";
    FFMPEGFilters["Surrounding"] = "Surrounding";
    FFMPEGFilters["Pulsator"] = "Pulsator";
    FFMPEGFilters["Subboost"] = "Subboost";
    FFMPEGFilters["Karaoke"] = "Karaoke";
    FFMPEGFilters["Flanger"] = "Flanger";
    FFMPEGFilters["Gate"] = "Gate";
    FFMPEGFilters["Haas"] = "Haas";
    FFMPEGFilters["Mcompand"] = "Mcompand";
    FFMPEGFilters["Mono"] = "Mono";
    FFMPEGFilters["Mstlr"] = "Mstlr";
    FFMPEGFilters["Mstrr"] = "Mstrr";
    FFMPEGFilters["Compressor"] = "Compressor";
    FFMPEGFilters["Expander"] = "Expander";
    FFMPEGFilters["Softlimiter"] = "Softlimiter";
    FFMPEGFilters["Chorus"] = "Chorus";
    FFMPEGFilters["Chorus2d"] = "Chorus2d";
    FFMPEGFilters["Chorus3d"] = "Chorus3d";
    FFMPEGFilters["Fadein"] = "Fadein";
    FFMPEGFilters["Dim"] = "Dim";
    FFMPEGFilters["Earrape"] = "Earrape";
    FFMPEGFilters["Silenceremove"] = "Silenceremove";
})(FFMPEGFilters || (exports.FFMPEGFilters = FFMPEGFilters = {}));
/**
 * Capture pattern for song placeholders.
 */
exports.PLACEHOLDER_PATTERN = /\{[a-zA-Z0-9._]+(?:\.[a-zA-Z0-9._]+)*\}/g;
