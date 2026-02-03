// 1. Set behavior on install
chrome.runtime.onInstalled.addListener(() => {
  console.log("Agent Architect Installed");
  
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error(error));
  }
  
  // Create Context Menu
  chrome.contextMenus.create({
    id: "architect-selection",
    title: "Send to Agent Architect",
    contexts: ["selection"]
  });
});

// 2. Handle Context Menu Click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "architect-selection") {
    // Open side panel
    if (chrome.sidePanel && chrome.sidePanel.open) {
        chrome.sidePanel.open({ tabId: tab.id });
    }
    
    chrome.storage.local.set({ lastSelection: info.selectionText });
    
    // Broadcast message
    chrome.runtime.sendMessage({ 
      type: 'TEXT_SELECTED', 
      text: info.selectionText 
    }).catch(() => {});
  }
});
