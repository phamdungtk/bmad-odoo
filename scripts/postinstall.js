/**
 * BMAD-Odoo - Post-install Script
 * Tự động setup BMAD-Odoo cho project
 * 
 * Features:
 * - Cho phép chọn IDE (VS Code, Cursor, Antigravity...)
 * - Tự động tạo _bmad-odoo (symlink/copy)
 * - Tự động tạo _bmad-odoo-output
 * - Setup workflows vào .agent/workflows/
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    red: '\x1b[31m',
    magenta: '\x1b[35m'
};

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function logStep(step, message) {
    console.log(`${colors.cyan}[${step}]${colors.reset} ${message}`);
}

function logSuccess(message) {
    console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

function logWarning(message) {
    console.log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

function logError(message) {
    console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

// IDE configurations
const IDE_CONFIGS = {
    vscode: {
        name: 'VS Code',
        workflowDir: '.vscode/workflows',
        configFile: '.vscode/settings.json',
        description: 'Visual Studio Code với extensions AI'
    },
    cursor: {
        name: 'Cursor',
        workflowDir: '.cursor/workflows',
        configFile: '.cursor/settings.json',
        description: 'Cursor AI IDE'
    },
    antigravity: {
        name: 'Antigravity (Gemini)',
        workflowDir: '.agent/workflows',
        configFile: '.agent/config.json',
        description: 'Google Gemini Antigravity Agent'
    },
    windsurf: {
        name: 'Windsurf',
        workflowDir: '.windsurf/workflows',
        configFile: '.windsurf/settings.json',
        description: 'Windsurf AI IDE'
    },
    all: {
        name: 'Tất cả IDEs',
        description: 'Setup cho tất cả IDEs trên'
    }
};

// Get project root from node_modules
function getProjectRoot() {
    let currentDir = __dirname;

    for (let i = 0; i < 5; i++) {
        currentDir = path.dirname(currentDir);
        const packageJsonPath = path.join(currentDir, 'package.json');

        if (fs.existsSync(packageJsonPath)) {
            try {
                const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
                if (pkg.name !== 'bmad-odoo') {
                    return currentDir;
                }
            } catch (e) {
                // Continue searching
            }
        }
    }

    return null;
}

// Create readline interface for user input
function createReadlineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

// Ask user a question
function askQuestion(rl, question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

// Create _bmad-odoo symlink or copy
function createBmadOdooFolder(projectRoot, packageRoot) {
    const targetPath = path.join(projectRoot, '_bmad-odoo');

    if (fs.existsSync(targetPath)) {
        logWarning(`_bmad-odoo đã tồn tại, bỏ qua...`);
        return true;
    }

    try {
        // Try to create symlink first (requires admin on Windows)
        fs.symlinkSync(packageRoot, targetPath, 'junction');
        logSuccess(`Đã tạo symlink: _bmad-odoo -> node_modules/bmad-odoo`);
        return true;
    } catch (symlinkError) {
        // Fallback: copy the folder
        try {
            copyFolderRecursive(packageRoot, targetPath, ['node_modules', '.git', '*.tgz']);
            logSuccess(`Đã copy: _bmad-odoo`);
            return true;
        } catch (copyError) {
            logError(`Không thể tạo _bmad-odoo: ${copyError.message}`);
            return false;
        }
    }
}

// Copy folder recursively
function copyFolderRecursive(source, target, excludePatterns = []) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }

    const items = fs.readdirSync(source);

    for (const item of items) {
        // Check exclusions
        const shouldExclude = excludePatterns.some(pattern => {
            if (pattern.includes('*')) {
                const regex = new RegExp(pattern.replace(/\*/g, '.*'));
                return regex.test(item);
            }
            return item === pattern;
        });

        if (shouldExclude) continue;

        const sourcePath = path.join(source, item);
        const targetPath = path.join(target, item);
        const stat = fs.statSync(sourcePath);

        if (stat.isDirectory()) {
            copyFolderRecursive(sourcePath, targetPath, excludePatterns);
        } else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    }
}

// Create _bmad-odoo-output folder structure
function createOutputFolder(projectRoot) {
    const outputPath = path.join(projectRoot, '_bmad-odoo-output');
    const subfolders = [
        'planning-artifacts',
        'implementation-artifacts',
        'test-artifacts',
        'documentation'
    ];

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    for (const subfolder of subfolders) {
        const subfolderPath = path.join(outputPath, subfolder);
        if (!fs.existsSync(subfolderPath)) {
            fs.mkdirSync(subfolderPath, { recursive: true });
        }
    }

    // Create .gitkeep files
    for (const subfolder of subfolders) {
        const gitkeepPath = path.join(outputPath, subfolder, '.gitkeep');
        if (!fs.existsSync(gitkeepPath)) {
            fs.writeFileSync(gitkeepPath, '');
        }
    }

    // Create README for output folder
    const readmePath = path.join(outputPath, 'README.md');
    if (!fs.existsSync(readmePath)) {
        fs.writeFileSync(readmePath, `# BMAD-Odoo Output

Thư mục này chứa các artifacts được tạo bởi BMAD-Odoo agents.

## Cấu trúc

- \`planning-artifacts/\` - Product briefs, PRDs, Architecture docs
- \`implementation-artifacts/\` - Epics, Stories, Technical specs  
- \`test-artifacts/\` - Test plans, Test cases
- \`documentation/\` - Module docs, User guides

## Lưu ý

Các file trong thư mục này được tạo tự động bởi AI agents.
Bạn có thể commit chúng vào git để theo dõi tiến độ dự án.
`);
    }

    logSuccess(`Đã tạo: _bmad-odoo-output/`);
    return true;
}

// Create workflow files for a specific IDE
function createWorkflowsForIDE(projectRoot, packageRoot, ideConfig, ideName) {
    const workflowDir = path.join(projectRoot, ideConfig.workflowDir);

    if (!fs.existsSync(workflowDir)) {
        fs.mkdirSync(workflowDir, { recursive: true });
    }

    const agents = [
        { name: 'analyst', desc: 'Business Analyst (Sofia) - Phân tích quy trình' },
        { name: 'architect', desc: 'Technical Architect (Antonio) - Thiết kế kiến trúc' },
        { name: 'dev', desc: 'Developer (Carlos) - Phát triển code Odoo' },
        { name: 'pm', desc: 'Product Manager (Maria) - Quản lý sản phẩm' },
        { name: 'sm', desc: 'Scrum Master (Diego) - Quản lý Sprint' },
        { name: 'tea', desc: 'Test Architect (Elena) - Thiết kế test' },
        { name: 'ux-designer', desc: 'UX Designer (Sally) - Thiết kế UX' },
        { name: 'quick-flow-solo-dev', desc: 'Quick Flow Dev (Barry) - Phát triển nhanh' },
        { name: 'tech-writer', desc: 'Tech Writer (Paige) - Tài liệu hóa' }
    ];

    let created = 0;

    for (const agent of agents) {
        const workflowPath = path.join(workflowDir, `${agent.name}.md`);

        // Check if target workflow already exists
        if (fs.existsSync(workflowPath)) continue;

        const content = `---
description: ${agent.desc}
---

# Activation

Load and activate the agent by reading the file at:
\`node_modules/bmad-odoo/bmm/agents/${agent.name}.md\`

Or if using _bmad-odoo symlink:
\`_bmad-odoo/bmm/agents/${agent.name}.md\`

Follow all activation instructions in that file precisely.
`;

        fs.writeFileSync(workflowPath, content);
        created++;
    }

    // Create party-mode workflow
    const partyModePath = path.join(workflowDir, 'bmad-core-workflows-party-mode.md');
    if (!fs.existsSync(partyModePath)) {
        fs.writeFileSync(partyModePath, `---
description: Orchestrates group discussions between all BMAD-Odoo agents
---

# Party Mode Activation

Load the party mode workflow from:
\`node_modules/bmad-odoo/core/workflows/party-mode/party-mode.md\`

Or if using _bmad-odoo symlink:
\`_bmad-odoo/core/workflows/party-mode/party-mode.md\`

Follow all instructions to start multi-agent collaboration.
`);
        created++;
    }

    if (created > 0) {
        logSuccess(`Đã tạo ${created} workflows cho ${ideConfig.name}`);
    } else {
        logWarning(`Workflows cho ${ideConfig.name} đã tồn tại`);
    }

    return created;
}

// Interactive setup
async function interactiveSetup(projectRoot, packageRoot) {
    const rl = createReadlineInterface();

    log('\n╔════════════════════════════════════════════════════════════╗', colors.cyan);
    log('║          🚀 BMAD-Odoo Interactive Setup                     ║', colors.cyan);
    log('╚════════════════════════════════════════════════════════════╝\n', colors.cyan);

    log('Chọn IDE bạn đang sử dụng:\n', colors.bright);
    log('  1. VS Code          - Visual Studio Code với extensions AI', colors.reset);
    log('  2. Cursor           - Cursor AI IDE', colors.reset);
    log('  3. Antigravity      - Google Gemini Antigravity Agent', colors.reset);
    log('  4. Windsurf         - Windsurf AI IDE', colors.reset);
    log('  5. Tất cả           - Setup cho tất cả IDEs\n', colors.reset);

    const choice = await askQuestion(rl, `${colors.yellow}Nhập số (1-5) [mặc định: 3]: ${colors.reset}`);

    const ideMapping = {
        '1': 'vscode',
        '2': 'cursor',
        '3': 'antigravity',
        '4': 'windsurf',
        '5': 'all',
        '': 'antigravity' // Default
    };

    const selectedIde = ideMapping[choice] || 'antigravity';

    rl.close();

    log(`\n📌 Đã chọn: ${IDE_CONFIGS[selectedIde].name}\n`, colors.green);

    // Step 1: Create _bmad-odoo
    logStep('1/3', 'Tạo thư mục _bmad-odoo...');
    createBmadOdooFolder(projectRoot, packageRoot);

    // Step 2: Create _bmad-odoo-output
    logStep('2/3', 'Tạo thư mục _bmad-odoo-output...');
    createOutputFolder(projectRoot);

    // Step 3: Create workflows for selected IDE(s)
    logStep('3/3', 'Tạo workflow files...');

    if (selectedIde === 'all') {
        for (const [ideName, ideConfig] of Object.entries(IDE_CONFIGS)) {
            if (ideName !== 'all') {
                createWorkflowsForIDE(projectRoot, packageRoot, ideConfig, ideName);
            }
        }
    } else {
        createWorkflowsForIDE(projectRoot, packageRoot, IDE_CONFIGS[selectedIde], selectedIde);
    }

    printSuccessMessage(selectedIde);
}

// Non-interactive setup (for CI/CD or when stdin is not available)
function autoSetup(projectRoot, packageRoot) {
    log('\n╔════════════════════════════════════════════════════════════╗', colors.cyan);
    log('║          🚀 BMAD-Odoo Auto Setup                           ║', colors.cyan);
    log('╚════════════════════════════════════════════════════════════╝\n', colors.cyan);

    // Default to Antigravity
    logStep('1/3', 'Tạo thư mục _bmad-odoo...');
    createBmadOdooFolder(projectRoot, packageRoot);

    logStep('2/3', 'Tạo thư mục _bmad-odoo-output...');
    createOutputFolder(projectRoot);

    logStep('3/3', 'Tạo workflow files cho Antigravity...');
    createWorkflowsForIDE(projectRoot, packageRoot, IDE_CONFIGS.antigravity, 'antigravity');

    printSuccessMessage('antigravity');

    log(`\n💡 Để setup cho IDE khác, chạy: npx bmad-odoo-setup\n`, colors.blue);
}

// Print success message
function printSuccessMessage(selectedIde) {
    log('\n╔════════════════════════════════════════════════════════════╗', colors.green);
    log('║          ✅ BMAD-Odoo Setup Hoàn Tất!                       ║', colors.green);
    log('╚════════════════════════════════════════════════════════════╝\n', colors.green);

    log('📂 Cấu trúc đã tạo:', colors.bright);
    log('   _bmad-odoo/              → Symlink/copy của package', colors.reset);
    log('   _bmad-odoo-output/       → Thư mục output cho artifacts', colors.reset);

    if (selectedIde === 'all') {
        log('   .vscode/workflows/       → Workflows cho VS Code', colors.reset);
        log('   .cursor/workflows/       → Workflows cho Cursor', colors.reset);
        log('   .agent/workflows/        → Workflows cho Antigravity', colors.reset);
        log('   .windsurf/workflows/     → Workflows cho Windsurf', colors.reset);
    } else {
        const ideConfig = IDE_CONFIGS[selectedIde];
        log(`   ${ideConfig.workflowDir}/  → Workflows cho ${ideConfig.name}`, colors.reset);
    }

    log('\n📋 Các slash commands có sẵn:', colors.bright);
    log('   /analyst    - Business Analyst (Sofia)', colors.reset);
    log('   /architect  - Technical Architect (Antonio)', colors.reset);
    log('   /dev        - Developer (Carlos)', colors.reset);
    log('   /pm         - Product Manager (Maria)', colors.reset);
    log('   /sm         - Scrum Master (Diego)', colors.reset);
    log('   /tea        - Test Architect (Elena)', colors.reset);
    log('   /ux-designer - UX Designer (Sally)', colors.reset);
    log('   /quick-flow-solo-dev - Quick Flow Dev (Barry)', colors.reset);
    log('   /tech-writer - Tech Writer (Paige)', colors.reset);
    log('   /bmad-core-workflows-party-mode - Multi-agent mode\n', colors.reset);

    log('📖 Xem thêm: _bmad-odoo/README.md\n', colors.blue);
}

// Main function
async function main() {
    console.log('\n🚀 BMAD-Odoo postinstall script starting...\n');

    const projectRoot = getProjectRoot();
    const packageRoot = path.join(__dirname, '..');

    console.log(`📂 Package root: ${packageRoot}`);
    console.log(`📂 Project root: ${projectRoot || 'NOT FOUND'}\n`);

    if (!projectRoot) {
        logWarning('Không tìm thấy project root. Bỏ qua auto-setup.');
        logWarning('Bạn có thể setup thủ công bằng lệnh: npx bmad-odoo-setup\n');
        process.exit(0);
    }

    // Check if running interactively (has stdin)
    const isInteractive = process.stdin.isTTY;

    console.log(`🔧 Interactive mode: ${isInteractive ? 'YES' : 'NO (using auto-setup)'}\n`);

    try {
        if (isInteractive) {
            await interactiveSetup(projectRoot, packageRoot);
        } else {
            autoSetup(projectRoot, packageRoot);
        }
    } catch (error) {
        logError(`Lỗi trong quá trình setup: ${error.message}`);
        console.error(error.stack);
        logWarning('Bạn có thể setup thủ công bằng lệnh: npx bmad-odoo-setup\n');
        process.exit(0); // Don't fail npm install
    }
}

// Run the script
main().catch((error) => {
    logError(`Lỗi fatal: ${error.message}`);
    console.error(error.stack);
    logWarning('Bạn có thể setup thủ công bằng lệnh: npx bmad-odoo-setup\n');
    process.exit(0); // Don't fail npm install
});
