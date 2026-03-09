// Prompt templates — ready-to-use structures for common tasks
const templates = {
  email: `You are a professional email writer.

Write an email about: [YOUR TOPIC HERE]

Details:
- Tone: [formal / friendly / casual]
- Recipient: [who is this for?]
- Goal: [what do you want them to do?]

Keep it concise. No fluff. Get to the point in the first sentence.`,

  summary: `You are a skilled summariser.

Summarise the following text:

[PASTE YOUR TEXT HERE]

Rules:
- Keep it under 200 words
- Pull out the 3-5 main points
- Use bullet points
- Skip any filler or repetition`,

  brainstorm: `You are a creative thinking partner.

I need ideas for: [YOUR TOPIC HERE]

Context:
- Industry/field: [your area]
- Target audience: [who is this for?]
- Constraints: [budget, time, resources]

Give me 10 ideas. For each one, include:
1. The idea in one sentence
2. Why it could work
3. First step to try it`,

  rewrite: `You are an experienced editor.

Rewrite the following text to make it clearer and more engaging:

[PASTE YOUR TEXT HERE]

Guidelines:
- Keep the same meaning
- Use shorter sentences
- Remove jargon
- Make it sound natural, like a real person wrote it
- Aim for a [formal / casual / professional] tone`,

  translate: `You are a fluent translator.

Translate the following text to [TARGET LANGUAGE]:

[PASTE YOUR TEXT HERE]

Rules:
- Keep the tone and style of the original
- Use natural phrasing (not word-for-word translation)
- If there are idioms, find the closest equivalent
- Flag anything that doesn't translate well`,

  'code-review': `You are a senior developer doing a code review.

Review this code:

\`\`\`
[PASTE YOUR CODE HERE]
\`\`\`

Check for:
1. Bugs or logic errors
2. Security issues
3. Performance problems
4. Readability and naming
5. Missing edge cases

For each issue found, explain what's wrong and suggest a fix.`
};

// Prompt improvement logic — no API calls, all local
function improvePrompt(text) {
  let input = text.trim();
  if (!input) return '';

  let parts = [];

  // Add a role if the prompt doesn't already have one
  const hasRole = /^(you are|act as|pretend you|as a|imagine you)/i.test(input);
  if (!hasRole) {
    parts.push('You are a helpful expert assistant.');
  }

  // Add context framing
  parts.push('');
  parts.push('## Task');
  parts.push(input);

  // Add format guidance if not already specified
  const mentionsFormat = /format|bullet|list|step|markdown|json|table|paragraph/i.test(input);
  if (!mentionsFormat) {
    parts.push('');
    parts.push('## Format');
    parts.push('Structure your response with clear headings and bullet points where it helps readability.');
  }

  // Add constraints for short/vague prompts
  if (input.split(' ').length < 20) {
    parts.push('');
    parts.push('## Guidelines');
    parts.push('- Be specific and practical');
    parts.push('- Give real examples where possible');
    parts.push('- Keep it concise — no filler');
  }

  return parts.join('\n');
}

// DOM elements
const promptInput = document.getElementById('promptInput');
const improveBtn = document.getElementById('improveBtn');
const resultSection = document.getElementById('resultSection');
const resultText = document.getElementById('resultText');
const copyBtn = document.getElementById('copyBtn');
const copyFeedback = document.getElementById('copyFeedback');
const templateBtns = document.querySelectorAll('.template-btn');

// Check for context menu results on popup open
chrome.storage.local.get(['lastResult', 'lastAction'], (data) => {
  if (data.lastResult) {
    resultText.textContent = data.lastResult;
    resultSection.classList.remove('hidden');
    chrome.storage.local.remove(['lastResult', 'lastAction']);
  }
});

// Improve button click
improveBtn.addEventListener('click', () => {
  const input = promptInput.value;
  if (!input.trim()) {
    promptInput.placeholder = 'Write something first...';
    return;
  }

  const improved = improvePrompt(input);
  resultText.textContent = improved;
  resultSection.classList.remove('hidden');
});

// Copy button
copyBtn.addEventListener('click', () => {
  const text = resultText.textContent;
  navigator.clipboard.writeText(text).then(() => {
    copyFeedback.classList.remove('hidden');
    setTimeout(() => copyFeedback.classList.add('hidden'), 2000);
  });
});

// Template buttons
templateBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.template;
    const template = templates[key];
    if (template) {
      promptInput.value = template;
      resultSection.classList.add('hidden');
    }
  });
});

// Allow Ctrl+Enter to trigger improve
promptInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    improveBtn.click();
  }
});
