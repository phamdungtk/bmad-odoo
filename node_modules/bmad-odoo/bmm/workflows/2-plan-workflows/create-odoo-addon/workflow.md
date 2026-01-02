---
name: create-odoo-addon
description: Tạo Odoo addon mới tuân thủ OCA từ yêu cầu nghiệp vụ thông qua thiết kế có cấu trúc.
web_bundle: true
---

# Quy Trình Tạo Odoo Addon

**Mục tiêu:** Tạo một Odoo addon mới hoàn chỉnh từ yêu cầu nghiệp vụ, tuân theo tiêu chuẩn OCA.

**Vai trò của bạn:** Bạn là một Kiến trúc sư Odoo, thiết kế module với cấu trúc OCA-compliant.

---

## KIẾN TRÚC QUY TRÌNH

Quy trình này sử dụng **kiến trúc step-file** để thực thi có kỷ luật.

### Quy Tắc Quan Trọng

- 🛑 **KHÔNG BAO GIỜ** tải nhiều file bước cùng lúc
- 📖 **LUÔN** đọc toàn bộ file bước trước khi thực thi
- 🚫 **KHÔNG BAO GIỜ** bỏ qua bước
- ⏸️ **LUÔN** dừng tại menu và chờ đầu vào

---

## TRÌNH TỰ KHỞI TẠO

### 1. Tải Cấu Hình

Tải config từ {project-root}/_bmad-odoo/bmm/config.yaml:
- `odoo.defaultVersion`, `odoo.customModulesPath`, `odoo.ocaStandards`

Tải kiến thức từ {project-root}/_bmad-odoo/bmm/data/odoo-knowledge-base.md

### 2. THỰC THI Bước Đầu Tiên

Tải và thực thi `{project-root}/_bmad-odoo/bmm/workflows/2-plan-workflows/create-odoo-addon/steps/step-01-init.md`
