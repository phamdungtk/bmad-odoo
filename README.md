# BMAD-Odoo - User Guide

[![npm version](https://img.shields.io/npm/v/bmad-odoo.svg)](https://www.npmjs.com/package/bmad-odoo)
[![npm downloads](https://img.shields.io/npm/dm/bmad-odoo.svg)](https://www.npmjs.com/package/bmad-odoo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **BMAD Framework extension for Odoo ERP development**

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Detailed Guide](#-detailed-guide)
4. [Common Commands](#-common-commands)
5. [Use Cases](#-use-cases)
6. [Configuration](#configuration)
7. [Agents](#agents)
8. [Workflows](#workflows)
9. [Work Process](#work-process)
10. [Directory Structure](#directory-structure)
11. [Troubleshooting](#-troubleshooting)
12. [FAQ](#-faq)
13. [References](#references)

---

## Introduction

**BMAD-Odoo** is an extended framework from BMAD (Brian's Method for AI Development), specifically customized for Odoo ERP development and deployment.

### Key Features

- 🤖 **10 AI Agents** specialized for each role in Odoo projects
- 📝 **44 Workflows** covering the entire development lifecycle
- 🇻🇳 **Full Vietnamese support**
- 📚 **Knowledge Base** with integrated Odoo knowledge
- ⚙️ **Auto-setup** automatically configures workflows on installation

---

## Installation

### Requirements

- Node.js 18+
- Odoo 16.0+ or 17.0
- Supported AI IDE (Antigravity/Gemini, Cursor, VS Code, Windsurf)

### Method 1: Install from NPM (Recommended)

```bash
# In your Odoo project directory
npm install bmad-odoo
```

**Post-install behavior:**

- **Interactive terminal**: Automatically prompts for IDE selection
- **Non-interactive (CI/CD)**: Auto-setup with Antigravity (default)
- **Manual setup**: Run `npx bmad-odoo-setup` anytime

```
Choose your IDE:
  1. VS Code          - Visual Studio Code with AI extensions
  2. Cursor           - Cursor AI IDE
  3. Antigravity      - Google Gemini Antigravity Agent
  4. Windsurf         - Windsurf AI IDE
  5. All              - Setup for all IDEs

Enter number (1-5) [default: 3]:
```

**Package will automatically create:**
- ✅ `_bmad-odoo/` directory (symlink or copy from `node_modules/`)
- ✅ `_bmad-odoo-output/` directory with subdirectory structure for artifacts
- ✅ Workflows in `.agent/workflows/` (or your chosen IDE)
- ✅ Slash commands: `/analyst`, `/dev`, `/pm`, ...

### Re-run Setup (if needed)

```bash
# If you want to change IDE or re-setup
npx bmad-odoo-setup
```

### Method 2: Manual Installation

```bash
# Clone repository
git clone https://github.com/phamdungtk/bmad-odoo.git

# Copy to node_modules
cp -r bmad-odoo node_modules/

# Run setup
cd bmad-odoo
npm run setup
```

---


## Configuration

### Main Configuration File

Edit the `bmm/config.yaml` file:

```yaml
# User information
user_name: "Your Name"
communication_language: "Vietnamese"

# Output directory
output_folder: "_bmad-odoo-output"
planning_artifacts: "_bmad-odoo-output/planning"
implementation_artifacts: "_bmad-odoo-output/implementation"

# Odoo configuration
odoo:
  version: "17.0"
  edition: "community"           # community or enterprise
  customModulesPath: "addons_custom"
  oca_path: "addons_oca"
```

---

## 🚀 Detailed Guide

### Step 1: Install Package

```bash
# Navigate to your Odoo project directory
cd D:\MyOdooProject

# Initialize package.json if not already present
npm init -y

# Install bmad-odoo
npm install bmad-odoo
```

**Result:**
```
+ bmad-odoo@1.0.0
added 1 package
```

### Step 2: Interactive Setup (Automatic)

Right after installation, **post-install script will run automatically**:

```
╔════════════════════════════════════════════════════════════╗
║          🚀 BMAD-Odoo Interactive Setup                     ║
╚════════════════════════════════════════════════════════════╝

Choose your IDE:

  1. VS Code          - Visual Studio Code with AI extensions
  2. Cursor           - Cursor AI IDE
  3. Antigravity      - Google Gemini Antigravity Agent
  4. Windsurf         - Windsurf AI IDE
  5. All              - Setup for all IDEs

Enter number (1-5) [default: 3]:
```

**Enter number and press Enter:**
```bash
3  # Choose Antigravity (or your IDE)
```

### Step 3: Setup Process (Automatic)

Script will automatically execute:

```
📌 Selected: Antigravity (Gemini)

[1/3] Creating _bmad-odoo directory...
✅ Created symlink: _bmad-odoo -> node_modules/bmad-odoo

[2/3] Creating _bmad-odoo-output directory...
✅ Created: _bmad-odoo-output/

[3/3] Creating workflow files...
✅ Created 10 workflows for Antigravity (Gemini)

╔════════════════════════════════════════════════════════════╗
║          ✅ BMAD-Odoo Setup Complete!                       ║
╚════════════════════════════════════════════════════════════╝
```

### Step 4: Verify Created Structure

```bash
# Check project directory
ls -la
```

**Structure after setup:**
```
MyOdooProject/
├── node_modules/
│   └── bmad-odoo/          # Original package from npm
├── _bmad-odoo/             # ✨ Symlink/copy for easy access
├── _bmad-odoo-output/      # ✨ Output directory for artifacts
│   ├── planning-artifacts/
│   ├── implementation-artifacts/
│   ├── test-artifacts/
│   └── documentation/
├── .agent/                 # ✨ Workflows for Antigravity
│   └── workflows/
│       ├── bmad-odoo-agents-analyst.md
│       ├── bmad-odoo-agents-architect.md
│       ├── bmad-odoo-agents-dev.md
│       ├── bmad-odoo-agents-pm.md
│       ├── bmad-odoo-agents-sm.md
│       ├── bmad-odoo-agents-tea.md
│       ├── bmad-odoo-agents-ux-designer.md
│       ├── bmad-odoo-agents-quick-flow-solo-dev.md
│       ├── bmad-odoo-agents-tech-writer.md
│       └── bmad-odoo-workflows-party-mode.md
└── package.json
```

### Step 5: Using Agents

Open your AI IDE (Antigravity/Gemini, Cursor, etc.) and type:

```bash
/analyst          # Activate Business Analyst (Sofia)
/architect        # Activate Technical Architect (Antonio)
/dev              # Activate Developer (Carlos)
/pm               # Activate Product Manager (Maria)
/sm               # Activate Scrum Master (Diego)
/tea              # Activate Test Architect (Elena)
/ux-designer      # Activate UX Designer (Sally)
/quick-flow-solo-dev  # Activate Quick Flow Dev (Barry)
/tech-writer      # Activate Tech Writer (Paige)
```

---

## 🔧 Common Commands

### Re-run Setup (Change IDE or Add IDE)

If you want to:
- Switch to another IDE
- Add workflows for new IDE
- Re-setup from scratch

```bash
# Run interactive setup
npx bmad-odoo-setup

# Or
npm run setup
```

**Script will ask for IDE again and create workflows for it.**

### View Package Information

```bash
# View installed version
npm list bmad-odoo

# View information from npm
npm view bmad-odoo

# View all available versions
npm view bmad-odoo versions
```

### Update Package

```bash
# Update to latest version
npm update bmad-odoo

# Or reinstall with specific version
npm install bmad-odoo@latest
```

### Remove and Reinstall

```bash
# Remove package and created directories
npm uninstall bmad-odoo
rm -rf _bmad-odoo _bmad-odoo-output .agent/workflows

# Reinstall
npm install bmad-odoo
```

---

## 💡 Use Cases

### Case 1: Developing New Odoo Module

```bash
# 1. Install bmad-odoo
npm install bmad-odoo

# 2. Activate Business Analyst to analyze requirements
/analyst
> AP  # Choose [AP] Analyze Process

# 3. Activate Architect for design
/architect
> CO  # Choose [CO] Create Odoo Addon

# 4. Activate Developer to code
/dev
> DS  # Choose [DS] Dev Story
```

### Case 2: Team Setup (Multi-IDE)

```bash
# Install package
npm install bmad-odoo

# During setup, choose option 5 (All)
# Script will create workflows for:
# - VS Code (.vscode/workflows/)
# - Cursor (.cursor/workflows/)
# - Antigravity (.agent/workflows/)
# - Windsurf (.windsurf/workflows/)

# Team members using different IDEs can all work
```

### Case 3: CI/CD Integration

If installing in CI/CD (non-interactive):

```bash
# Script will automatically choose Antigravity (default)
npm install bmad-odoo

# Or set environment variable (if supported later)
BMAD_IDE=cursor npm install bmad-odoo
```

---

## Configuration

### Main Configuration File

Edit the `_bmad-odoo/bmm/config.yaml` file:

```yaml
# User information
user_name: "Your Name"
communication_language: "Vietnamese"

# Output directory
output_folder: "_bmad-odoo-output"
planning_artifacts: "_bmad-odoo-output/planning-artifacts"
implementation_artifacts: "_bmad-odoo-output/implementation-artifacts"

# Odoo configuration
odoo:
  version: "17.0"
  edition: "community"           # community or enterprise
  customModulesPath: "addons_custom"
  oca_path: "addons_oca"
```

---

## Agents

### Agent List

| Agent | Name | Role | Slash Command |
|-------|------|------|---------------|
| 💼 Sofia | Business Analyst | Process analysis, gap analysis | `/analyst` |
| 🏗️ Antonio | Technical Architect | Module architecture design | `/architect` |
| 💻 Carlos | Developer | Odoo code development | `/dev` |
| 📊 Maria | Product Manager | Product management, PRD creation | `/pm` |
| 🏃 Diego | Scrum Master | Sprint, story management | `/sm` |
| 🧪 Elena | Test Architect | Test case design | `/tea` |
| 🎨 Sally | UX Designer | UX design for Odoo views | `/ux-designer` |
| ⚡ Barry | Quick Flow Dev | Rapid development | `/quick-flow-solo-dev` |
| 📝 Paige | Tech Writer | Module documentation | `/tech-writer` |
| 🎯 Master | BMAD-Odoo Master | Overall coordination | (auto) |

### How to Activate Agent

```
/analyst    # Activate Sofia - Business Analyst
/dev        # Activate Carlos - Developer
/pm         # Activate Maria - Product Manager
```

---

## Workflows

### Workflow Categories

#### 1. Analysis
| Workflow | Description |
|----------|-------------|
| `analyze-process` | Analyze Odoo business processes |
| `gap-analysis` | Requirements gap analysis |
| `create-product-brief` | Create Product Brief |
| `create-odoo-product-brief` | Create Product Brief for Odoo |
| `research` | Market/technical research |

#### 2. Planning
| Workflow | Description |
|----------|-------------|
| `create-odoo-addon` | Design new Odoo Addon |
| `create-odoo-epic` | Create development Epic |
| `create-odoo-prd` | Create Odoo PRD |
| `create-odoo-ux-design` | Design Odoo views UX |
| `plan-odoo-migration` | Plan migration |
| `create-ux-design` | Create general UX design |
| `prd` | Create Product Requirements Doc |

#### 3. Solutioning
| Workflow | Description |
|----------|-------------|
| `create-architecture` | Design architecture |
| `create-epics-and-stories` | Create Epics & Stories |
| `check-implementation-readiness` | Check implementation readiness |
| `enhance-existing-system` | Enhance existing system |
| `quick-addon` | Quick addon creation |

#### 4. Implementation
| Workflow | Description |
|----------|-------------|
| `dev-story` | Execute Dev Story |
| `code-review` | Code review |
| `create-next-story` | Create next Story |
| `rapid-brownfield` | Rapid brownfield development |
| `sprint-planning` | Sprint planning |
| `sprint-status` | Sprint status |
| `correct-course` | Course correction |
| `retrospective` | Retrospective meeting |

#### 5. Testing
| Workflow | Description |
|----------|-------------|
| `odoo-test-design` | Odoo test design |
| `test-design` | Test design |
| `test-review` | Test review |
| `automate` | Test automation |

#### 6. Documentation
| Workflow | Description |
|----------|-------------|
| `document-odoo` | Document Odoo module |
| `document-project` | Document project |
| `generate-project-context` | Generate project context |

---

## Work Process

### New Odoo Addon Development Process

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT PROCESS                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. ANALYSIS                                                │
│     └─▶ /analyst → [AP] Analyze process                    │
│     └─▶ /analyst → [GA] Gap Analysis                       │
│                                                              │
│  2. PLANNING                                                │
│     └─▶ /pm → [OPB] Create Odoo Product Brief              │
│     └─▶ /pm → [OPR] Create Odoo PRD                        │
│     └─▶ /pm → [CE] Create Epic                             │
│                                                              │
│  3. DESIGN                                                  │
│     └─▶ /architect → [CO] Design Addon                     │
│     └─▶ /ux-designer → [OUX] Design UX Views               │
│                                                              │
│  4. IMPLEMENTATION                                          │
│     └─▶ /sm → [CS] Create Story                            │
│     └─▶ /dev → [DS] Dev Story                              │
│     └─▶ /dev → [CR] Code Review                            │
│                                                              │
│  5. TESTING                                                 │
│     └─▶ /tea → [OTD] Design Odoo Test                      │
│                                                              │
│  6. DOCUMENTATION                                           │
│     └─▶ /tech-writer → [OD] Document Odoo Module           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Example: Analyzing Sales Process

```bash
# Step 1: Activate Business Analyst
/analyst

# Step 2: Choose menu [AP] Analyze process
> AP

# Step 3: Workflow will guide through steps:
#   - Gather basic information
#   - Analyze current state
#   - Identify pain points
#   - Map to Odoo modules
#   - Propose solutions
```

---

## Directory Structure

```
_bmad-odoo/
├── _config/                    # Manifest files
│   ├── agent-manifest.csv
│   └── workflow-manifest.csv
├── bmm/                        # BMAD Method Materials
│   ├── agents/                 # 9 Agent definitions
│   │   ├── analyst.md
│   │   ├── architect.md
│   │   ├── dev.md
│   │   ├── pm.md
│   │   ├── sm.md
│   │   ├── tea.md
│   │   ├── ux-designer.md
│   │   ├── quick-flow-solo-dev.md
│   │   └── tech-writer.md
│   ├── config.yaml             # Main configuration
│   ├── data/
│   │   └── odoo-knowledge-base.md
│   ├── teams/
│   │   └── default-team.md
│   ├── testarch/               # Test architecture
│   │   └── odoo-test-design/
│   └── workflows/              # 44 workflows
│       ├── 1-analysis/
│       ├── 2-plan-workflows/
│       ├── 3-solutioning/
│       ├── 4-implementation/
│       ├── bmad-quick-flow/
│       ├── document-odoo/
│       ├── document-project/
│       ├── excalidraw-diagrams/
│       ├── generate-project-context/
│       ├── testarch/
│       └── workflow-status/
├── core/                       # Core components
│   ├── agents/
│   │   └── bmad-odoo-master.md
│   └── workflows/
│       └── party-mode/
└── README.md                   # This file
```

---

## 🔧 Troubleshooting

### Error: "Cannot find module 'bmad-odoo'"

**Cause:** Package not installed or installed in wrong location

**Solution:**
```bash
# Check if bmad-odoo is in package.json
cat package.json | grep bmad-odoo

# Reinstall
npm install bmad-odoo

# Verify
npm list bmad-odoo
```

### Error: "Permission denied" when creating symlink

**Cause:** Windows requires admin rights to create symlinks

**Solution:**
Script automatically falls back to copying folder. No action needed.

**Check:**
```bash
# Check if _bmad-odoo is a symlink
ls -la _bmad-odoo

# If symlink: lrwxrwxrwx ... _bmad-odoo -> node_modules/bmad-odoo
# If copy: drwxr-xr-x ... _bmad-odoo
```

### Error: Post-install not running

**Cause:** npm config or running with `--ignore-scripts`

**Solution:**
```bash
# Run manually
npx bmad-odoo-setup

# Or
npm run setup
```

### Error: Workflows not appearing in IDE

**Cause:** 
- IDE not reloaded
- Workflows created in wrong folder

**Solution:**
```bash
# 1. Check if workflows are created
ls .agent/workflows  # Antigravity
ls .cursor/workflows # Cursor
ls .vscode/workflows # VS Code

# 2. If not present, re-run setup
npx bmad-odoo-setup

# 3. Reload IDE
# - Antigravity: Refresh browser
# - Cursor: Cmd/Ctrl + Shift + P → "Reload Window"
# - VS Code: Cmd/Ctrl + Shift + P → "Reload Window"
```

### Error: Output folder not created

**Solution:**
```bash
# Create manually
mkdir -p _bmad-odoo-output/{planning-artifacts,implementation-artifacts,test-artifacts,documentation}

# Or re-run setup
npx bmad-odoo-setup
```

### Want to change IDE after setup

**Solution:**
```bash
# Re-run setup and choose new IDE
npx bmad-odoo-setup

# Or choose "All" to have workflows for multiple IDEs
```

---

## ❓ FAQ

**Q: Can I use multiple IDEs simultaneously?**

A: Yes! Choose option 5 (All) during setup, or run `npx bmad-odoo-setup` multiple times with different IDEs.

**Q: What's the difference between _bmad-odoo and node_modules/bmad-odoo?**

A: 
- `node_modules/bmad-odoo`: Original package from npm
- `_bmad-odoo`: Symlink (or copy) for easy access, avoiding long path typing

**Q: Can I commit _bmad-odoo-output to git?**

A: Yes! This folder contains artifacts (PRD, architecture docs, stories) created by agents. Committing them helps team track progress.

**Q: How to update to new version?**

A: `npm update bmad-odoo` or `npm install bmad-odoo@latest`

**Q: Does this package work offline?**

A: After installation, the package works offline (no internet needed). Internet only required for initial `npm install`.

**Q: Can I customize the config?**

A: Yes! Edit `_bmad-odoo/bmm/config.yaml` to change output folder, Odoo version, and other settings.

---

## References

### Important Files

| File | Description |
|------|-------------|
| `_bmad-odoo/bmm/config.yaml` | Main configuration |
| `_bmad-odoo/bmm/data/odoo-knowledge-base.md` | Odoo knowledge |
| `_bmad-odoo-output/` | Artifacts directory |
| `.agent/workflows/` | Workflows for Antigravity |

### Links

- [NPM Package](https://www.npmjs.com/package/bmad-odoo)
- [GitHub Repository](https://github.com/phamdungtk/bmad-odoo)
- [BMAD Framework (original)](https://github.com/bmadcode/BMAD-METHOD)
- [Odoo Documentation](https://www.odoo.com/documentation)
- [OCA Guidelines](https://github.com/OCA/odoo-community.org)

---

## Support

If you encounter issues:

1. **Check installation**: `npm list bmad-odoo`
2. **Re-run setup**: `npx bmad-odoo-setup`
3. **See Troubleshooting** above
4. **Report issue**: [GitHub Issues](https://github.com/phamdungtk/bmad-odoo/issues)

---

**Version:** 1.0.0  
**Updated:** 2026-01-02  
**Language:** English  
**License:** MIT
