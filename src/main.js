const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

let mainWindow;
const procs = {}; // id proyecto -> proceso (varios bots a la vez)

const RUNTIME_DIR = path.join(__dirname, '..', '.runtime');

function ensureRuntimeDir() {
  if (!fs.existsSync(RUNTIME_DIR)) fs.mkdirSync(RUNTIME_DIR, { recursive: true });
}

function sendLog(id, text, type = 'out') {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('bot:log', { id, text: String(text), type });
  }
}

function killBot(id) {
  const p = id ? procs[id] : null;
  const targets = id ? (p ? [[id, p]] : []) : Object.entries(procs);
  targets.forEach(([pid, proc]) => {
    try { proc.kill('SIGTERM'); } catch (_) {}
    setTimeout(() => { try { proc.kill('SIGKILL'); } catch (_) {} }, 1500);
    delete procs[pid];
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 650,
    backgroundColor: '#101010',
    autoHideMenuBar: true,
    title: 'CakeIBot',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.on('closed', () => { killBot(); mainWindow = null; });
}

// ---- Info del bot desde la API de Discord (sin CORS, con timeout) ----
ipcMain.handle('bot:info', async (_e, token) => {
  try {
    const res = await fetch('https://discord.com/api/v10/users/@me', {
      headers: { Authorization: 'Bot ' + String(token || '').trim() },
      signal: AbortSignal.timeout(10000)
    });
    if (!res.ok) return { ok: false, error: 'HTTP ' + res.status };
    const info = await res.json();
    return { ok: true, info };
  } catch (err) {
    return { ok: false, error: String(err.message || err) };
  }
});

// ---- Runtime de bots (varios a la vez, por id de proyecto) ----
ipcMain.handle('bot:start', async (_e, { id, name, stack, code }) => {
  killBot(id);
  ensureRuntimeDir();
  const ext = stack === 'py' ? 'py' : 'js';
  const safeId = String(id || 'bot').replace(/[^a-z0-9_-]/gi, '');
  const file = path.join(RUNTIME_DIR, `bot-${safeId}.${ext}`);
  fs.writeFileSync(file, code, 'utf8');

  const cmd = stack === 'py' ? 'python3' : 'node';
  let proc;
  try {
    proc = spawn(cmd, [file], { cwd: path.join(__dirname, '..') });
  } catch (err) {
    sendLog(id, 'No se pudo lanzar el proceso: ' + err.message, 'err');
    return { ok: false };
  }
  procs[id] = proc;

  sendLog(id, `— ${name || id} · ${cmd} ${path.basename(file)} —`, 'sys');

  proc.stdout.on('data', (d) => sendLog(id, d.toString(), 'out'));
  proc.stderr.on('data', (d) => sendLog(id, d.toString(), 'err'));
  proc.on('error', (err) => {
    sendLog(id, 'Error al ejecutar ' + cmd + ': ' + err.message, 'err');
    delete procs[id];
  });
  proc.on('close', (code) => {
    sendLog(id, `Proceso terminado (código ${code})`, 'sys');
    delete procs[id];
  });

  return { ok: true };
});

ipcMain.handle('bot:stop', async (_e, id) => {
  if (id) {
    killBot(id);
    sendLog(id, '— bot detenido —', 'sys');
  } else killBot();
  return { ok: true };
});

ipcMain.handle('bot:list', async () => Object.keys(procs));

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  killBot();
  if (process.platform !== 'darwin') app.quit();
});
