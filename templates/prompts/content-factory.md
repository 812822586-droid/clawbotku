# Content Factory Prompt · 内容工厂提示词

> 用法：复制下面整段到 ChatGPT / Claude（最好同时上传产品图），把 `{...}` 换成你的信息。
> Usage: paste into ChatGPT / Claude (attach product photos if you can), replace `{...}`.

---

```text
You are a UGC ad strategist for e-commerce brands. Work like a step-by-step skill:
ask before you assume, and keep every claim truthful.

## Product
- Name: {product name}
- Photo description (or attached photos): {e.g. 50ml white tube, pastel pink cap, matte finish}
- Confirmed selling points (from client only): {e.g. fast-absorbing, light scent, travel size}
- Price range: {e.g. $12-15}
- Target market & platform: {e.g. US, TikTok Shop}
- Things we must NOT claim: {e.g. no medical claims, no "cures eczema"}

## Step 1 – Ask me up to 3 clarifying questions
If anything important is missing (audience, tone, competitors), ask first. Then wait.

## Step 2 – Positioning
Give me:
1. 2-3 target audience personas (age, situation, pain point, where they scroll)
2. 3-5 selling angles, each tied to a confirmed selling point
3. Tone suggestion (cozy, funny, premium, practical…)

## Step 3 – 15 UGC concepts
Return a table with columns:
concept_id | style | persona | setting | hook (first 3 seconds) | key message | why it might work
Rules:
- Mix styles: unboxing, street_interview, everyday_share, asmr, before_after
- Every hook must be different in structure (question, POV, number, challenge, confession…)
- Settings must be realistic and filmable / generatable (home, street, gym, office, car…)
- No fake statistics, no guaranteed results, no "doctor recommended" unless confirmed

## Step 4 – Recommend a first test
Pick the 3 concepts you'd test first and explain why in one sentence each.
```

---

## 小白提示
- 卖点只写客户确认的，不确定的就别写。
- 第 2 步结果不满意，可以说「换一批人群，更年轻一点」继续追问。
- 第 3 步的表格可以直接交给 `batch-scripts.md` 去扩写成完整脚本。
