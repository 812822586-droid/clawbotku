# AI UGC 接单起步包（AI UGC Starter Kit）· 中文完整指南

> 给**零基础新手**的 AI UGC 广告素材工作流：一个离线网页工具 + 现成提示词 + 7 天起步计划 + 交付清单。
> 不用安装、不用写代码、不用露脸。

**先说清楚：** 这是一套**半自动化模板与工作流**，帮你更快整理创意、更稳定交付。它**不保证收入、不保证接到订单**。最终效果取决于你的练习、作品集和沟通。

---

## 一、什么是 AI UGC？

UGC（User Generated Content）广告，就是看起来像普通用户拍的**开箱、街访、日常分享**类短视频。海外卖家（Amazon、TikTok Shop、独立站）需要不断测试新素材，同一个产品要换人群、换场景、换语言反复测。

用 AI 可以把「策划 → 脚本 → 分镜 → 出片」中的大部分环节半自动化，你负责：**提问、挑选、质检、沟通**。

## 二、包里有什么

| 文件 | 用途 |
|---|---|
| `app/index.html` | 离线脚本生成器：填产品名 → 选风格 → 生成 1–20 条脚本 → 下载 CSV / 复制 JSON |
| `templates/prompts/content-factory.md` | 「内容工厂」提示词：根据产品图描述，产出人群、卖点、创意概念 |
| `templates/prompts/batch-scripts.md` | 批量生成 N 条脚本 CSV 的提示词 |
| `templates/prompts/higgsfield-scene.md` | 把脚本变成 Higgsfield 等视频工具能用的画面提示词 |
| `templates/csv/sample-10.csv` | 10 条手写示例脚本（10 个不同产品） |
| `templates/sop/from-zero.md` | 从 0 到首单 7 天计划 |
| `templates/sop/delivery-checklist.md` | 交付前检查清单 |
| `xianyu/` | 闲鱼上架文案和买家上手指南 |
| `assets/cover-text.txt` | 封面文案建议 |

## 三、3 步上手

1. **解压**压缩包，找到 `app/index.html`。
2. **双击打开**（用 Chrome / Edge / Safari，手机也能打开）。
3. **填写产品名 → 勾选风格 → 点「生成脚本」→ 点「下载 CSV」**。CSV 可以直接用 Excel、WPS、Google 表格打开。

## 四、完整工作流（建议照着走）

### 第 1 步：拿到产品信息
产品图（3–5 张不同角度）+ 卖点（客户提供或从商品页整理）+ 目标市场（美国 / 英国 / 东南亚等）。

### 第 2 步：做定位和创意
打开 ChatGPT / Claude，粘贴 `templates/prompts/content-factory.md`，按提示填写产品描述。你会得到：目标人群、3–5 个卖点角度、10–15 个创意概念。

### 第 3 步：生成脚本表
- 快速版：用 `app/index.html` 直接生成。
- 精细版：用 `templates/prompts/batch-scripts.md` 让 AI 按创意概念写 CSV。
参考 `templates/csv/sample-10.csv` 判断质量。

### 第 4 步：出画面 / 出片
用 `templates/prompts/higgsfield-scene.md` 把每条脚本的 scene1–4 转成画面提示词，在 Higgsfield（或 Kling、Runway、Pika 等）里**先出 1 条试片**，确认产品外观、颜色、logo 没变形，再批量。

### 第 5 步：配音 + 字幕 + 剪辑
voiceover 列 → TTS 配音（ElevenLabs、剪映等）；text_on_screen 列 → 字幕/贴字；用剪映 / CapCut 模板批量套用。

### 第 6 步：质检 + 交付
对照 `templates/sop/delivery-checklist.md` 检查，按「文件夹 + CSV + 说明」打包交付。

## 五、怎么找第一个客户

详见 `templates/sop/from-zero.md`，简单说：
1. 先做作品集：用 3 个不同品类产品各做 3–5 条。
2. 上架服务：Fiverr / Upwork 搜索 `AI UGC`、`TikTok ads`、`product video` 看别人怎么写，再写自己的。
3. 主动沟通：先提供 1–3 条低价试片，确认风格再谈批量包。

## 六、合规提醒（很重要）

- ❌ 不要宣传「躺赚」「订单接不完」「一条指令全自动赚钱」。
- ❌ 不要编造功效，尤其是护肤、保健、医疗相关。
- ❌ 不要把 AI 生成的人物包装成真实买家评价。
- ✅ 遵守 TikTok、Meta、YouTube 等平台关于广告和 AI 生成内容的标注要求。
- ✅ 产品卖点以客户确认的信息为准。

## 七、常见问题

**Q：打开 index.html 是空白 / 按钮没反应？**
换 Chrome 或 Edge 打开；不要在微信内置浏览器里打开。

**Q：CSV 用 Excel 打开中文乱码？**
本工具已加 UTF-8 BOM，一般不会乱码。如仍乱码，用 WPS 或 Google 表格打开，或在 Excel 中「数据 → 从文本/CSV 导入」并选 UTF-8。

**Q：需要会编程吗？**
不需要。所有工具都是打开即用、复制粘贴即可。

**Q：要付费买 AI 工具吗？**
ChatGPT / Claude 有免费额度可以先练习；视频生成工具一般按量收费，建议先用免费试用出试片。

---

开源协议：MIT。觉得有用，欢迎到 GitHub 点个 ⭐ Star。
