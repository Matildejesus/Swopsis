// plugins/empty-android-label.js
const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function emptyAndroidLabel(config) {
  return withAndroidManifest(config, (cfg) => {
    const app = cfg.modResults.manifest.application?.[0];
    if (app) {
      // Either blank it out, or set to a very short name like " "
      app.$['android:label'] = ''; 
    }
    return cfg;
  });
};
