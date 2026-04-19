const quotes = [
  { bold: '"Deadline itu nyata.', normal: '\ntimeline twitter tidak."' },
  { bold: '"Tugas numpuk,', normal: '\nbuka X ngapain?"' },
  { bold: '"Masa depanmu', normal: '\nbukan di beranda X."' },
  { bold: '"SKS-mu mahal.', normal: '\njangan buang di scroll."' },
  { bold: '"Dosen nunggu laporan,', normal: '\nbukan postingan."' },
];

const rand = quotes[Math.floor(Math.random() * quotes.length)];
document.getElementById('quoteEl').innerHTML =
  `<strong>${rand.bold}</strong>${rand.normal}`;

const toggle = document.getElementById('toggleSwitch');
const statusText = document.getElementById('statusText');
const pulseEl = document.getElementById('pulseEl');
const badge = document.querySelector('.badge');

chrome.storage.local.get(['enabled'], (res) => {
  const enabled = res.enabled !== false;
  toggle.checked = enabled;
  updateUI(enabled);
});

toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ enabled });

  chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: enabled ? ['ruleset_1'] : [],
    disableRulesetIds: enabled ? [] : ['ruleset_1']
  });

  updateUI(enabled);
});

function updateUI(enabled) {
  if (enabled) {
    statusText.textContent = 'REDIRECT AKTIF';
    statusText.className = 'status-text active';
    pulseEl.className = 'pulse';
    badge.textContent = 'ACTIVE';
    badge.style.color = '#4ade80';
    badge.style.borderColor = '#4ade8040';
    badge.style.background = '#4ade800d';
  } else {
    statusText.textContent = 'REDIRECT MATI';
    statusText.className = 'status-text inactive';
    pulseEl.className = 'pulse off';
    badge.textContent = 'PAUSED';
    badge.style.color = '#ff4444';
    badge.style.borderColor = '#ff444440';
    badge.style.background = '#ff44440d';
  }
}
