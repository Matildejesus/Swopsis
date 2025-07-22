/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('@expo/metro-config');
const { mergeConfig } = require('metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
    resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

const config = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
         unstable_allowRequireContext: true,
    },
    resolver: {
        assetExts: assetExts.filter((ext) => ext !== "svg"),
        sourceExts: [...sourceExts, "svg"],
        unstable_enablePackageExports: false,
        unstable_conditionNames: ['require', 'import'],
    },
};

module.exports = mergeConfig(defaultConfig, config);
