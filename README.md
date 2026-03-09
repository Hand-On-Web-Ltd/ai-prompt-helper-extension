# AI Prompt Helper — Chrome Extension

A Chrome extension that helps you write better AI prompts. Select any text on a webpage, right-click, and get an improved prompt. Or open the popup and use the built-in templates.

No API keys needed. Everything runs locally in your browser.

![AI Prompt Helper Screenshot](screenshots/popup-screenshot.png)
*Screenshot placeholder — add your own after installing*

## What It Does

- **Right-click any selected text** → "Improve this prompt" or "Generate prompt from this"
- **Popup prompt editor** — type or paste a rough prompt, hit "Improve Prompt", get a structured version back
- **6 quick templates** — Email, Summary, Brainstorm, Rewrite, Translate, Code Review
- **One-click copy** — grab the improved prompt and paste it straight into ChatGPT, Claude, or wherever you use AI
- **100% local** — no data sent anywhere, no API keys, no accounts

## Install (Developer Mode)

1. Download or clone this repo
2. Open Chrome and go to `chrome://extensions/`
3. Turn on **Developer mode** (top right toggle)
4. Click **Load unpacked**
5. Select the folder containing these files
6. The extension icon appears in your toolbar — you're good to go

## How the Prompt Improvement Works

The extension takes your rough prompt and adds structure:

- **Role** — tells the AI who to act as (if you haven't specified one)
- **Task** — your original prompt, clearly framed
- **Format** — asks for structured output (headings, bullet points)
- **Guidelines** — adds specificity for short or vague prompts

It's not magic — it's just good prompt engineering habits, applied automatically.

## Templates Included

| Template | What It Does |
|----------|-------------|
| ✉️ Email | Write professional emails with tone and goal specified |
| 📝 Summary | Condense long text into key points |
| 💡 Brainstorm | Generate 10 ideas with reasoning and first steps |
| ✏️ Rewrite | Clean up and improve existing text |
| 🌍 Translate | Natural-sounding translations with idiom handling |
| 💻 Code Review | Find bugs, security issues, and style problems |

## Icons

The `icons/` folder needs PNG icons at these sizes:
- `icon16.png` (16×16)
- `icon48.png` (48×48)
- `icon128.png` (128×128)

Use any icon generator or create your own. The extension works without custom icons but won't look as polished.

## File Structure

```
ai-prompt-helper-extension/
├── manifest.json       # Extension config (Manifest V3)
├── popup.html          # The popup UI
├── popup.css           # Styles
├── popup.js            # Prompt logic and templates
├── background.js       # Service worker — context menu handling
├── content.js          # Content script for future features
├── icons/              # Extension icons (add your own PNGs)
├── LICENSE             # MIT
└── README.md           # You're reading it
```

## Contributing

Found a bug or want to add a template? Open an issue or submit a PR.

## About Hand On Web

We build AI chatbots, voice agents, and automation tools for businesses.

- 🌐 [handonweb.com](https://www.handonweb.com)
- 📧 outreach@handonweb.com
- 📍 Chester, UK

## Licence

MIT
