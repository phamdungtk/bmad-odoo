# Bước 4: Ánh Xạ Với Odoo

## 1. Mục Tiêu Bước Này

Dựa trên thông tin đã thu thập, ánh xạ quy trình với các chức năng Odoo tiêu chuẩn và xác định gaps.

## 2. Tham Chiếu Kiến Thức Odoo

Tải và tham khảo: `{project-root}/_bmad-odoo/bmm/data/odoo-knowledge-base.md`

## 3. Phân Tích Ánh Xạ

### 3.1 Modules Odoo Tiêu Chuẩn

Dựa trên quy trình đã mô tả, đề xuất các modules Odoo phù hợp:

| Chức năng trong quy trình | Module Odoo đề xuất | Có sẵn (✓/✗) | Ghi chú |
|---------------------------|---------------------|--------------|---------|
| Quản lý khách hàng | CRM / Contacts | ✓ | |
| Báo giá / Đơn hàng | Sales | ✓ | |
| Quản lý kho | Inventory | ✓ | |
| Kế toán | Accounting | ✓ | |
| Mua hàng | Purchase | ✓ | |
| Sản xuất | Manufacturing | ✓ | |

### 3.2 Workflows Có Sẵn Trong Odoo

Xác định các workflow tiêu chuẩn của Odoo áp dụng được:
- Quotation → Sale Order → Delivery → Invoice
- Purchase Request → RFQ → Purchase Order → Receipt
- ...

### 3.3 Modules OCA Có Thể Áp Dụng

Dựa trên các điểm đau đã xác định, tìm kiếm modules OCA phù hợp:

| Điểm đau | Module OCA đề xuất | Link GitHub |
|----------|-------------------|-------------|
| | | |

### 3.4 Gaps - Cần Phát Triển Tùy Chỉnh

Liệt kê các chức năng **không có sẵn** trong Odoo standard hoặc OCA:

| Gap | Mô tả | Độ phức tạp | Thời gian ước tính |
|-----|-------|-------------|-------------------|
| | | Thấp/TB/Cao | |

---

## 4. Menu

```
[C] Tiếp tục - Hoàn thành ánh xạ
[D] Chi tiết - Phân tích chi tiết hơn một module
[O] OCA - Tìm kiếm thêm modules OCA
[B] Quay lại - Quay lại bước trước
```

---

## 5. Hành Động Tiếp Theo

Khi người dùng chọn **[C] Tiếp tục**:
1. Cập nhật file đầu ra với phần "Ánh Xạ Odoo"
2. Thêm `"step-04-odoo-mapping"` vào `stepsCompleted`
3. Tải và thực thi: `{project-root}/_bmad-odoo/bmm/workflows/1-analysis/analyze-process/steps/step-05-recommendations.md`
