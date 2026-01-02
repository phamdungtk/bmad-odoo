# Bước 3: Thiết Kế Tree & Search Views

## 1. Tree View Design

### 1.1 Cấu Trúc Tree View Chuẩn

```xml
<tree decoration-danger="state == 'cancel'" 
      decoration-info="state == 'draft'">
    <field name="name"/>
    <field name="partner_id"/>
    <field name="date"/>
    <field name="amount_total" sum="Total"/>
    <field name="state" 
           decoration-success="state == 'done'"
           widget="badge"/>
</tree>
```

### 1.2 Columns Cho Model: {model}

| # | Field | Tên hiển thị | Widget | Optional |
|---|-------|--------------|--------|----------|
| 1 | name | Tên | | ✗ |
| 2 | partner_id | Khách hàng | many2one_avatar | ✗ |
| 3 | date | Ngày | | ✗ |
| 4 | state | Trạng thái | badge | ✗ |

### 1.3 Decorations

| Điều kiện | Màu |
|-----------|-----|
| state == 'draft' | info (xanh dương) |
| state == 'done' | success (xanh lá) |
| state == 'cancel' | danger (đỏ) |

## 2. Search View Design

### 2.1 Cấu Trúc Search View

```xml
<search>
    <field name="name"/>
    <field name="partner_id"/>
    <filter name="my_records" string="Của tôi" 
            domain="[('user_id', '=', uid)]"/>
    <filter name="today" string="Hôm nay" 
            domain="[('date', '=', context_today())]"/>
    <group expand="0" string="Group By">
        <filter name="group_partner" string="Khách hàng" 
                context="{'group_by': 'partner_id'}"/>
        <filter name="group_state" string="Trạng thái" 
                context="{'group_by': 'state'}"/>
    </group>
</search>
```

### 2.2 Filters & Group By

**Quick Filters:**
| Tên | Domain | Mặc định |
|-----|--------|----------|
| Của tôi | [('user_id', '=', uid)] | ✗ |
| Hôm nay | [('date', '=', context_today())] | ✗ |

**Group By:**
| Tên | Field |
|-----|-------|
| Khách hàng | partner_id |
| Trạng thái | state |

---

## 3. Menu

```
[C] Tiếp tục - Hoàn thành
[K] Kanban - Thiết kế Kanban view
[B] Quay lại
```

## 4. Hành Động Tiếp Theo

Khi chọn **[C]**: Tải `steps/step-04-complete.md`
