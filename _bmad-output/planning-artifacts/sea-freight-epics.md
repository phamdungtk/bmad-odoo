---
stepsCompleted: [step-01, step-02, step-03]
inputDocuments:
  - _bmad-output/Tài liệu/Đường biển/sea_freight_documentation_v3_business.md
  - _bmad-output/Tài liệu/Đường biển/Quy trình - Đường biển.csv
  - _bmad-output/Tài liệu/Đường biển/Thử nghiệm phân chia công việc - Bảng giá sea.csv
---

# DPT Sea Freight — Epic Breakdown

## Tổng quan

Tài liệu này chia nhỏ toàn bộ yêu cầu nghiệp vụ Đường biển (Sea Freight) thành các Epic và Story có thể triển khai được. Mỗi Story bao gồm mô tả dạng User Story và Acceptance Criteria theo chuẩn Given-When-Then.

**Nguyên tắc triển khai**: Tạo **module mới** kế thừa các module cũ (`dpt_service_management`, `dpt_sale_management`, `dpt_account_payment_request`). Không sửa trực tiếp module gốc.

---

## Requirements Inventory

### Functional Requirements

- FR1: Hệ thống cho phép cấu hình dịch vụ/combo theo tuyến vận chuyển (Đường bộ, Đường biển, Đường bay) với checkbox phân loại
- FR2: Hệ thống tự động lọc dịch vụ/combo theo tuyến vận chuyển đã chọn trên đơn hàng (context-based filter qua `_search`)
- FR3: Hệ thống hỗ trợ đơn vị tính mới cho đường biển: Cont 20', Cont 40', Cont 40'HC, TEU, CBM, Set
- FR4: Sale Order phải yêu cầu bắt buộc nhập Incoterm (EXW/FOB/CIF) và Vị trí Incoterm khi chọn tuyến Đường biển
- FR5: Hệ thống quản lý 3 mức giá (Giá 1 — giá bán tốt nhất, Giá 2 — giá bán chuẩn, Giá 3 — giá gốc/cost từ SSL)
- FR6: Hệ thống tự động tạo yêu cầu phê duyệt giá khi CS nhập đơn giá lần đầu cho dịch vụ có bảng giá
- FR7: Khi CS sửa đơn giá và phê duyệt cũ chưa kết thúc (Chờ duyệt), hệ thống cập nhật phiếu cũ thay vì tạo mới
- FR8: Luồng phê duyệt giá 3 cấp: CS tự quyết (≥ Giá 2) → TB Chứng từ xác nhận + TB CS duyệt (< Giá 2, ≥ Giá 3) → TB Chứng từ xác nhận + GĐ duyệt (< Giá 3)
- FR9: Quản lý tem nhãn đường biển với 3 trạng thái: Chờ in → Đã in → Đã xác nhận (có ảnh chứng minh)
- FR10: Theo dõi trạng thái container qua 4 giai đoạn (~20 trạng thái): Booking → Cảng đi (TQ) → Transit → Cảng đến (VN)
- FR11: Tạo Đề nghị thanh toán thu hộ trả hộ (đường biển) tách bạch: tiền thu khách, tiền trả SSL, phí dịch vụ DPT
- FR12: Hạch toán kế toán tự động: Nợ 138 (phải thu KH) = Có 338 (phải trả SSL) + Có 511 (doanh thu DPT)
- FR13: Tỷ giá tự động cập nhật từ API Vietcombank, kế toán có thể override thủ công
- FR14: Tất toán đơn hàng — khóa chứng từ, không cho sửa/xóa sau khi tất toán
- FR15: Tính giá khai hải quan — cộng ngược chi phí trucking TQ cho đơn EXW hoàn thuế
- FR16: Cấu trúc chi phí theo Incoterm: FCL (Cont 20/40) và LCL (CBM) với bảng giá tham khảo
- FR17: Quản lý chi phí phát sinh ngoài dự kiến (kiểm hóa, phát sinh tại cảng, sửa vận đơn...)

### Non-Functional Requirements

- NFR1: Module mới kế thừa module cũ, không tạo table mới không cần thiết
- NFR2: Tương thích Odoo 17 CE/EE
- NFR3: Bảo mật giá: Giá 3 chỉ hiển thị cho nhóm Chứng từ và Kế toán (Record Rules)
- NFR4: ACL + Record Rules cho mọi model mới
- NFR5: Hỗ trợ đa tiền tệ (USD, VND, CNY) với tỷ giá tự động
- NFR6: Performance: Không N+1 query, sử dụng `mapped()`, `filtered()`, `_read_group()`
- NFR7: Ảnh evidence dán nhãn lưu trên `ir.attachment`, hỗ trợ filestore/S3

### Additional Requirements (Architecture)

- AR1: Tạo module `dpt_sea_freight` kế thừa `dpt_service_management`, `dpt_sale_management`, `dpt_account_payment_request`
- AR2: Override `_search()` trên Service/Combo để filter theo `line_transfer` context
- AR3: Tích hợp API tỷ giá Vietcombank qua cron job hàng ngày
- AR4: State Machine cho trạng thái container với `_STATE_TRANSITIONS` dict
- AR5: Approval workflow sử dụng `mail.activity` hoặc `approval` module
- AR6: Guard Clauses cho mọi business method (theo Lean ORM pattern)

---

### FR Coverage Map

| FR | Epic 1 | Epic 2 | Epic 3 | Epic 4 | Epic 5 | Epic 6 | Epic 7 |
|---|---|---|---|---|---|---|---|
| FR1 | ✅ | | | | | | |
| FR2 | ✅ | | | | | | |
| FR3 | ✅ | | | | | | |
| FR4 | ✅ | | | | | | |
| FR5 | | ✅ | | | | | |
| FR6 | | | ✅ | | | | |
| FR7 | | | ✅ | | | | |
| FR8 | | | ✅ | | | | |
| FR9 | | | | | | | ✅ |
| FR10 | | | | ✅ | | | |
| FR11 | | | | | ✅ | | |
| FR12 | | | | | | ✅ | |
| FR13 | | | | | | ✅ | |
| FR14 | | | | | | ✅ | |
| FR15 | | | | | ✅ | | |
| FR16 | | ✅ | | | | | |
| FR17 | | ✅ | | | | | |

---

## Epic List

| Epic | Tên | Mô tả | Độ ưu tiên |
|---|---|---|---|
| **Epic 1** | Module nền tảng & Master Data | Tạo module mới, cấu hình dịch vụ đường biển, UoM, Incoterm, filter tự động | 🔴 Critical — Phải làm trước |
| **Epic 2** | Hệ thống phân cấp giá & Bảng chi phí | 3 mức giá (Giá 1/2/3), cấu trúc chi phí FCL/LCL, chi phí phát sinh | 🔴 Critical |
| **Epic 3** | Luồng phê duyệt giá nhiều cấp | Auto-create/update phê duyệt, 3 cấp duyệt (CS → TB Chứng từ → TB CS → GĐ) | 🔴 Critical |
| **Epic 4** | Tracking trạng thái Container & Milestones | 4 giai đoạn, ~20 trạng thái, timeline theo dõi | 🟡 High |
| **Epic 5** | Hải quan & Đề nghị thanh toán | Tính giá khai HQ, ĐNTT thu hộ trả hộ đường biển, tách bạch thu/chi | 🟡 High |
| **Epic 6** | Hạch toán kế toán & Tất toán | Hạch toán 138/338/511, tỷ giá API VCB, tất toán & khóa đơn | 🟡 High |
| **Epic 7** | Quản lý Tem nhãn đường biển | State machine tem nhãn, upload ảnh evidence, auto-compute trạng thái | 🟢 Medium |

---

## Epic 1: Module nền tảng & Master Data

**Mục tiêu**: Tạo module mới `dpt_sea_freight` kế thừa các module cũ, cấu hình toàn bộ Master Data cho đường biển: dịch vụ, combo, UoM, Incoterm, và filter tự động.

### Story 1.1: Tạo module mới `dpt_sea_freight`

Là **IT/Admin**,
Tôi muốn **tạo module Odoo mới kế thừa các module hiện có** (`dpt_service_management`, `dpt_sale_management`, `dpt_account_payment_request`),
Để **tách biệt logic đường biển ra khỏi code gốc, dễ bảo trì và nâng cấp**.

**Acceptance Criteria:**

**Given** module `dpt_sea_freight` được tạo với `__manifest__.py` khai báo `depends`
**When** cài đặt module trên Odoo 17
**Then** module cài thành công, không ảnh hưởng chức năng hiện có của các module gốc
**And** cấu trúc thư mục tuân thủ chuẩn Odoo: `models/`, `views/`, `data/`, `security/`

---

### Story 1.2: Cấu hình dịch vụ & combo theo tuyến vận chuyển

Là **Admin/CS**,
Tôi muốn **tích checkbox "Đường biển" khi tạo dịch vụ/combo**,
Để **hệ thống phân loại dịch vụ theo tuyến vận chuyển**.

**Acceptance Criteria:**

**Given** Admin mở form tạo/sửa dịch vụ
**When** tích chọn checkbox **Đường biển** trong nhóm Tuyến vận chuyển
**Then** dịch vụ được gắn cờ `is_sea_service = True`
**And** trường **Incoterm** (EXW, FOB, CIF...) hiển thị để chỉ định loại chi phí

**Given** Admin mở form tạo/sửa combo dịch vụ
**When** tích chọn checkbox **Đường biển**
**Then** combo được gắn cờ `is_sea_combo = True`

---

### Story 1.3: Khởi tạo UoM đường biển

Là **Admin**,
Tôi muốn **có sẵn các đơn vị tính đường biển khi cài module**,
Để **CS chọn đúng đơn vị khi thêm dịch vụ vào đơn hàng**.

**Acceptance Criteria:**

**Given** module `dpt_sea_freight` được cài đặt
**When** hệ thống load data XML
**Then** các UoM sau được tạo: *Cont 20', Cont 40', Cont 40'HC, TEU, CBM, Set*
**And** TEU được định nghĩa là `smaller` (factor 1.0) của Cont 20' để tránh duplicate reference unit
**And** CBM nằm trong category riêng "Thể tích (Khối)" để tránh conflict với category mặc định Odoo

---

### Story 1.4: Filter tự động dịch vụ theo tuyến vận chuyển

Là **CS**,
Tôi muốn **khi chọn dịch vụ/combo trên đơn hàng, hệ thống tự động chỉ hiện dịch vụ đúng tuyến**,
Để **không phải lọc thủ công, tránh chọn nhầm dịch vụ đường bộ cho đơn đường biển**.

**Acceptance Criteria:**

**Given** CS đang tạo đơn hàng với Tuyến vận chuyển = Đường biển
**When** CS mở dropdown chọn dịch vụ hoặc combo
**Then** chỉ hiển thị dịch vụ/combo có `is_sea_service = True` hoặc `is_sea_combo = True`
**And** cơ chế filter hoạt động qua override `_search()` hứng `context={'line_transfer': 'sea'}`

---

### Story 1.5: Bắt buộc nhập Incoterm khi chọn Đường biển

Là **CS**,
Tôi muốn **trường Incoterm và Vị trí Incoterm tự động hiện và bắt buộc nhập khi chọn Đường biển**,
Để **mọi đơn đường biển đều có thông tin Incoterm rõ ràng**.

**Acceptance Criteria:**

**Given** CS tạo đơn hàng bán mới
**When** CS chọn Tuyến vận chuyển = Đường biển
**Then** trường **Incoterm** và **Vị trí Incoterm** tự động hiển thị và có `required=True`
**And** nếu CS chọn Đường bay (`flying`), hệ thống báo lỗi UserError do chưa hỗ trợ

---

## Epic 2: Hệ thống phân cấp giá & Bảng chi phí

**Mục tiêu**: Xây dựng hệ thống 3 mức giá (Giá 1/Giá 2/Giá 3) trên Sale Order, cấu trúc chi phí theo Incoterm (FCL/LCL), và quản lý chi phí phát sinh.

### Story 2.1: Mô hình 3 mức giá trên dòng dịch vụ

Là **CS**,
Tôi muốn **mỗi dòng dịch vụ trên đơn hàng hiển thị 3 cột giá: Giá 1, Giá 2, Giá 3**,
Để **biết biên lợi nhuận và chọn mức giá phù hợp khi báo khách**.

**Acceptance Criteria:**

**Given** CS mở tab dịch vụ trên Sale Order đường biển
**When** Chứng từ đã nhập Giá 3 (giá gốc từ SSL)
**Then** hệ thống hiển thị 3 cột: Giá 3 (cost), Giá 2 (chuẩn = Giá 3 + margin thấp), Giá 1 (tốt nhất = Giá 3 + margin cao)
**And** CS nhập giá bán thực tế vào cột "Đơn giá" — giá này sẽ được so sánh với ngưỡng để trigger phê duyệt

---

### Story 2.2: Bảng giá tham chiếu theo cảng đi/đến

Là **Chứng từ/CS**,
Tôi muốn **tra cứu bảng giá O/F tham khảo theo cảng đi, cảng đến và hãng tàu**,
Để **nhanh chóng ước tính chi phí khi khách hỏi**.

**Acceptance Criteria:**

**Given** Chứng từ/CS truy cập menu bảng giá O/F
**When** lọc theo cảng đi (NINGBO, QUINGDAO, SHEKOU, NANSHA...) và cảng đến (Hải Phòng, Hồ Chí Minh)
**Then** hệ thống hiển thị giá O/F tham khảo theo Cont 20' và Cont 40' với hãng tàu (MCC/CNC, SITC...)
**And** bảng giá có thể được cập nhật bởi Admin/Chứng từ

---

### Story 2.3: Cấu trúc chi phí FCL theo Incoterm

Là **Chứng từ**,
Tôi muốn **nhập chi phí gốc (Giá 3) theo cấu trúc chuẩn: Chi phí TQ + O/F + Chi phí VN + Phí dịch vụ DPT**,
Để **đảm bảo mọi đơn hàng FCL có cấu trúc chi phí đồng nhất**.

**Acceptance Criteria:**

**Given** Chứng từ mở đơn hàng FCL Đường biển
**When** nhập chi phí theo nhóm (EXW Charge, THC, CIC, D/O, Cleaning, Handling, Phí HQ NK, Phí CSHT, Trucking VN)
**Then** hệ thống tổng hợp theo 4 nhóm: Chi phí TQ, Cước tàu (O/F), Chi phí VN, Phí dịch vụ DPT
**And** áp dụng VAT theo từng dòng (0% hoặc 8%)
**And** tự động quy đổi tiền tệ (USD/VND) theo tỷ giá hiện hành

---

### Story 2.4: Cấu trúc chi phí LCL

Là **Chứng từ**,
Tôi muốn **nhập chi phí LCL tính theo CBM (m³) thay vì container**,
Để **xử lý đúng đơn hàng hàng lẻ**.

**Acceptance Criteria:**

**Given** Chứng từ mở đơn hàng LCL Đường biển
**When** nhập chi phí O/F, THC, CFS, CIC theo đơn vị CBM
**Then** hệ thống tính đúng tổng chi phí theo thể tích hàng
**And** phí dịch vụ LCL = 1.000.000₫/Set (khác với FCL = 3.000.000₫)
**And** có thêm các khoản phí riêng LCL: CFS, Bốc xếp kho CFS, Lưu kho CFS/ngày/m³

---

### Story 2.5: Quản lý chi phí phát sinh ngoài dự kiến

Là **Chứng từ**,
Tôi muốn **ghi nhận các chi phí phát sinh ngoài dự kiến (kiểm hóa, phát sinh tại cảng, sửa vận đơn...)**,
Để **kế toán có đủ cơ sở hạch toán và thu hộ/trả hộ đầy đủ**.

**Acceptance Criteria:**

**Given** đơn hàng đang trong quá trình vận chuyển/thông quan
**When** Chứng từ thêm dòng chi phí phát sinh (kiểm hóa, phát sinh cảng, ngoài giờ, bất khả kháng...)
**Then** chi phí phát sinh được ghi nhận riêng, không lẫn với chi phí cố định
**And** chi phí phát sinh hiển thị trên ĐNTT và được tính vào tổng tiền thu khách

---

## Epic 3: Luồng phê duyệt giá nhiều cấp

**Mục tiêu**: Xây dựng workflow phê duyệt giá 3 cấp (CS → TB Chứng từ → TB CS → GĐ) với cơ chế auto-create/update thông minh.

### Story 3.1: Tự động tạo yêu cầu phê duyệt giá khi nhập đơn giá

Là **CS**,
Tôi muốn **hệ thống tự tạo phiếu phê duyệt giá khi tôi nhập đơn giá lần đầu cho dịch vụ có bảng giá**,
Để **không phải tạo thủ công, đảm bảo mọi mức giá đều được kiểm soát**.

**Acceptance Criteria:**

**Given** CS nhập đơn giá lần đầu cho một dòng dịch vụ có bảng giá (Giá 0)
**When** CS lưu đơn hàng
**Then** hệ thống tự động tạo 1 phiếu phê duyệt giá (trạng thái: Chờ duyệt)
**And** phiếu được gửi đến cấp duyệt tương ứng dựa trên ngưỡng giá (Cấp 0/1/2)

---

### Story 3.2: Cập nhật phê duyệt thay vì tạo mới khi sửa giá

Là **CS**,
Tôi muốn **khi tôi sửa giá và phiếu phê duyệt cũ chưa kết thúc, hệ thống cập nhật phiếu cũ thay vì tạo mới**,
Để **tránh spam nhiều phiếu trùng lặp, người duyệt chỉ thấy giá mới nhất**.

**Acceptance Criteria:**

**Given** CS sửa đơn giá lần 2 và phiếu phê duyệt cũ đang ở trạng thái **Chờ duyệt**
**When** CS lưu đơn hàng
**Then** hệ thống cập nhật giá mới vào phiếu cũ, **KHÔNG** tạo phiếu mới

**Given** CS sửa đơn giá sau khi phiếu cũ **Đã duyệt/Đã hủy/Từ chối**
**When** CS lưu đơn hàng
**Then** hệ thống tạo phiếu phê duyệt **MỚI**

---

### Story 3.3: Phê duyệt cấp 1 — TB Chứng từ xác nhận + TB CS duyệt

Là **Trưởng BP Chứng từ**,
Tôi muốn **xác nhận giá gốc SSL chính xác trước khi TB CS duyệt giá bán**,
Để **đảm bảo giá gốc đã là mức tốt nhất có thể từ SSL, tránh duyệt giá khi còn dư địa đàm phán**.

**Acceptance Criteria:**

**Given** CS nhập giá bán < Giá 2 nhưng ≥ Giá 3
**When** hệ thống tạo phiếu phê duyệt cấp 1
**Then** phiếu gửi đến **TB Chứng từ** để xác nhận giá gốc
**And** sau khi TB Chứng từ xác nhận → phiếu chuyển đến **TB CS** để duyệt giá bán
**And** TB CS thấy được: giá gốc, giá bán đề xuất, biên lợi nhuận

---

### Story 3.4: Phê duyệt cấp 2 — Escalate lên Giám đốc khi giá dưới cost

Là **Giám đốc Kinh doanh**,
Tôi muốn **nhận yêu cầu phê duyệt tự động khi giá bán thấp hơn giá gốc (công ty lỗ)**,
Để **quyết định có chấp nhận lỗ để giữ khách hay từ chối**.

**Acceptance Criteria:**

**Given** CS nhập giá bán < Giá 3 (giá gốc)
**When** TB Chứng từ xác nhận "hết dư địa deal SSL"
**Then** hệ thống tự động đẩy phiếu lên Giám đốc
**And** GĐ thấy: giá gốc, giá bán, mức lỗ dự kiến, thông tin khách hàng
**And** GĐ có thể Duyệt (chấp nhận lỗ) hoặc Từ chối

---

### Story 3.5: State Machine phiếu phê duyệt

Là **Người dùng hệ thống**,
Tôi muốn **phiếu phê duyệt có trạng thái rõ ràng và chuyển đúng logic**,
Để **theo dõi được tiến độ phê duyệt**.

**Acceptance Criteria:**

**Given** phiếu phê duyệt được tạo
**When** trạng thái thay đổi
**Then** tuân thủ state machine: Chờ duyệt → Đã duyệt / Từ chối / Đã hủy
**And** chỉ người có quyền mới được Duyệt/Từ chối (ACL)
**And** lịch sử duyệt được ghi log (ai duyệt, khi nào, giá cũ/mới)

---

## Epic 4: Tracking trạng thái Container & Milestones

**Mục tiêu**: Theo dõi trạng thái container xuyên suốt 4 giai đoạn vận chuyển từ TQ về VN.

### Story 4.1: Model trạng thái container

Là **Chứng từ**,
Tôi muốn **cập nhật trạng thái container theo các mốc vận chuyển thực tế**,
Để **CS và khách hàng theo dõi được tiến độ lô hàng**.

**Acceptance Criteria:**

**Given** đơn hàng đường biển đã được xác nhận
**When** Chứng từ cập nhật trạng thái container
**Then** hệ thống cho phép chọn trạng thái theo 4 giai đoạn:
- GĐ1 Booking: Booking Request → Confirmed → Equipment Released → Cancelled
- GĐ2 Cảng đi: Empty Gate Out → Full Gate In → Customs Cleared → Loaded on Board → Vessel Departed → Rolled/Shut out
- GĐ3 Transit: In Transit → Transshipment Discharged/Loaded → Omitted
- GĐ4 Cảng đến: Vessel Arrived → Discharged → Import Customs Cleared → Customs Hold → Gate Out Full → Empty Gate In → Damaged

**And** mỗi chuyển trạng thái ghi nhận ngày giờ và người thực hiện

---

### Story 4.2: Timeline milestones trên Sale Order

Là **CS**,
Tôi muốn **thấy timeline các mốc chính trên đơn hàng: Đóng công → Ra cảng → Lên tàu → Cập cảng → Thông quan → Về kho**,
Để **nhanh chóng biết hàng đang ở đâu mà không cần hỏi Chứng từ**.

**Acceptance Criteria:**

**Given** CS mở Sale Order đường biển
**When** có trạng thái container được cập nhật
**Then** hiển thị timeline 6 mốc chính với trạng thái đạt/chưa đạt và ngày thực tế
**And** trạng thái ngoại lệ (Rolled, Customs Hold, Damaged) được highlight cảnh báo

---

### Story 4.3: Cảnh báo trạng thái ngoại lệ

Là **Chứng từ**,
Tôi muốn **nhận cảnh báo khi container gặp sự cố (rớt tàu, HQ giữ hàng, hư hỏng)**,
Để **xử lý kịp thời và thông báo khách hàng**.

**Acceptance Criteria:**

**Given** trạng thái container chuyển sang Rolled/Shut out, Customs Hold, hoặc Damaged
**When** Chứng từ cập nhật trạng thái
**Then** hệ thống gửi thông báo (mail.activity) cho Chứng từ + CS
**And** trạng thái được đánh dấu ⚠️ trên giao diện

---

## Epic 5: Hải quan & Đề nghị thanh toán

**Mục tiêu**: Xử lý tính giá khai hải quan và tạo Đề nghị thanh toán thu hộ trả hộ đường biển.

### Story 5.1: Tính giá khai hải quan (cộng ngược trucking TQ cho EXW hoàn thuế)

Là **Chứng từ**,
Tôi muốn **hệ thống hỗ trợ tính giá khai hải quan, tự động cộng ngược chi phí trucking TQ cho đơn EXW hoàn thuế**,
Để **khớp số liệu khai HQ với hóa đơn xuất cho khách, tránh bị HQ truy vấn**.

**Acceptance Criteria:**

**Given** đơn hàng EXW có cờ `is_tax_refund = True` (hoàn thuế)
**When** Chứng từ tính giá khai HQ
**Then** hệ thống tự động cộng chi phí trucking đầu TQ vào giá khai hải quan VN
**And** hiển thị công thức: Giá khai HQ = Giá hàng (INV) + Trucking TQ

**Given** đơn hàng KHÔNG phải hoàn thuế
**When** Chứng từ tính giá khai HQ
**Then** hệ thống KHÔNG cộng ngược trucking TQ

---

### Story 5.2: Tạo Đề nghị thanh toán thu hộ trả hộ (đường biển)

Là **Chứng từ**,
Tôi muốn **tạo ĐNTT tách bạch rõ: tiền phải thu khách, tiền phải trả SSL, phí dịch vụ DPT**,
Để **kế toán dễ dàng kiểm tra và hạch toán chính xác**.

**Acceptance Criteria:**

**Given** hàng đã thông quan, Chứng từ có đầy đủ bộ chứng từ
**When** Chứng từ tạo ĐNTT trên hệ thống → chọn loại **Thu hộ trả hộ (đường biển)**
**Then** ĐNTT hiển thị 3 phần rõ ràng:
- Tiền phải thu của khách (tổng báo giá)
- Tiền phải trả cho SSL (Giá 3 + phát sinh)
- Phí dịch vụ thu hộ (chênh lệch = lợi nhuận DPT)
**And** ĐNTT ở trạng thái **Nháp**, chờ kế toán duyệt

---

## Epic 6: Hạch toán kế toán & Tất toán

**Mục tiêu**: Hạch toán tự động 138/338/511, tích hợp tỷ giá API VCB, và tất toán đơn hàng.

### Story 6.1: Tích hợp API tỷ giá Vietcombank

Là **Kế toán**,
Tôi muốn **tỷ giá USD/VND và CNY/VND tự động cập nhật hàng ngày từ Vietcombank**,
Để **không phải nhập thủ công và giảm sai sót tỷ giá**.

**Acceptance Criteria:**

**Given** cron job chạy hàng ngày (cấu hình thời gian)
**When** lấy tỷ giá từ API Vietcombank
**Then** hệ thống cập nhật tỷ giá USD, CNY vào bảng `res.currency.rate`
**And** lưu lịch sử tỷ giá để đối soát
**And** kế toán có thể override tỷ giá thủ công cho từng đơn hàng

---

### Story 6.2: Hạch toán kế toán tự động (138/338/511)

Là **Kế toán**,
Tôi muốn **hệ thống tự động tạo bút toán hạch toán khi duyệt ĐNTT**,
Để **giảm nhập liệu thủ công và đảm bảo cân bằng sổ sách**.

**Acceptance Criteria:**

**Given** kế toán duyệt ĐNTT thu hộ trả hộ đường biển
**When** bấm nút Duyệt
**Then** hệ thống tạo bút toán:
- Nợ TK 138 = Tổng tiền thu khách
- Có TK 338 = Tiền trả SSL
- Có TK 511 = Phí dịch vụ (lợi nhuận)
**And** Nợ 138 = Có 338 + Có 511 (cân bằng)
**And** tỷ giá áp dụng là tỷ giá tại thời điểm hạch toán

---

### Story 6.3: Tất toán đơn hàng & Khóa chứng từ

Là **Kế toán**,
Tôi muốn **chốt "Tất toán" đơn hàng khi hoàn thành toàn bộ thu/chi**,
Để **khóa đơn, không ai sửa/xóa được, đảm bảo tính toàn vẹn dữ liệu**.

**Acceptance Criteria:**

**Given** tất cả khoản thu/chi trên đơn hàng đã khớp
**When** kế toán bấm **"Tất toán"**
**Then** đơn hàng chuyển sang trạng thái **"Đã tất toán"**
**And** tất cả trường trên đơn hàng, ĐNTT, dòng dịch vụ → chuyển thành `readonly`
**And** chỉ quản trị viên mới có quyền mở lại đơn đã tất toán

---

## Epic 7: Quản lý Tem nhãn đường biển

**Mục tiêu**: Quản lý trạng thái tem nhãn hàng hóa đường biển với ảnh chứng minh dán nhãn.

### Story 7.1: State machine tem nhãn trên Sale Order

Là **Nhân viên kho/vận hành**,
Tôi muốn **cập nhật trạng thái tem nhãn: Chờ in → Đã in → Đã xác nhận (có ảnh)**,
Để **Chứng từ kiểm soát được 100% tem nhãn trước khi load container**.

**Acceptance Criteria:**

**Given** đơn hàng đường biển có tab "Tem nhãn (Biển)"
**When** kho/vận hành xác nhận in tem
**Then** trạng thái chuyển từ **Chờ in** → **Đã in**, ghi nhận `sea_label_printed_date`

**Given** trạng thái tem = Đã in
**When** nhân viên upload ảnh chụp kiện hàng đã dán tem vào `sea_label_evidence_ids`
**Then** trạng thái tự động chuyển sang **Đã xác nhận**, ghi nhận `sea_label_confirmed_date` và `sea_label_confirmed_by`

---

### Story 7.2: Upload ảnh chứng minh dán nhãn

Là **Nhân viên vận hành**,
Tôi muốn **upload ảnh chụp kiện hàng đã dán tem lên hệ thống**,
Để **có bằng chứng pháp lý nếu xảy ra tranh chấp về tem nhãn**.

**Acceptance Criteria:**

**Given** nhân viên mở tab Tem nhãn trên Sale Order
**When** upload 1 hoặc nhiều ảnh vào trường **Ảnh chứng minh dán nhãn**
**Then** ảnh được lưu trên `ir.attachment`
**And** trạng thái tem tự động compute sang **Đã xác nhận**
**And** hệ thống ghi nhận thời gian và người upload

---

## Tổng kết Effort Estimation

| Epic | Số Stories | Ước lượng (Sprint) | Phụ thuộc |
|---|---|---|---|
| Epic 1: Module nền tảng | 5 | Sprint 1 | — |
| Epic 2: Phân cấp giá | 5 | Sprint 1-2 | Epic 1 |
| Epic 7: Tem nhãn | 2 | Sprint 2 | Epic 1 |
| Epic 3: Phê duyệt giá | 5 | Sprint 2-3 | Epic 2 |
| Epic 4: Tracking container | 3 | Sprint 3 | Epic 1 |
| Epic 5: HQ & ĐNTT | 2 | Sprint 3-4 | Epic 2, Epic 4 |
| Epic 6: Kế toán & Tất toán | 3 | Sprint 4 | Epic 5 |
| **Tổng** | **25 stories** | **~4 Sprints** | |
