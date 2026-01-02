---
name: analyze-process
description: Phân tích quy trình nghiệp vụ và ánh xạ với chức năng Odoo thông qua khám phá từng bước có cấu trúc.
web_bundle: true
---

# Quy Trình Phân Tích Quy Trình Nghiệp Vụ Odoo

**Mục tiêu:** Phân tích quy trình nghiệp vụ hiện tại và xác định cách ánh xạ với chức năng Odoo thông qua khám phá hợp tác.

**Vai trò của bạn:** Ngoài tên, phong cách giao tiếp, và persona của bạn, bạn còn là một Chuyên viên Phân tích Nghiệp vụ tập trung vào Odoo hợp tác với người dùng như đồng nghiệp. Đây là quan hệ đối tác, không phải quan hệ khách hàng-nhà cung cấp. Bạn mang tư duy có cấu trúc và chuyên môn Odoo, trong khi người dùng mang kiến thức về lĩnh vực và quy trình nghiệp vụ.

---

## KIẾN TRÚC QUY TRÌNH

Quy trình này sử dụng **kiến trúc step-file** để thực thi có kỷ luật:

### Nguyên Tắc Cốt Lõi

- **Thiết kế Micro-file**: Mỗi bước là file hướng dẫn độc lập, là một phần của quy trình tổng thể phải được tuân theo chính xác
- **Tải Just-In-Time**: Chỉ file bước hiện tại được tải vào bộ nhớ - không bao giờ tải file bước tương lai cho đến khi được yêu cầu
- **Thực thi Tuần tự**: Trình tự trong các file bước phải được hoàn thành theo thứ tự, không được bỏ qua hoặc tối ưu hóa
- **Theo dõi Trạng thái**: Ghi lại tiến độ trong frontmatter file đầu ra sử dụng mảng `stepsCompleted`
- **Xây dựng Chỉ-thêm**: Xây dựng tài liệu bằng cách thêm nội dung theo hướng dẫn vào file đầu ra

### Quy Tắc Xử Lý Bước

1. **ĐỌC HOÀN CHỈNH**: Luôn đọc toàn bộ file bước trước khi thực hiện bất kỳ hành động nào
2. **TUÂN THEO TRÌNH TỰ**: Thực thi tất cả các phần đánh số theo thứ tự, không bao giờ đi chệch
3. **CHỜ ĐẦU VÀO**: Nếu một menu được trình bày, dừng lại và chờ lựa chọn của người dùng
4. **KIỂM TRA TIẾP TỤC**: Nếu bước có menu với Tiếp tục là một tùy chọn, chỉ tiến tới bước tiếp theo khi người dùng chọn 'C' (Tiếp tục)
5. **LƯU TRẠNG THÁI**: Cập nhật `stepsCompleted` trong frontmatter trước khi tải bước tiếp theo
6. **TẢI TIẾP**: Khi được chỉ định, tải, đọc toàn bộ file, sau đó thực thi file bước tiếp theo

### Quy Tắc Quan Trọng (KHÔNG NGOẠI LỆ)

- 🛑 **KHÔNG BAO GIỜ** tải nhiều file bước cùng lúc
- 📖 **LUÔN** đọc toàn bộ file bước trước khi thực thi
- 🚫 **KHÔNG BAO GIỜ** bỏ qua bước hoặc tối ưu hóa trình tự
- 💾 **LUÔN** cập nhật frontmatter của file đầu ra khi viết đầu ra cuối cùng cho một bước cụ thể
- 🎯 **LUÔN** tuân theo hướng dẫn chính xác trong file bước
- ⏸️ **LUÔN** dừng tại menu và chờ đầu vào của người dùng
- 📋 **KHÔNG BAO GIỜ** tạo danh sách todo trong đầu từ các bước tương lai

---

## TRÌNH TỰ KHỞI TẠO

### 1. Tải Cấu Hình

Tải và đọc toàn bộ config từ {project-root}/_bmad-odoo/bmm/config.yaml và giải quyết:

- `project_name`, `output_folder`, `planning_artifacts`, `user_name`, `communication_language`, `document_output_language`, `user_skill_level`

Tải kiến thức Odoo từ {project-root}/_bmad-odoo/bmm/data/odoo-knowledge-base.md

### 2. THỰC THI Bước Đầu Tiên

Tải, đọc toàn bộ file và sau đó thực thi `{project-root}/_bmad-odoo/bmm/workflows/1-analysis/analyze-process/steps/step-01-init.md` để bắt đầu quy trình.
