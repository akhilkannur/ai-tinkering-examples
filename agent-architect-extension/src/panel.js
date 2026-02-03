const statusEl = document.getElementById('status');
const transformBtn = document.getElementById('transformBtn');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const copyBtn = document.getElementById('copyBtn');

// 1. Check for last selection on load
chrome.storage.local.get(['lastSelection'], (result) => {
  if (result.lastSelection) {
    inputText.value = result.lastSelection;
    // Clear it so it doesn't persist forever
    chrome.storage.local.remove('lastSelection');
  }
});

// 2. Listen for real-time messages
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'TEXT_SELECTED') {
    inputText.value = message.text;
  }
});

// 3. Handle the AI Transformation
transformBtn.addEventListener('click', async () => {
  const text = inputText.value.trim();
  if (!text) return;

  statusEl.innerText = "Architecting context locally...";
  transformBtn.disabled = true;

  try {
    // 2026 Standard Prompt API
    if (!window.ai || !window.ai.languageModel) {
        statusEl.innerText = "Error: Prompt API not supported in this browser.";
        return;
    }

    const session = await ai.languageModel.create({
      systemPrompt: "You are a Markdown Architect for AI Agents. Your goal is to take unstructured text and turn it into a high-performance .md file for an AI Agent. Use standardized headers: # [CONTEXT], ## [TASK], ### [CONSTRAINTS]. Remove all irrelevant fluff. Output ONLY valid Markdown."
    });

    const result = await session.prompt(text);
    outputText.value = result;
    statusEl.innerText = "Transformation Complete.";
    session.destroy();
  } catch (err) {
    statusEl.innerText = "Error: Local AI engine failed to process.";
    console.error(err);
  } finally {
    transformBtn.disabled = false;
  }
});

// 4. Copy Logic
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(outputText.value);
  const originalText = copyBtn.innerText;
  copyBtn.innerText = "Copied!";
  setTimeout(() => copyBtn.innerText = originalText, 2000);
});