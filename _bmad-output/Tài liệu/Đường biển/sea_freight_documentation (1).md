# Tài liệu Kỹ thuật & Luồng hoạt động: Tính năng Đường Biển (Sea Freight)

Tài liệu này mô tả chi tiết luồng nghiệp vụ người dùng, danh sách các đoạn code/trường dữ liệu đã được thêm vào hệ thống và các hướng dẫn xử lý vấn đề (troubleshooting) nếu gặp lỗi trong quá trình sử dụng.

---

## 1. Luồng Hoạt Động (Workflow)

Tính năng đường biển được thiết kế bám sát vào hệ thống cấu hình động của Odoo-DPT hiện tại, đảm bảo tái sử dụng tối đa cấu trúc cũ.

### Bước 1: Cấu hình Dịch vụ & Combo (Master Data)
- **Nhân viên Admin/CS** truy cập vào menu **Dịch vụ / Gói combo dịch vụ**.
- Khi tạo mới một dịch vụ (ví dụ: *Cước vận chuyển đường biển*, *Phí THC*), người dùng tích chọn checkbox **Đường biển** trong nhóm **Tuyến vận chuyển**.
- Nếu dịch vụ là chi phí tại xưởng, chọn **Incoterm** áp dụng cho loại chi phí đó.
- Đối với dịch vụ Thu hộ trả hộ, anh chủ động tạo 1 record dịch vụ và tự cấu hình các tài khoản hạch toán liên quan trực tiếp trên service đó.
- **Đơn vị tính (UoM)**: Chọn các đơn vị mới như *Cont 20', Cont 40', TEU, CBM, Set*.

### Bước 2: Tạo Đơn hàng Bán (Sale Order)
- CS tạo đơn hàng, tại trường **Tuyến vận chuyển (Line Transfer)** chọn **Đường biển**. (Lưu ý: Nếu chọn Đường bay, hệ thống sẽ báo lỗi do chưa hỗ trợ).
- Ngay khi chọn Đường biển, trường **Incoterm** và **Vị trí Incoterm** sẽ tự động hiển thị và yêu cầu bắt buộc nhập.
- Tab **Tem nhãn (Biển)** sẽ xuất hiện ở phía dưới Đơn hàng.

### Bước 3: Thêm Dịch vụ vào Đơn
- CS chuyển sang tab **Dịch vụ dự kiến / Dịch vụ thực tế**.
- Tại trường chọn Combo hoặc Dịch vụ chi tiết, xổ danh sách xuống, **hệ thống sẽ tự động chỉ hiển thị các Dịch vụ / Combo có hỗ trợ Đường biển** (nhờ cơ chế filter tự động ngầm dưới code). 

### Bước 4: Quản lý Tem nhãn (Labeling)
- Trạng thái tem nhãn ban đầu là **Chờ in (Pending)**.
- Khi kho/vận hành in tem, hệ thống ghi nhận ngày in và chuyển trạng thái thành **Đã in (Printed)**.
- Tại công đoạn dán tem, nhân viên vận hành chụp ảnh kiện hàng đã dán tem và upload vào trường **Ảnh chứng minh dán nhãn** trong tab Tem nhãn.
- Ngay khi có ảnh, trạng thái tự động nhảy sang **Đã xác nhận (có ảnh)**.

### Bước 5: Đề nghị thanh toán (Kế toán)
- Kế toán tạo Đề nghị thanh toán (Account Payment).
- Chọn Loại DNTT là **Thu hộ trả hộ (đường biển)**.
- Điền số tiền cần thu hộ/trả hộ và phần tiền **Phí dịch vụ thu hộ** vào trường dành riêng để hệ thống tự động bóc tách doanh thu (TK 511) và công nợ (138/338).

---

## 2. Danh sách Code đã thêm (Implementation Summary)

Việc phát triển tuân thủ strict constraint: **Không tạo table mới, Không tạo module mới**. Tất cả logic được gắn vào model hiện có.

### A. Module `dpt_service_management`
1. **`models/service.py`**:
   - Thêm cờ phân loại: `is_road_service`, `is_sea_service`, `is_flying_service`.
   - Thêm `incoterm` (Selection: EXW, FOB, CIF,...) để chỉ định Incoterm mà dịch vụ áp dụng làm chi phí khai hải quan, và `service_pricing_level` (Đơn/Set/Cont).
   - Mở rộng selection `report_table` thêm 4 tuỳ chọn đường biển (11, 12, 13, 14).
   - **Đặc biệt**: Ghi đè hàm `_search()` để hứng `context={'line_transfer': ...}` từ sale order và tự động ráp domain.
2. **`models/service_combo.py`**:
   - Thêm cờ phân loại: `is_road_combo`, `is_sea_combo`, `is_flying_combo`.
   - Ghi đè hàm `_search()` tương tự như service.
3. **`data/uom_sea_freight_data.xml`**:
   - Khởi tạo data UoM mới: *Cont 20', Cont 40', Cont 40'HC, TEU, CBM, Set*.
   - **Fix Lỗi XML Odoo 17**: Định nghĩa chuẩn xác TEU là `smaller` (factor 1.0) của Cont 20' để tránh lỗi duplicate reference unit. Tạo category riêng **"Thể tích (Khối)"** cho CBM để tránh conflict với category mặc định của Odoo.
4. **`views/service_view.xml` & `views/service_combo_view.xml`**:
   - Gắn UI cho các trường mới.

### B. Module `dpt_sale_management`
1. **`models/sale_order.py`**:
   - Cập nhật field `line_transfer` (set default = 'road', sửa label tiếng Việt). Thêm `@api.constrains` để báo lỗi nếu chọn Đường bay (`flying`).
   - Thêm cụm trường Tem nhãn: `sea_label_status`, `sea_label_evidence_ids` (M2M với `ir.attachment`), `sea_label_printed_date`, `sea_label_confirmed_date`, `sea_label_confirmed_by`.
   - Hàm compute `_compute_sea_label_status()` tự động tính trạng thái dựa trên sự hiện diện của ảnh/ngày in.
2. **`views/sale_order.xml`**:
   - Khai báo hiển thị trường `line_transfer` trực tiếp trên form view gốc của Odoo (dưới field `sale_order_template_id`) để không bị Odoo Studio làm ẩn đi (lỗi khi gán invisible=1).
   - Cập nhật `<field name="service_id">` và `<field name="combo_id">` truyền thêm thuộc tính `context="{'line_transfer': parent.line_transfer}"`.
   - Bổ sung `<page name="sea_label">`.

### C. Module `dpt_account_payment_request`
1. **`models/dpt_account_payment_type.py`** & **`views/dpt_account_payment_type.xml`**: 
   - Thêm cờ `is_sea_collection` (Thu hộ trả hộ đường biển).
2. **`models/account_payment_inherit.py`** & **`views/account_payment.xml`**:
   - Thêm trường `sea_collection_fee` (Phí dịch vụ thu hộ).

---

## 3. Hướng xử lý vấn đề (Troubleshooting Guidelines)

| Vấn đề (Issue) | Nguyên nhân khả dĩ (Possible Causes) | Cách xử lý (Solution) |
| :--- | :--- | :--- |
| **Lỗi 1: Không thấy Dịch vụ / Combo khi thêm vào Đơn hàng** | Cơ chế filter tự động qua `_search` đang chặn các dịch vụ không khớp với Tuyến vận chuyển của Đơn. | 1. Kiểm tra trường **Tuyến vận chuyển** trên Đơn hàng đang chọn là gì (VD: Đường biển).<br>2. Quay lại form cấu hình của Dịch vụ/Combo đó, đảm bảo checkbox **Đường biển** đã được tích xanh. |
| **Lỗi 2: Trạng thái Tem nhãn không tự chuyển sang "Đã xác nhận"** | Logic tự động tính toán phụ thuộc vào việc có ảnh chứng minh dán nhãn hay không. | Đảm bảo nhân viên đã upload ít nhất 1 file ảnh vào trường **Ảnh chứng minh dán nhãn**. Lưu đơn hàng để trigger hàm compute tính toán lại trạng thái. |
| **Lỗi 3: Không thấy trường Incoterm trên đơn hàng** | Do cấu trúc Odoo 17, `incoterm` nằm ở module `sale_stock`. | Nếu module của bạn không cài đặt hoặc không depends vào `sale_stock`, việc chèn `incoterm` qua xpath sẽ gây ParseError. Hãy khai báo `depends: ['sale_stock']` trước khi sử dụng. |
| **Lỗi 4: Báo giá (Quotation) không nhận cấu hình EXW** | Đơn hàng chọn Incoterm là EXW nhưng chưa khai báo dịch vụ nào là chi phí EXW. | CS cần quay lại kho Dịch vụ, tìm các dịch vụ phát sinh tại xưởng (Local charge đầu xuất) và chọn trường **Incoterm** là **EXW**. |

---

## Lời khuyên cho đội IT nội bộ:
- Vì các logic filter Dịch vụ/Combo được đưa thẳng vào hàm `_search` của ORM, tính năng này sẽ có tác dụng **toàn cục (global)** ở bất cứ đâu có view M2O truyền biến `line_transfer` qua context. Nếu ở module khác cần tái sử dụng, chỉ cần thêm `context="{'line_transfer': 'sea'}"` vào field XML là danh sách sẽ tự filter.
- Các ảnh evidence dán nhãn lưu trên `ir.attachment`, để tránh phình to database theo thời gian, đội IT nên cấu hình filestore hoặc liên kết với AWS S3.
