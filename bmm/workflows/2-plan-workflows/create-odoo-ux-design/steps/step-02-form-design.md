# Bước 2: Thiết Kế Form View

## 1. Odoo Form View Best Practices

### 1.1 Cấu Trúc Form Chuẩn

```xml
<form>
    <header>
        <!-- Status bar, buttons -->
        <button name="action_confirm" type="object" string="Xác nhận"/>
        <field name="state" widget="statusbar"/>
    </header>
    <sheet>
        <div class="oe_title">
            <!-- Title field -->
            <h1><field name="name"/></h1>
        </div>
        <group>
            <group>
                <!-- Left column -->
            </group>
            <group>
                <!-- Right column -->
            </group>
        </group>
        <notebook>
            <page string="Tab 1">
                <!-- Content -->
            </page>
        </notebook>
    </sheet>
    <chatter/>
</form>
```

### 1.2 Thiết Kế Form Cho Model: {model}

**Header Section:**
- Status bar: {các trạng thái}
- Buttons: {các nút action}

**Title Section:**
- Field chính: {field_name}

**Main Content (2 columns):**

| Cột trái | Cột phải |
|----------|----------|
| {field1} | {field2} |
| {field3} | {field4} |

**Tabs (Notebook):**
- Tab 1: {name} - {content}
- Tab 2: {name} - {content}

### 1.3 Widgets Đề Xuất

| Field | Widget | Lý do |
|-------|--------|-------|
| state | statusbar | Hiển thị trạng thái |
| partner_id | many2one_avatar | Hiển thị avatar |
| amount | monetary | Format tiền tệ |
| date | date | Date picker |

---

## 2. Menu

```
[C] Tiếp tục - Thiết kế Tree View
[P] Preview - Xem trước XML
[B] Quay lại
```

## 3. Hành Động Tiếp Theo

Khi chọn **[C]**: Tải `steps/step-03-tree-design.md`
