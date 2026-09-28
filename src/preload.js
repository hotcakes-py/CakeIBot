const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  version: () => process.versions.electron
});

contextBridge.exposeInMainWorld('cake', {
  startBot: (payload) => ipcRenderer.invoke('bot:start', payload),
  stopBot: (id) => ipcRenderer.invoke('bot:stop', id),
  listBots: () => ipcRenderer.invoke('bot:list'),
  getBotInfo: (token) => ipcRenderer.invoke('bot:info', token),
  onLog: (cb) => ipcRenderer.on('bot:log', (_e, msg) => cb(msg))
});
