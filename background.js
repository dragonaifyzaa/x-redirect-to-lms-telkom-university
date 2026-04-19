const REDIRECT_TO = "https://lms.telkomuniversity.ac.id/my/";
const BLOCKED = ["x.com", "twitter.com", "www.x.com", "www.twitter.com"];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "loading") return;
  if (!tab.url) return;

  chrome.storage.local.get(['enabled'], (res) => {
    const enabled = res.enabled !== false;
    if (!enabled) return;

    try {
      const url = new URL(tab.url);
      if (BLOCKED.includes(url.hostname)) {
        chrome.tabs.update(tabId, { url: REDIRECT_TO });
      }
    } catch (e) {}
  });
});
