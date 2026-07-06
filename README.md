# 💳 U 卡对比百科 (Crypto Card Compare)

[![GitHub Pages](https://img.shields.io/badge/部署-GitHub%20Pages-blue?logo=github)](https://91vrvd.github.io/ucards-compare/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/91vrvd/ucards-compare/pulls)

> 一站式加密货币消费卡（U 卡）对比平台 —— 返现 · 手续费 · 大陆可用性 · KYC · 权益 · 余额生息，全部统一整理。

📡 **在线访问**：[https://91vrvd.github.io/ucards-compare/](https://91vrvd.github.io/ucards-compare/)

---

## 📖 项目背景

2026 年，加密货币消费卡（U 卡）市场爆发式增长——EtherFi、Plasma、Bitget、Bybit、Crypto.com、RedotPay 等平台纷纷推出 U 卡产品。但各家信息分散在官网、社区帖子和 Telegram 群里，费率、返现、KYC 政策参差不齐，**没有一个地方能统一对比**。

[@DRbitcoin36](https://x.com/DRbitcoin36/status/2073730077813342250) 发帖呼吁："把返现比例、磨损、是否允许中国人申请、优惠、U 卡生息比例全统一整理出来。"

这个项目就是对这个需求的回应。

---

## 🚀 功能特性

### 📊 多维对比表格
- **10 张主流 U 卡**横向对比：EtherFi、Plasma、Bitget、Bybit、Crypto.com、RedotPay、Binance、OKX、Gate、Backpack
- 核心维度：**返现比例 · 手续费/磨损 · 中国大陆可用性 · 支持证件 · 福利 · 余额生息 · 发卡网络 · 卡片类型**
- 支持桌面端完整表格和移动端卡片堆叠布局

### 🇨🇳 中国大陆可用性深度标注
- **🟢 可直接用**：大陆身份证/护照直接注册，无需海外地址（如 Bitget Wallet Card）
- **🟡 有条件可用**：需要海外地址证明/护照/邀请码等（如 Plasma One、RedotPay）
- **🔴 不可用**：明确限制中国大陆用户（如 Binance、OKX、Bybit）
- 每张卡标注：**支持证件类型**（身份证/护照）、是否需要海外地址、是否需要海外手机号、是否有 IP 限制

### 🔍 智能筛选
- 按大陆可用性：可直接用 / 需海外地址 / 不可用
- 按功能属性：有返现 / 余额生息 / 免月费 / 虚拟卡 / 实体卡

### 📋 卡片详情页
点击任意卡片进入完整详情，包含 6 大信息区块：
1. 🇨🇳 **大陆可用性**：证件要求、海外地址、手机号、IP 限制、申请门槛
2. 💰 **返现详情**：等级制度、返现比例、上限、排除规则
3. 💸 **手续费明细**：开卡费、转换费、外汇费、ATM 费、不活跃费等
4. 🎁 **优惠与福利**：机场贵宾厅、订阅报销、推荐奖励、移动支付支持
5. 📈 **余额生息**：APY、活期/定期、计息方式
6. 💳 **充值方式**：支持币种、链网络、法币入金

### 🎨 设计
- 深色 Web3 风格主题
- 金色强调色 + 绿/黄/红状态标记
- 响应式设计，桌面/移动端自适应

---

## 🛠 技术栈

| 类别 | 技术 |
|---|---|
| 框架 | React 18 + TypeScript |
| 构建工具 | Vite 5 |
| 样式 | Tailwind CSS 3 |
| 部署 | GitHub Pages (gh-pages) |
| 数据 | 静态 JSON（社区 + 官方多源交叉验证） |

---

## 📦 本地开发

```bash
# 克隆仓库
git clone https://github.com/91vrvd/ucards-compare.git
cd ucards-compare

# 安装依赖
npm install

# 启动开发服务器
npm run dev
# → http://localhost:5173

# 构建生产版本
npm run build
# → dist/

# 部署到 GitHub Pages
npm run deploy
```

---

## 📁 项目结构

```
ucards-website/
├── index.html                 # 入口 HTML
├── vite.config.ts             # Vite 配置（含 GitHub Pages base path）
├── tailwind.config.js         # Tailwind 主题配置
├── package.json               # 依赖与脚本
├── src/
│   ├── main.tsx               # React 入口
│   ├── App.tsx                # 主组件：路由、筛选、状态管理
│   ├── types.ts               # TypeScript 类型定义
│   ├── data.ts                # 数据处理：卡片摘要、筛选逻辑、大陆可用性判断
│   ├── ucard_data.json        # 🔑 核心数据：10 张 U 卡完整信息
│   ├── index.css              # Tailwind + 深色主题 + 自定义滚动条
│   ├── Hero.tsx               # Hero 区域：标题、统计卡片
│   ├── ComparisonTable.tsx    # 对比表格（桌面）/ 卡片堆叠（移动）
│   ├── CardDetail.tsx         # 卡片详情页（6 大信息区块）
│   └── Footer.tsx             # 页脚：免责声明、数据来源
└── dist/                      # 构建产物（GitHub Pages 部署源）
```

---

## 📊 数据来源

本项目数据来自以下渠道的交叉验证：

- 各平台官方文档和 FAQ
- [Defimap.io](https://defimap.io) — Crypto Card Comparison
- [CryptoCardHub.com](https://www.cryptocardhub.com) — U 卡测评
- [SpendCrypto.net](https://spendcrypto.net) — U 卡对比
- [NodeSeek 中文社区](https://www.nodeseek.com) — 用户实测反馈
- Twitter/X 社区讨论
- 各平台中文教程（知乎、NBVil 等）

⚠️ **注意**：卡片费率、返现、KYC 政策可能随时变化，建议开卡前在平台官方确认最新信息。

---

## ⚠️ 已知不足 & 待改进

### 数据层面
1. **时效性风险**：U 卡市场变化极快，返现比例、KYC 政策、支持地区可能已变动。需要定期更新。
2. **大陆用户实测数据不足**：部分卡（如 Bitget Wallet Card）虽然官方宣称支持 China，但缺少中文社区的批量实测反馈。
3. **缺少更多小众 U 卡**：KAST、Tuyo、Coinbase One、Revolut 等尚未纳入。
4. **Fiat 法币入金路线未详细标注**：对于大陆用户，从 CNY 到 U 卡全链路（人民币→USDT→U 卡消费）的磨损未计算。
5. **缺少用户评价/评分**：目前只有客观数据，没有社区评分或使用体验维度。

### 功能层面
6. **无后端/数据库**：纯静态 JSON，更新数据需要修改 JSON 文件并重新部署。
7. **无搜索/排序**：表格暂不支持按返现/生息等维度排序。
8. **无多语言**：仅中文，英文用户无法使用。
9. **无暗黑/明亮模式切换**：固定深色主题。
10. **无 RSS/变更通知**：数据更新后用户无法自动获知。

### 体验层面
11. **移动端详情页体验可优化**：卡片堆叠布局信息密度高，长卡片滚动不便。
12. **缺少可视化图表**：返现/费用/生息等数据可以用雷达图或柱状图直观对比。
13. **无障碍（A11y）不完整**：屏幕阅读器支持、键盘导航等未测试。

---

## 🤝 参与贡献

欢迎提交 PR！以下是一些可以立即动手的改进方向：

### 🟢 简易（适合首次贡献）
- 更新某张卡的最新费率/政策数据（修改 `src/ucard_data.json`）
- 修正错别字、翻译、格式问题
- 新增一张小众 U 卡的数据

### 🟡 中等
- 添加表格排序功能（按返现/生息降序排列）
- 添加表格导出 CSV 功能
- 优化移动端详情页布局
- 添加英文翻译

### 🔴 进阶
- 接入后端 API，实现数据自动化更新
- 添加数据可视化（雷达图、柱状图对比）
- 添加用户评价/评分系统
- SEO 优化 + Open Graph 标签

### 贡献流程
```bash
1. Fork 本仓库
2. 创建特性分支：git checkout -b feature/your-feature
3. 提交更改：git commit -m 'feat: 添加某功能'
4. 推送分支：git push origin feature/your-feature
5. 提交 Pull Request
```

---

## 📄 许可证

MIT License — 详见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

- 灵感来源：[@DRbitcoin36](https://x.com/DRbitcoin36) 的推文
- 数据研究：由 OpenClaw AI Agent (dolphin) 完成多源交叉验证
- 网站构建：基于 Vite + React + Tailwind CSS

---

<p align="center">
  <sub>Built with ❤️ for the crypto community · 2026</sub>
</p>
