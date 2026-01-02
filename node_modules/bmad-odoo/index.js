/**
 * BMAD-Odoo
 * BMAD Framework mở rộng cho phát triển Odoo ERP
 * 
 * @author Dũng Xuân
 * @license MIT
 * @homepage https://github.com/phamdungtk/bmad-odoo
 */

const path = require('path');
const fs = require('fs');

/**
 * Get the path to a specific agent file
 * @param {string} agentName - Name of the agent (e.g., 'analyst', 'dev', 'pm')
 * @returns {string} Absolute path to the agent file
 */
function getAgentPath(agentName) {
    return path.join(__dirname, 'bmm', 'agents', `${agentName}.md`);
}

/**
 * Get the path to a specific workflow file
 * @param {string} workflowPath - Relative path to the workflow (e.g., '1-analysis/analyze-process.md')
 * @returns {string} Absolute path to the workflow file
 */
function getWorkflowPath(workflowPath) {
    return path.join(__dirname, 'bmm', 'workflows', workflowPath);
}

/**
 * Get the path to the Odoo knowledge base
 * @returns {string} Absolute path to the knowledge base file
 */
function getKnowledgeBasePath() {
    return path.join(__dirname, 'bmm', 'data', 'odoo-knowledge-base.md');
}

/**
 * Get the main config file path
 * @returns {string} Absolute path to config.yaml
 */
function getConfigPath() {
    return path.join(__dirname, 'bmm', 'config.yaml');
}

/**
 * List all available agents
 * @returns {string[]} Array of agent names
 */
function listAgents() {
    const agentsDir = path.join(__dirname, 'bmm', 'agents');
    return fs.readdirSync(agentsDir)
        .filter(file => file.endsWith('.md'))
        .map(file => file.replace('.md', ''));
}

/**
 * Get package info
 * @returns {object} Package information
 */
function getInfo() {
    return {
        name: 'bmad-odoo',
        version: require('./package.json').version,
        agents: listAgents(),
        paths: {
            root: __dirname,
            agents: path.join(__dirname, 'bmm', 'agents'),
            workflows: path.join(__dirname, 'bmm', 'workflows'),
            config: path.join(__dirname, 'bmm', 'config.yaml'),
            knowledgeBase: path.join(__dirname, 'bmm', 'data', 'odoo-knowledge-base.md')
        }
    };
}

module.exports = {
    getAgentPath,
    getWorkflowPath,
    getKnowledgeBasePath,
    getConfigPath,
    listAgents,
    getInfo
};
