// Tab switching between the COCOMO and Function Point panels.
export function initTabs() {
  const tabs = [document.getElementById('tab-cocomo'), document.getElementById('tab-fpa')];
  const panels = {
    'tab-cocomo': document.getElementById('panel-cocomo'),
    'tab-fpa': document.getElementById('panel-fpa'),
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.setAttribute('aria-selected', t === tab ? 'true' : 'false'));
      Object.values(panels).forEach((panel) => panel.classList.remove('active'));
      panels[tab.id].classList.add('active');
    });
  });
}
