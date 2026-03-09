// Background service worker — handles context menu items

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'improve-prompt',
    title: 'Improve this prompt',
    contexts: ['selection']
  });

  chrome.contextMenus.create({
    id: 'generate-prompt',
    title: 'Generate prompt from this',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selectedText = info.selectionText;
  if (!selectedText) return;

  if (info.menuItemId === 'improve-prompt') {
    const improved = improvePrompt(selectedText);
    chrome.storage.local.set({ lastResult: improved, lastAction: 'improve' });
    chrome.action.openPopup();
  }

  if (info.menuItemId === 'generate-prompt') {
    const generated = generateFromText(selectedText);
    chrome.storage.local.set({ lastResult: generated, lastAction: 'generate' });
    chrome.action.openPopup();
  }
});

function improvePrompt(text) {
  let improved = text.trim();

  // Add role if missing
  if (!improved.toLowerCase().startsWith('you are') && !improved.toLowerCase().startsWith('act as')) {
    improved = 'You are a helpful expert assistant.\n\n' + improved;
  }

  // Add format request if missing
  const hasFormat = /format|bullet|list|step|markdown|json|table/i.test(improved);
  if (!hasFormat) {
    improved += '\n\nPlease structure your response clearly with headings or bullet points where appropriate.';
  }

  // Add specificity nudge
  if (improved.length < 100) {
    improved += '\n\nBe specific and give practical, actionable advice.';
  }

  return improved;
}

function generateFromText(text) {
  const prompt = `You are a knowledgeable assistant.\n\nI have the following text:\n\n"${text}"\n\nBased on this, please:\n1. Summarise the key points\n2. Identify any questions worth exploring\n3. Suggest next steps or actions\n\nKeep your response clear and to the point.`;
  return prompt;
}
