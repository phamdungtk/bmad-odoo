# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2026-01-02

### Added
- Integration với `bmad-method@alpha install`
- Keyword `bmad-module` để auto-detect bởi bmad-method installer
- Field `bmad` metadata trong package.json cho installer display
- File `BMAD-METHOD-INTEGRATION.md` hướng dẫn integration

### Changed
- README.md với comprehensive documentation (Troubleshooting + FAQ)
- Merge USAGE.md content vào README.md
- Xóa USAGE.md (consolidate vào README duy nhất)

### Fixed
- Postinstall script đã được verify hoạt động tự động
- Auto-setup với default Antigravity IDE khi non-interactive

## [1.0.2] - 2026-01-02

### Added
- bmad-module keyword for installer detection
- bmad metadata field

## [1.0.0] - 2026-01-02

### Added
- 🤖 **10 AI Agents** chuyên biệt cho phát triển Odoo:
  - Sofia (Business Analyst) - Phân tích quy trình, gap analysis
  - Antonio (Technical Architect) - Thiết kế kiến trúc module
  - Carlos (Developer) - Phát triển code Odoo
  - Maria (Product Manager) - Quản lý sản phẩm, tạo PRD
  - Diego (Scrum Master) - Quản lý Sprint, story
  - Elena (Test Architect) - Thiết kế test cases
  - Sally (UX Designer) - Thiết kế UX cho Odoo views
  - Barry (Quick Flow Dev) - Phát triển nhanh
  - Paige (Tech Writer) - Tài liệu hóa module
  - BMAD-Odoo Master - Điều phối tổng thể

- 📝 **44+ Workflows** bao phủ toàn bộ vòng đời phát triển:
  - Analysis: analyze-process, gap-analysis, create-product-brief
  - Planning: create-odoo-addon, create-odoo-epic, create-odoo-prd
  - Solutioning: create-architecture, create-epics-and-stories
  - Implementation: dev-story, code-review, sprint-planning
  - Testing: odoo-test-design, test-review
  - Documentation: document-odoo, document-project

- 🇻🇳 **Hỗ trợ tiếng Việt** đầy đủ
- 📚 **Odoo Knowledge Base** tích hợp kiến thức Odoo 16.0/17.0
- ⚙️ **Post-install script** tự động setup workflows

### Technical
- Hỗ trợ Odoo 16.0+ và 17.0
- Tương thích với Cursor, VS Code, và các AI IDE khác
- Tuân thủ OCA coding standards
