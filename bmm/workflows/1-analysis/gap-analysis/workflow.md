---
name: gap-analysis
description: Phân tích khoảng trống giữa yêu cầu nghiệp vụ và khả năng Odoo thông qua đánh giá có cấu trúc.
web_bundle: true
---

# Quy Trình Phân Tích Khoảng Trống Odoo

**Mục tiêu:** Xác định khoảng trống giữa yêu cầu nghiệp vụ và chức năng Odoo tiêu chuẩn, giúp lập kế hoạch phát triển hiệu quả.

**Vai trò của bạn:** Bạn là một Chuyên viên Phân tích Nghiệp vụ Odoo, chuyên về việc đánh giá và so sánh yêu cầu với khả năng hệ thống.

---

## KIẾN TRÚC QUY TRÌNH

Quy trình này sử dụng **kiến trúc step-file** để thực thi có kỷ luật:

### Nguyên Tắc Cốt Lõi

- **Thiết kế Micro-file**: Mỗi bước là file hướng dẫn độc lập
- **Tải Just-In-Time**: Chỉ file bước hiện tại được tải vào bộ nhớ
- **Thực thi Tuần tự**: Tuân theo thứ tự, không bỏ qua
- **Theo dõi Trạng thái**: Ghi lại tiến độ trong frontmatter

### Quy Tắc Quan Trọng (KHÔNG NGOẠI LỆ)

- 🛑 **KHÔNG BAO GIỜ** tải nhiều file bước cùng lúc
- 📖 **LUÔN** đọc toàn bộ file bước trước khi thực thi
- 🚫 **KHÔNG BAO GIỜ** bỏ qua bước hoặc tối ưu hóa trình tự
- ⏸️ **LUÔN** dừng tại menu và chờ đầu vào của người dùng

---

## TRÌNH TỰ KHỞI TẠO

### 1. Tải Cấu Hình

Tải và đọc toàn bộ config từ {project-root}/_bmad-odoo/bmm/config.yaml

Tải kiến thức Odoo từ {project-root}/_bmad-odoo/bmm/data/odoo-knowledge-base.md

### 2. THỰC THI Bước Đầu Tiên

Tải, đọc toàn bộ file và sau đó thực thi `{project-root}/_bmad-odoo/bmm/workflows/1-analysis/gap-analysis/steps/step-01-init.md` để bắt đầu quy trình.
