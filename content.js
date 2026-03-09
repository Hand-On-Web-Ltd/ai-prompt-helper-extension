// Content script — listens for messages from the background service worker
// Currently used for future features like inline prompt suggestions

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_SELECTION') {
    const selection = window.getSelection().toString();
    sendResponse({ text: selection });
  }
  return true;
});
