# Bước 3: Odoo Modules Mapping

## 1. Đánh Giá Modules Cần Thiết

### 1.1 Core Modules (Bắt buộc)

| Module | Tên | Cần thiết | Ghi chú |
|--------|-----|-----------|---------|
| `base` | Contacts | ✓ | Luôn có |
| `sale` | Sales | ? | |
| `purchase` | Purchase | ? | |
| `stock` | Inventory | ? | |
| `account` | Accounting | ? | |
| `crm` | CRM | ? | |
| `hr` | Human Resources | ? | |
| `project` | Project | ? | |
| `manufacturing` | Manufacturing | ? | |

### 1.2 OCA Modules Đề Xuất

Dựa trên yêu cầu, các OCA modules có thể hữu ích:

| Module OCA | Mục đích | Repo |
|------------|----------|------|
| | | |

### 1.3 Custom Modules Cần Phát Triển

| Module | Mục đích | Độ phức tạp |
|--------|----------|-------------|
| | | Thấp/TB/Cao |

## 2. Sơ Đồ Modules

```
┌─────────────────────────────────────────┐
│              ODOO SOLUTION              │
├─────────────┬─────────────┬─────────────┤
│   SALES     │  INVENTORY  │  PURCHASE   │
├─────────────┼─────────────┼─────────────┤
│  ACCOUNTING │     HR      │   PROJECT   │
├─────────────┴─────────────┴─────────────┤
│            CUSTOM MODULES               │
└─────────────────────────────────────────┘
```

---

## 3. Menu

```
[C] Tiếp tục
[D] Chi tiết module
[B] Quay lại
```

## 4. Hành Động Tiếp Theo

Khi chọn **[C]**: Tải `steps/step-04-scope-timeline.md`
