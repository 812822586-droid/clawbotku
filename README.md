# AI UGC Starter Kit

![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)
![Zero install](https://img.shields.io/badge/install-zero-blue.svg)
![Offline](https://img.shields.io/badge/works-offline-orange.svg)
![GitHub stars](https://img.shields.io/github/stars/812822586-droid/clawbotku?style=social)

> **AI UGC 接单起步包** — 给零基础新手的 AI UGC 广告脚本工具 + 提示词 + SOP。打开网页就能用，不用安装、不用写代码。完整中文指南见 [README.zh-CN.md](README.zh-CN.md)。

A beginner-friendly, zero-install starter kit for producing **UGC-style ad scripts** (unboxing, street interview, everyday share, ASMR, before/after) with a semi-automated AI workflow. Open one HTML file, type a product name, download a CSV of scripts, then turn them into videos with tools like ChatGPT, Claude, and Higgsfield.

**It's a template kit, not a get-rich-quick scheme.** It helps you organize ideas and deliver consistently. Results depend on your own work, review, and client communication.

## ✨ What's inside

| Folder | What it is |
|---|---|
| `app/index.html` | Offline script generator. Product → styles → 1–20 scripts → **Download CSV** / **Copy JSON** |
| `templates/prompts/` | Copy-paste prompts: content factory, batch scripts CSV, Higgsfield scene prompts |
| `templates/csv/sample-10.csv` | 10 hand-written sample scripts across 10 products |
| `templates/sop/` | 7-day plan from zero to first client, delivery checklist |
| `xianyu/` | Chinese marketplace (闲鱼) listing copy and buyer quick-start |
| `.github/` | Contributing guide and issue template |
| `assets/cover-text.txt` | Cover / thumbnail text ideas |

## 🚀 Quick start (3 steps)

1. **Download** this repo (Code → Download ZIP) and unzip it, or clone it:

   ```bash
   git clone https://github.com/812822586-droid/clawbotku.git
   ```
2. **Open** `app/index.html` in any browser (Chrome, Edge, Safari, works on phones too).
3. **Generate**: enter a product name, pick styles, then click **Download CSV**. Paste rows into the prompts in `templates/prompts/` to make scenes and videos.

No npm, no build step, no account, no network calls. Your data stays in your browser.

## 🧭 The workflow

```
Product photo + selling points
  → content-factory prompt (audience, angles, concepts)
  → app or batch-scripts prompt (script CSV)
  → higgsfield-scene prompt (1 test clip first, then batch)
  → human QC (product look, claims, AI disclosure)
  → deliver as a package (folder + CSV + notes)
```

## CSV columns

`id,title,hook,style,scene1,scene2,scene3,scene4,voiceover,text_on_screen,cta,language`

Styles: `unboxing`, `street_interview`, `everyday_share`, `asmr`, `before_after`.

## ⚠️ Responsible use

- No income guarantees. This kit makes scripting faster; it doesn't find clients for you or promise orders.
- Keep claims truthful. No medical or "miracle" claims. Use only features the client confirms.
- Follow the platform's rules for ads and AI-generated content, and label content when they require it (TikTok, Meta, YouTube, etc.).
- Don't present AI characters as real customers' testimonials.

## ⭐ Support the project

If this kit saves you time, please **star the repo**. It helps other beginners find it. Ideas and fixes are welcome: see [.github/CONTRIBUTING.md](.github/CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2026 Zhangliuyang
