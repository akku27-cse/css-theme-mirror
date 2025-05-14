export type ColorAdjustment = {
  lighten?: number;
  darken?: number;
  saturate?: number;
  desaturate?: number;
  hueShift?: number;
  contrast?: number;
};

export type ColorAdjustments = {
  [key: string]: ColorAdjustment;
};

export type ThemeConfig = {
  preserveComments?: boolean;
  colorAdjustments?: ColorAdjustments;
  defaultAdjustments?: ColorAdjustment;
};

export type GenerateOptions = {
  input: string;
  output?: string;
  direction: 'light' | 'dark';
  config?: ThemeConfig;
  format?: 'css' | 'scss' | 'tailwind';
  selector?: string;
};
export interface CssVariable {
  name: string;
  value: string;
  isColor: boolean;
  line: number;
  column: number;
}