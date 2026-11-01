# Higgsfield Scene Prompt Template · 画面提示词模板

> 适用于 Higgsfield，也可用于 Kling、Runway、Pika 等图生视频 / 文生视频工具。
> Tip: 先用产品图做「图生视频」，产品外观最稳定。

---

## 1. 单镜头模板 Single shot

```text
[Shot type], [subject + action], [product: exact look — color, shape, label, size],
[setting], [lighting], [camera movement], [mood], vertical 9:16, realistic UGC phone-footage look,
natural skin texture, no text overlays, product shape and logo unchanged.
```

**示例 Example**

```text
Close-up handheld shot, a woman in her 20s squeezes hand cream onto the back of her hand,
product: 50ml white tube with pastel pink cap and minimal black logo,
cozy bedroom vanity, soft morning window light, slight handheld sway then slow push-in,
calm and fresh mood, vertical 9:16, realistic UGC phone-footage look,
natural skin texture, no text overlays, product shape and logo unchanged.
```

## 2. 让 AI 帮你把 CSV 转成画面提示词

```text
Convert each row's scene1-scene4 into Higgsfield-ready video prompts using this template:
[Shot type], [subject + action], [product exact look], [setting], [lighting], [camera movement], [mood],
vertical 9:16, realistic UGC phone-footage look, no text overlays, product shape and logo unchanged.

Product exact look: {describe your product precisely}
Output a table: id | scene_no | prompt | duration_seconds (3-6)
Rows:
{paste CSV rows here}
```

## 3. 常用镜头词 Camera cheat sheet

| 中文 | English |
|---|---|
| 慢推近 | slow push-in |
| 手持晃动 | handheld sway |
| 环绕 | orbit around |
| 俯拍 | top-down / overhead |
| 微距特写 | macro close-up |
| 第一视角 | POV shot |
| 分屏 | split screen |
| 延时 | time-lapse |

## 4. 出片顺序（省钱）
1. 每个风格**先出 1 条试片**。
2. 检查：产品颜色 / 形状 / logo 是否变形，手指、脸是否怪异。
3. 通过后再批量；不通过就改提示词里的「product exact look」描述，或换参考图。
