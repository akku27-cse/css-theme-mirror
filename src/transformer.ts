import Color from 'color';
import { CssVariable, ColorAdjustment, ThemeConfig } from './types';

export function transformVariables(
  variables: CssVariable[],
  direction: 'light' | 'dark',
  config: ThemeConfig = {}
): CssVariable[] {
  const defaultAdjustments: ColorAdjustment = {
    lighten: direction === 'dark' ? 0 : 0,
    darken: direction === 'light' ? 0 : 0,
    contrast: 1,
    ...config.defaultAdjustments,
  };

  return variables.map(variable => {
    if (!variable.isColor) {
      return variable;
    }

    try {
      const color = Color(variable.value);
      const varName = variable.name.toLowerCase();
      const adjustments = getAdjustmentsForVariable(varName, config, defaultAdjustments);

      return {
        ...variable,
        value: applyAdjustments(color, adjustments, direction).string(),
      };
    } catch (e) {
      // If color parsing fails, return the original value
      return variable;
    }
  });
}

function getAdjustmentsForVariable(
  varName: string,
  config: ThemeConfig,
  defaultAdjustments: ColorAdjustment
): ColorAdjustment {
  if (!config.colorAdjustments) {
    return defaultAdjustments;
  }

  // Check for exact matches first
  if (config.colorAdjustments[varName]) {
    return { ...defaultAdjustments, ...config.colorAdjustments[varName] };
  }

  // Check for partial matches (e.g., --text-*)
  for (const [key, adjustment] of Object.entries(config.colorAdjustments)) {
    if (varName.includes(key)) {
      return { ...defaultAdjustments, ...adjustment };
    }
  }

  // Apply semantic adjustments based on variable name
  const semanticAdjustments: ColorAdjustment = {};
  
  if (varName.includes('background') || varName.includes('bg')) {
    semanticAdjustments.darken = varName.includes('dark') ? 0 : (defaultAdjustments.darken || 0) + 10;
  } else if (varName.includes('text') || varName.includes('foreground') || varName.includes('fg')) {
    semanticAdjustments.lighten = varName.includes('light') ? 0 : (defaultAdjustments.lighten || 0) + 20;
  } else if (varName.includes('primary')) {
    semanticAdjustments.hueShift = (defaultAdjustments.hueShift || 0) + 0.05;
    semanticAdjustments.saturate = (defaultAdjustments.saturate || 0) + 10;
  }

  return { ...defaultAdjustments, ...semanticAdjustments };
}

function applyAdjustments(color: Color, adjustments: ColorAdjustment, direction: 'light' | 'dark'): Color {
  let result = color;

  if (adjustments.lighten) {
    result = result.lighten(adjustments.lighten / 100);
  }

  if (adjustments.darken) {
    result = result.darken(adjustments.darken / 100);
  }

  if (adjustments.saturate) {
    result = result.saturate(adjustments.saturate / 100);
  }

  if (adjustments.desaturate) {
    result = result.desaturate(adjustments.desaturate / 100);
  }

  if (adjustments.hueShift) {
    result = result.rotate(adjustments.hueShift * 360);
  }

  // Ensure minimum contrast for text/background
  if (adjustments.contrast) {
    const luminance = result.luminosity();
    const targetLuminance = direction === 'dark' ? 0.8 : 0.2;
    const diff = Math.abs(luminance - targetLuminance);
    
    if (diff < 0.3) {
      const factor = direction === 'dark' ? 1 + (0.3 - diff) : 1 - (0.3 - diff);
      result = result.lightness(result.lightness() * factor);
    }
  }

  return result;
}