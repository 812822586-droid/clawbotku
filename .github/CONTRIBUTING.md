# Contributing · 贡献指南

Thanks for helping beginners! 感谢你的贡献！

## Ways to help
- 🪝 **Add hooks / scenes** to the banks in `app/index.html` (`HOOKS`, `SCENES`, `VO`). Keep them realistic and claim-free.
- 🗂 **Add a category** to `CAT` (needs both `en` and `zh`).
- 🌍 **Add a language**: mirror every bank under a new key, add it to the language `<select>`.
- 📝 **Improve prompts or SOPs** in `templates/`.
- 🐛 **Report bugs** with your browser and OS.

## Rules
1. Zero dependencies, no build step. `app/index.html` must work offline by double-click.
2. No income claims, fake stats, or medical claims in any copy. 不写收益承诺。
3. Keep CTAs soft (follow / save / comment).
4. Test on mobile width (~375px) before submitting.

## Pull request steps
1. Fork → create a branch (`feat/more-hooks`)
2. Make your change, open `app/index.html` and generate 20 rows to check variety
3. Update `CHANGELOG.md` under "Unreleased"
4. Open a PR describing what and why

## Where these files live
GitHub reads `CONTRIBUTING.md` from the repo root or `.github/`. Issue templates live in `.github/ISSUE_TEMPLATE/`. This repo already uses:

- `.github/CONTRIBUTING.md`
- `.github/ISSUE_TEMPLATE/idea.md`
