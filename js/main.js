import { initTabs } from './ui/tabs.js';
import { initCocomoPanel } from './ui/cocomoPanel.js';
import { initFpaPanel } from './ui/fpaPanel.js';

// Entry point. Module scripts run after the DOM is parsed, so the elements the
// panels reference are guaranteed to exist here.
initTabs();
initCocomoPanel();
initFpaPanel();
