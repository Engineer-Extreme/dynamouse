const { windowManager } = require("node-window-manager");

const window = windowManager.getActiveWindow();

windowManager.requestAccessibility();
window.bringToTop();