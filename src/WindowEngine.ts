import { BaseObserver } from './BaseObserver';
import { windowManager } from 'node-window-manager'

windowManager.requestAccessibility();

export interface WindowListener {
    windowsChanged: (windows: Window[]) => any;
}

export class WindowEngine extends BaseObserver<WindowListener> {
    windows: Window[];
    constructor() {
        super();
        this.windows = [];
    }

    recompute() {
        this.windows = windowManager.getWindows();
        this.iterateListeners((cb) => cb.windowsChanged?.(this.windows));
    }

    init() {
        windowManager.on('window-activated', () => {
            this.recompute();
        });
        this.recompute();
    }

    getWindow(name: string) {
        return this.windows.find((d) => d.label === name);
    }
}