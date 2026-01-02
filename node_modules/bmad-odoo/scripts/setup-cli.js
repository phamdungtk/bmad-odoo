#!/usr/bin/env node

/**
 * BMAD-Odoo Setup CLI
 * Cho phép chạy setup lại bất cứ lúc nào
 * 
 * Usage: npx bmad-odoo-setup
 */

const path = require('path');
const fs = require('fs');

// Set project root to current working directory
process.env.BMAD_PROJECT_ROOT = process.cwd();

// Run the postinstall script in interactive mode
require('./postinstall.js');
