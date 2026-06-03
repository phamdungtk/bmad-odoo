# Hướng dẫn Nghiệp vụ: Quy trình Vận hành Đường Biển (Sea Freight)

> **Phiên bản**: 3.0 — Tài liệu nghiệp vụ dành cho người dùng  
> **Đối tượng**: CS, Chứng từ, Trưởng bộ phận, Kế toán, Ban Giám đốc  
> **Mục đích**: Hướng dẫn toàn bộ quy trình xử lý đơn hàng đường biển từ A đến Z

---

## Mục lục

1. [Ai làm gì? — Phân công vai trò](#phần-1-ai-làm-gì--phân-công-vai-trò)
2. [Quy trình từng bước — Xử lý đơn hàng đường biển](#phần-2-quy-trình-từng-bước)
3. [Hệ thống giá — 3 mức giá cần nắm](#phần-3-hệ-thống-giá--3-mức-giá-cần-nắm)
4. [Luồng duyệt giá — Khi nào cần xin phê duyệt?](#phần-4-luồng-duyệt-giá--khi-nào-cần-xin-phê-duyệt)
5. [Theo dõi hàng — Trạng thái container từ TQ về VN](#phần-5-theo-dõi-hàng--trạng-thái-container)
6. [Bảng chi phí — Các khoản phí đường biển](#phần-6-bảng-chi-phí--các-khoản-phí-đường-biển)
7. [Kế toán — Hạch toán & Tất toán đơn hàng](#phần-7-kế-toán--hạch-toán--tất-toán-đơn-hàng)
8. [Các tình huống thường gặp — Hỏi & Đáp](#phần-8-các-tình-huống-thường-gặp)

---

# PHẦN 1: Ai làm gì? — Phân công vai trò

## 1.1. Ban Giám đốc / Giám đốc Kinh doanh (Anh Nhật)

**Việc cần làm:** Phê duyệt các đơn hàng có giá bán **thấp hơn giá gốc** (tức công ty sẽ bị lỗ).

**Khi nào được gọi?**
- Khi CS muốn báo giá cho khách nhưng giá bán thấp hơn giá gốc nhập từ đối tác (SSL).
- Hệ thống sẽ **tự động gửi yêu cầu phê duyệt** lên cho Giám đốc.
- Giám đốc quyết định: chấp nhận lỗ/hòa vốn để giữ khách, hay từ chối.

**Trên hệ thống:** Nhận thông báo phê duyệt → Xem chi tiết đơn hàng → Duyệt hoặc Từ chối.

---

## 1.2. Trưởng bộ phận CS / Trưởng trung tâm dịch vụ

**Việc cần làm:** Kiểm soát biên lợi nhuận và duyệt giá trước khi báo cho khách.

**Khi nào được gọi?**
- Khi CS muốn giảm giá cho khách xuống dưới mức **Giá 2** (giá bán chuẩn).
- Khi cần xác nhận cho Chứng từ đi đàm phán lại giá với đối tác.

**Trên hệ thống:** Nhận yêu cầu duyệt giá từ CS → Xem biên lợi nhuận → Duyệt hoặc yêu cầu điều chỉnh.

---

## 1.3. Trưởng bộ phận Chứng từ

**Việc cần làm:** Xác nhận giá gốc và tham gia phê duyệt khi giá bán giảm sâu.

**Tại sao vai trò này quan trọng?**
> Trưởng BP Chứng từ là **đầu mối trực tiếp với đối tác SSL/FWD**, nắm rõ giá gốc thực tế, biết được biên độ đàm phán với từng Agent. Vì vậy, khi CS xin giảm giá, Trưởng BP Chứng từ cần **xác nhận tính hợp lý của giá** trước khi đẩy lên cấp trên.

**Khi nào được gọi?**
- Khi giá bán **thấp hơn Giá 2** → Trưởng BP Chứng từ xác nhận giá gốc có chính xác không, có thể deal thêm với SSL không.
- Khi giá bán **thấp hơn Giá 3** (công ty lỗ) → Trưởng BP Chứng từ xác nhận trước → rồi mới đẩy lên Giám đốc.
- Khi Chứng từ đàm phán lại giá với SSL → Trưởng BP Chứng từ trực tiếp chỉ đạo và chốt giá mới.

**Trên hệ thống:** Nhận yêu cầu xác nhận giá → Kiểm tra giá gốc SSL → Xác nhận hoặc yêu cầu Chứng từ deal lại.

---

## 1.4. Bộ phận CS (Sale)

**Việc cần làm:** Tiếp nhận khách hàng, tạo đơn hàng, xây dựng giá bán, và theo dõi tiến độ đơn hàng.

**Công việc hàng ngày:**
1. Tiếp nhận yêu cầu vận chuyển từ khách hàng
2. Gửi thông tin cho bộ phận Chứng từ để lấy giá gốc
3. Nhận giá gốc → Cộng thêm phí dịch vụ (khoảng 100-200 USD/công) → Tạo báo giá gửi khách
4. Đàm phán giá với khách
5. Nếu khách chê đắt → Nhờ Chứng từ deal lại giá với đối tác
6. Theo dõi trạng thái hàng hóa và cập nhật cho khách

**Trên hệ thống:**
- Tạo đơn hàng bán mới → Chọn **Tuyến vận chuyển = Đường biển**
- Chọn **Incoterm** (EXW, FOB, hoặc CIF) theo thỏa thuận với khách
- Thêm dịch vụ/combo vào đơn (hệ thống tự lọc chỉ hiện dịch vụ đường biển)
- Nhập giá bán cho khách, gửi duyệt nếu giá thấp hơn mức cho phép

---

## 1.5. Bộ phận Chứng từ / Vận hành (Linh Đan & Team)

**Việc cần làm:** Là **đầu mối duy nhất** làm việc với đối tác vận tải (Agent/SSL/FWD).

**Công việc hàng ngày:**
1. Xin báo giá gốc (**Giá 3**) từ Agent: chi phí cước tàu (O/F), local charge, trucking...
2. Nhập giá gốc lên hệ thống để CS tham chiếu
3. Kiểm tra tem nhãn hàng hóa (nhãn chính, nhãn phụ) tại xưởng trước khi đóng container
4. Theo dõi lịch tàu và cập nhật trạng thái container
5. Tính giá khai hải quan khi hàng cập cảng Việt Nam
6. Tạo Đề nghị thanh toán thu hộ trả hộ
7. Gửi bộ chứng từ hoàn chỉnh cho kế toán

**⚠️ Lưu ý quan trọng về tem nhãn:**
> Đường biển **KHÔNG có kho trung chuyển** để dán bù tem như đường bộ. Nếu hàng thiếu tem hoặc sai tem khi lên container → bị phạt nặng hoặc tiêu hủy tại hải quan Việt Nam. **Phải kiểm tra 100% tem trước khi load hàng.**

**Trên hệ thống:**
- Nhập chi phí gốc từ SSL vào đơn hàng
- Cập nhật trạng thái tem nhãn: Chờ in → Đã in → Đã xác nhận (upload ảnh chụp kiện hàng đã dán tem)
- Cập nhật trạng thái container theo các mốc vận chuyển
- Tạo Đề nghị thanh toán thu hộ trả hộ (nháp)

---

## 1.6. Kế toán (Chị Diệu, Chị Hoa)

**Việc cần làm:** Kiểm soát dòng tiền, hạch toán công nợ, và chốt tỷ giá.

**Công việc hàng ngày:**
1. Nhận và kiểm tra Đề nghị thanh toán thu hộ trả hộ từ Chứng từ
2. Đối chiếu số tiền thu khách với số tiền phải trả cho SSL
3. Hạch toán vào sổ sách kế toán
4. Chốt tỷ giá thực tế (hệ thống tự lấy từ Vietcombank, kế toán kiểm tra và xác nhận)
5. Tất toán đơn hàng khi hoàn thành toàn bộ

**Cách hạch toán (đơn giản hóa):**

| Bạn ghi vào đâu | Số tiền gì | Ví dụ |
|---|---|---|
| **Phải thu khách hàng** (TK 138) | Toàn bộ tiền khách phải trả | 50.000.000 VND |
| **Phải trả đối tác SSL** (TK 338) | Chi phí gốc phải trả cho SSL | 45.000.000 VND |
| **Doanh thu dịch vụ** (TK 511) | Phần chênh lệch = Lợi nhuận công ty | 5.000.000 VND |

> **Kiểm tra nhanh:** Tiền thu khách = Tiền trả SSL + Lợi nhuận dịch vụ

**Trên hệ thống:**
- Tạo Đề nghị thanh toán → Chọn loại **Thu hộ trả hộ (đường biển)**
- Nhập số tiền thu hộ/trả hộ + Phí dịch vụ thu hộ
- Hệ thống tự bóc tách doanh thu và công nợ
- Khi hoàn thành → Chốt **Tất toán** → Hệ thống khóa đơn hàng

---

## 1.7. Đối tác vận tải (Agent — SSL/FWD)

**Họ là ai?** Là đơn vị vận tải bên ngoài (Forwarder) thực hiện phần vật lý.

**Họ làm gì?**
- Kéo container (trucking) từ xưởng ra cảng
- Đóng phí local charge tại cảng Trung Quốc và Việt Nam
- Khai báo hải quan xuất khẩu bên Trung Quốc
- Book tàu, theo dõi lịch trình, cung cấp HBL (vận đơn)
- Giao hàng đến kho khách hàng tại Việt Nam

**Lưu ý:** Với các lô hàng khách **tự đứng tên nhập khẩu**, SSL sẽ trực tiếp xuất hóa đơn cho khách hàng (không qua công ty DPT).

---

# PHẦN 2: Quy trình từng bước

> Quy trình đi từ bước đầu (khách có nhu cầu) đến bước cuối (tất toán tiền), qua **6 giai đoạn chính**.

```
  ❶ Khách yêu cầu    ❷ Lấy giá gốc     ❸ Báo giá &      ❹ Vận chuyển     ❺ Hải quan      ❻ Thanh toán
     dịch vụ        từ đối tác (SSL)    duyệt giá        & theo dõi       & chứng từ       & tất toán
       │                  │                 │                  │                │                │
   Khách → CS        Chứng từ → SSL     CS → Khách      Chứng từ → FWD   Chứng từ → HQ    KToán → Sổ sách
                                        CS → Trưởng BP   CS → Khách       KToán → 138/338     → Khóa đơn
                                        CS → GĐ (nếu lỗ)
```

---

## Giai đoạn 1: Tiếp nhận yêu cầu & Lấy giá gốc

### Ai làm: CS + Chứng từ + Đối tác SSL

| Bước | Ai | Làm gì |
|---|---|---|
| 1 | **Khách hàng** | Liên hệ yêu cầu dịch vụ vận chuyển đường biển |
| 2 | **CS** | Tiếp nhận, hỏi rõ: hàng gì? đi đâu? term nào (EXW/FOB/CIF)? |
| 3 | **CS** | Gửi thông tin cho bộ phận Chứng từ đường biển |
| 4 | **Chứng từ** | Thu thập đầy đủ: Hàng hóa gì? Term? Ai xuất? Ai nhập? |
| 5 | **Chứng từ** | Gửi thông tin cho Agent (SSL/FWD) để xin báo giá |
| 6 | **Agent (SSL)** | Trả về báo giá chi phí gốc (**Giá 3**) theo term |
| 7 | **Chứng từ** | Nhập giá gốc lên hệ thống. Hệ thống **tự áp tỷ giá** từ Vietcombank |

**Giá gốc (Giá 3) bao gồm:**
- **Chi phí cố định** (đã thỏa thuận với SSL): THC, CIC, D/O, Cleaning fee, Handling fee, Phí CSHT...
- **Chi phí biến động** (thay đổi theo từng đơn): O/F (cước tàu), Trucking, EXW Charge, Form E...

---

## Giai đoạn 2: Xây dựng báo giá & Duyệt giá

### Ai làm: CS + Trưởng BP Chứng từ + Trưởng BP CS + Giám đốc (nếu cần)

| Bước | Ai | Làm gì |
|---|---|---|
| 1 | **CS** | Mở hệ thống → Tạo đơn hàng bán → Chọn **Đường biển** + **Incoterm** |
| 2 | **CS** | Thêm dịch vụ vào đơn (hệ thống tự lọc chỉ hiện dịch vụ đường biển) |
| 3 | **CS** | Xem Giá 3 (giá gốc) → Cộng thêm phí dịch vụ (~100-200 USD/công) → Tạo thành giá báo khách |
| 4 | **CS** | Gửi báo giá cho khách hàng |
| 5 | **Khách hàng** | Đồng ý → Chuyển sang Giai đoạn 3 |
| 5b | **Khách hàng** | Không đồng ý (chê đắt) → Đàm phán giá |

**Khi khách yêu cầu giảm giá:**

| Tình huống | Ai duyệt | Vì sao |
|---|---|---|
| Giá bán vẫn **cao hơn** Giá 2 (giá bán chuẩn) | ✅ CS tự quyết | Lợi nhuận đủ, không cần duyệt |
| Giá bán **thấp hơn** Giá 2 nhưng vẫn **cao hơn** giá gốc | ⚠️ **Trưởng BP Chứng từ** xác nhận giá gốc → **Trưởng BP CS** duyệt giá bán | TB Chứng từ biết giá SSL thực tế, xác nhận có deal thêm được không. TB CS duyệt biên lợi nhuận |
| Giá bán **thấp hơn** giá gốc (công ty bị lỗ) | 🔴 **Trưởng BP Chứng từ** xác nhận → Hệ thống **tự động đẩy lên Giám đốc** phê duyệt | TB Chứng từ xác nhận đã hết dư địa đàm phán SSL. GĐ quyết định có chịu lỗ giữ khách không |

> Nếu cần giảm giá thêm, CS sẽ nhờ Chứng từ **đàm phán lại** với SSL dưới sự chỉ đạo của **Trưởng BP Chứng từ** để hạ giá gốc → Giá gốc thay đổi → CS có thêm dư địa giảm giá cho khách.

---

## Giai đoạn 3: Chuẩn bị chứng từ & Kiểm tra tem nhãn

### Ai làm: Chứng từ

| Bước | Ai | Làm gì |
|---|---|---|
| 1 | **Chứng từ** | Lấy thông tin hàng hóa: INV (hóa đơn), PL (packing list), thông tin liên lạc xưởng |
| 2 | **Chứng từ** | **Kiểm tra tem nhãn** chính + phụ đã được dán 100% tại xưởng |
| 3 | **Chứng từ** | Gửi cho Trưởng bộ phận chốt xác nhận |
| 4 | **Trưởng BP** | Phản hồi chốt → OK thì tiếp tục |
| 5 | **Chứng từ** | Gửi thông tin cho FWD + Báo FWD book container |

**Trạng thái tem nhãn trên hệ thống:**

| Trạng thái | Ý nghĩa | Ai cập nhật |
|---|---|---|
| 🟡 **Chờ in** | Tem chưa in, đơn hàng mới tạo | Tự động |
| 🟢 **Đã in** | Tem đã in xong, ghi nhận ngày in | Nhân viên kho/vận hành |
| ✅ **Đã xác nhận** | Đã chụp ảnh kiện hàng dán tem, upload lên hệ thống | Nhân viên vận hành |

> ⚠️ **Bắt buộc**: Phải upload ảnh chứng minh dán nhãn vào hệ thống. Đây là bằng chứng pháp lý nếu xảy ra tranh chấp.

---

## Giai đoạn 4: Vận chuyển & Theo dõi trạng thái

### Ai làm: Chứng từ + FWD + CS

| Bước | Ai | Làm gì |
|---|---|---|
| 1 | **FWD** | Book container → Phản hồi trạng thái cho Chứng từ |
| 2 | **Chứng từ** | Xác nhận lại với FWD, nhận được **Booking PDF** |
| 3 | **Chứng từ** | Xác nhận thời gian load hàng (chỉ áp dụng cho EXW) |
| 4 | **Chứng từ** | Gửi thông tin cho bộ phận khai báo hải quan TQ (đơn EXW) |
| 5 | **FWD** | Gửi **HBL nháp** (vận đơn nháp) cho Chứng từ |
| 6 | **Chứng từ** | Kiểm tra và xác nhận HBL |
| 7 | **Chứng từ** | Chờ tàu chạy → HBL onboard → Báo trạng thái cho CS |
| 8 | **CS** | Cập nhật trạng thái cho khách hàng |
| 9 | **Chứng từ** | Làm CO (Certificate of Origin) — nếu cần |
| 10 | **Chứng từ** | Nhận **AN** (Arrival Notice — 1-2 ngày trước tàu cập) |
| 11 | **Chứng từ** | Xác nhận AN và **Debit Note** từ FWD |

**Các mốc trạng thái chính cần theo dõi:**

```
Đóng công    →    Ra cảng xuất    →    Lên tàu    →    Cập cảng nhập    →    Thông quan    →    Về kho KH
 (TQ)              (TQ)               (O/F)             (VN)                (HQ VN)           (Giao xong)
```

> *(Chi tiết toàn bộ trạng thái container — xem Phần 5)*

---

## Giai đoạn 5: Hải quan & Tính giá khai báo

### Ai làm: Chứng từ + Kế toán

**Khi hàng cập cảng Việt Nam:**

| Bước | Ai | Làm gì |
|---|---|---|
| 1 | **FWD** | Gửi hóa đơn vận chuyển quốc tế + Local charge Việt Nam |
| 2 | **Chứng từ** | Giục kế toán TQ thanh toán phí khai báo xuất khẩu |
| 3 | **FWD** | Làm release (giấy giải phóng hàng) |
| 4 | **Chứng từ** | Làm **BCT khai báo nhập** (Bộ chứng từ hải quan) |
| 5 | **Chứng từ** | Gửi FWD lên tờ khai nháp → FWD gửi lại tờ khai nháp cho Chứng từ |
| 6 | **Chứng từ** | Gửi CS file hàng + tờ khai nháp để CS kiểm tra |
| 7 | **CS** | OK → Báo truyền chính thức. Không OK → Sửa tờ khai |
| 8 | **Chứng từ** | Báo FWD truyền tờ khai chính thức |
| 9 | **Tiếp nhận HQ** | Tiếp nhận tờ khai |
| 10 | **Chứng từ** | **Luồng vàng**: Đóng thuế → Thông quan. **Luồng đỏ**: Kiểm hàng → Xử lý phát sinh |
| 11 | **Chứng từ** | Báo CS để khách hàng nạp thuế (nếu cần) |

**⚠️ Quy tắc quan trọng — Đơn EXW hoàn thuế:**

> Chi phí kéo xe đầu Trung Quốc do công ty trả nội bộ, nhưng khi khai hải quan đầu Việt Nam, Chứng từ **bắt buộc phải cộng khoản này vào giá khai** để khớp số liệu xuất hóa đơn cho khách.
>
> **Ví dụ:** Giá hàng = 1.000 USD. Phí trucking TQ = 20 USD (công ty trả). → Giá khai HQ = 1.020 USD.

---

## Giai đoạn 6: Giao hàng, Thanh toán & Tất toán

### Ai làm: Chứng từ + FWD + Kế toán

### 6.1. Giao hàng

| Bước | Ai | Làm gì |
|---|---|---|
| 1 | **Chứng từ** | Xin địa chỉ trả hàng của khách hàng |
| 2 | **Trưởng BP** | Xác nhận giao container |
| 3 | **FWD** | Gọi xe và giao hàng cho khách |
| 4 | **Chứng từ** | Xử lý phát sinh (nếu có): kết hợp với FWD giải quyết |
| 5 | **Chứng từ** | Báo CS hàng giao thành công |
| 6 | **Khách hàng** | Xác nhận nhận hàng thành công |

### 6.2. Tạo Đề nghị thanh toán

| Bước | Ai | Làm gì |
|---|---|---|
| 1 | **Chứng từ** | Lấy tờ khai thông quan → Gửi **Bộ chứng từ hoàn chỉnh** cho kế toán |
| 2 | **Chứng từ** | Gửi **Giá 3** (báo giá gốc từ SSL) cho kế toán chi phí |
| 3 | **Chứng từ** | Tạo **Đề nghị thanh toán thu hộ trả hộ** trên hệ thống (nháp) |

**Đề nghị thanh toán phải tách bạch rõ ràng:**

| Khoản mục | Giải thích | Ví dụ |
|---|---|---|
| **Tiền phải thu của khách** | Tổng số tiền khách phải trả cho DPT | 50.000.000 VND |
| **Tiền phải trả cho SSL** | Chi phí gốc phải thanh toán cho đối tác | 45.000.000 VND |
| **Phí dịch vụ thu hộ** | Phần chênh lệch = Lợi nhuận DPT | 5.000.000 VND |

### 6.3. Hạch toán & Tất toán

| Bước | Ai | Làm gì |
|---|---|---|
| 1 | **Kế toán** | Nhận ĐNTT nháp → Kiểm tra → Duyệt |
| 2 | **Kế toán** | Khi khách thanh toán → Ghi nhận vào sổ sách |
| 3 | **Kế toán** | Chốt tỷ giá thực tế (hệ thống tự lấy từ Vietcombank) |
| 4 | **Kế toán** | Chốt **"Tất toán"** đơn hàng → Hệ thống **khóa đơn** (không ai sửa được nữa) |

> ✅ Đến đây là **kết thúc vòng đời** của một đơn hàng đường biển.

---

# PHẦN 3: Hệ thống giá — 3 mức giá cần nắm

## Ba mức giá là gì?

| Mức giá | Tên thường gọi | Ai tạo | Ý nghĩa dễ hiểu |
|---|---|---|---|
| **Giá 3** | Giá gốc / Giá cost | Chứng từ (nhận từ SSL) | Giá mà công ty phải trả cho đối tác → **Đây là "giá vốn"** |
| **Giá 2** | Giá bán chuẩn | CS | Giá gốc + lợi nhuận thấp (~100 USD/công) → **Giá sàn an toàn** |
| **Giá 1** | Giá bán tốt nhất | CS | Giá gốc + lợi nhuận cao (~200 USD/công) → **Giá mong muốn** |

**Ví dụ cụ thể (FCL Cont 20' Hải Phòng):**

| | Giá 3 (gốc) | Giá 2 (bán chuẩn) | Giá 1 (bán tốt nhất) |
|---|---|---|---|
| Chi phí TQ | 800 USD | 800 USD | 800 USD |
| O/F (cước tàu) | 150 USD | 150 USD | 150 USD |
| Chi phí VN | 500 USD | 500 USD | 500 USD |
| Phí dịch vụ DPT | 0 | +100 USD | +200 USD |
| **Tổng** | **1.450 USD** | **1.550 USD** | **1.650 USD** |

> **Mẹo nhớ:** Giá 3 < Giá 2 < Giá 1. Số càng nhỏ, giá càng cao (vì lợi nhuận càng nhiều).

---

# PHẦN 4: Luồng duyệt giá — Khi nào cần xin phê duyệt?

## Sơ đồ quyết định

```
                              Giá bán cho khách
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
              ≥ Giá 2          < Giá 2 nhưng       < Giá 3
              (lợi nhuận         ≥ Giá 3           (công ty LỖ)
               đủ cao)        (margin thấp)             │
                    │               │                    │
              ✅ CS tự         ⚠️ TB Chứng từ      🔴 TB Chứng từ
              quyết được       xác nhận giá gốc     xác nhận "hết
                                    │                dư địa deal"
                               ⚠️ TB CS duyệt           │
                               giá bán             🔴 Giám đốc
                                                   phê duyệt
                                                   chịu lỗ/giữ khách
```

**Tại sao cần Trưởng BP Chứng từ?**

> Trưởng BP Chứng từ là người **trực tiếp làm việc với SSL/FWD**, nắm rõ:
> - Giá gốc thực tế từ từng Agent
> - Biên độ đàm phán còn lại (có thể ép SSL giảm thêm không?)
> - Lịch sử giá của từng tuyến/hãng tàu
>
> Vì vậy, mọi quyết định giảm giá sâu đều cần Trưởng BP Chứng từ **xác nhận giá gốc trước** — để tránh tình huống CS xin duyệt giảm giá trong khi Chứng từ vẫn có thể deal SSL xuống thêm.

## Chi tiết luồng phê duyệt

| Cấp | Tình huống | Ai duyệt | Hành động trên hệ thống |
|---|---|---|---|
| **Cấp 0** | Giá bán ≥ Giá 2 | ✅ CS tự quyết | CS báo giá trực tiếp, không cần duyệt |
| **Cấp 1** | Giá 2 > Giá bán ≥ Giá 3 | ⚠️ TB Chứng từ xác nhận → TB CS duyệt | TB Chứng từ xác nhận giá gốc SSL chính xác, đã hết dư địa deal. Sau đó TB CS duyệt mức giá bán |
| **Cấp 2** | Giá bán < Giá 3 (LỖ) | 🔴 TB Chứng từ xác nhận → Giám đốc duyệt | TB Chứng từ xác nhận không thể deal thêm với SSL. Hệ thống tự động đẩy lên GĐ để quyết định chịu lỗ giữ khách hay không |

## Ví dụ thực tế

| Tình huống | Giá 3 (gốc) | Giá 2 (chuẩn) | Giá CS muốn báo | Ai duyệt? |
|---|---|---|---|---|
| Khách mới, giá tốt | 1.450 USD | 1.550 USD | 1.600 USD | ✅ CS tự quyết |
| Khách quen, giảm nhẹ | 1.450 USD | 1.550 USD | 1.500 USD | ⚠️ TB Chứng từ xác nhận → TB CS duyệt |
| Khách VIP, giữ bằng mọi giá | 1.450 USD | 1.550 USD | 1.400 USD | 🔴 TB Chứng từ xác nhận → GĐ duyệt (vì < giá gốc) |
| SSL deal thêm được | 1.450 USD | 1.550 USD | 1.500 USD | TB Chứng từ yêu cầu deal SSL → Giá 3 giảm còn 1.380 USD → CS báo 1.500 USD ≥ Giá 2 mới → ✅ không cần duyệt |

## Khi cần deal lại giá

```
Khách chê đắt
      │
      ▼
CS báo Chứng từ → Chứng từ xin ý kiến TB Chứng từ
                          │
                          ▼
                  TB Chứng từ đánh giá:
                  ├── "Còn deal được" → Chỉ đạo Chứng từ đàm phán SSL
                  │                          │
                  │                    SSL giảm giá gốc (Giá 3 mới)
                  │                          │
                  │                    CS có dư địa giảm giá cho khách
                  │
                  └── "Hết dư địa deal" → Xác nhận trên hệ thống
                                               │
                                    ├── Giá bán ≥ Giá 3 → TB CS duyệt
                                    └── Giá bán < Giá 3 → GĐ duyệt
```

## Cơ chế tự động tạo yêu cầu phê duyệt giá

> Áp dụng cho các dịch vụ **có bảng giá** (Giá 0 trên bảng giá). Khi CS nhập hoặc sửa đơn giá trên đơn hàng, hệ thống tự động xử lý phê duyệt theo quy tắc sau:

### Khi nào tự động tạo phê duyệt?

| Hành động của CS | Hệ thống làm gì | Giải thích |
|---|---|---|
| **Nhập đơn giá lần đầu** cho một dịch vụ (chưa có phê duyệt nào) | ✅ **Tự động tạo mới** yêu cầu phê duyệt giá | CS vừa nhập giá → hệ thống tạo 1 phiếu phê duyệt gửi đến cấp duyệt tương ứng |
| **Sửa đơn giá lần 2, 3...** nhưng phê duyệt cũ **chưa được duyệt & chưa bị hủy** | 🔄 **Cập nhật** yêu cầu phê duyệt cũ (không tạo mới) | Tránh tạo nhiều phiếu phê duyệt trùng lặp. Giá mới sẽ ghi đè lên phiếu cũ |
| **Sửa đơn giá** sau khi phê duyệt cũ **đã được duyệt** hoặc **đã bị hủy** | ✅ **Tạo mới** yêu cầu phê duyệt giá | Phiếu cũ đã kết thúc → cần phiếu mới cho giá mới |

### Ví dụ minh họa

```
Lần 1: CS nhập giá 1.500 USD
        → Hệ thống TẠO MỚI phiếu phê duyệt #001 (trạng thái: Chờ duyệt)

Lần 2: CS sửa giá thành 1.480 USD (phiếu #001 vẫn "Chờ duyệt")
        → Hệ thống CẬP NHẬT phiếu #001: giá 1.500 → 1.480 USD
        → KHÔNG tạo phiếu mới

Lần 3: TB CS duyệt phiếu #001 (trạng thái: Đã duyệt ✅)

Lần 4: CS sửa giá thành 1.450 USD (phiếu #001 đã "Đã duyệt")
        → Hệ thống TẠO MỚI phiếu phê duyệt #002 (trạng thái: Chờ duyệt)
```

### Trạng thái yêu cầu phê duyệt

| Trạng thái | Ý nghĩa | CS sửa giá → Hệ thống làm gì? |
|---|---|---|
| 🟡 **Chờ duyệt** (Draft/Pending) | Đang chờ cấp trên xem xét | 🔄 Cập nhật phiếu cũ |
| ✅ **Đã duyệt** (Approved) | Cấp trên đã đồng ý mức giá | ✅ Tạo phiếu mới |
| ❌ **Đã hủy** (Cancelled) | Phiếu bị hủy (ví dụ: đổi ý, đơn hàng hủy) | ✅ Tạo phiếu mới |
| 🔴 **Từ chối** (Rejected) | Cấp trên không đồng ý → CS phải sửa giá | ✅ Tạo phiếu mới |

> **Lưu ý cho CS:** Khi bạn sửa giá nhiều lần, hãy kiểm tra xem phiếu phê duyệt cũ đã được xử lý chưa. Nếu phiếu vẫn đang "Chờ duyệt", giá mới sẽ tự động cập nhật vào phiếu đó — bạn **không cần** nhắn người duyệt về việc thay đổi giá, hệ thống sẽ tự ghi nhận.

---

# PHẦN 5: Theo dõi hàng — Trạng thái container

## Tổng quan 4 giai đoạn

```
  GĐ 1: BOOKING          GĐ 2: CẢNG ĐI (TQ)      GĐ 3: VẬN CHUYỂN       GĐ 4: CẢNG ĐẾN (VN)
  ──────────────          ──────────────────        ──────────────────      ────────────────────
  Đặt chỗ tàu            Đóng hàng → Xuất cảng    Trên biển               Cập cảng → Giao hàng
```

## Chi tiết từng trạng thái

### Giai đoạn 1: Booking — Đặt chỗ trên tàu

| Trạng thái | Tiếng Việt | Bạn cần làm gì |
|---|---|---|
| **Booking Request** | Yêu cầu đặt chỗ | Chờ hãng tàu xác nhận. Chưa có số container |
| **Booking Confirmed** | Đã xác nhận đặt chỗ | ✅ Kiểm tra kỹ: loại cont, số lượng, cảng đi/đến trên Booking |
| **Equipment Released** | Lệnh cấp vỏ rỗng | FWD cầm lệnh này đi lấy vỏ container rỗng tại bãi |
| **Booking Cancelled** | Đã hủy đặt chỗ | ❌ Đơn bị hủy — cần book lại hoặc chuyển hãng tàu |

### Giai đoạn 2: Origin — Tại cảng đi (Trung Quốc)

| Trạng thái | Tiếng Việt | Bạn cần làm gì |
|---|---|---|
| **Empty Gate Out** | Xuất vỏ rỗng | Xe mang vỏ rỗng về xưởng đóng hàng. ⏱️ Bắt đầu tính phí detention |
| **Full Gate In** | Hạ bãi chờ xuất | Container đã đóng xong, kẹp chì, hạ xuống bãi cảng. ⚠️ Phải hạ trước giờ Cut-off |
| **Customs Cleared** | Thông quan xuất khẩu | HQ TQ đã cho phép xuất. Nếu bị **Customs Hold** → cont không lên được tàu |
| **Loaded on Board** | Đã xếp lên tàu | 🎯 Mốc quan trọng! Từ đây phát hành Bill of Lading |
| **Vessel Departed** | Tàu rời cảng TQ | Hệ thống cập nhật ngày tàu chạy thực tế (ATD) |
| **Rolled / Shut out** ⚠️ | **Rớt tàu** | Container bị bỏ lại do tàu đầy hoặc lỗi chứng từ → **BÁO NGAY khách hàng** |

### Giai đoạn 3: Transit — Trên biển

| Trạng thái | Tiếng Việt | Bạn cần làm gì |
|---|---|---|
| **In Transit** | Đang vận chuyển | Container đang trên tàu giữa biển. Theo dõi lịch trình |
| **Transshipment Discharged** | Dỡ cảng chuyển tải | VD: Tàu ghé Hong Kong, cont dỡ xuống chờ tàu nối |
| **Transshipment Loaded** | Xếp tàu chuyển tải | Container lên tàu nối (Feeder) về Việt Nam |
| **Omitted / Skipped** ⚠️ | **Tàu bỏ cảng** | Tàu không ghé cảng dự kiến → delay → thông báo khách |

### Giai đoạn 4: Destination — Tại cảng đến (Việt Nam)

| Trạng thái | Tiếng Việt | Bạn cần làm gì |
|---|---|---|
| **Vessel Arrived** | Tàu cập cầu | Tàu đến cảng VN (Hải Phòng, Cát Lái, Đà Nẵng...). Cập nhật ngày đến (ATA) |
| **Discharged** | Dỡ hàng xuống bãi | Container được cẩu xuống cảng. ⏱️ Bắt đầu tính phí Demurrage/Detention tại VN |
| **Import Customs Cleared** | Thông quan nhập khẩu | HQ VN cho phép nhập. Luồng vàng: đóng thuế. Luồng đỏ: kiểm hàng |
| **Customs Hold** ⚠️ | **HQ giữ hàng** | Cont bị giữ kiểm hóa/soi chiếu → không lấy được hàng cho đến khi giải tỏa |
| **Gate Out Full** | Lấy hàng ra cảng | ✅ Xong HQ + đóng tiền D/O → xe kéo cont về kho khách |
| **Empty Gate In** | Trả vỏ rỗng | Khách rút hàng xong → trả vỏ → 🏁 **KẾT THÚC quy trình**. Ngừng tính phí |
| **Damaged** ⚠️ | **Container hư hỏng** | Cont bị móp/thủng → yêu cầu giám định xác định lỗi do ai |

---

# PHẦN 6: Bảng chi phí — Các khoản phí đường biển

## 6.1. FCL (Full Container Load) — Nguyên container

### Bảng chi phí mẫu — Cont 20' & Cont 40'

| STT | Đầu mục chi phí | Đơn vị | VAT | Cont 20 (HP) | Cont 20 (HCM) | Cont 40 (HP) | Cont 40 (HCM) |
|---|---|---|---|---|---|---|---|
| | **CHI PHÍ TRUNG QUỐC** | | | | | | |
| 1.1 | EXW Charge & Local charge TQ | Đơn | 0% | Theo SSL | Theo SSL | Theo SSL | Theo SSL |
| 1.2 | Form E (<20 items, +8 USD/trang) | Set | 0% | 50 USD | 50 USD | 50 USD | 50 USD |
| 1.3 | Export license (Giấy phép XK) | Set | 0% | 350 USD | 350 USD | 350 USD | 350 USD |
| 1.4 | Export declare (Khai báo XK) | Set | 0% | 500 USD | 500 USD | 500 USD | 500 USD |
| | **CƯỚC TÀU** | | | | | | |
| 2 | O/F (Ocean Freight) | Cont | — | Theo SSL | Theo SSL | Theo SSL | Theo SSL |
| | **CHI PHÍ VIỆT NAM** | | | | | | |
| 3.1 | THC (Phụ phí xếp dỡ tại cảng) | Cont | 8% | 120 USD | 120 USD | 170 USD | 120 USD |
| 3.2 | CIC (Phí cân bằng cont) | Cont | 8% | 120 USD | 50 USD | 240 USD | 50 USD |
| 3.3 | D/O (Phí chứng từ) | Set | 8% | 35 USD | 35 USD | 35 USD | 35 USD |
| 3.4 | Cleaning fee (Vệ sinh cont) | Cont | 8% | 10 USD | 10 USD | 15 USD | 10 USD |
| 3.5 | Handling fee (Truyền tờ khai) | Set | 8% | 20 USD | 20 USD | 20 USD | 20 USD |
| 3.6 | Phí thủ tục HQ NK (luồng vàng) | Set | 8% | 1.000.000₫ | 1.000.000₫ | 1.000.000₫ | 1.000.000₫ |
| 3.7 | Phí thủ tục HQ NK (luồng đỏ) | Set | 8% | 1.700.000₫ | 1.700.000₫ | 1.700.000₫ | 1.700.000₫ |
| 3.8 | Phí nâng hạ cont | Cont | 8% | Theo thực tế | Theo thực tế | Theo thực tế | Theo thực tế |
| 3.9 | Phí CSHT | Cont | 0% | 250.000₫ | 500.000₫ | 500.000₫ | 500.000₫ |
| 3.10 | Trucking nội địa VN | Đơn | 8% | Theo thực tế | Theo thực tế | Theo thực tế | Theo thực tế |
| | **PHÍ DỊCH VỤ DPT** | | | | | | |
| 4 | **Phí dịch vụ FCL** | Đơn | 0% | **3.000.000₫** | **3.000.000₫** | **3.000.000₫** | **3.000.000₫** |

### Bảng cước tàu O/F tham khảo

| Cảng đi (TQ) | Cảng đến (VN) | Hãng tàu | Cont 20 (USD) | Cont 40 (USD) |
|---|---|---|---|---|
| NINGBO | Hải Phòng | MCC/CNC | 150 | 250 |
| — | Hồ Chí Minh | SITC | 580 | 800 |
| — | Hồ Chí Minh | — | 350 | 700 |
| QUINGDAO | Hải Phòng | — | 600 | 600 |
| — | Hồ Chí Minh | — | 1.200 | 1.350 |
| SHEKOU | Hải Phòng | — | 150 | 300 |
| — | Hồ Chí Minh | — | 650 | 900 |
| NANSHA | Hải Phòng | — | 150 | 350 |
| — | Hồ Chí Minh | — | 750 | 950 |

> **Lưu ý**: Giá O/F thay đổi liên tục. Bảng trên chỉ mang tính tham khảo. Luôn xin giá mới nhất từ SSL.

## 6.2. LCL (Less than Container Load) — Hàng lẻ

| Đầu mục | Đơn vị | Ghi chú |
|---|---|---|
| EXW Charge & Local charge | Set | Từ SSL |
| Phí xuất khẩu | Set | Từ SSL |
| Form E | Set | Từ SSL |
| O/F | **CBM (m³)** | Tính theo thể tích, khác FCL |
| THC | CBM | — |
| CFS (phí kho gom) | CBM | Chỉ có ở LCL |
| CIC | CBM | — |
| D/O, Cleaning, Handling | Set | — |
| Phí HQ NK | Set | — |
| Phí CSHT | **Tấn** | LCL tính theo tấn, khác FCL |
| Bốc xếp kho CFS | CBM | — |
| Lưu kho CFS | Ngày/m³ | Càng lưu lâu càng tốn |
| Trucking nội địa VN | Set | — |
| Giao nhận kho CFS | Set | — |
| **Phí dịch vụ LCL (DPT)** | Set | **1.000.000₫** |

## 6.3. Chi phí phát sinh ngoài dự kiến

| Nội dung | Đơn giá mẫu |
|---|---|
| Chi phí kiểm hóa | 1.000.000₫ |
| Chi phí phát sinh tại cảng do kiểm hóa (có hóa đơn) | 3.500.000₫ |
| Sửa chữa vận đơn | Theo phát sinh |
| Phí phát sinh bill | Theo phát sinh |
| Thủ tục HQ ngoài giờ | Theo phát sinh |
| Phí bất khả kháng | Theo phát sinh |
| Kiểm hóa tại cảng phát sinh | Theo phát sinh |
| Vận chuyển chặng cuối (đường cấm) | Theo phát sinh |

> **Tỷ giá tham khảo**: CNY/VND ≈ 3.850 | USD/VND ≈ 26.400. Tỷ giá thực tế lấy tự động từ API Vietcombank.

---

# PHẦN 7: Kế toán — Hạch toán & Tất toán đơn hàng

## 7.1. Luồng tiền — Dễ hiểu

```
  Khách hàng ──── trả tiền ────→ DPT ──── trả tiền ────→ SSL (Đối tác)
       │                           │
       │                           └──→ Phần còn lại = LỢI NHUẬN DPT
       │
       └── Tổng tiền KH trả = Chi phí SSL + Lợi nhuận DPT
```

## 7.2. Cách ghi sổ kế toán

| Tài khoản | Nợ/Có | Nội dung | Ví dụ |
|---|---|---|---|
| **TK 138** — Phải thu khác | **Nợ** | Ghi nhận tổng tiền khách phải trả | 50.000.000₫ |
| **TK 338** — Phải trả khác | **Có** | Ghi nhận tiền phải trả cho SSL | 45.000.000₫ |
| **TK 511** — Doanh thu dịch vụ | **Có** | Ghi nhận lợi nhuận (phần chênh lệch) | 5.000.000₫ |

**Kiểm tra cân bằng:**
> Nợ 138 (50tr) = Có 338 (45tr) + Có 511 (5tr) ✅

## 7.3. Chốt tỷ giá

- Hệ thống **tự động lấy tỷ giá** từ ngân hàng Vietcombank hàng ngày.
- Khi hạch toán, kế toán kiểm tra tỷ giá và có thể điều chỉnh nếu cần.
- Chênh lệch tỷ giá (nếu có) được ghi nhận riêng.

## 7.4. Tất toán đơn hàng

| Bước | Hành động | Kết quả |
|---|---|---|
| 1 | Kế toán xác nhận tất cả khoản thu/chi đã khớp | — |
| 2 | Kế toán bấm **"Tất toán"** trên hệ thống | Hệ thống khóa đơn |
| 3 | Đơn hàng chuyển sang trạng thái **"Đã tất toán"** | Không ai sửa/xóa được nữa |

> 🏁 Đây là bước **cuối cùng** trong vòng đời một đơn hàng đường biển.

---

# PHẦN 8: Các tình huống thường gặp

## Hỏi & Đáp cho CS

| Câu hỏi | Trả lời |
|---|---|
| **Tôi thêm dịch vụ vào đơn nhưng không thấy gì?** | Kiểm tra trường **Tuyến vận chuyển** đã chọn **Đường biển** chưa. Hệ thống chỉ hiện dịch vụ đúng tuyến |
| **Tôi muốn giảm giá cho khách nhưng không được?** | Nếu giá bán thấp hơn Giá 2: cần Trưởng BP duyệt. Nếu thấp hơn Giá 3: cần GĐ duyệt. Kiểm tra trạng thái duyệt |
| **Trường Incoterm không hiện trên đơn hàng?** | Trường Incoterm chỉ hiện khi chọn Tuyến vận chuyển = Đường biển. Nếu vẫn không thấy → báo IT kiểm tra |
| **Khách muốn dùng term CIF nhưng tôi chỉ thấy EXW?** | Liên hệ Admin để tạo thêm dịch vụ cho term CIF trong kho dịch vụ |

## Hỏi & Đáp cho Chứng từ

| Câu hỏi | Trả lời |
|---|---|
| **Trạng thái tem nhãn không chuyển sang "Đã xác nhận"?** | Bạn cần upload ít nhất 1 ảnh chụp kiện hàng đã dán tem. Lưu đơn hàng để hệ thống cập nhật |
| **Container bị rớt tàu (Rolled) thì làm sao?** | ① Báo ngay CS để thông báo khách về delay. ② Liên hệ FWD xin sửa Bill và book chuyến kế tiếp |
| **Đơn EXW hoàn thuế — tại sao phải cộng trucking TQ vào giá khai HQ?** | Để số liệu khai HQ khớp với hóa đơn xuất cho khách. Nếu không cộng → sai lệch → bị HQ truy vấn |

## Hỏi & Đáp cho Kế toán

| Câu hỏi | Trả lời |
|---|---|
| **Hệ thống không tự bóc tách 138/338/511?** | Kiểm tra đã nhập **Phí dịch vụ thu hộ** vào đúng trường chưa. Đây là cơ sở để hệ thống tính TK 511 |
| **Tỷ giá trên hệ thống không đúng?** | Tỷ giá lấy tự động từ VCB theo ngày. Nếu cần dùng tỷ giá khác → kế toán có thể điều chỉnh thủ công |
| **Tất toán xong rồi nhưng phát hiện sai?** | Liên hệ IT để mở khóa đơn hàng. Chỉ quản trị viên mới có quyền mở lại đơn đã tất toán |

---

# PHỤ LỤC: So sánh nhanh EXW vs FOB vs CIF

| Hạng mục | EXW | FOB | CIF |
|---|---|---|---|
| **Ai chịu trucking TQ?** | Công ty DPT | Khách hàng (bên xuất) | Hãng tàu/FWD |
| **Ai khai báo HQ xuất TQ?** | DPT (qua FWD) | Khách hàng | Hãng tàu/FWD |
| **Ai trả cước tàu (O/F)?** | DPT | DPT | Đã bao gồm trong giá CIF |
| **Ai trả chi phí VN?** | DPT | DPT | DPT |
| **Kiểm tra tem nhãn?** | ⚠️ DPT kiểm tra tại xưởng | Ít kiểm soát hơn | Ít kiểm soát hơn |
| **Độ phức tạp** | Cao nhất (52 bước) | Trung bình (50 bước) | Đơn giản nhất (36 bước) |
| **Phí dịch vụ DPT** | Cao nhất | Trung bình | Thấp nhất |

---

> **Tài liệu này được viết dựa trên quy trình thực tế của công ty DPT.**  
> Mọi thắc mắc về nghiệp vụ → liên hệ Trưởng bộ phận Chứng từ.  
> Mọi thắc mắc về hệ thống → liên hệ đội IT (Anh Mạnh, Dũng, Trường).
