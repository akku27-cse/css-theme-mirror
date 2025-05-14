import postcss from 'postcss';
import { ThemeConfig } from './types';

export interface CssVariable {
  name: string;
  value: string;
  isColor: boolean;
  line: number;
  column: number;
}

export async function parseCssVariables(filePath: string, config: ThemeConfig = {}): Promise<CssVariable[]> {
  const fs = await import('fs-extra');
  const css = await fs.readFile(filePath, 'utf-8');
  
  const root = postcss.parse(css);
  const variables: CssVariable[] = [];

  root.walkDecls(decl => {
    if (decl.prop.startsWith('--')) {
      const isColor = isColorValue(decl.value);
      variables.push({
        name: decl.prop,
        value: decl.value,
        isColor,
        line: decl.source?.start?.line || 0,
        column: decl.source?.start?.column || 0,
      });
    }
  });

  return variables;
}

function isColorValue(value: string): boolean {
  // Check for hex, rgb, rgba, hsl, hsla, named colors
  const colorRegex = /^(#([0-9a-f]{3}){1,2}|rgb(a?)\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+\s*)?\)|hsl(a?)\(\s*\d+\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*(,\s*[\d.]+\s*)?\)|transparent|currentColor)$/i;
  return colorRegex.test(value.trim());
}