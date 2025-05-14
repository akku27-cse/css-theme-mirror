#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs-extra';
import { generateTheme } from '.';
import { GenerateOptions } from './types';

const program = new Command();

program
  .name('css-theme-mirror')
  .description('Generate complementary CSS themes based on color theory')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate a theme from a base CSS file')
  .requiredOption('-i, --input <file>', 'Input CSS file')
  .option('-o, --output <file>', 'Output file (default: stdout)')
  .requiredOption('-d, --direction <direction>', 'Theme direction (light|dark)')
  .option('-c, --config <file>', 'Configuration file')
  .option('--format <format>', 'Output format (css|scss|tailwind)', 'css')
  .option('--selector <selector>', 'Custom CSS selector for the theme')
  .option('--preserve-comments', 'Preserve comments in output', false)
  .action(async (options) => {
    try {
      const config = options.config ? await fs.readJson(options.config) : {};
      
      if (options.preserveComments) {
        config.preserveComments = true;
      }

      const result = await generateTheme({
        input: options.input,
        output: options.output,
        direction: options.direction,
        config,
        format: options.format,
        selector: options.selector,
      });

      if (!options.output) {
        console.log(result);
      } else {
        console.log(`Theme generated successfully: ${options.output}`);
      }
    } catch (error) {
      console.error('Error generating theme:', (error as Error).message);
      process.exit(1);
    }
  });

program.parse(process.argv);