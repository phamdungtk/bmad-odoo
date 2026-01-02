# Bước 4: Hoàn Thành UX Design

## 1. Tóm Tắt

```
🎨 ODOO UX DESIGN

Model: {model_name}
Views thiết kế:
├── Form View: ✓
├── Tree View: ✓
├── Search View: ✓
└── Kanban View: {có/không}

Widgets sử dụng: {count}
Decorations: {count}
```

## 2. Đầu Ra

### 2.1 File Views XML

Tạo file: `views/{model_name}_views.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<odoo>
    <!-- Form View -->
    <record id="{model}_view_form" model="ir.ui.view">
        <!-- content -->
    </record>
    
    <!-- Tree View -->
    <record id="{model}_view_tree" model="ir.ui.view">
        <!-- content -->
    </record>
    
    <!-- Search View -->
    <record id="{model}_view_search" model="ir.ui.view">
        <!-- content -->
    </record>
</odoo>
```

### 2.2 UX Spec

Lưu vào: `{planning_artifacts}/ux-design-{model}.md`

## 3. Bước Tiếp Theo

```
[1] Thiết kế UX cho model khác
[2] Tạo addon từ design (workflow create-odoo-addon)
[X] Quay về menu chính
```
