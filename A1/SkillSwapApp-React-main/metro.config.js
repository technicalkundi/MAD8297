// @ts-check
const { getDefaultConfig } = require('@expo/metro-config');

/** @type {import('metro-config').ConfigT} */
const config = getDefaultConfig(__dirname);

// Avoid Metro trying to read a non-existent file for anonymous frames on web
config.symbolicator = {
  customizeFrame(frame) {
    if (!frame.file) return { collapse: true };
    if (typeof frame.file === 'string' && frame.file.includes('<anonymous>')) {
      return { collapse: true };
    }
    return {};
  },
};

module.exports = config;
