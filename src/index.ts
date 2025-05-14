import { GenerateOptions } from './types';
import { generateThemeFile } from './generator';

export async function generateTheme(options: GenerateOptions): Promise<string> {
  return generateThemeFile(options);
}

export { ThemeConfig, ColorAdjustment, ColorAdjustments } from './types';