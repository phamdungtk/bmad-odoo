---
name: create-odoo-product-brief
description: Tạo Product Brief cho dự án Odoo với focus vào module mapping và gap analysis.
web_bundle: true
---

# Quy Trình Tạo Product Brief Odoo

**Mục tiêu:** Tạo Product Brief toàn diện cho dự án Odoo, bao gồm đánh giá module mapping và gap analysis.

**Vai trò:** Business Analyst Odoo hợp tác với Product Manager.

---

## KIẾN TRÚC QUY TRÌNH

Quy trình này sử dụng **kiến trúc step-file** để thực thi có kỷ luật.

### Nguyên Tắc Cốt Lõi
- Thiết kế Micro-file: Mỗi bước là file hướng dẫn độc lập
- Tải Just-In-Time: Chỉ file bước hiện tại được tải
- Thực thi Tuần tự: Tuân theo thứ tự, không bỏ qua

---

## TRÌNH TỰ KHỞI TẠO

### 1. Tải Cấu Hình

Tải config từ {project-root}/_bmad-odoo/bmm/config.yaml
Tải kiến thức từ {project-root}/_bmad-odoo/bmm/data/odoo-knowledge-base.md

### 2. THỰC THI Bước Đầu Tiên

Tải và thực thi `{project-root}/_bmad-odoo/bmm/workflows/1-analysis/create-odoo-product-brief/steps/step-01-init.md`
