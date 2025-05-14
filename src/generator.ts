import { CssVariable, GenerateOptions } from './types';
import fs from 'fs-extra';
import postcss from 'postcss';
import { parseCssVariables } from './parser';
import { transformVariables } from './transformer';

export async function generateThemeFile(options: GenerateOptions): Promise<string> {
  const { input, output, direction, config, format = 'css', selector } = options;
  
  const variables = await parseCssVariables(input, config);
  const transformed = transformVariables(variables, direction, config);
  
  const cssContent = generateCssContent(transformed, direction, format, selector);
  
  if (output) {
    await fs.writeFile(output, cssContent);
  }
  
  return cssContent;
}

function generateCssContent(
  variables: CssVariable[],
  direction: 'light' | 'dark',
  format: 'css' | 'scss' | 'tailwind',
  selector?: string
): string {
  const defaultSelector = direction === 'dark' ? ':root.dark' : ':root.light';
  const themeSelector = selector || defaultSelector;
  
  let content = '';
  
  if (format === 'scss') {
    content += `$${direction}-theme: (\n`;
    variables.forEach(variable => {
      content += `  ${variable.name}: ${variable.value},\n`;
    });
    content += ');\n';
  } else if (format === 'tailwind') {
    content += `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        ${direction}: {\n`;
    variables.forEach(variable => {
      const name = variable.name.replace('--', '').replace(/-/g, '_');
      content += `          '${name}': '${variable.value}',\n`;
    });
    content += '        },\n      },\n    },\n  },\n};\n';
  } else {
    // Default CSS format
    content += `${themeSelector} {\n`;
    variables.forEach(variable => {
      content += `  ${variable.name}: ${variable.value};\n`;
    });
    content += '}\n';
  }
  
  return content;
}