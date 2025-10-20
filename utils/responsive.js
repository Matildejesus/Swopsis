// utils/responsive.js
import { useWindowDimensions, PixelRatio, Platform } from "react-native";

const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

// Static helpers (can be used outside components if you pass width/height)
export const horizontalScaleStatic = (size, width = guidelineBaseWidth) =>
  (width / guidelineBaseWidth) * size;

export const verticalScaleStatic = (size, height = guidelineBaseHeight) =>
  (height / guidelineBaseHeight) * size;

export const moderateScaleStatic = (size, width = guidelineBaseWidth, factor = 0.5) =>
  size + (horizontalScaleStatic(size, width) - size) * factor;

// Hook for runtime/dynamic scaling (use this inside components)
export function useResponsive() {
    const { width, height } = useWindowDimensions();

    const isTablet = width >= 768;
    const isWeb = Platform.OS === "web";

    // Horizontal / vertical scale based on guideline
    const hs = (size) => (width / guidelineBaseWidth) * size;
    const vs = (size) => (height / guidelineBaseHeight) * size;
    const ms = (size, factor = 0.5) => size + (hs(size) - size) * factor;

    // Font scaling — respects user's accessibility font scale
    const scaleFont = (size) => {
        const scale = width / guidelineBaseWidth;
        const newSize = size * scale;
        const fontScale = PixelRatio.getFontScale ? PixelRatio.getFontScale() : 1;
        // On web, PixelRatio behavior varies — simpler rounding for web
        if (isWeb) return Math.round(newSize);
        return Math.round(PixelRatio.roundToNearestPixel(newSize) * fontScale);
};

    return {
        width,
        height,
        isTablet,
        isWeb,
        horizontalScale: hs,
        verticalScale: vs,
        moderateScale: ms,
        scaleFont,
    };
}
