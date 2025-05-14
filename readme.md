Here's a comprehensive README.md that includes all usage examples for your css-theme-mirror package, covering CLI, API, configs, and real-world scenarios:

markdown
# CSS Theme Mirror 🌗

[![npm](https://img.shields.io/npm/v/css-theme-mirror)](https://www.npmjs.com/package/css-theme-mirror)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?logo=typescript&logoColor=white)

**Intelligent CSS theme generation** using color theory. Automatically create accessible dark/light themes with semantic color transformations.

---

## 🚀 Quick Start

### Installation
```bash
npm install css-theme-mirror
# or
yarn add css-theme-mirror
Basic CLI Usage
bash
npx css-theme-mirror generate -i light.css -o dark.css -d dark
💻 Full CLI Reference
Generate Theme
bash
npx css-theme-mirror generate \
  --input light.css \
  --output dark.css \
  --direction dark \
  --config theme-config.json \
  --format css \
  --selector '[data-theme="dark"]'
Options
Flag	Description	Default
-i, --input	Input CSS file	Required
-o, --output	Output file (omit for stdout)	-
-d, --direction	light or dark	Required
-c, --config	Path to config JSON	-
--format	css/scss/tailwind	css
--selector	CSS selector for theme	:root.dark
--preserve-comments	Keep original comments	false
📜 Programmatic API
Basic Usage
javascript
const { generateTheme } = require('css-theme-mirror');

await generateTheme({
  input: 'light.css',
  output: 'dark.css',
  direction: 'dark'
});
Advanced Usage
javascript
await generateTheme({
  input: 'dark.css',
  direction: 'light',
  config: {
    colorAdjustments: {
      '--primary': { hueShift: 0.1, lighten: 20 },
      '--text': { contrast: 1.5 }
    }
  },
  format: 'scss',
  selector: '.light-mode'
});
⚙️ Configuration Guide
Sample Config (theme-config.json)
json
{
  "preserveComments": true,
  "defaultAdjustments": {
    "contrast": 1.2,
    "saturate": 5
  },
  "colorAdjustments": {
    "--primary": {
      "hueShift": 0.05,
      "saturate": 10
    },
    "--background": {
      "darken": 90
    },
    "--text-*": {  // Applies to all --text- variables
      "lighten": 70
    }
  }
}
Adjustment Options
Property	Effect	Range
lighten	Increase lightness	0-100 (%)
darken	Decrease lightness	0-100 (%)
saturate	Increase saturation	0-100 (%)
desaturate	Decrease saturation	0-100 (%)
hueShift	Shift hue (0-1 = 0°-360°)	0-1
contrast	Adjust contrast ratio	1-2
🎨 Output Formats
1. CSS (Default)
css
:root.dark {
  --primary: #bb86fc;
  --background: #121212;
}
2. SCSS
scss
$dark-theme: (
  primary: #bb86fc,
  background: #121212
);
3. Tailwind
javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#bb86fc',
          background: '#121212'
        }
      }
    }
  }
}
🔄 Real-World Examples
From Light → Dark
Input (light.css):

css
:root {
  --primary: #2563eb;
  --secondary: #7c3aed;
  --background: #f8fafc;
  --text: #1e293b;
  --text-muted: #64748b;
}
Command:

bash
npx css-theme-mirror generate -i light.css -o dark.css -d dark
Output (dark.css):

css
:root.dark {
  --primary: #3b82f6;  /* Brighter blue */
  --secondary: #8b5cf6; /* Brighter purple */
  --background: #0f172a; /* Deep navy */
  --text: #e2e8f0;     /* Light gray */
  --text-muted: #94a3b8; /* Medium gray */
}
🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/your-feature)

Commit changes (git commit -m 'Add some feature')

Push to branch (git push origin feature/your-feature)

Open a Pull Request

📄 License
MIT © Santu Jana
Contact: santujana1827@gmail.com | +91 8945007301


### Key Features:
- **All-in-one usage guide** covering every feature
- **Ready-to-copy code snippets** for CLI/API/config
- **Visual comparison** of theme transformations
- **Multiple output formats** with examples
- **Contributing guidelines** for open-source
- **Responsive badges** for npm/CI/TypeScript