# BMAD-Odoo - Hướng Dẫn Sử Dụng

[![npm version](https://img.shields.io/npm/v/bmad-odoo.svg)](https://www.npmjs.com/package/bmad-odoo)
[![npm downloads](https://img.shields.io/npm/dm/bmad-odoo.svg)](https://www.npmjs.com/package/bmad-odoo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **BMAD Framework mở rộng cho phát triển Odoo ERP**

---

## 📋 Mục Lục

1. [Giới Thiệu](#giới-thiệu)
2. [Cài Đặt](#cài-đặt)
3. [Hướng Dẫn Chi Tiết](#-hướng-dẫn-chi-tiết)
4. [Các Lệnh Phổ Biến](#-các-lệnh-phổ-biến)
5. [Use Cases](#-use-cases)
6. [Cấu Hình](#cấu-hình)
7. [Các Agents](#các-agents)
8. [Workflows](#workflows)
9. [Quy Trình Làm Việc](#quy-trình-làm-việc)
10. [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
11. [Troubleshooting](#-troubleshooting)
12. [FAQ](#-faq)
13. [Tài Liệu Tham Khảo](#tài-liệu-tham-khảo)

---

## Giới Thiệu

**BMAD-Odoo** là một framework mở rộng từ BMAD (Brian's Method for AI Development), được tùy chỉnh đặc biệt cho việc phát triển và triển khai Odoo ERP.

### Tính Năng Chính

- 🤖 **10 AI Agents** chuyên biệt cho từng vai trò trong dự án Odoo
- 📝 **44 Workflows** bao phủ toàn bộ vòng đời phát triển
- 🇻🇳 **Hỗ trợ tiếng Việt** đầy đủ
- 📚 **Knowledge Base** tích hợp kiến thức Odoo
- ⚙️ **Auto-setup** tự động cấu hình workflows khi cài đặt

---

## Cài Đặt

### Yêu Cầu

- Node.js 18+
- Odoo 16.0+ hoặc 17.0
- AI IDE hỗ trợ (Antigravity/Gemini, Cursor, VS Code, Windsurf)

### Cách 1: Cài Đặt từ NPM (Khuyến nghị)

```bash
# Trong thư mục dự án Odoo của bạn
npm install bmad-odoo
```

**Post-install sẽ tự động hỏi bạn chọn IDE:**
```
Chọn IDE bạn đang sử dụng:
  1. VS Code          - Visual Studio Code với extensions AI
  2. Cursor           - Cursor AI IDE
  3. Antigravity      - Google Gemini Antigravity Agent
  4. Windsurf         - Windsurf AI IDE
  5. Tất cả           - Setup cho tất cả IDEs

Nhập số (1-5) [mặc định: 3]:
```

**Package sẽ tự động tạo:**
- ✅ Thư mục `_bmad-odoo/` (symlink hoặc copy từ `node_modules/`)
- ✅ Thư mục `_bmad-odoo-output/` với cấu trúc con cho artifacts
- ✅ Workflows vào `.agent/workflows/` (hoặc IDE bạn chọn)
- ✅ Các slash commands: `/analyst`, `/dev`, `/pm`, ...

### Chạy Lại Setup (nếu cần)

```bash
# Nếu muốn đổi IDE hoặc setup lại
npx bmad-odoo-setup
```

### Cách 2: Cài Đặt Thủ Công

```bash
# Clone repository
git clone https://github.com/phamdungtk/bmad-odoo.git

# Copy vào node_modules
cp -r bmad-odoo node_modules/

# Chạy setup
cd bmad-odoo
npm run setup
```

---


## Cấu Hình

### File Cấu Hình Chính

Chỉnh sửa file `bmm/config.yaml`:

```yaml
# Thông tin người dùng
user_name: "Tên của bạn"
communication_language: "Tiếng Việt"

# Thư mục đầu ra
output_folder: "_bmad-odoo-output"
planning_artifacts: "_bmad-odoo-output/planning"
implementation_artifacts: "_bmad-odoo-output/implementation"

# Cấu hình Odoo
odoo:
  version: "17.0"
  edition: "community"           # community hoặc enterprise
  customModulesPath: "addons_custom"
  oca_path: "addons_oca"
```

---

## 🚀 Hướng Dẫn Chi Tiết

### Bước 1: Cài Đặt Package

```bash
# Di chuyển đến thư mục dự án Odoo của bạn
cd D:\MyOdooProject

# Khởi tạo package.json nếu chưa có
npm init -y

# Cài đặt bmad-odoo
npm install bmad-odoo
```

**Kết quả:**
```
+ bmad-odoo@1.0.0
added 1 package
```

### Bước 2: Interactive Setup (Tự Động)

Ngay sau khi cài đặt, **post-install script sẽ tự động chạy**:

```
╔════════════════════════════════════════════════════════════╗
║          🚀 BMAD-Odoo Interactive Setup                     ║
╚════════════════════════════════════════════════════════════╝

Chọn IDE bạn đang sử dụng:

  1. VS Code          - Visual Studio Code với extensions AI
  2. Cursor           - Cursor AI IDE
  3. Antigravity      - Google Gemini Antigravity Agent
  4. Windsurf         - Windsurf AI IDE
  5. Tất cả           - Setup cho tất cả IDEs

Nhập số (1-5) [mặc định: 3]:
```

**Nhập số và Enter:**
```bash
3  # Chọn Antigravity (hoặc IDE bạn đang dùng)
```

### Bước 3: Quá Trình Setup (Tự Động)

Script sẽ tự động thực hiện:

```
📌 Đã chọn: Antigravity (Gemini)

[1/3] Tạo thư mục _bmad-odoo...
✅ Đã tạo symlink: _bmad-odoo -> node_modules/bmad-odoo

[2/3] Tạo thư mục _bmad-odoo-output...
✅ Đã tạo: _bmad-odoo-output/

[3/3] Tạo workflow files...
✅ Đã tạo 10 workflows cho Antigravity (Gemini)

╔════════════════════════════════════════════════════════════╗
║          ✅ BMAD-Odoo Setup Hoàn Tất!                       ║
╚════════════════════════════════════════════════════════════╝
```

### Bước 4: Kiểm Tra Cấu Trúc Đã Tạo

```bash
# Kiểm tra thư mục project
ls -la
```

**Cấu trúc sau khi setup:**
```
MyOdooProject/
├── node_modules/
│   └── bmad-odoo/          # Package gốc từ npm
├── _bmad-odoo/             # ✨ Symlink/copy để dễ access
├── _bmad-odoo-output/      # ✨ Thư mục output cho artifacts
│   ├── planning-artifacts/
│   ├── implementation-artifacts/
│   ├── test-artifacts/
│   └── documentation/
├── .agent/                 # ✨ Workflows cho Antigravity
│   └── workflows/
│       ├── analyst.md
│       ├── architect.md
│       ├── dev.md
│       ├── pm.md
│       ├── sm.md
│       ├── tea.md
│       ├── ux-designer.md
│       ├── quick-flow-solo-dev.md
│       ├── tech-writer.md
│       └── bmad-core-workflows-party-mode.md
└── package.json
```

### Bước 5: Sử Dụng Agents

Mở AI IDE của bạn (Antigravity/Gemini, Cursor, etc.) và gõ:

```bash
/analyst          # Kích hoạt Business Analyst (Sofia)
/architect        # Kích hoạt Technical Architect (Antonio)
/dev              # Kích hoạt Developer (Carlos)
/pm               # Kích hoạt Product Manager (Maria)
/sm               # Kích hoạt Scrum Master (Diego)
/tea              # Kích hoạt Test Architect (Elena)
/ux-designer      # Kích hoạt UX Designer (Sally)
/quick-flow-solo-dev  # Kích hoạt Quick Flow Dev (Barry)
/tech-writer      # Kích hoạt Tech Writer (Paige)
```

---

## 🔧 Các Lệnh Phổ Biến

### Chạy Lại Setup (Đổi IDE hoặc Thêm IDE)

Nếu bạn muốn:
- Đổi sang IDE khác
- Thêm workflows cho IDE mới
- Setup lại từ đầu

```bash
# Chạy interactive setup
npx bmad-odoo-setup

# Hoặc
npm run setup
```

**Script sẽ hỏi lại IDE và tạo workflows cho IDE đó.**

### Xem Thông Tin Package

```bash
# Xem version đã cài
npm list bmad-odoo

# Xem thông tin từ npm
npm view bmad-odoo

# Xem tất cả versions có sẵn
npm view bmad-odoo versions
```

### Update Package

```bash
# Update lên version mới nhất
npm update bmad-odoo

# Hoặc cài lại với version cụ thể
npm install bmad-odoo@latest
```

### Xóa và Cài Lại

```bash
# Xóa package và thư mục đã tạo
npm uninstall bmad-odoo
rm -rf _bmad-odoo _bmad-odoo-output .agent/workflows

# Cài lại
npm install bmad-odoo
```

---

## 💡 Use Cases

### Case 1: Phát Triển Module Odoo Mới

```bash
# 1. Cài đặt bmad-odoo
npm install bmad-odoo

# 2. Kích hoạt Business Analyst để phân tích yêu cầu
/analyst
> AP  # Chọn [AP] Analyze Process

# 3. Kích hoạt Architect để thiết kế
/architect
> CO  # Chọn [CO] Create Odoo Addon

# 4. Kích hoạt Developer để code
/dev
> DS  # Chọn [DS] Dev Story
```

### Case 2: Setup Cho Team (Multi-IDE)

```bash
# Cài đặt package
npm install bmad-odoo

# Khi setup, chọn option 5 (Tất cả)
# Script sẽ tạo workflows cho:
# - VS Code (.vscode/workflows/)
# - Cursor (.cursor/workflows/)
# - Antigravity (.agent/workflows/)
# - Windsurf (.windsurf/workflows/)

# Team members dùng IDE khác nhau đều có thể làm việc
```

### Case 3: CI/CD Integration

Nếu cài đặt trong CI/CD (non-interactive):

```bash
# Script sẽ tự động chọn Antigravity (default)
npm install bmad-odoo

# Hoặc set biến môi trường (nếu support sau)
BMAD_IDE=cursor npm install bmad-odoo
```

---

## Cấu Hình

### File Cấu Hình Chính

Chỉnh sửa file `_bmad-odoo/bmm/config.yaml`:

```yaml
# Thông tin người dùng
user_name: "Tên của bạn"
communication_language: "Tiếng Việt"

# Thư mục đầu ra
output_folder: "_bmad-odoo-output"
planning_artifacts: "_bmad-odoo-output/planning-artifacts"
implementation_artifacts: "_bmad-odoo-output/implementation-artifacts"

# Cấu hình Odoo
odoo:
  version: "17.0"
  edition: "community"           # community hoặc enterprise
  customModulesPath: "addons_custom"
  oca_path: "addons_oca"
```

---

## Các Agents

### Danh Sách Agents

| Agent | Tên | Vai Trò | Slash Command |
|-------|-----|---------|---------------|
| 💼 Sofia | Business Analyst | Phân tích quy trình, gap analysis | `/analyst` |
| 🏗️ Antonio | Technical Architect | Thiết kế kiến trúc module | `/architect` |
| 💻 Carlos | Developer | Phát triển code Odoo | `/dev` |
| 📊 Maria | Product Manager | Quản lý sản phẩm, tạo PRD | `/pm` |
| 🏃 Diego | Scrum Master | Quản lý Sprint, story | `/sm` |
| 🧪 Elena | Test Architect | Thiết kế test cases | `/tea` |
| 🎨 Sally | UX Designer | Thiết kế UX cho Odoo views | `/ux-designer` |
| ⚡ Barry | Quick Flow Dev | Phát triển nhanh | `/quick-flow-solo-dev` |
| 📝 Paige | Tech Writer | Tài liệu hóa module | `/tech-writer` |
| 🎯 Master | BMAD-Odoo Master | Điều phối tổng thể | (auto) |

### Cách Kích Hoạt Agent

```
/analyst    # Kích hoạt Sofia - Business Analyst
/dev        # Kích hoạt Carlos - Developer
/pm         # Kích hoạt Maria - Product Manager
```

---

## Workflows

### Phân Loại Workflows

#### 1. Analysis (Phân Tích)
| Workflow | Mô Tả |
|----------|-------|
| `analyze-process` | Phân tích quy trình nghiệp vụ Odoo |
| `gap-analysis` | Phân tích khoảng trống yêu cầu |
| `create-product-brief` | Tạo Product Brief |
| `create-odoo-product-brief` | Tạo Product Brief cho Odoo |
| `research` | Nghiên cứu thị trường/kỹ thuật |

#### 2. Planning (Lập Kế Hoạch)
| Workflow | Mô Tả |
|----------|-------|
| `create-odoo-addon` | Thiết kế Odoo Addon mới |
| `create-odoo-epic` | Tạo Epic phát triển |
| `create-odoo-prd` | Tạo PRD Odoo |
| `create-odoo-ux-design` | Thiết kế UX Odoo views |
| `plan-odoo-migration` | Lập kế hoạch migration |
| `create-ux-design` | Tạo thiết kế UX chung |
| `prd` | Tạo Product Requirements Doc |

#### 3. Solutioning (Giải Pháp)
| Workflow | Mô Tả |
|----------|-------|
| `create-architecture` | Thiết kế kiến trúc |
| `create-epics-and-stories` | Tạo Epics & Stories |
| `check-implementation-readiness` | Kiểm tra sẵn sàng triển khai |
| `enhance-existing-system` | Nâng cấp hệ thống có sẵn |
| `quick-addon` | Tạo addon nhanh |

#### 4. Implementation (Triển Khai)
| Workflow | Mô Tả |
|----------|-------|
| `dev-story` | Thực thi Dev Story |
| `code-review` | Đánh giá mã nguồn |
| `create-next-story` | Tạo Story tiếp theo |
| `rapid-brownfield` | Phát triển brownfield nhanh |
| `sprint-planning` | Lập kế hoạch Sprint |
| `sprint-status` | Trạng thái Sprint |
| `correct-course` | Điều chỉnh hướng đi |
| `retrospective` | Họp nhìn lại |

#### 5. Testing (Kiểm Thử)
| Workflow | Mô Tả |
|----------|-------|
| `odoo-test-design` | Thiết kế test Odoo |
| `test-design` | Thiết kế kiểm thử |
| `test-review` | Đánh giá kiểm thử |
| `automate` | Tự động hóa kiểm thử |

#### 6. Documentation (Tài Liệu)
| Workflow | Mô Tả |
|----------|-------|
| `document-odoo` | Tài liệu hóa Odoo module |
| `document-project` | Tài liệu hóa dự án |
| `generate-project-context` | Tạo project context |

---

## Quy Trình Làm Việc

### Quy Trình Phát Triển Odoo Addon Mới

```
┌─────────────────────────────────────────────────────────────┐
│                    QUY TRÌNH PHÁT TRIỂN                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. ANALYSIS (Phân Tích)                                    │
│     └─▶ /analyst → [AP] Phân tích quy trình                 │
│     └─▶ /analyst → [GA] Gap Analysis                        │
│                                                              │
│  2. PLANNING (Lập Kế Hoạch)                                 │
│     └─▶ /pm → [OPB] Tạo Product Brief Odoo                  │
│     └─▶ /pm → [OPR] Tạo PRD Odoo                            │
│     └─▶ /pm → [CE] Tạo Epic                                 │
│                                                              │
│  3. DESIGN (Thiết Kế)                                       │
│     └─▶ /architect → [CO] Thiết kế Addon                    │
│     └─▶ /ux-designer → [OUX] Thiết kế UX Views              │
│                                                              │
│  4. IMPLEMENTATION (Triển Khai)                             │
│     └─▶ /sm → [CS] Tạo Story                                │
│     └─▶ /dev → [DS] Dev Story                               │
│     └─▶ /dev → [CR] Code Review                             │
│                                                              │
│  5. TESTING (Kiểm Thử)                                      │
│     └─▶ /tea → [OTD] Thiết kế Test Odoo                     │
│                                                              │
│  6. DOCUMENTATION (Tài Liệu)                                │
│     └─▶ /tech-writer → [OD] Tài liệu Odoo Module            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Ví Dụ: Phân Tích Quy Trình Bán Hàng

```bash
# Bước 1: Kích hoạt Business Analyst
/analyst

# Bước 2: Chọn menu [AP] Phân tích quy trình
> AP

# Bước 3: Workflow sẽ hướng dẫn qua các bước:
#   - Thu thập thông tin cơ bản
#   - Phân tích trạng thái hiện tại
#   - Xác định điểm đau
#   - Mapping với Odoo modules
#   - Đề xuất giải pháp
```

---

## Cấu Trúc Thư Mục

```
_bmad-odoo/
├── _config/                    # Manifest files
│   ├── agent-manifest.csv
│   └── workflow-manifest.csv
├── bmm/                        # BMAD Method Materials
│   ├── agents/                 # 9 Agent definitions
│   │   ├── analyst.md
│   │   ├── architect.md
│   │   ├── dev.md
│   │   ├── pm.md
│   │   ├── sm.md
│   │   ├── tea.md
│   │   ├── ux-designer.md
│   │   ├── quick-flow-solo-dev.md
│   │   └── tech-writer.md
│   ├── config.yaml             # Main configuration
│   ├── data/
│   │   └── odoo-knowledge-base.md
│   ├── teams/
│   │   └── default-team.md
│   ├── testarch/               # Test architecture
│   │   └── odoo-test-design/
│   └── workflows/              # 44 workflows
│       ├── 1-analysis/
│       ├── 2-plan-workflows/
│       ├── 3-solutioning/
│       ├── 4-implementation/
│       ├── bmad-quick-flow/
│       ├── document-odoo/
│       ├── document-project/
│       ├── excalidraw-diagrams/
│       ├── generate-project-context/
│       ├── testarch/
│       └── workflow-status/
├── core/                       # Core components
│   ├── agents/
│   │   └── bmad-odoo-master.md
│   └── workflows/
│       └── party-mode/
└── README.md                   # This file
```

---

## 🔧 Troubleshooting

### Lỗi: "Cannot find module 'bmad-odoo'"

**Nguyên nhân:** Package chưa được cài hoặc cài sai vị trí

**Giải pháp:**
```bash
# Kiểm tra package.json có bmad-odoo chưa
cat package.json | grep bmad-odoo

# Cài lại
npm install bmad-odoo

# Verify
npm list bmad-odoo
```

### Lỗi: "Permission denied" khi tạo symlink

**Nguyên nhân:** Windows yêu cầu admin rights để tạo symlink

**Giải pháp:**
Script tự động fallback sang copy folder. Không cần làm gì.

**Kiểm tra:**
```bash
# Kiểm tra _bmad-odoo có phải symlink không
ls -la _bmad-odoo

# Nếu symlink: lrwxrwxrwx ... _bmad-odoo -> node_modules/bmad-odoo
# Nếu copy: drwxr-xr-x ... _bmad-odoo
```

### Lỗi: Post-install không chạy

**Nguyên nhân:** npm config hoặc chạy với `--ignore-scripts`

**Giải pháp:**
```bash
# Chạy thủ công
npx bmad-odoo-setup

# Hoặc
npm run setup
```

### Lỗi: Workflows không xuất hiện trong IDE

**Nguyên nhân:** 
- IDE chưa reload
- Workflows tạo sai folder

**Giải pháp:**
```bash
# 1. Kiểm tra workflows đã tạo chưa
ls .agent/workflows  # Antigravity
ls .cursor/workflows # Cursor
ls .vscode/workflows # VS Code

# 2. Nếu chưa có, chạy lại setup
npx bmad-odoo-setup

# 3. Reload IDE
# - Antigravity: Refresh browser
# - Cursor: Cmd/Ctrl + Shift + P → "Reload Window"
# - VS Code: Cmd/Ctrl + Shift + P → "Reload Window"
```

### Lỗi: Output folder không được tạo

**Giải pháp:**
```bash
# Tạo thủ công
mkdir -p _bmad-odoo-output/{planning-artifacts,implementation-artifacts,test-artifacts,documentation}

# Hoặc chạy lại setup
npx bmad-odoo-setup
```

### Muốn đổi IDE sau khi đã setup

**Giải pháp:**
```bash
# Chạy lại setup và chọn IDE mới
npx bmad-odoo-setup

# Hoặc chọn "Tất cả" để có workflows cho nhiều IDE
```

---

## ❓ FAQ

**Q: Có thể dùng nhiều IDE cùng lúc không?**

A: Có! Chọn option 5 (Tất cả) khi setup, hoặc chạy `npx bmad-odoo-setup` nhiều lần với IDE khác nhau.

**Q: _bmad-odoo và node_modules/bmad-odoo khác gì?**

A: 
- `node_modules/bmad-odoo`: Package gốc từ npm
- `_bmad-odoo`: Symlink (hoặc copy) để dễ access, tránh phải gõ đường dẫn dài

**Q: Có thể commit _bmad-odoo-output vào git không?**

A: Có thể! Folder này chứa artifacts (PRD, architecture docs, stories) do agents tạo ra. Commit chúng giúp team tracking tiến độ.

**Q: Làm sao để update lên version mới?**

A: `npm update bmad-odoo` hoặc `npm install bmad-odoo@latest`

**Q: Package này hoạt động offline không?**

A: Sau khi cài, package hoạt động offline (không cần internet). Chỉ cần internet khi `npm install` lần đầu.

**Q: Tôi có thể tùy chỉnh config không?**

A: Có! Chỉnh sửa file `_bmad-odoo/bmm/config.yaml` để thay đổi output folder, Odoo version, và các settings khác.

---

## Tài Liệu Tham Khảo

### Files Quan Trọng

| File | Mô Tả |
|------|-------|
| `_bmad-odoo/bmm/config.yaml` | Cấu hình chính |
| `_bmad-odoo/bmm/data/odoo-knowledge-base.md` | Kiến thức Odoo |
| `_bmad-odoo-output/` | Thư mục chứa artifacts |
| `.agent/workflows/` | Workflows cho Antigravity |

### Liên Kết

- [NPM Package](https://www.npmjs.com/package/bmad-odoo)
- [GitHub Repository](https://github.com/phamdungtk/bmad-odoo)
- [BMAD Framework (gốc)](https://github.com/bmadcode/BMAD-METHOD)
- [Odoo Documentation](https://www.odoo.com/documentation)
- [OCA Guidelines](https://github.com/OCA/odoo-community.org)

---

## Hỗ Trợ

Nếu bạn gặp vấn đề:

1. **Kiểm tra cài đặt**: `npm list bmad-odoo`
2. **Chạy lại setup**: `npx bmad-odoo-setup`
3. **Xem Troubleshooting** ở trên
4. **Report issue**: [GitHub Issues](https://github.com/phamdungtk/bmad-odoo/issues)

---

**Phiên bản:** 1.0.0  
**Cập nhật:** 2026-01-02  
**Ngôn ngữ:** Tiếng Việt  
**License:** MIT
