# BMAD-Method Integration Guide

## Overview

This document explains how to integrate `bmad-odoo` with `bmad-method@alpha` installer so that users can select and install BMAD-Odoo from the installer menu.

## Changes Made to `bmad-odoo`

### 1. Package.json Metadata

Added the following to `package.json`:

```json
{
  "keywords": [
    "bmad",
    "bmad-module",  // ← KEY: This keyword identifies it as a BMAD module
    "odoo",
    // ... other keywords
  ],
  "bmad": {
    "type": "module",
    "displayName": "BMAD-Odoo: Odoo ERP Development",
    "shortName": "BMAD-Odoo",
    "description": "10 AI Agents + 44 Workflows cho Odoo ERP",
    "category": "development",
    "language": "vietnamese"
  }
}
```

### 2. What bmad-method Installer Needs to Do

When running `npx bmad-method@alpha install`, the installer should:

1. **Search for BMAD modules** on npm registry with keyword `bmad-module`
2. **Display in menu** using the `bmad.displayName` or `bmad.shortName`
3. **Show description** from `bmad.description`
4. **Install selected module** using `npm install <package-name>`

### 3. Expected Menu Display

```
? Select modules to install: (Press <space> to select, <a> to toggle all, <i> to invert
selection, and <enter> to proceed)
  ❯ BMB: BMad Builder - Agent, Workflow and Module Builder
    BMGD: BMad Game Development
  ● BMM: BMad Method Agile-AI Driven-Development
    BMAD-Odoo: Odoo ERP Development  ← NEW OPTION
    CIS: Creative Innovation Suite
```

## Implementation Options for bmad-method

### Option 1: NPM Registry Search (Recommended)

```javascript
// In bmad-method installer
const fetch = require('node-fetch');

async function discoverBmadModules() {
  // Search npm for packages with 'bmad-module' keyword
  const response = await fetch(
    'https://registry.npmjs.org/-/v1/search?text=keywords:bmad-module&size=250'
  );
  
  const data = await response.json();
  
  const modules = data.objects.map(obj => ({
    name: obj.package.name,
    displayName: obj.package.bmad?.displayName || obj.package.name,
    description: obj.package.bmad?.description || obj.package.description,
    version: obj.package.version
  }));
  
  return modules;
}
```

### Option 2: Hardcoded Registry

Maintain a list in `bmad-method` code:

```javascript
const BMAD_MODULES = [
  {
    packageName: 'bmad-method',
    displayName: 'BMM: BMad Method Agile-AI Driven-Development',
    // ...
  },
  {
    packageName: 'bmad-odoo',  // ← Add this
    displayName: 'BMAD-Odoo: Odoo ERP Development',
    description: '10 AI Agents + 44 Workflows cho Odoo ERP',
    category: 'development'
  }
];
```

### Option 3: Central Registry File

Create a registry repository that `bmad-method` fetches:

```
https://raw.githubusercontent.com/bmadcode/bmad-registry/main/modules.json
```

```json
{
  "modules": [
    {
      "name": "bmad-odoo",
      "npm": "bmad-odoo",
      "displayName": "BMAD-Odoo: Odoo ERP Development",
      "description": "10 AI Agents + 44 Workflows cho Odoo ERP",
      "category": "development",
      "language": "vietnamese",
      "minVersion": "1.0.0"
    }
  ]
}
```

## Installation Flow

After user selects BMAD-Odoo from menu:

```bash
# bmad-method installer runs:
npm install bmad-odoo

# bmad-odoo's postinstall script automatically runs:
# 1. Interactive IDE selection (VS Code, Cursor, Antigravity, Windsurf)
# 2. Creates _bmad-odoo/ folder
# 3. Creates _bmad-odoo-output/ folder
# 4. Creates workflows in .agent/workflows/ (or selected IDE)
```

## Testing

To test if bmad-odoo appears in installer:

```bash
# 1. Publish bmad-odoo with new metadata
npm publish

# 2. Run bmad-method installer
npx bmad-method@alpha install

# 3. Verify BMAD-Odoo appears in the list
# 4. Select it and verify installation works
```

## Contact

For integration support:
- **Package**: bmad-odoo
- **Author**: Dũng Xuân
- **npm**: https://www.npmjs.com/package/bmad-odoo
- **GitHub**: https://github.com/phamdungtk/bmad-odoo

## Notes

- `bmad-odoo` is fully self-contained - no extra setup needed from bmad-method
- Post-install handles all IDE setup automatically
- Compatible with all IDEs that bmad-method supports
- Supports both Vietnamese and English
