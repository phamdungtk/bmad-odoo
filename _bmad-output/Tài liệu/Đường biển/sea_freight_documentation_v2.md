# Tài liệu Kỹ thuật & Luồng hoạt động: Tính năng Đường Biển (Sea Freight) — v2.0

> **Phiên bản**: 2.0 — Hoàn chỉnh 100% luồng nghiệp vụ  
> **Cập nhật**: Bổ sung hệ thống phân cấp giá, luồng phê duyệt nhiều cấp, tỷ giá API, tracking milestones, tính giá khai hải quan, hạch toán kế toán chi tiết, và tất toán đơn hàng.

Tài liệu này mô tả chi tiết luồng nghiệp vụ người dùng, danh sách các đoạn code/trường dữ liệu đã được thêm vào hệ thống, và các hướng dẫn xử lý vấn đề (troubleshooting) nếu gặp lỗi trong quá trình sử dụng.

---

## Mục lục

1. [Phân bổ vai trò (Top-Down)](#1-phân-bổ-vai-trò-top-down)
2. [Luồng hoạt động (Bottom-Up Workflow)](#2-luồng-hoạt-động-bottom-up-workflow)
3. [Hệ thống phân cấp giá (3 mức)](#3-hệ-thống-phân-cấp-giá-3-mức)
4. [Trạng thái Container & Milestones](#4-trạng-thái-container--milestones)
5. [Cấu trúc chi phí theo Incoterm](#5-cấu-trúc-chi-phí-theo-incoterm)
6. [Danh sách Code đã thêm (Implementation Summary)](#6-danh-sách-code-đã-thêm-implementation-summary)
7. [Hướng xử lý vấn đề (Troubleshooting)](#7-hướng-xử-lý-vấn-đề-troubleshooting)
8. [Lời khuyên cho đội IT nội bộ](#8-lời-khuyên-cho-đội-it-nội-bộ)

---

## 1. Phân bổ vai trò (Top-Down)

Mô hình này xác định quyền hạn và trách nhiệm từ cấp phê duyệt cao nhất xuống đến các bộ phận thực thi trực tiếp trên hệ thống.

### 1.1. Ban Giám đốc / Giám đốc Kinh doanh (Anh Nhật)

| Hạng mục | Chi tiết |
|---|---|
| **Vai trò** | Phê duyệt ngoại lệ và kiểm soát rủi ro lợi nhuận |
| **Trách nhiệm** | Nhận yêu cầu và phê duyệt các đơn hàng có mức báo giá **thấp hơn Giá 3** (Giá cost/Giá gốc nhập từ nhà cung cấp) để quyết định việc công ty có chấp nhận chịu lỗ hoặc hòa vốn nhằm giữ khách hay không |
| **Trigger trên hệ thống** | Luồng phê duyệt tự động escalate khi tổng báo giá < Giá 3 |

### 1.2. Trưởng bộ phận / Trưởng trung tâm dịch vụ

| Hạng mục | Chi tiết |
|---|---|
| **Vai trò** | Quản lý biên độ lợi nhuận (Margin) và phê duyệt giá thương mại |
| **Trách nhiệm** | Phê duyệt các mức báo giá (Giá 1, Giá 2) do bộ phận CS đệ trình trước khi gửi cho khách hàng. Chịu trách nhiệm xác nhận các trường hợp CS và Chứng từ phải "deal" (thương lượng) lại giá với đối tác để đảm bảo tiến độ đơn hàng |
| **Trigger trên hệ thống** | Luồng phê duyệt tự động yêu cầu xác nhận khi giá bán nằm giữa Giá 3 và Giá 2 (margin thấp hơn chuẩn) |

### 1.3. Kế toán trưởng / Bộ phận Kế toán (Chị Diệu, Chị Hoa)

| Hạng mục | Chi tiết |
|---|---|
| **Vai trò** | Kiểm soát dòng tiền, công nợ và tỷ giá |
| **Trách nhiệm** | ① Nghiệm thu các Đề nghị thanh toán thu hộ trả hộ từ bộ phận Chứng từ. ② Hạch toán luồng tiền vào các tài khoản công nợ (138, 338) và ghi nhận phần chênh lệch (lãi) vào tài khoản doanh thu dịch vụ (511). ③ Theo dõi và chốt tỷ giá thực tế tự động cập nhật từ API của Vietcombank để hạch toán chính xác lãi/lỗ |
| **Trigger trên hệ thống** | Nhận ĐNTT nháp từ Chứng từ → Kiểm tra → Duyệt → Hạch toán → Tất toán |

### 1.4. Khối Vận hành trực tiếp (Trung tâm dịch vụ & Chứng từ)

#### 1.4.1. Bộ phận CS (Sale)

| Hạng mục | Chi tiết |
|---|---|
| **Vai trò** | Tiếp nhận khách hàng, xây dựng giá bán |
| **Trách nhiệm** | Nhận báo giá gốc (Giá 3) từ Chứng từ, tự động cộng thêm biên độ lợi nhuận dự kiến (khoảng **100 - 200 USD/công**) để tạo Giá 1/Giá 2 báo cho khách. Trực tiếp tiếp nhận phản hồi của khách, nếu khách chê đắt sẽ yêu cầu Chứng từ đi đàm phán lại giá với đối tác |

#### 1.4.2. Bộ phận Chứng từ/Vận hành (Linh Đan & Team)

| Hạng mục | Chi tiết |
|---|---|
| **Vai trò** | Đầu mối duy nhất làm việc với Agent (SSL/FWD) |
| **Trách nhiệm** | ① Xin giá gốc (Giá 3) các khoản chi phí cố định (Local charge) và biến động (Trucking, O/F) từ Agent. ② Theo dõi lịch tàu và trạng thái container. ③ Kiểm tra tem nhãn chính/phụ dán tại xưởng. ④ Tạo các Đề nghị thanh toán. ⑤ Tính toán giá khai hải quan |

### 1.5. Bộ phận IT / Phát triển Hệ thống (Anh Mạnh, Dũng, Trường)

| Hạng mục | Chi tiết |
|---|---|
| **Vai trò** | Số hóa quy trình và xây dựng công cụ kiểm soát |
| **Trách nhiệm** | ① Thiết lập cấu trúc dữ liệu mới cho đường biển (tính theo công 20/40 feet, theo Set, LCL). ② Cấu hình luồng xin giá, luồng duyệt giá nhiều cấp. ③ Cấu hình luồng hạch toán cho các đơn hàng hoàn thuế |

### 1.6. Đối tác Vận tải (Agent - SSL/FWD)

| Hạng mục | Chi tiết |
|---|---|
| **Vai trò** | Đơn vị thực thi vật lý (Forwarder) |
| **Trách nhiệm** | ① Thực hiện kéo công (trucking), đóng phí local charge đầu Trung Quốc/Việt Nam. ② Khai báo hải quan xuất khẩu và book tàu. ③ Đối với các lô khách tự đứng tên nhập khẩu, SSL trực tiếp xuất hóa đơn cho khách hàng |

---

## 2. Luồng hoạt động (Bottom-Up Workflow)

Quy trình này đi từ bước nền tảng (phát sinh nhu cầu/lấy giá gốc) đẩy dần lên các cấp quản lý phê duyệt và kết thúc ở dòng tiền tài chính.

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  TỔNG QUAN LUỒNG ĐƯỜNG BIỂN                                                    │
│                                                                                 │
│  B0: Cấu hình    B1: Xin giá     B2: Duyệt giá     B3: Vận hành vật lý       │
│  Master Data  →  gốc từ SSL  →  nhiều cấp       →  & kiểm soát tem nhãn      │
│                                                                                 │
│      B4: Tính giá khai HQ         B5: Hạch toán                                │
│  →   & Lên ĐNTT               →  & Tất toán đơn hàng                          │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Bước 0: Cấu hình Dịch vụ & Combo (Master Data) — *IT / Admin*

> Đây là bước nền tảng, chỉ làm một lần (hoặc khi có dịch vụ mới).

- **Nhân viên Admin/CS** truy cập vào menu **Dịch vụ / Gói combo dịch vụ**.
- Khi tạo mới một dịch vụ (ví dụ: *Cước vận chuyển đường biển*, *Phí THC*), người dùng tích chọn checkbox **Đường biển** trong nhóm **Tuyến vận chuyển**.
- Nếu dịch vụ là chi phí tại xưởng, chọn **Incoterm** áp dụng cho loại chi phí đó (EXW, FOB, CIF...).
- Đối với dịch vụ Thu hộ trả hộ, chủ động tạo 1 record dịch vụ và tự cấu hình các tài khoản hạch toán liên quan trực tiếp trên service đó.
- **Đơn vị tính (UoM)**: Chọn các đơn vị mới như *Cont 20', Cont 40', Cont 40'HC, TEU, CBM, Set*.

### Bước 1: Tiếp nhận nhu cầu & Xin giá gốc — *Chứng từ & Agent (SSL/FWD)*

| Bước con | Ai làm | Hành động |
|---|---|---|
| 1.1 | Khách hàng | Yêu cầu dịch vụ vận chuyển (EXW / FOB / CIF) |
| 1.2 | CS | Tiếp nhận yêu cầu, gửi thông tin cho Chứng từ đường biển |
| 1.3 | Chứng từ | Lấy đủ thông tin: Hàng hóa gì? Term? Ai xuất, ai nhập? |
| 1.4 | Chứng từ | Gửi thông tin cho FWD/Agent (SSL) để xin báo giá |
| 1.5 | FWD/SSL | Báo giá chi phí gốc (**Giá 3 = Giá cost**) các dịch vụ theo Term: Local charge TQ, O/F, Local charge VN, Trucking... |
| 1.6 | Chứng từ | Nhận báo giá gốc, nhập các chi phí lên hệ thống theo form mẫu. Hệ thống **tự động áp tỷ giá** lấy từ API Vietcombank |

**Chi phí gốc (Giá 3) bao gồm:**
- **Chi phí cố định** (đã fix với SSL): THC, CIC, D/O, Cleaning fee, Handling fee, Phí CSHT...
- **Chi phí biến động**: O/F (Ocean Freight), Trucking, EXW Charge, Phí khai báo HQ...

### Bước 2: Xây dựng giá bán & Phê duyệt thương mại — *CS & Trưởng bộ phận & BGĐ*

| Bước con | Ai làm | Hành động |
|---|---|---|
| 2.1 | CS | Nhận Giá 3 trên hệ thống. CS tạo đơn hàng (Sale Order), chọn **Tuyến vận chuyển = Đường biển** |
| 2.2 | CS | Ngay khi chọn Đường biển, trường **Incoterm** và **Vị trí Incoterm** tự động hiển thị và bắt buộc nhập |
| 2.3 | CS | Thêm dịch vụ vào đơn: xổ danh sách Combo/Dịch vụ — hệ thống **tự động chỉ hiển thị** các dịch vụ có hỗ trợ Đường biển (filter qua `_search`) |
| 2.4 | CS | Cộng thêm **biên lợi nhuận dự kiến** (~100-200 USD/công) vào Giá 3 → tạo thành **Giá 1** (báo giá thương mại tốt nhất) và **Giá 2** (báo giá chuẩn) |
| 2.5 | CS | Gửi báo giá cho khách hàng |

**Luồng phê duyệt giá (Approval Workflow):**

```
Khách đồng ý giá ──────────────────────────────────────→ Chuyển sang Bước 3
                                                          
Khách yêu cầu giảm giá ──→ CS báo Chứng từ deal lại với SSL
                              │
                              ├─ Giá bán ≥ Giá 1/Giá 2 ──→ CS tự quyết
                              │
                              ├─ Giá bán < Giá 1/Giá 2   ──→ ⚠️ Trưởng bộ phận phê duyệt
                              │                                 trên hệ thống
                              │
                              └─ Giá bán < Giá 3 (lỗ)    ──→ 🔴 Tự động escalate lên
                                                               GĐ Kinh doanh (Anh Nhật)
                                                               phê duyệt trên hệ thống
```

### Bước 3: Thực thi vật lý & Kiểm soát hàng hóa — *Chứng từ & FWD*

#### 3.1. Kiểm tra tem nhãn (đặc biệt quan trọng với đơn EXW)

> ⚠️ **Lưu ý nghiêm trọng**: Đường biển **không có kho trung chuyển** để dán bù như đường bộ. Sai hoặc thiếu tem sẽ bị phạt nặng hoặc tiêu hủy tại hải quan VN.

- Trước khi load hàng lên container, Chứng từ **bắt buộc** kiểm tra và xác nhận tem nhãn hàng hóa (nhãn chính, nhãn phụ) đã được dán **100%** tại xưởng.
- **Trên hệ thống**, tab **Tem nhãn (Biển)** hiển thị trên Sale Order:

| Trạng thái | Điều kiện chuyển | Hành động |
|---|---|---|
| **Chờ in (Pending)** | Mặc định khi tạo đơn | — |
| **Đã in (Printed)** | Khi kho/vận hành in tem → hệ thống ghi nhận `sea_label_printed_date` | Nhân viên xác nhận in |
| **Đã xác nhận (Confirmed)** | Khi có ảnh upload vào `sea_label_evidence_ids` | Nhân viên chụp ảnh kiện hàng đã dán tem → upload |

#### 3.2. Quy trình vận hành vật lý theo Incoterm

**Đơn EXW (phức tạp nhất — 52 bước):**

| Giai đoạn | Các bước chính |
|---|---|
| Chuẩn bị chứng từ | Lấy thông tin INV, PL, liên lạc xưởng → Check tem phụ, tem nhãn |
| Chốt giá | Gửi TBP Chứng từ chốt → TBP phản hồi |
| Book tàu | Báo FWD book cont → FWD phản hồi trạng thái → Nhận Booking PDF |
| Khai báo xuất khẩu TQ | Gửi thông tin cho khai báo TQ → Gửi INV, PL khai báo tiếng Trung cho FWD |
| Chứng từ vận tải | Nhận HBL nháp → Kiểm tra và xác nhận HBL → Làm CO |
| Theo dõi tàu | Update trạng thái tàu cho CS → CS cập nhật cho khách |
| Cảng đến VN | Nhận AN (1-2 ngày trước tàu) → Xác nhận AN và Debit Note |
| Khai báo nhập khẩu VN | Làm BCT khai báo nhập → Gửi FWD lên tờ khai nháp → CS xác nhận → Truyền chính thức |
| Thông quan | Chờ tàu cập → Tiếp nhận HQ → Luồng vàng: đóng thuế / Luồng đỏ: kiểm hàng |
| Giao hàng | Xin địa chỉ trả hàng KH → FWD gọi xe giao → Phát sinh: kết hợp FWD xử lý |
| Kết thúc | Báo CS hàng giao thành công → Khách xác nhận nhận hàng |

**Đơn FOB (50 bước):** Tương tự EXW nhưng **bỏ phần khai báo xuất khẩu TQ** (khách chịu trách nhiệm bên xuất).

**Đơn CIF (36 bước):** Đơn giản nhất — FWD báo giá trọn gói, Chứng từ chỉ theo dõi từ khi hàng lên tàu.

#### 3.3. Theo dõi Milestones trên hệ thống

Chứng từ theo dõi các mốc trạng thái (milestones) xuyên suốt vòng đời đơn hàng:

```
Đóng công → Ra cảng xuất → Lên tàu (O/F) → Cập cảng nhập → Thông quan → Về kho khách hàng
```

*(Chi tiết trạng thái container — xem Mục 4)*

### Bước 4: Tính giá khai hải quan & Lên Đề nghị thanh toán — *Chứng từ*

#### 4.1. Tính giá khai hải quan

Hàng cập cảng Việt Nam, Chứng từ bắt đầu tính giá khai hải quan.

> ⚠️ **Quy tắc đặc biệt — Đơn EXW hoàn thuế**: Chi phí kéo xe đầu Trung Quốc do công ty nội bộ trả, nhưng Chứng từ **bắt buộc phải cộng ngược** khoản tiền này (ví dụ: 20 đồng) vào giá khai hải quan đầu Việt Nam để khớp số liệu xuất hóa đơn cho khách.

**Công thức tính giá khai hải quan (đơn EXW hoàn thuế):**

```
Giá khai HQ = Giá hàng hóa (INV) + Chi phí trucking đầu TQ (cộng ngược)
```

#### 4.2. Lên Đề nghị thanh toán thu hộ trả hộ (ĐNTT)

| Bước | Hành động |
|---|---|
| 4.2.1 | Chứng từ lấy tờ khai thông quan và gửi **Bộ chứng từ (BCT) hoàn chỉnh** cho kế toán |
| 4.2.2 | Chứng từ gửi **Giá 3 (báo giá gốc từ SSL)** cho kế toán chi phí |
| 4.2.3 | Chứng từ tạo **"Đề nghị thanh toán thu hộ trả hộ"** trên hệ thống ở trạng thái **Nháp** |
| 4.2.4 | ĐNTT tách bạch rõ ràng: **Phần tiền phải thu của khách** vs. **Phần tiền phải trả cho SSL** |

**Trên hệ thống:**
- Kế toán tạo Đề nghị thanh toán (Account Payment).
- Chọn Loại ĐNTT là **Thu hộ trả hộ (đường biển)** — cờ `is_sea_collection`.
- Điền số tiền cần thu hộ/trả hộ và phần tiền **Phí dịch vụ thu hộ** (`sea_collection_fee`) vào trường dành riêng.
- Hệ thống tự động bóc tách doanh thu (TK 511) và công nợ (138/338).

### Bước 5: Hạch toán & Tất toán đơn hàng — *Kế toán*

#### 5.1. Tiếp nhận & Duyệt ĐNTT

Kế toán nghiệm thu ĐNTT từ Chứng từ, kiểm tra tính chính xác của:
- Số tiền thu hộ khách (phải khớp báo giá đã duyệt)
- Số tiền trả hộ SSL (phải khớp Giá 3 + phí phát sinh)
- Phí dịch vụ thu hộ (phần chênh lệch lợi nhuận công ty)

#### 5.2. Hạch toán kế toán

Khách hàng thanh toán tiền. Kế toán dựa trên ĐNTT đã duyệt để ghi nhận sổ sách:

| Tài khoản | Nợ/Có | Nội dung |
|---|---|---|
| **TK 138** | Nợ | Phải thu khách hàng — toàn bộ số tiền khách phải trả |
| **TK 338** | Có | Phải trả nhà cung cấp (SSL/FWD) — chi phí gốc |
| **TK 511** | Có | Doanh thu dịch vụ — phần chênh lệch tiền dịch vụ công ty được hưởng |

**Công thức kiểm tra:**
```
Nợ 138 = Có 338 + Có 511
(Thu khách = Trả SSL + Lợi nhuận dịch vụ)
```

#### 5.3. Chốt tỷ giá

- Tỷ giá được **tự động cập nhật từ API Vietcombank** tại thời điểm tạo đơn hàng.
- Kế toán chốt tỷ giá thực tế tại thời điểm hạch toán để ghi nhận chính xác lãi/lỗ chênh lệch tỷ giá.

#### 5.4. Tất toán đơn hàng

| Bước | Hành động |
|---|---|
| 5.4.1 | Kế toán xác nhận tất cả khoản thu/chi đã khớp |
| 5.4.2 | Kế toán chốt **"Tất toán"** đơn hàng trên hệ thống |
| 5.4.3 | Hệ thống **khóa luồng chứng từ** — không cho sửa đổi |
| 5.4.4 | Hoàn thành vòng đời của một lô hàng công biển |

---

## 3. Hệ thống phân cấp giá (3 mức)

Toàn bộ hoạt động báo giá đường biển xoay quanh **3 mức giá cốt lõi**:

| Mức giá | Tên gọi | Ai tạo | Mô tả | Ngưỡng phê duyệt |
|---|---|---|---|---|
| **Giá 3** | Giá gốc / Giá cost | Chứng từ (nhận từ SSL) | Chi phí thực tế phải trả cho Agent (SSL/FWD) | — (nhập liệu, không cần duyệt) |
| **Giá 2** | Giá bán chuẩn | CS | Giá 3 + biên lợi nhuận thấp (~100 USD/công) | Trưởng BP duyệt nếu cần |
| **Giá 1** | Giá bán tốt nhất | CS | Giá 3 + biên lợi nhuận cao (~200 USD/công) | CS tự quyết |
| *Giá 0* | *Giá bán cuối (cho khách)* | CS | *Giá thực tế sau đàm phán* | *Tùy ngưỡng — xem bên dưới* |

**Mẫu báo giá (ví dụ FCL Cont 20 Hải Phòng):**

| STT | Đầu mục | Tiền tệ | Đơn vị | Giá 1 | Giá 2 | Giá 3 |
|---|---|---|---|---|---|---|
| 1 | **Trung Quốc** | | | | | |
| 1.1 | EXW Charge & Local charge | USD | Shipt | | | x (từ SSL) |
| 1.2 | Form E | USD | Set | | | 60/70/90 |
| 2 | **O/F** | USD | Cont 20 | | | x (từ SSL) |
| 3 | **Việt Nam** | | | | | |
| 3.1 | THC | USD | Cont 20 | | | 120 |
| 3.2 | CIC | USD | Cont 20 | | | 120 (HP) / 50 (HCM) |
| 3.3 | D/O | USD | Set | | | 35 |
| 3.4 | Cleaning fee | USD | Cont 20 | | | 10 |
| 3.5 | Handling fee | USD | Set | | | 20 |
| 3.6 | Phí thủ tục HQ NK | VND | Cont 20 | | | 1.000.000 |
| 3.7 | Phí nâng hạ cont | VND | Cont 20 | | | (theo thực tế) |
| 3.8 | Phí CSHT | VND | Cont 20 | | | 250.000 (HP) / 500.000 (HCM) |
| 3.9 | Trucking nội địa VN | VND | Cont 20 | | | (theo thực tế) |
| 4 | **Phí dịch vụ DPT** | VND | Set | 3.000.000 | 3.000.000 | 0 |

**Luồng phê duyệt giá nhiều cấp:**

```
┌──────────────────────────────────────────────────────────────────┐
│                    LUỒNG PHÊ DUYỆT GIÁ                         │
│                                                                  │
│  Giá bán ≥ Giá 1        → CS tự quyết ✅                       │
│  Giá 1 > Giá bán ≥ Giá 2 → CS tự quyết ✅                     │
│  Giá 2 > Giá bán ≥ Giá 3 → ⚠️ Trưởng BP phê duyệt            │
│  Giá bán < Giá 3 (LỖ)   → 🔴 GĐ Kinh doanh phê duyệt         │
│                                                                  │
│  Đàm phán lại giá:                                              │
│  Khách chê đắt → CS → Chứng từ → deal lại SSL → cập nhật Giá 3 │
└──────────────────────────────────────────────────────────────────┘
```

---

## 4. Trạng thái Container & Milestones

### 4.1. Giai đoạn 1: Booking (Đặt chỗ & Thiết lập đơn hàng)

| Trạng thái (EN) | Tiếng Việt | Mô tả |
|---|---|---|
| **Booking Request / Created** | Yêu cầu đặt chỗ | Shipper/FWD gửi yêu cầu lấy chỗ trên tàu. Chưa có số container, chỉ có số Booking dự kiến |
| **Booking Confirmed** | Đã xác nhận đặt chỗ | Hãng tàu đồng ý nhận hàng. Phát hành Booking Confirmation (Lệnh cấp vỏ - S/O). 👉 Kiểm tra kỹ loại cont, số lượng, cảng đi/đến |
| **Equipment Released / Empty Pickup** | Lệnh cấp vỏ rỗng | Hãng tàu cho phép lấy vỏ tại bãi (Depot). Shipper bên TQ cầm lệnh này đi lấy vỏ rỗng |
| **Booking Cancelled** | Đã hủy | Đơn hàng bị hủy do Shipper không đi hàng nữa hoặc Hãng tàu hết chỗ |

### 4.2. Giai đoạn 2: Origin — Tại cảng đi (Trung Quốc)

| Trạng thái (EN) | Tiếng Việt | Mô tả |
|---|---|---|
| **Empty Gate Out** | Xuất vỏ rỗng | Xe đầu kéo mang vỏ rỗng từ bãi cảng/depot về kho Shipper để đóng hàng. 👉 Bắt đầu tính free time detention đầu xuất |
| **Full Gate In / Gate In** | Hạ bãi chờ xuất | Container đã đóng hàng xong, kẹp chì (seal) và được xe chở hạ xuống bãi cảng (CY) chờ xuất. 👉 Phải hạ trước giờ Cut-off |
| **Customs Cleared / Released** | Thông quan xong (XK) | Hải quan TQ đã chấp nhận cho lô hàng xuất khẩu. Nếu chưa có trạng thái này → container sẽ không được xếp lên tàu |
| **Loaded on Board** | Đã xếp lên tàu | Cần cẩu bốc container lên boong tàu. 👉 Mốc quan trọng để phát hành Bill of Lading |
| **Vessel Departed / Sailed** | Tàu rời cảng | Tàu chính thức rời bến cảng TQ. Hệ thống cập nhật ngày ATD |
| **Rolled / Shut out** ⚠️ | Rớt tàu | Container đã hạ bãi nhưng tàu đầy (overbooked) hoặc vấn đề chứng từ → phải đi chuyến sau. 👉 Báo ngay khách hàng về delay |

### 4.3. Giai đoạn 3: Transit — Quá trình vận chuyển

| Trạng thái (EN) | Tiếng Việt | Mô tả |
|---|---|---|
| **In Transit** | Đang vận chuyển | Container đang trên tàu giữa biển khơi |
| **Transshipment Discharged** | Dỡ cảng chuyển tải | VD: Tàu từ Ningbo ghé Hong Kong, Cont dỡ xuống chờ tàu khác về Hải Phòng |
| **Transshipment Loaded** | Xếp tàu chuyển tải | Container xếp lên tàu nối (Feeder vessel) về Việt Nam |
| **Omitted / Skipped** ⚠️ | Bỏ cảng | Tàu không ghé cảng dự kiến do thời tiết hoặc lịch trình thay đổi |

### 4.4. Giai đoạn 4: Destination — Tại cảng đến (Việt Nam)

| Trạng thái (EN) | Tiếng Việt | Mô tả |
|---|---|---|
| **Vessel Arrived / Berthing** | Tàu cập cầu | Tàu đến cảng (Hải Phòng, Cát Lái, Đà Nẵng...) và đang neo đậu. Cập nhật ngày ATA |
| **Discharged / Unloaded** | Dỡ hàng xuống bãi | Container được cẩu từ tàu xuống CY cảng nhập. 👉 Bắt đầu tính free time Demurrage/Detention tại VN |
| **Import Customs Cleared** | Thông quan nhập khẩu | HQ VN chấp nhận cho lô hàng nhập. Luồng vàng: đóng thuế. Luồng đỏ: kiểm hàng → xử lý phát sinh |
| **Customs Hold** ⚠️ | HQ dừng thông quan | Container bị giữ để kiểm hóa hoặc soi chiếu. Không thể lấy hàng cho đến khi giải tỏa |
| **Gate Out Full / Delivery** | Lấy hàng ra cảng | Hoàn thành thủ tục HQ + đóng tiền D/O → xe kéo container rời cảng về kho khách |
| **Empty Gate In / Return** | Trả vỏ rỗng | Khách rút hàng xong, xe mang vỏ rỗng trả về bãi. 👉 Kết thúc quy trình. Ngừng tính phí lưu vỏ |
| **Damaged** ⚠️ | Hư hỏng | Container bị ghi nhận móp méo, thủng. 👉 Yêu cầu giám định để xác định lỗi do ai |

---

## 5. Cấu trúc chi phí theo Incoterm

### 5.1. FCL (Full Container Load) — Cont 20' / Cont 40'

| Nhóm | Đầu mục | Đơn vị | VAT | Giá 3 mẫu (HP - Cont 20) | Giá 3 mẫu (HCM - Cont 20) |
|---|---|---|---|---|---|
| **Combo EXW** | EXW Charge & Local charge TQ | Đơn | 0% | (từ SSL) | (từ SSL) |
| **FCL** | Form E (<20 items, 8 USD/page nếu có) | Set | 0% | 50 USD | 50 USD |
| | Export license (giấy phép xuất khẩu) | Set | 0% | 350 USD | 350 USD |
| | Export declare (khai báo xuất khẩu) | Set | 0% | 500 USD | 500 USD |
| | THC (Phụ phí xếp dỡ tại cảng) | Cont | 8% | 120 USD | 120 USD |
| | CIC (Phí cân bằng cont) | Cont | 8% | 120 USD | 50 USD |
| | D/O (Phí chứng từ) | Set | 8% | 35 USD | 35 USD |
| | Cleaning fee (Phí vệ sinh cont) | Cont | 8% | 10 USD | 10 USD |
| | Handling fee (Phí truyền tờ khai) | Set | 8% | 20 USD | 20 USD |
| | Phí thủ tục HQ NK (luồng vàng) | Set | 8% | 1.000.000 VND | 1.000.000 VND |
| | Phí thủ tục HQ NK (luồng đỏ) | Set | 8% | 1.700.000 VND | 1.700.000 VND |
| | Phí nâng hạ cont | Cont | 8% | (theo thực tế) | (theo thực tế) |
| | Phí CSHT | Cont | 0% | 250.000 VND | 500.000 VND |
| | Phí trucking nội địa VN | Đơn | 8% | (theo thực tế) | (theo thực tế) |
| | **Phí dịch vụ FCL (DPT)** | Đơn | 0% | **3.000.000 VND** | **3.000.000 VND** |

### 5.2. LCL (Less than Container Load)

| Đầu mục | Đơn vị | Giá 3 mẫu |
|---|---|---|
| EXW Charge & Local charge | Set | (từ SSL) |
| Phí xuất khẩu | Set | (từ SSL) |
| Form E | Set | (từ SSL) |
| O/F | CBM (m³) | (từ SSL) |
| THC | CBM | (từ SSL) |
| CFS | CBM | (từ SSL) |
| CIC | CBM | (từ SSL) |
| D/O | Set | (từ SSL) |
| Cleaning fee | Set | (từ SSL) |
| Handling fee | Set | (từ SSL) |
| Phí thủ tục HQ NK | Set | (từ SSL) |
| Phí CSHT (tính theo tấn) | Tons | (từ SSL) |
| Phí bốc xếp kho CFS | CBM | (từ SSL) |
| Phí lưu kho CFS/ngày/m³ | Ngày/m³ | (từ SSL) |
| Trucking nội địa VN | Set | (từ SSL) |
| Phí giao nhận kho CFS | Set | (từ SSL) |
| **Phí dịch vụ LCL (DPT)** | Set | **1.000.000 VND** |

### 5.3. Chi phí phát sinh ngoài

| STT | Nội dung | Đơn giá mẫu |
|---|---|---|
| 1 | Chi phí kiểm hóa | 1.000.000 VND |
| 2 | Chi phí phát sinh tại cảng do kiểm hóa (có hóa đơn) | 3.500.000 VND |
| 3 | Chi phí phát sinh khác (có hóa đơn) | (theo thực tế) |

### 5.4. Bảng O/F tham khảo

| Cảng đi | Cảng đến | Carrier | O/F Cont 20 (USD) | O/F Cont 40 (USD) |
|---|---|---|---|---|
| NINGBO | HẢI PHÒNG | MCC/CNC | 150 | 250 |
| — | HỒ CHÍ MINH | SITC | 580 | 800 |
| — | HỒ CHÍ MINH | — | 350 | 700 |
| QUINGDAO | HẢI PHÒNG | — | 600 | 600 |
| — | HỒ CHÍ MINH | — | 1.200 | 1.350 |
| SHEKOU | HẢI PHÒNG | — | 150 | 300 |
| — | HỒ CHÍ MINH | — | 650 | 900 |
| NANSHA | HẢI PHÒNG | — | 150 | 350 |
| — | HỒ CHÍ MINH | — | 750 | 950 |

> **Lưu ý**: Tỷ giá quy đổi mẫu = 3.850 VND/CNY | 26.400 VND/USD. Tỷ giá thực tế lấy từ API Vietcombank.

---

## 6. Danh sách Code đã thêm (Implementation Summary)

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

### D. Các tính năng CẦN BỔ SUNG (chưa triển khai)

> Đây là các tính năng đã mô tả trong luồng nghiệp vụ nhưng chưa có code implementation:

| # | Tính năng | Module dự kiến | Trạng thái |
|---|---|---|---|
| D1 | Hệ thống 3 mức giá (Giá 1/Giá 2/Giá 3) trên Sale Order | `dpt_sale_management` | 🔴 Chưa triển khai |
| D2 | Luồng phê duyệt giá nhiều cấp (Trưởng BP → GĐ) | `dpt_sale_management` | 🔴 Chưa triển khai |
| D3 | Tích hợp API tỷ giá Vietcombank (tự động cập nhật) | `dpt_currency_rate` hoặc tương đương | 🔴 Chưa triển khai |
| D4 | Luồng xin giá từ Agent/SSL (Request for Quotation nội bộ) | `dpt_sale_management` hoặc model mới | 🔴 Chưa triển khai |
| D5 | Tracking milestones container (6 giai đoạn, ~20 trạng thái) | `dpt_sale_management` | 🔴 Chưa triển khai |
| D6 | Tính giá khai hải quan (cộng ngược trucking TQ cho EXW hoàn thuế) | `dpt_sale_management` | 🔴 Chưa triển khai |
| D7 | Hạch toán kế toán chi tiết 138/338/511 tự động | `dpt_account_payment_request` | 🔴 Chưa triển khai |
| D8 | Tất toán đơn hàng & khóa luồng chứng từ | `dpt_sale_management` | 🔴 Chưa triển khai |
| D9 | Luồng đàm phán lại giá (CS ↔ Chứng từ ↔ SSL) | `dpt_sale_management` | 🔴 Chưa triển khai |
| D10 | Xử lý đơn hoàn thuế (hạch toán riêng) | `dpt_account_payment_request` | 🔴 Chưa triển khai |
| D11 | SSL xuất hóa đơn trực tiếp cho khách tự đứng tên NK | `dpt_sale_management` | 🔴 Chưa triển khai |

---

## 7. Hướng xử lý vấn đề (Troubleshooting)

| # | Vấn đề (Issue) | Nguyên nhân khả dĩ | Cách xử lý |
|---|---|---|---|
| 1 | Không thấy Dịch vụ / Combo khi thêm vào Đơn hàng | Cơ chế filter tự động qua `_search` đang chặn các dịch vụ không khớp với Tuyến vận chuyển của Đơn | ① Kiểm tra trường **Tuyến vận chuyển** trên Đơn hàng. ② Quay lại form Dịch vụ/Combo, đảm bảo checkbox **Đường biển** đã tích |
| 2 | Trạng thái Tem nhãn không tự chuyển sang "Đã xác nhận" | Logic compute phụ thuộc vào ảnh chứng minh dán nhãn | Đảm bảo đã upload ít nhất 1 ảnh vào **Ảnh chứng minh dán nhãn**. Lưu đơn hàng để trigger compute |
| 3 | Không thấy trường Incoterm trên đơn hàng | Odoo 17: `incoterm` nằm ở module `sale_stock` | Khai báo `depends: ['sale_stock']` trước khi sử dụng xpath chèn trường |
| 4 | Báo giá (Quotation) không nhận cấu hình EXW | Chưa khai báo dịch vụ nào là chi phí EXW | Quay lại kho Dịch vụ, tìm dịch vụ phát sinh tại xưởng (Local charge đầu xuất) và chọn **Incoterm = EXW** |
| 5 | Tỷ giá không đúng thời điểm | API VCB trả về tỷ giá theo ngày, có thể cache cũ | Kiểm tra cấu hình cron job cập nhật tỷ giá. Kế toán có thể override tỷ giá thủ công tại thời điểm hạch toán |
| 6 | ĐNTT không tách đúng 138/338/511 | Phí dịch vụ thu hộ (`sea_collection_fee`) chưa nhập hoặc nhập sai | Kiểm tra trường **Phí dịch vụ thu hộ** đã điền đúng giá trị. Đây là cơ sở để hệ thống tính phần TK 511 |
| 7 | Đơn hàng không chuyển được trạng thái do chưa duyệt giá | Giá bán thấp hơn ngưỡng cho phép, chờ phê duyệt cấp trên | Kiểm tra trạng thái phê duyệt: Trưởng BP (nếu < Giá 2) hoặc GĐ (nếu < Giá 3). Nhắc cấp phê duyệt |

---

## 8. Lời khuyên cho đội IT nội bộ

1. **Filter Dịch vụ toàn cục**: Logic filter qua `_search` có tác dụng **global** ở bất cứ đâu có view M2O truyền biến `line_transfer` qua context. Module khác cần tái sử dụng chỉ cần thêm `context="{'line_transfer': 'sea'}"` vào field XML.

2. **Lưu trữ ảnh evidence**: Ảnh dán nhãn lưu trên `ir.attachment`. Để tránh phình to database, nên cấu hình filestore hoặc liên kết với AWS S3.

3. **API Vietcombank**: Nên thiết lập cron job chạy mỗi ngày lúc 8h sáng để cập nhật tỷ giá. Lưu trữ lịch sử tỷ giá để đối soát.

4. **Luồng phê duyệt giá**: Khuyến nghị sử dụng `mail.activity` hoặc `approval` module để tạo luồng phê duyệt tự động với notification qua email/Odoo Discuss.

5. **Tracking milestones**: Có thể mở rộng trường `Selection` trên Sale Order hoặc tạo model con `sea.freight.milestone` để log chi tiết từng mốc trạng thái container.

6. **Bảo mật giá**: Giá 3 (giá cost) chỉ nên hiển thị cho nhóm **Chứng từ** và **Kế toán**. CS chỉ thấy Giá 1/Giá 2 và giá bán cuối. Cấu hình Record Rules theo `res.groups`.

7. **Xử lý đơn hoàn thuế**: Cần tạo cờ riêng `is_tax_refund` trên Sale Order. Khi bật cờ này, logic tính giá khai HQ sẽ tự động cộng ngược chi phí trucking TQ.
