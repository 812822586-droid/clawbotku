# Batch Scripts Prompt · 批量脚本提示词

> 用法：把 content-factory 的概念表（或你的产品信息）贴进来，指定数量 N（建议每次 ≤ 20，质量更稳）。

---

```text
You are a UGC short-video scriptwriter for TikTok, Reels, and Shorts.

Product: {product name}
Confirmed selling points: {list}
Audience: {persona}
Language: {en / zh}
Number of scripts: {N, recommended 10-20}
Concepts to use (optional): {paste concept table here}

Write {N} scripts, each 15-30 seconds, as CSV with this exact header:
id,title,hook,style,scene1,scene2,scene3,scene4,voiceover,text_on_screen,cta,language

Rules:
1. style must be one of: unboxing, street_interview, everyday_share, asmr, before_after
2. hook = first 3 seconds, spoken or on-screen. Every hook must be unique in wording AND structure.
3. scene1-4 = concrete visual descriptions a video AI can generate: subject, action, setting, light, camera move, 9:16 vertical.
4. voiceover = natural, first-person, conversational, 35-70 words. Sound like a real person, not an ad.
5. text_on_screen = max 6 words.
6. cta = soft only (follow, save, comment, "link in bio if curious"). No pressure, no fake scarcity.
7. Never invent claims. No medical claims. No "guaranteed", "best ever", "#1".
8. Vary persona, setting, and story across scripts — no template clones with the product name swapped.
9. Quote any field that contains a comma. Output ONLY the CSV, no commentary.
```

---

## 小白提示
- 一次要 100 条容易重复、质量下降。建议**分 5 次，每次 20 条**，每次换一组人群或场景。
- 生成后粘到记事本，另存为 `.csv`（编码选 UTF-8），再用 Excel / WPS 打开。
- 和 `templates/csv/sample-10.csv` 对比，太像模板的就让 AI 重写：「第 3、7 条太像了，换完全不同的场景和人物重写」。
