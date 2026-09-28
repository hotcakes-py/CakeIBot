'use strict';
/* ============ CakeIBot panel ============ */

// ---------- i18n ----------
const STR = {
  es: {
    hello: '¡Hola!', stackTitle: 'Elige un lenguaje para continuar',
    dashTitle: 'Mis bots', newBot: 'Nuevo', empty: 'Sin bots todavía — crea el primero con + Nuevo',
    newBotTitle: 'Nuevo bot', fName: 'Nombre', fStack: 'Lenguaje', fToken: 'Token de Discord',
    cancel: 'Cancelar', create: 'Crear', save: 'Guardar', export: 'Compartir (.json)',
    offline: 'Apagado', online: 'En línea', start: 'Encender', stop: 'Apagar',
    library: 'Módulos', import: 'Importar', newMod: 'Módulo', config: 'Configurar',
    libTrig: 'Disparadores', libAct: 'Acciones', idleAct: 'suelto (conéctalo tras un ●)',
    kindTrig: 'disparador', kindAct: 'acción',
    noSel: 'Selecciona un bloque', canvasHint: 'Arrastra de un ● a otro para conectar · ej. /kick = Comando / + Expulsar',
    newModTitle: 'Nuevo módulo', fDesc: 'Descripción',
    fVars: 'Variables (una por línea: clave | etiqueta | valor)',
    fCode: 'Código (usa MOD_CONFIG.clave)',
    exportCode: 'Ver código', del: 'Quitar', open: 'Abrir', dup: 'Duplicar',
    needToken: '[panel] pon el token del bot en el proyecto antes de encender.',
    needName: 'Ponle un nombre al bot.',
    badImport: 'Archivo de módulo inválido.',
    badToken: 'No se pudo verificar el token (revisa el token o tu conexión).',
    searchPh: 'Buscar módulos…',
    docsCreateTitle: 'Crear módulos',
    docsImportTitle: 'Importar',
    docsCreateBody: `<h4>Anatomía de un módulo (.cakemod.json)</h4><pre>{
  "id": "mi-modulo",
  "stack": "js",
  "name": { "es": "Mi módulo", "en": "My module" },
  "desc": { "es": "Qué hace", "en": "What it does" },
  "schema": [
    { "key": "trigger", "label": { "es": "Palabra", "en": "Word" }, "def": "hola" }
  ],
  "code": "..."
}</pre><ul><li><b>stack:</b> "js", "py" o "both". Solo aparece en bots de ese lenguaje.</li><li><b>schema:</b> cada entrada genera un campo del formulario. Se leen como <b>MOD_CONFIG.clave</b>.</li><li><b>Disparadores y acciones:</b> los <b>Disparadores</b> inician el flujo (comandos, bienvenidas…). Las <b>Acciones</b> (Responder texto, Expulsar, Banear, Aislar, Dar/Quitar rol) solo funcionan conectadas tras un disparador con ● → ●, en orden. Una acción suelta no hace nada.</li><li><b>Ejemplo /kick:</b> Comando / con nombre <i>kick</i> y opción <i>usuario | usuario | ¿A quién?</i> → conecta su ● al ● de <b>Expulsar</b> (objetivo: mencionado). Vacía la Respuesta del comando para que solo expulse.</li><li><b>Conexiones:</b> une la salida ● de un comando (Responder, !Comando o /Comando) a la entrada ● de un <b>Embed</b> y el comando responderá con la tarjeta en vez de texto. El bloque muestra → con el título.</li><li><b>Comandos que afectan a otros (ej. /besar):</b> en Opciones añade <i>usuario1 | usuario | ¿A quién?</i> (puedes poner varios: usuario1, usuario2…). <b>{autor}</b> es quien ejecuta, <b>{usuario1}</b> es el mencionado. Respuesta: <i>¡{autor} ha besado a {usuario1}! 💋</i>. Si conectas el comando a un Embed, el título, descripción, pie, autor y campos entienden los mismos {…}.</li><li><b>Embeds completos:</b> autor, imagen grande, miniatura y campos (<i>nombre | valor</i> por línea). Conecta un comando → Embed para que responda con la tarjeta.</li><li><b>API:</b> pide una URL JSON y responde con <b>{valor}</b> sacado de la ruta (ej. ruta <i>bpi.USD.rate</i>). <b>Foto/Archivo:</b> envía imagen por URL o archivo local por ruta.</li><li><b>JS:</b> tienes <b>client</b> (discord.js) y <b>MOD_CONFIG</b>. Usa client.on("messageCreate", ...).</li><li><b>Python:</b> tu código va a nivel superior con <b>MOD_CONFIG</b> (dict). NO definas on_message ni on_ready: el panel los genera y tu función los taparía.</li><li>Ejemplo JS: <pre>client.on("messageCreate", async (m) =&gt; {
  if (m.author.bot) return;
  if (m.content.includes(MOD_CONFIG.trigger)) m.reply("¡ei!");
});</pre></li><li>Ejemplo PY: <pre>print("config:", MOD_CONFIG)</pre></li><li><b>Subcomandos y grupos:</b> en el Comando, una línea por subcomando: <i>ban | Banea</i> o <i>config/rol | Gestiona</i>. En Subopciones: <i>sub = opción | tipo | descripción</i>. En Respuesta puedes usar <b>{subcomando}</b> y <b>{grupo}</b>.</li><li><b>Autocomplete:</b> <i>opción = valor1, valor2</i> — limita la opción a esos valores y Discord muestra el desplegable mientras escribes.</li><li><b>Permisos y cooldown:</b> Permisos acepta nombres en español (<i>administrador, expulsar, gestionar_mensajes</i>…). Cooldown en segundos bloquea el comando por usuario ese tiempo (0 = sin límite).</li><li><b>Botones y menú:</b> añade el bloque <b>Botones y menú</b> tras un disparador. Botones: <i>etiqueta | id | respuesta</i> (10 por nodo, 5 por fila). Menú: <i>placeholder | id | op1, op2 | respuesta</i>. En la respuesta del menú usa <b>{elegido}</b>.</li></ul>`,
    docsImportBody: `<h4>Importar un módulo de la comunidad</h4><ol><li>Abre tu bot → panel <b>Módulos</b> → <b>Importar</b>.</li><li>Elige el archivo <b>.cakemod.json</b> que te pasaron.</li><li>El panel valida: id, nombre, código y lenguaje compatible. Si algo falla, te avisa en los logs.</li><li>Aparece en tu librería. Clic para añadirlo al canvas y configúralo.</li></ol><h4>Compartir el tuyo</h4><ol><li>En <b>Módulos</b> → <b>+ Módulo</b>: nombre, descripción, variables (clave | etiqueta | valor) y código.</li><li><b>Compartir (.json)</b> descarga el archivo. Pásalo por Discord, GitHub, donde quieras.</li><li>Los módulos se guardan en tu panel; el .json es el formato de intercambio.</li></ol>`,
    added: (n) => `[panel] módulo "${n}" añadido.`,
    saveOk: 'Guardado', undoT: 'Deshacer (Ctrl+Z)', redoT: 'Rehacer (Ctrl+Y)',
    addN: 'Añadir nodo', npPh: 'Buscar nodo…', noResults: 'Sin resultados',
    copy: 'Copiar', copied: 'Copiado al portapapeles', noLogs: 'No hay logs que copiar',
    meta: (n, e) => `${n} nodo${n === 1 ? '' : 's'} · ${e} enlace${e === 1 ? '' : 's'}`,
    cfgEmptyD: 'Ningún bloque seleccionado. Haz clic en uno del lienzo para editarlo.',
    cfgTip: 'Tip: une el ● de un disparador con el ● de una acción (● → ●).',
    tAdd: (n) => `"${n}" añadido al lienzo`,
    tDel: 'Bloque eliminado · Ctrl+Z para deshacer',
    tDup: 'Bloque duplicado', tUndone: 'Deshecho', tRedone: 'Rehecho',
    tNoUndo: 'Nada que deshacer', tNoRedo: 'Nada que rehacer',
    zIn: 'Acercar', zOut: 'Alejar', fitT: 'Ajustar al lienzo (Ctrl+0)',
    addNTitle: 'Añadir nodo'
  },
  en: {
    hello: 'Hello!', stackTitle: 'Choose a language to continue',
    dashTitle: 'My bots', newBot: 'New', empty: 'No bots yet — create the first one with + New',
    newBotTitle: 'New bot', fName: 'Name', fStack: 'Language', fToken: 'Discord token',
    cancel: 'Cancel', create: 'Create', save: 'Save', export: 'Share (.json)',
    offline: 'Offline', online: 'Online', start: 'Start', stop: 'Stop',
    library: 'Modules', import: 'Import', newMod: 'Module', config: 'Configure',
    libTrig: 'Triggers', libAct: 'Actions', idleAct: 'loose (connect it after a ●)',
    kindTrig: 'trigger', kindAct: 'action',
    noSel: 'Select a block', canvasHint: 'Drag from one ● to another to connect · e.g. /kick = Slash + Kick',
    newModTitle: 'New module', fDesc: 'Description',
    fVars: 'Variables (one per line: key | label | value)',
    fCode: 'Code (use MOD_CONFIG.key)',
    exportCode: 'View code', del: 'Remove', open: 'Open', dup: 'Duplicate',
    needToken: '[panel] set the bot token in the project before starting.',
    needName: 'Give the bot a name.',
    badImport: 'Invalid module file.',
    badToken: 'Could not verify the token (check the token or your connection).',
    searchPh: 'Search modules…',
    docsCreateTitle: 'Create modules',
    docsImportTitle: 'Import',
    docsCreateBody: `<h4>Module anatomy (.cakemod.json)</h4><pre>{
  "id": "my-module",
  "stack": "js",
  "name": { "es": "Mi módulo", "en": "My module" },
  "desc": { "es": "Qué hace", "en": "What it does" },
  "schema": [
    { "key": "trigger", "label": { "es": "Palabra", "en": "Word" }, "def": "hello" }
  ],
  "code": "..."
}</pre><ul><li><b>stack:</b> "js", "py" or "both". Only shows in bots of that language.</li><li><b>schema:</b> each entry becomes a form field. Read them as <b>MOD_CONFIG.key</b>.</li><li><b>Triggers and actions:</b> <b>Triggers</b> start the flow (commands, welcomes…). <b>Actions</b> (Reply text, Kick, Ban, Timeout, Add/Remove role) only work connected after a trigger with ● → ●, in order. A loose action does nothing.</li><li><b>/kick example:</b> Slash command named <i>kick</i> with option <i>usuario | usuario | Whom?</i> → connect its ● to the ● of <b>Kick</b> (target: mencionado). Empty the command Reply so it only kicks.</li><li><b>Connections:</b> join the ● output of a command (Auto-reply, !Command or Slash) to the ● input of an <b>Embed</b> and the command will reply with the card instead of text. The block shows → with the title.</li><li><b>Commands targeting others (e.g. /kiss):</b> in Options add <i>usuario1 | usuario | Whom?</i> (you can add several: usuario1, usuario2…). <b>{autor}</b> is who runs it, <b>{usuario1}</b> is the mentioned user. Reply: <i>{autor} kissed {usuario1}! 💋</i>. If you connect the command to an Embed, title, description, footer, author and fields understand the same {…}.</li><li><b>Full embeds:</b> author, big image, thumbnail and fields (<i>name | value</i> per line). Connect a command → Embed so it replies with the card.</li><li><b>API:</b> fetches a JSON URL and replies with <b>{valor}</b> taken from the path (e.g. path <i>bpi.USD.rate</i>). <b>Photo/File:</b> sends an image by URL or a local file by path.</li><li><b>JS:</b> you get <b>client</b> (discord.js) and <b>MOD_CONFIG</b>. Use client.on("messageCreate", ...).</li><li><b>Python:</b> your code runs at top level with <b>MOD_CONFIG</b> (dict). Do NOT define on_message or on_ready: the panel generates them and yours would override them.</li><li>JS example: <pre>client.on("messageCreate", async (m) =&gt; {
  if (m.author.bot) return;
  if (m.content.includes(MOD_CONFIG.trigger)) m.reply("yo!");
});</pre></li><li>PY example: <pre>print("config:", MOD_CONFIG)</pre></li><li><b>Subcommands and groups:</b> one line per subcommand in Command: <i>ban | Ban a user</i> or <i>config/rol | Manage roles</i>. In Sub-options: <i>sub = option | type | description</i>. Reply can use <b>{subcomando}</b> and <b>{grupo}</b>.</li><li><b>Autocomplete:</b> <i>option = value1, value2</i> — restricts the option and Discord shows suggestions while typing.</li><li><b>Permissions and cooldown:</b> Permissions takes Spanish names (<i>administrador, expulsar, gestionar_mensajes</i>…). Cooldown in seconds locks the command per user (0 = none).</li><li><b>Buttons and menu:</b> add the <b>Buttons and menu</b> block after a trigger. Buttons: <i>label | id | reply</i> (10 per node, 5 per row). Menu: <i>placeholder | id | op1, op2 | reply</i>. In the menu reply use <b>{elegido}</b>.</li></ul>`,
    docsImportBody: `<h4>Import a community module</h4><ol><li>Open your bot → <b>Modules</b> panel → <b>Import</b>.</li><li>Pick the <b>.cakemod.json</b> file you received.</li><li>The panel validates: id, name, code and matching language. Failures show in the logs.</li><li>It appears in your library. Click to add it to the canvas and configure it.</li></ol><h4>Share yours</h4><ol><li>In <b>Modules</b> → <b>+ Module</b>: name, description, variables (key | label | value) and code.</li><li><b>Share (.json)</b> downloads the file. Send it via Discord, GitHub, anywhere.</li><li>Modules live in your panel; the .json is the exchange format.</li></ol>`,
    added: (n) => `[panel] module "${n}" added.`,
    saveOk: 'Saved', undoT: 'Undo (Ctrl+Z)', redoT: 'Redo (Ctrl+Y)',
    addN: 'Add node', npPh: 'Search nodes…', noResults: 'No results',
    copy: 'Copy', copied: 'Copied to clipboard', noLogs: 'No logs to copy',
    meta: (n, e) => `${n} node${n === 1 ? '' : 's'} · ${e} link${e === 1 ? '' : 's'}`,
    cfgEmptyD: 'No block selected. Click one on the canvas to edit it.',
    cfgTip: 'Tip: join a trigger ● with an action ● (● → ●).',
    tAdd: (n) => `"${n}" added to the canvas`,
    tDel: 'Block removed · Ctrl+Z to undo',
    tDup: 'Block duplicated', tUndone: 'Undone', tRedone: 'Redone',
    tNoUndo: 'Nothing to undo', tNoRedo: 'Nothing to redo',
    zIn: 'Zoom in', zOut: 'Zoom out', fitT: 'Fit to canvas (Ctrl+0)',
    addNTitle: 'Add node'
  }
};
let LANG = 'es';
const t = (k) => STR[LANG][k];

// ---------- info del bot (API de Discord) ----------
const avatarURL = (info, size = 128) => info && info.avatar
  ? `https://cdn.discordapp.com/avatars/${info.id}/${info.avatar}.${info.avatar.startsWith('a_') ? 'gif' : 'png'}?size=${size}`
  : '';
const bannerURL = (info, size = 600) => info && info.banner
  ? `https://cdn.discordapp.com/banners/${info.id}/${info.banner}.png?size=${size}`
  : '';
const botName = (info) => info ? (info.global_name || info.username) : '';
async function fetchBotInfo(token) {
  token = String(token || '').trim();
  if (token.length < 20) return { ok: false };
  if (window.cake && window.cake.getBotInfo) return window.cake.getBotInfo(token);
  try {
    const res = await fetch('https://discord.com/api/v10/users/@me', { headers: { Authorization: 'Bot ' + token } });
    if (!res.ok) return { ok: false, error: 'HTTP ' + res.status };
    return { ok: true, info: await res.json() };
  } catch (e) { return { ok: false, error: String(e.message || e) }; }
}

// ---------- screens ----------
const screens = ['lang-screen', 'anim-screen', 'stack-screen', 'dash-screen', 'editor-screen'];
function show(id) {
  screens.forEach(s => document.getElementById(s).classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function applyUI() {
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-ui]').forEach(el => {
    const v = STR[LANG][el.getAttribute('data-ui')];
    if (typeof v === 'string') el.textContent = v;
  });
  const st = document.getElementById('stack-title');
  if (st) st.textContent = STR[LANG].stackTitle;
  document.getElementById('dash-title').textContent = STR[LANG].dashTitle;
  document.getElementById('mod-search').placeholder = STR[LANG].searchPh;
  const npq = document.getElementById('np-q');
  if (npq) npq.placeholder = STR[LANG].npPh;
  const bu = document.getElementById('btn-undo'), br = document.getElementById('btn-redo');
  if (bu) { bu.title = STR[LANG].undoT; bu.setAttribute('aria-label', STR[LANG].undoT); }
  if (br) { br.title = STR[LANG].redoT; br.setAttribute('aria-label', STR[LANG].redoT); }
  const zi = document.getElementById('z-in'), zo = document.getElementById('z-out'), zf = document.getElementById('z-fit');
  if (zi) { zi.title = STR[LANG].zIn; zi.setAttribute('aria-label', STR[LANG].zIn); }
  if (zo) { zo.title = STR[LANG].zOut; zo.setAttribute('aria-label', STR[LANG].zOut); }
  if (zf) { zf.title = STR[LANG].fitT; zf.setAttribute('aria-label', STR[LANG].fitT); }
  const caf = document.getElementById('cv-add');
  if (caf) { caf.title = STR[LANG].addNTitle; caf.setAttribute('aria-label', STR[LANG].addNTitle); }
  if (current) {
    document.getElementById('ed-stack').textContent = current.stack.toUpperCase();
    renderTopbar();
    if (!isRunning(current.id)) setStatus(false); else setStatus(true);
  }
  renderProjects(); renderLibrary(); renderConfig(); renderDocs();
  updateMeta();
}

// ---------- documentación ----------
const docsModal = document.getElementById('docs-modal');
document.getElementById('btn-help').addEventListener('click', () => { renderDocs(); docsModal.classList.add('open'); });
document.getElementById('docs-close').addEventListener('click', () => docsModal.classList.remove('open'));
document.getElementById('tab-create').addEventListener('click', () => {
  document.getElementById('tab-create').classList.add('active');
  document.getElementById('tab-import').classList.remove('active');
  document.getElementById('docs-create-body').classList.remove('hidden');
  document.getElementById('docs-import-body').classList.add('hidden');
});
document.getElementById('tab-import').addEventListener('click', () => {
  document.getElementById('tab-import').classList.add('active');
  document.getElementById('tab-create').classList.remove('active');
  document.getElementById('docs-import-body').classList.remove('hidden');
  document.getElementById('docs-create-body').classList.add('hidden');
});
function renderDocs() {
  document.getElementById('docs-create-body').innerHTML = STR[LANG].docsCreateBody;
  document.getElementById('docs-import-body').innerHTML = STR[LANG].docsImportBody;
}

// ---------- store ----------
const LS_P = 'cakeibot.projects.v1', LS_M = 'cakeibot.customModules.v1', LS_LANG = 'cakeibot.lang.v1';
const load = (k, f) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? f; } catch { return f; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
let projects = load(LS_P, []);
let customMods = load(LS_M, []);
let current = null, runningIds = new Set();
const uid = () => Math.random().toString(36).slice(2, 9);
let saveTimer = null;
function flashSave() {
  const el = document.getElementById('save-chip');
  if (!el) return;
  if (!el.classList.contains('flash')) {
    void el.offsetWidth;
    el.classList.add('flash');
  }
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => el.classList.remove('flash'), 1300);
}
const persist = () => { save(LS_P, projects); flashSave(); };

// ---------- toasts (estilo n8n) ----------
function toast(msg, kind = 'ok') {
  const box = document.getElementById('toasts');
  if (!box) return;
  const el = document.createElement('div');
  el.className = 'toast' + (kind === 'err' ? ' err' : '');
  const ic = document.createElement('span');
  ic.className = 'ti';
  ic.textContent = kind === 'err' ? '!' : '✓';
  const tx = document.createElement('span');
  tx.textContent = msg;
  el.appendChild(ic); el.appendChild(tx);
  box.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 320);
  }, 2300);
  while (box.children.length > 4) box.firstChild.remove();
}

// ---------- builtin modules ----------
const esc = (s) => String(s ?? '').replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
const J = (v) => JSON.stringify(v);
// Declaración de embed reutilizable (siempre DENTRO del handler para no duplicar const)
const jsEmbedDecl = (c, pad, fill) => {
  const hex = String(c.color || '#ffffff').replace('#', '') || 'ffffff';
  const fields = parseFields(c.campos);
  const F = (v) => fill ? fill(J(v)) : J(v);
  let s = `${pad}const { EmbedBuilder } = require('discord.js');\n${pad}const _eb = new EmbedBuilder().setTitle(${F(c.titulo)}).setDescription(${F(c.descripcion)}).setColor(Number.parseInt(${J(hex)}, 16) || 0xffffff)${c.pie ? `.setFooter({ text: ${F(c.pie)} })` : ''}${c.autor ? `.setAuthor({ name: ${F(c.autor)} })` : ''}${c.imagen ? `.setImage(${J(c.imagen)})` : ''}${c.miniatura ? `.setThumbnail(${J(c.miniatura)})` : ''};`;
  if (fields.length) s += fill
    ? `\n${pad}_eb.addFields(${fields.map(f => `{ name: ${F(f.name)}, value: ${F(f.value)}, inline: false }`).join(', ')});`
    : `\n${pad}_eb.addFields(${J(fields.map(f => ({ name: f.name, value: f.value, inline: false })))});`;
  return s;
};
const pyEmbedDecl = (c, pad, fill) => {
  const hex = String(c.color || '#ffffff').replace('#', '') || 'ffffff';
  const fields = parseFields(c.campos);
  const F = (v) => fill ? fill(J(v)) : J(v);
  let s = `${pad}eb = discord.Embed(title=${F(c.titulo)}, description=${F(c.descripcion)}, color=0x${hex})`;
  if (c.pie) s += `\n${pad}eb.set_footer(text=${F(c.pie)})`;
  if (c.autor) s += `\n${pad}eb.set_author(name=${F(c.autor)})`;
  if (c.imagen) s += `\n${pad}eb.set_image(url=${J(c.imagen)})`;
  if (c.miniatura) s += `\n${pad}eb.set_thumbnail(url=${J(c.miniatura)})`;
  fields.forEach(f => { s += `\n${pad}eb.add_field(name=${F(f.name)}, value=${F(f.value)}, inline=False)`; });
  return s;
};
// Rellenos de placeholders para embeds y respuestas (el código generado hace el replace)
// {autor} quien ejecuta · {servidor} nombre del server · {canal} canal actual · {miembros} nº miembros
const fillMsgM = (e) => e + ".split('{autor}').join('<@' + m.author.id + '>').split('{servidor}').join((m.guild && m.guild.name) || '').split('{canal}').join('<#' + m.channel.id + '>').split('{miembros}').join(String((m.guild && m.guild.memberCount) || ''))";
const fillMsgPY = (e) => `${e}.replace('{autor}', m.author.mention).replace('{servidor}', m.guild.name if m.guild else '').replace('{canal}', m.channel.mention).replace('{miembros}', str(m.guild.member_count if m.guild else ''))`;
const fillAutorM = fillMsgM, fillAutorPY = fillMsgPY;
const fillSlashPY = (opts, withSub) => (e) => opts.reduce((acc, o) => {
  const v = (o.type === 'discord.Member' || o.type === 'discord.TextChannel') ? `${o.name}.mention` : `str(${o.name})`;
  return `${acc}.replace('{${o.name}}', ${v})`;
}, `${e}.replace('{autor}', interaction.user.mention).replace('{servidor}', interaction.guild.name if interaction.guild else '').replace('{canal}', interaction.channel.mention if interaction.channel else '').replace('{miembros}', str(interaction.guild.member_count if interaction.guild else ''))${withSub ? `.replace('{subcomando}', _sub).replace('{grupo}', _grp)` : ''}`);
// Opciones de slash: líneas "nombre | tipo | descripción" (tipos: texto, numero, entero, usuario, canal)
const parseSlashOpts = (txt) => String(txt || '').split('\n')
  .map(l => l.split('|').map(s => s.trim())).filter(p => p[0]).slice(0, 5)
  .map(p => ({ raw: p[0], type: String(p[1] || 'texto').toLowerCase(), desc: (p[2] || p[0]).slice(0, 100) }));
const slashOptJS = (raw) => String(raw).toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 32) || 'op';
// nombre de variable JS seguro para una opción (evita guiones: _opt_foo-bar no compila)
const jsOptVar = (name) => '_opt_' + String(name).replace(/[^a-zA-Z0-9_$]/g, '_');
const slashOptPY = (raw) => {
  let n = String(raw).toLowerCase().replace(/-/g, '_').replace(/[^a-z0-9_]/g, '').slice(0, 32);
  if (/^[0-9]/.test(n)) n = '_' + n;
  return n || 'op';
};
const SLASH_TYPES_JS = { texto: 3, numero: 10, entero: 4, usuario: 6, canal: 7 };
const SLASH_TYPES_PY = { texto: 'str', numero: 'float', entero: 'int', usuario: 'discord.Member', canal: 'discord.TextChannel' };
// ---------- subcomandos, grupos, autocomplete, permisos y cooldown ----------
// Subcomandos: "sub | descripción"  o  "grupo/sub | descripción"
const parseSlashSubs = (txt) => String(txt || '').split('\n')
  .map(l => l.split('|').map(s => s.trim())).filter(p => p[0]).slice(0, 25)
  .map(p => {
    const path = p[0].split('/').map(s => s.trim()).filter(Boolean);
    const name = slashOptJS(path[path.length - 1] || '');
    const grupo = path.length > 1 ? slashOptJS(path[0]) : '';
    return { grupo, name, desc: (p[1] || p[0]).slice(0, 100) };
  }).filter(s => s.name);
// Opciones de un subcomando: "sub = nombre | tipo | descripción"
const parseSubOpts = (txt) => String(txt || '').split('\n').map(l => {
  const eq = l.indexOf('=');
  if (eq < 0) return null;
  const sub = slashOptJS(l.slice(0, eq));
  const p = l.slice(eq + 1).split('|').map(s => s.trim());
  if (!sub || !p[0]) return null;
  return { sub, raw: p[0], type: String(p[1] || 'texto').toLowerCase(), desc: (p[2] || p[0]).slice(0, 100) };
}).filter(Boolean).slice(0, 60);
// Autocomplete: "opcion = valor1, valor2, valor3"
const parseAC = (txt) => String(txt || '').split('\n').map(l => {
  const eq = l.indexOf('=');
  if (eq < 0) return null;
  const raw = l.slice(0, eq).trim();
  const vals = l.slice(eq + 1).split(',').map(s => s.trim()).filter(Boolean).slice(0, 50);
  if (!raw || !vals.length) return null;
  return { raw, opt: slashOptJS(raw), optPY: slashOptPY(raw), vals: vals.map(v => String(v).slice(0, 100)) };
}).filter(Boolean);
const normKey = (s) => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
// Permisos por comando (acepta español, inglés o el nombre técnico)
const PERM_DEF = [
  ['Administrator', 'administrator', 'administrador', 'admin'],
  ['KickMembers', 'kick_members', 'expulsar', 'kick'],
  ['BanMembers', 'ban_members', 'banear', 'ban'],
  ['ManageGuild', 'manage_guild', 'gestionar_servidor', 'configurar_servidor'],
  ['ManageChannels', 'manage_channels', 'gestionar_canales'],
  ['ManageRoles', 'manage_roles', 'gestionar_roles'],
  ['ManageMessages', 'manage_messages', 'gestionar_mensajes'],
  ['ManageThreads', 'manage_threads', 'gestionar_hilos'],
  ['ManageWebhooks', 'manage_webhooks', 'gestionar_webhooks'],
  ['ManageEvents', 'manage_events', 'gestionar_eventos'],
  ['ManageNicknames', 'manage_nicknames', 'gestionar_apodos'],
  ['ModerateMembers', 'moderate_members', 'moderar', 'aislar'],
  ['ViewAuditLog', 'view_audit_log', 'ver_registro'],
  ['MentionEveryone', 'mention_everyone', 'mencionar_todos'],
  ['SendMessages', 'send_messages', 'enviar_mensajes'],
  ['ViewChannel', 'view_channel', 'ver_canales'],
  ['AddReactions', 'add_reactions', 'reaccionar'],
  ['Connect', 'connect', 'conectar'], ['Speak', 'speak', 'hablar']
];
const PERM_MAP = {};
for (const [js, py, ...alias] of PERM_DEF) [js, py, ...alias].forEach(a => { PERM_MAP[normKey(a)] = [js, py]; });
const parsePerms = (txt) => {
  const out = [], seen = new Set();
  for (const raw of String(txt || '').split(/[,\n]/)) {
    const hit = PERM_MAP[normKey(raw)];
    if (!hit || seen.has(hit[0])) continue;
    seen.add(hit[0]);
    out.push({ js: hit[0], py: hit[1] });
  }
  return out;
};
// Cooldown en segundos (0 = sin límite)
const parseCD = (v) => {
  const n = Number(String(v ?? '').replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? Math.min(86400, Math.round(n)) : 0;
};
// Componentes: "etiqueta | id | respuesta" (máx 10 botones)
const parseButtons = (txt) => String(txt || '').split('\n').map(l => l.split('|').map(x => x.trim()))
  .filter(p => p[0]).slice(0, 10)
  .map(p => ({ label: p[0].slice(0, 80), id: String(p[1] || p[0]).toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 100), resp: p[2] || '' }))
  .filter(b => b.id);
// Menú: "placeholder | id | opcion1, opcion2 | respuesta"
const parseMenus = (txt) => String(txt || '').split('\n').map(l => l.split('|').map(x => x.trim()))
  .filter(p => p[0] && p[2]).slice(0, 3)
  .map(p => ({
    ph: p[0].slice(0, 150),
    id: String(p[1] || 'menu').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 100),
    opts: String(p[2]).split(',').map(x => x.trim()).filter(Boolean).slice(0, 25),
    resp: p[3] || ''
  })).filter(m => m.id && m.opts.length);
// Opciones efectivas de un comando (raíz o de sus subcomandos)
const slashOptAll = (c) => {
  const ac = new Set(parseAC(c.autocomplete).map(x => x.opt));
  const fix = (o) => ({ ...o, name: slashOptJS(o.raw), type: ac.has(slashOptJS(o.raw)) ? 'texto' : o.type });
  const subs = parseSlashSubs(c.subcomandos);
  if (!subs.length) return parseSlashOpts(c.opciones).map(fix);
  const seen = new Set(), out = [];
  for (const o of parseSubOpts(c.subopciones)) {
    const name = slashOptJS(o.raw);
    if (seen.has(name)) continue;
    seen.add(name);
    out.push(fix(o));
  }
  return out;
};

// Campos de embed: líneas "nombre | valor"
const parseFields = (txt) => String(txt || '').split('\n')
  .map(l => l.split('|').map(s => s.trim())).filter(p => p[0] && p[1]).slice(0, 10)
  .map(p => ({ name: p[0].slice(0, 256), value: p[1].slice(0, 1024), inline: false }));
const indentJS = (s, n) => String(s || '').split('\n').map(l => l ? ' '.repeat(n) + l : l).join('\n');
const indentPy = (body, n = 4) => String(body || '').split('\n').map(l => ' '.repeat(n) + l).join('\n');
// Texto según idioma del panel (para mensajes que genera el propio bot)
const L = (es, en) => LANG === 'es' ? es : en;
// Triggers que aceptan acciones encadenadas con ● → ●
const CHAIN_MSG = ['responder', 'prefijo', 'slash'];
const CHAIN_JOIN = ['bienvenida', 'despedida'];
// "objetivo" de una acción: autor (quien ejecuta) o mencionado
const isMenc = (v) => /mencion|mention|@/.test(String(v || '').toLowerCase());
// Acción de moderación JS (kick/ban/timeout). doIt(tm) = línea de acción.
const modActionJS = (id, c, C, perm, doIt, icon, doneWord) => {
  const T = C.tag;
  const noTgt = L('Menciona a alguien para usar esto.', 'Mention someone to use this.');
  const noPerm = L('No tienes permiso para eso.', 'You lack permission for that.');
  if (C.t === 'join') {
    if (isMenc(c.objetivo)) return `  console.log('⚠ ${id} omitido: aquí no hay mencionado, usa autor');`;
    return `  try {
    await ${doIt('member')};
    console.log('${icon} ${id} ok');
  } catch (e) { console.error('${id}:', e.message); }`;
  }
  const tgt = isMenc(c.objetivo) ? C.mencJS : C.autorJS;
  if (!tgt) return `  try { await ${C.sendJS(J(noTgt))}; } catch (_) {}`;
  return `  try {
    const _tm_${T} = ${tgt};
    if (!_tm_${T}) { await ${C.sendJS(J(noTgt))}; }
    else if (!(${C.meJS} && ${C.meJS}.permissions.has('${perm}'))) { await ${C.sendJS(J(noPerm))}; }
    else { await ${doIt(`_tm_${T}`)}; await ${C.sendJS(`'${icon} ' + '<@' + _tm_${T}.id + '>' + ' ${doneWord}'`)}; }
  } catch (e) { console.error('${id}:', e.message); }`;
};
// Acción de moderación PY
const modActionPY = (id, c, C, perm, doIt, icon, doneWord) => {
  const T = C.tag;
  const noTgt = L('Menciona a alguien para usar esto.', 'Mention someone to use this.');
  const noPerm = L('No tienes permiso para eso.', 'You lack permission for that.');
  if (C.t === 'join') {
    if (isMenc(c.objetivo)) return `print('⚠ ${id} omitido: aquí no hay mencionado, usa autor')`;
    return `try:\n    await ${doIt('member')}\n    print('${icon} ${id} ok')\nexcept Exception as e:\n    print('${id}:', e)`;
  }
  const tgt = isMenc(c.objetivo) ? C.mencPY : C.autorPY;
  if (!tgt) return C.sendPYL(J(noTgt)).join('\n');
  const put = (lines) => lines.join('\n');
  return put([
    `try:`,
    `    _tm_${T} = ${tgt}`,
    `    if not _tm_${T}:`,
    ...C.sendPYL(J(noTgt)).map(l => `        ${l}`),
    `    elif not (${C.mePY} and ${C.mePY}.guild_permissions.${perm}):`,
    ...C.sendPYL(J(noPerm)).map(l => `        ${l}`),
    `    else:`,
    `        await ${doIt(`_tm_${T}`)}`,
    ...C.sendPYL(`${J(icon + ' ')} + _tm_${T}.mention + ${J(' ' + doneWord)}`).map(l => `        ${l}`),
    `except Exception as e:`,
    `    print('${id}:', e)`
  ]);
};
// Acción de rol JS
const roleActionJS = (id, c, C, how) => {
  const T = C.tag;
  const verb = how === 'add' ? 'add' : 'remove';
  const noTgt = L('Menciona a alguien para usar esto.', 'Mention someone to use this.');
  const noPerm = L('No tienes permiso para gestionar roles.', 'You lack permission to manage roles.');
  const noRol = L('No encontré ese rol.', 'Role not found.');
  const find = (g) => `${g}.roles.cache.find(r => r.name === ${J(c.rol)})`;
  if (!String(c.rol || '').trim()) return `  console.log('⚠ ${id} omitido: pon el nombre del rol');`;
  if (C.t === 'join') {
    if (isMenc(c.objetivo)) return `  console.log('⚠ ${id} omitido: aquí no hay mencionado, usa autor');`;
    return `  try {
    const _rl_${T} = ${find('member.guild')};
    if (!_rl_${T}) { console.log('rol no encontrado: ' + ${J(c.rol)}); }
    else { await member.roles.${verb}(_rl_${T}); console.log('rol ${verb} ok'); }
  } catch (e) { console.error('${id}:', e.message); }`;
  }
  const tgt = isMenc(c.objetivo) ? C.mencJS : C.autorJS;
  if (!tgt) return `  try { await ${C.sendJS(J(noTgt))}; } catch (_) {}`;
  return `  try {
    const _tm_${T} = ${tgt};
    const _rl_${T} = ${find(C.guildJS)};
    if (!_tm_${T}) { await ${C.sendJS(J(noTgt))}; }
    else if (!(${C.meJS} && ${C.meJS}.permissions.has('ManageRoles'))) { await ${C.sendJS(J(noPerm))}; }
    else if (!_rl_${T}) { await ${C.sendJS(J(noRol))}; }
    else { await _tm_${T}.roles.${verb}(_rl_${T}); await ${C.sendJS(`'✅ ' + '<@' + _tm_${T}.id + '>'`)}; }
  } catch (e) { console.error('${id}:', e.message); }`;
};
// Acción de rol PY
const roleActionPY = (id, c, C, how) => {
  const T = C.tag;
  const verb = how === 'add' ? 'add_roles' : 'remove_roles';
  const noTgt = L('Menciona a alguien para usar esto.', 'Mention someone to use this.');
  const noPerm = L('No tienes permiso para gestionar roles.', 'You lack permission to manage roles.');
  const noRol = L('No encontré ese rol.', 'Role not found.');
  const find = (g) => `discord.utils.get(${g}.roles, name=${J(c.rol)})`;
  const put = (lines) => lines.join('\n');
  if (!String(c.rol || '').trim()) return `print('⚠ ${id} omitido: pon el nombre del rol')`;
  if (C.t === 'join') {
    if (isMenc(c.objetivo)) return `print('⚠ ${id} omitido: aquí no hay mencionado, usa autor')`;
    return put([
      `try:`,
      `    _rl_${T} = ${find('member.guild')}`,
      `    if not _rl_${T}:`,
      `        print('rol no encontrado: ' + ${J(c.rol)})`,
      `    else:`,
      `        await member.${verb}(_rl_${T})`,
      `        print('rol ${verb} ok')`,
      `except Exception as e:`,
      `    print('${id}:', e)`
    ]);
  }
  const tgt = isMenc(c.objetivo) ? C.mencPY : C.autorPY;
  if (!tgt) return C.sendPYL(J(noTgt)).join('\n');
  return put([
    `try:`,
    `    _tm_${T} = ${tgt}`,
    `    _rl_${T} = ${find(C.guildPY)}`,
    `    if not _tm_${T}:`,
    ...C.sendPYL(J(noTgt)).map(l => `        ${l}`),
    `    elif not (${C.mePY} and ${C.mePY}.guild_permissions.manage_roles):`,
    ...C.sendPYL(J(noPerm)).map(l => `        ${l}`),
    `    elif not _rl_${T}:`,
    ...C.sendPYL(J(noRol)).map(l => `        ${l}`),
    `    else:`,
    `        await _tm_${T}.${verb}(_rl_${T})`,
    ...C.sendPYL(`'✅ ' + _tm_${T}.mention`).map(l => `        ${l}`),
    `except Exception as e:`,
    `    print('${id}:', e)`
  ]);
};
// Contextos para acciones (disparador → acción)
const msgCtx = (aidx) => ({
  t: 'msg', tag: 'a' + aidx,
  mencJS: '(m.mentions.members.first() || null)',
  autorJS: '(m.member || null)', guildJS: 'm.guild', meJS: 'm.member',
  sendJS: (p) => `m.reply(${p})`
});
const msgCtxPY = (aidx) => ({
  t: 'msg', tag: 'a' + aidx,
  mencPY: '(m.guild.get_member(m.mentions[0].id) if (m.guild and m.mentions) else None)',
  autorPY: '(m.author if m.guild else None)', guildPY: 'm.guild', mePY: 'm.author',
  sendPYL: (p) => [`await m.reply(${p})`]
});
const slashCtx = (aidx, mJS, mPY, fillPY) => ({
  t: 'slash', tag: 'a' + aidx,
  mencJS: mJS, mencPY: mPY,
  autorJS: '(i.member || null)', autorPY: 'interaction.user',
  guildJS: 'i.guild', guildPY: 'interaction.guild', meJS: 'i.member', mePY: 'interaction.user',
  sendJS: (p) => `_send(${p})`,
  sendPYL: (p) => [`await (interaction.response.send_message(${p}) if not _replied else interaction.followup.send(${p}))`, `_replied = True`],
  efill: (e) => '_fill(' + e + ')',
  efillPY: fillPY, fillPY
});
const joinCtx = (aidx, tag, canal) => ({
  t: 'join', tag: 'a' + aidx,
  mencJS: null, mencPY: null,
  autorJS: 'member', autorPY: 'member', guildJS: 'member.guild', guildPY: 'member.guild',
  meJS: 'member.guild.me', mePY: 'member.guild.me',
  chJS: 'ch', chPY: `_ch_${tag}`, canal,
  sendJS: (p) => `ch.send(${p})`,
  sendPYL: (p) => [`await _ch_${tag}.send(${p})`]
});
// Rellenos con el miembro que entra/sale (bienvenida/despedida)
const fillJoinM = (e, canal) => e + ".split('{autor}').join('<@' + member.id + '>').split('{usuario}').join('<@' + member.id + '>').split('{servidor}').join(member.guild.name).split('{canal}').join(" + J(canal) + ").split('{miembros}').join(String(member.guild.memberCount))";
const fillJoinPY = (e) => `${e}.replace('{autor}', member.mention).replace('{usuario}', member.mention).replace('{servidor}', member.guild.name).replace('{canal}', member.guild.name).replace('{miembros}', str(member.guild.member_count))`;
const BUILTINS = [
  {
    id: 'responder', stack: 'both', builtin: true,
    name: { es: 'Responder', en: 'Auto-reply' },
    desc: { es: 'Responde cuando un mensaje contiene la palabra clave.', en: 'Replies when a message contains the keyword.' },
    schema: [
      { key: 'trigger', label: { es: 'Palabra clave', en: 'Keyword' }, def: 'hola' },
      { key: 'respuesta', label: { es: 'Respuesta', en: 'Reply' }, def: '¡Hola! Soy tu bot.' }
    ],
    js: (c, emb, acts, tag) => {
      const fire = `_fire_${tag}`;
      const leg = emb ? `${jsEmbedDecl(emb, '    ', fillAutorM)}\n    try { await m.reply({ embeds: [_eb] }); } catch (e) { console.error('reply:', e.message); }`
        : (String(c.respuesta || '').trim() ? `    try { await m.reply(${fillMsgM(J(c.respuesta))}); } catch (e) { console.error('reply:', e.message); }` : '');
      const actCode = (acts || []).map(a => `  if (${fire}) {\n${indentJS(a.mod.actJS(a.node.config, msgCtx(a.aidx)), 4)}\n  }`).join('\n');
      return `client.on('messageCreate', async (m) => {
  if (m.author.bot) return;
  const ${fire} = m.content.toLowerCase().includes(${J(String(c.trigger || '').toLowerCase())});
${leg ? `  if (${fire}) {\n${leg}\n  }\n` : ''}${actCode ? actCode + '\n' : ''}});`;
    },
    pyMsg: (c, emb, acts, tag) => {
      const fire = `_fire_${tag}`;
      const cond = `${J(String(c.trigger || '').toLowerCase())} in m.content.lower()`;
      const legInner = emb ? `${pyEmbedDecl(emb, '', fillAutorPY)}\ntry:\n    await m.reply(embed=eb)\nexcept Exception as e:\n    print('reply:', e)`
        : (String(c.respuesta || '').trim() ? `try:\n    await m.reply(${fillMsgPY(J(c.respuesta))})\nexcept Exception as e:\n    print('reply:', e)` : '');
      const parts = [`${fire} = ${cond}`];
      if (legInner) parts.push(`if ${fire}:\n${indentPy(legInner)}`);
      (acts || []).forEach(a => parts.push(`if ${fire}:\n${indentPy(a.mod.actPY(a.node.config, msgCtxPY(a.aidx)))}`));
      return parts.join('\n');
    },
    pyJoin: null
  },
  {
    id: 'bienvenida', stack: 'both', builtin: true,
    name: { es: 'Bienvenida', en: 'Welcome' },
    desc: { es: 'Saluda a cada miembro nuevo en el canal.', en: 'Greets each new member in the channel.' },
    schema: [
      { key: 'canal', label: { es: 'Nombre del canal', en: 'Channel name' }, def: 'general' },
      { key: 'mensaje', label: { es: 'Mensaje (usa {usuario})', en: 'Message (use {usuario})' }, def: '¡Bienvenido/a {usuario}! 🎉' }
    ],
    js: (c, emb, acts, tag) => {
      const chActs = (acts || []).filter(a => ['embed', 'reply'].includes(a.mod.id));
      const otherActs = (acts || []).filter(a => !['embed', 'reply'].includes(a.mod.id));
      const chCode = chActs.map(a => indentJS(a.mod.actJS(a.node.config, joinCtx(a.aidx, tag, c.canal)), 4)).join('\n');
      const otherCode = otherActs.map(a => a.mod.actJS(a.node.config, joinCtx(a.aidx, tag, c.canal))).join('\n');
      return `client.on('guildMemberAdd', async (member) => {
  const ch = member.guild.channels.cache.find(x => x.name === ${J(c.canal)} && x.isTextBased());
  if (!ch) console.error('canal no encontrado: ' + ${J(c.canal)});
  else {
    const txt = ${fillJoinM(J(c.mensaje), c.canal)};
    try { await ch.send(txt); } catch (e) { console.error('welcome:', e.message); }
${chCode ? chCode + '\n' : ''}  }
${otherCode ? otherCode + '\n' : ''}});`;
    },
    pyMsg: null,
    pyJoin: (c, emb, acts, tag) => {
      const chActs = (acts || []).filter(a => ['embed', 'reply'].includes(a.mod.id));
      const otherActs = (acts || []).filter(a => !['embed', 'reply'].includes(a.mod.id));
      const parts = [
        `_ch_${tag} = discord.utils.get(member.guild.text_channels, name=${J(c.canal)})`,
        `if not _ch_${tag}:`,
        `    print('canal no encontrado: ' + ${J(c.canal)})`,
        `else:`,
        `    txt = ${fillJoinPY(J(c.mensaje))}`,
        `    try:`,
        `        await _ch_${tag}.send(txt)`,
        `    except Exception as e:`,
        `        print('welcome:', e)`
      ];
      chActs.forEach(a => parts.push(...`if _ch_${tag}:\n${indentPy(a.mod.actPY(a.node.config, joinCtx(a.aidx, tag, c.canal)))}`.split('\n')));
      otherActs.forEach(a => parts.push(...a.mod.actPY(a.node.config, joinCtx(a.aidx, tag, c.canal)).split('\n')));
      return parts.join('\n');
    }
  },
  {
    id: 'moderacion', stack: 'both', builtin: true,
    name: { es: 'Moderación', en: 'Moderation' },
    desc: { es: 'Borra mensajes con palabras prohibidas y avisa.', en: 'Deletes messages with banned words and warns.' },
    schema: [
      { key: 'palabras', label: { es: 'Palabras (separadas por coma)', en: 'Words (comma separated)' }, def: 'spam, insulto' },
      { key: 'aviso', label: { es: 'Aviso', en: 'Warning' }, def: 'Ese lenguaje no está permitido.' }
    ],
    js: (c) => `const BAD = ${J(c.palabras.split(',').map(s => s.trim().toLowerCase()).filter(Boolean))};
client.on('messageCreate', async (m) => {
  if (m.author.bot) return;
  if (BAD.some(w => m.content.toLowerCase().includes(w))) {
    try { await m.delete(); await m.channel.send('<@' + m.author.id + '> ' + ${J(c.aviso)}); }
    catch (e) { console.error('mod:', e.message); }
  }
});`,
    pyMsg: (c) => `if any(w in m.content.lower() for w in ${J(c.palabras.split(',').map(s => s.trim().toLowerCase()).filter(Boolean))}):
        try:
            await m.delete()
            await m.channel.send(m.author.mention + ' ' + ${J(c.aviso)})
        except Exception as e:
            print('mod:', e)`,
    pyJoin: null
  },
  {
    id: 'consola', stack: 'both', builtin: true,
    name: { es: 'Consola', en: 'Logger' },
    desc: { es: 'Muestra cada mensaje en los logs.', en: 'Prints every message to the logs.' },
    schema: [],
    js: () => `client.on('messageCreate', (m) => {
  if (!m.author.bot) console.log('[' + m.author.tag + ']: ' + m.content);
});`,
    pyMsg: () => `print(f'[{m.author}]: {m.content}')`,
    pyJoin: null
  },
  {
    id: 'slash', stack: 'both', builtin: true,
    name: { es: 'Comando /', en: 'Slash command' },
    desc: { es: 'Comando de barra con opciones, subcomandos, grupos, autocomplete, permisos y cooldown.', en: 'Slash command with options, subcommands, groups, autocomplete, permissions and cooldown.' },
    schema: [
      { key: 'nombre', label: { es: 'Nombre (minúsculas, sin espacios)', en: 'Name (lowercase, no spaces)' }, def: 'hola' },
      { key: 'descripcion', label: { es: 'Descripción', en: 'Description' }, def: 'Saluda' },
      { key: 'opciones', label: { es: 'Opciones (nombre | tipo | descripción) — tipos: texto, numero, entero, usuario, canal', en: 'Options (name | type | description) — types: texto, numero, entero, usuario, canal' }, def: '', multiline: true },
      { key: 'subcomandos', label: { es: 'Subcomandos (sub | descripción — o grupo/sub | descripción)', en: 'Subcommands (sub | description — or group/sub | description)' }, def: '', multiline: true },
      { key: 'subopciones', label: { es: 'Opciones de subcomando (sub = nombre | tipo | descripción)', en: 'Subcommand options (sub = name | type | description)' }, def: '', multiline: true },
      { key: 'autocomplete', label: { es: 'Autocomplete (opcion = valor1, valor2…)', en: 'Autocomplete (option = value1, value2…)' }, def: '', multiline: true },
      { key: 'permisos', label: { es: 'Permisos (coma: administrador, gestionar_mensajes…)', en: 'Permissions (comma: administrator, manage_messages…)' }, def: '' },
      { key: 'cooldown', label: { es: 'Cooldown en segundos (0 = ninguno)', en: 'Cooldown in seconds (0 = none)' }, def: '0' },
      { key: 'respuesta', label: { es: 'Respuesta (usa {autor}, {opcion}, {subcomando}…)', en: 'Reply (use {autor}, {option}, {subcomando}…)' }, def: '¡Hola {autor}! 👋' }
    ],
    slashName: (c) => String(c.nombre || 'hola').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 32) || 'cmd',
    // Definición que se registra en Discord (árbol de opciones + permisos)
    slashDefs: function (c) {
      const n = this.slashName(c);
      const subs = parseSlashSubs(c.subcomandos);
      const acNames = new Set(parseAC(c.autocomplete).map(x => x.opt));
      const mkOpt = (o) => {
        const ac = acNames.has(o.name);
        const d = { name: o.name, description: (o.desc || o.name).slice(0, 100), type: ac ? 3 : (SLASH_TYPES_JS[o.type] ?? 3), required: true };
        if (ac) d.autocomplete = true;
        return d;
      };
      const options = [];
      if (!subs.length) {
        parseSlashOpts(c.opciones).forEach(o => options.push(mkOpt({ ...o, name: slashOptJS(o.raw) })));
      } else {
        const groups = new Map();
        subs.forEach(s => {
          const node = { type: 1, name: s.name, description: s.desc, options: parseSubOpts(c.subopciones).filter(o => o.sub === s.name).map(o => mkOpt({ ...o, name: slashOptJS(o.raw) })) };
          if (!s.grupo) { options.push(node); return; }
          let g = groups.get(s.grupo);
          if (!g) { g = { type: 2, name: s.grupo, description: s.grupo.slice(0, 100), options: [] }; groups.set(s.grupo, g); options.push(g); }
          g.options.push(node);
        });
      }
      return { def: { name: n, description: String(c.descripcion || n).slice(0, 100), options }, perms: parsePerms(c.permisos).map(p => p.js) };
    },
    js: function (c, emb, acts, tag) {
      const n = this.slashName(c);
      const subs = parseSlashSubs(c.subcomandos);
      const opts = slashOptAll(c);
      const lines = opts.map(o => {
        const v = jsOptVar(o.name);
        const t = SLASH_TYPES_JS[o.type] ?? 3;
        if (t === 6) return `  const ${v} = (() => { const _u = i.options.getUser(${J(o.name)}); return _u ? '<@' + _u.id + '>' : ''; })();`;
        if (t === 7) return `  const ${v} = (() => { const _ch = i.options.getChannel(${J(o.name)}); return _ch ? '<#' + _ch.id + '>' : ''; })();`;
        if (t === 4) return `  const ${v} = i.options.getInteger(${J(o.name)}) ?? '';`;
        if (t === 10) return `  const ${v} = i.options.getNumber(${J(o.name)}) ?? '';`;
        return `  const ${v} = i.options.getString(${J(o.name)}) ?? '';`;
      });
      const pairs = opts.map(o => `[${J(o.name)}, ${jsOptVar(o.name)}]`).join(', ');
      const subDef = `  let _sub = '', _grp = '';\n  try { _grp = i.options.getSubcommandGroup(false) || ''; } catch (_) {}\n  try { _sub = i.options.getSubcommand(false) || ''; } catch (_) {}\n`;
      const cd = parseCD(c.cooldown);
      const cdLine = cd ? `  const _w = _cdOk(${J(n + ':')} + i.user.id, ${cd * 1000});
  if (_w) { try { await i.reply({ content: ${J(L('⏳ Espera ', '⏳ Wait '))} + _w + 's', ephemeral: true }); } catch (_) {} return; }\n` : '';
      const sendDef = `  let _replied = false;\n  const _send = async (p) => { if (_replied) await i.followUp(p); else { await i.reply(p); _replied = true; } };`;
      const fillDef = `  const _fill = (s) => { let _o = s.split('{autor}').join('<@' + i.user.id + '>'); _o = _o.split('{servidor}').join((i.guild && i.guild.name) || ''); _o = _o.split('{canal}').join(i.channel ? '<#' + i.channel.id + '>' : ''); _o = _o.split('{miembros}').join(String((i.guild && i.guild.memberCount) || '')); _o = _o.split('{subcomando}').join(_sub).split('{grupo}').join(_grp); for (const [k, v] of [${pairs}]) _o = _o.split('{' + k + '}').join(String(v)); return _o; };`;
      const hasResp = String(c.respuesta || '').trim();
      const leg = emb ? `${jsEmbedDecl(emb, '  ', (e) => '_fill(' + e + ')')}\n  try { await _send({ embeds: [_eb] }); } catch (e) { console.error('slash:', e.message); }`
        : (hasResp ? `  try { await _send(_fill(${J(c.respuesta)})); } catch (e) { console.error('slash:', e.message); }` : '');
      const uo = opts.find(o => (SLASH_TYPES_JS[o.type] ?? 3) === 6);
      const mJS = uo ? `(i.options.getMember(${J(uo.name)}) || null)` : null;
      const actCode = (acts || []).map(a => a.mod.actJS(a.node.config, slashCtx(a.aidx, mJS, null, null))).join('\n');
      return `client.on('interactionCreate', async (i) => {
  if (!i.isChatInputCommand() || i.commandName !== ${J(n)}) return;
${subDef}${cdLine}${lines.join('\n')}${lines.length ? '\n' : ''}${sendDef}
${fillDef}
${leg ? leg + '\n' : ''}${actCode ? actCode + '\n' : ''}});`;
    },
    pySlash: function (c, i, emb, acts, tag) {
      const n = this.slashName(c);
      const subs = parseSlashSubs(c.subcomandos);
      const acList = parseAC(c.autocomplete);
      const acByPY = new Map(acList.map(a => [a.optPY, a]));
      const cd = parseCD(c.cooldown);
      const perms = parsePerms(c.permisos);
      const rootDesc = String(c.descripcion || n).slice(0, 100);
      const permsSet = (fn) => perms.length ? `${fn}.default_permissions = discord.Permissions(${perms.map(p => `${p.py}=True`).join(', ')})` : null;
      const cdLines = cd ? [
        `    _w = _cd_ok(${J(n)} + ':' + str(interaction.user.id), ${cd})`,
        `    if _w:`,
        `        await interaction.response.send_message(${J(L('⏳ Espera ', '⏳ Wait '))} + str(_w) + 's', ephemeral=True)`,
        `        return`
      ] : [];
      const acDecor = (fn, opts, k0) => acList.filter(a => opts.some(o => o.name === a.optPY)).map((a, k) =>
        `@${fn}.autocomplete(${J(a.optPY)})
async def _ac_${k0}_${k}(interaction: discord.Interaction, current: str):
    _cur = current.lower()
    _vals = ${J(a.vals)}
    return [app_commands.Choice(name=v, value=v) for v in _vals if _cur in v.lower()][:25]`);
      const mkCmd = (owner, cmdName, cmdDesc, funcName, opts, subName, grpName) => {
        const withSub = Boolean(subs.length);
        const fill = fillSlashPY(opts, withSub);
        const decl = [`@${owner}.command(name=${J(cmdName)}, description=${J(String(cmdDesc || cmdName).slice(0, 100))})`];
        if (opts.length) decl.push(`@app_commands.describe(${opts.map(o => `${o.name}=${J(o.desc)}`).join(', ')})`);
        decl.push(`async def ${funcName}(interaction: discord.Interaction${opts.length ? ', ' + opts.map(o => `${o.name}: ${acByPY.has(o.name) ? 'str' : o.type}`).join(', ') : ''}):`);
        const sendP = (p) => [`await (interaction.response.send_message(${p}) if not _replied else interaction.followup.send(${p}))`, `_replied = True`];
        const hasResp = String(c.respuesta || '').trim();
        const leg = emb ? `${pyEmbedDecl(emb, '    ', fill)}\n    ${sendP('embed=eb').join('\n    ')}`
          : (hasResp ? [`    _out = ${fill(J(c.respuesta))}`, ...sendP('_out').map(l => `    ${l}`)].join('\n') : '');
        const uo = opts.find(o => o.type === 'discord.Member');
        const mPY = uo ? uo.name : null;
        const actCode = (acts || []).map(a => indentPy(a.mod.actPY(a.node.config, { ...slashCtx(a.aidx, null, mPY, fill), sendPYL: sendP }))).join('\n');
        const body = [
          ...(withSub ? [`    _sub = ${J(subName || '')}`, `    _grp = ${J(grpName || '')}`] : []),
          ...cdLines,
          '    _replied = False',
          ...(leg ? [leg] : []),
          ...(actCode ? [actCode] : [])
        ];
        return decl.join('\n') + '\n' + body.join('\n');
      };
      const toPY = (o) => ({ ...o, name: slashOptPY(o.raw), type: acByPY.has(slashOptPY(o.raw)) ? 'str' : (SLASH_TYPES_PY[o.type] || 'str') });
      const out = [];
      if (!subs.length) {
        const opts = slashOptAll(c).map(toPY);
        out.push(mkCmd('tree', n, rootDesc, `_slash_${i}`, opts, '', ''));
        const acs = acDecor(`_slash_${i}`, opts, i);
        if (acs.length) out.push(acs.join('\n\n'));
        const ps = permsSet(`_slash_${i}`);
        if (ps) out.push(ps);
        return out.filter(Boolean).join('\n\n');
      }
      const gVar = `g_${tag}`;
      out.push(`${gVar} = app_commands.Group(name=${J(n)}, description=${J(rootDesc)})`);
      const gps = permsSet(gVar);
      if (gps) out.push(gps);
      const gVars = new Map();
      subs.forEach((s, k) => {
        const funcName = `_sub_${tag}_${k}`;
        let owner = gVar;
        if (s.grupo) {
          if (!gVars.has(s.grupo)) {
            const gv = `${gVar}_${s.grupo}`;
            gVars.set(s.grupo, gv);
            out.push(`${gv} = app_commands.Group(name=${J(s.grupo)}, description=${J(s.grupo.slice(0, 100))})`);
            const gp = permsSet(gv);
            if (gp) out.push(gp);
          }
          owner = gVars.get(s.grupo);
        }
        const opts = parseSubOpts(c.subopciones).filter(o => o.sub === s.name).map(toPY);
        out.push(mkCmd(owner, s.name, s.desc, funcName, opts, s.name, s.grupo));
        const acs = acDecor(funcName, opts, `${tag}_${k}`);
        if (acs.length) out.push(acs.join('\n\n'));
        const ps = permsSet(funcName);
        if (ps) out.push(ps);
      });
      gVars.forEach(gv => out.push(`${gVar}.add_command(${gv})`));
      out.push(`tree.add_command(${gVar})`);
      return out.filter(Boolean).join('\n\n');
    },
    pyMsg: null, pyJoin: null
  },
  {
    id: 'embed', stack: 'both', builtin: true,
    name: { es: 'Embed', en: 'Embed' },
    desc: { es: 'Responde con una tarjeta bonita (título, color, pie).', en: 'Replies with a rich card (title, color, footer).' },
    schema: [
      { key: 'trigger', label: { es: 'Palabra clave', en: 'Keyword' }, def: 'info' },
      { key: 'titulo', label: { es: 'Título', en: 'Title' }, def: 'Mi bot' },
      { key: 'descripcion', label: { es: 'Descripción', en: 'Description' }, def: 'Hecho con CakeIBot' },
      { key: 'color', label: { es: 'Color (rueda o hex)', en: 'Color (wheel or hex)' }, def: '#ffffff', color: true },
      { key: 'autor', label: { es: 'Autor (opcional)', en: 'Author (optional)' }, def: '' },
      { key: 'imagen', label: { es: 'Imagen grande URL (opcional)', en: 'Big image URL (optional)' }, def: '' },
      { key: 'miniatura', label: { es: 'Miniatura URL (opcional)', en: 'Thumbnail URL (optional)' }, def: '' },
      { key: 'campos', label: { es: 'Campos (nombre | valor, uno por línea)', en: 'Fields (name | value, one per line)' }, def: '', multiline: true },
      { key: 'pie', label: { es: 'Pie (opcional)', en: 'Footer (optional)' }, def: '' }
    ],
    js: (c) => `client.on('messageCreate', async (m) => {
  if (m.author.bot || !m.content.toLowerCase().includes(${J(c.trigger.toLowerCase())})) return;
${jsEmbedDecl(c, '  ', fillAutorM)}
  try { await m.reply({ embeds: [_eb] }); } catch (e) { console.error('embed:', e.message); }
});`,
    pyMsg: (c) => `if (${J(String(c.trigger || '').toLowerCase())} in m.content.lower()):
${pyEmbedDecl(c, '    ', fillAutorPY)}
    try:
        await m.reply(embed=eb)
    except Exception as e:
        print('embed:', e)`,
    pyJoin: null,
    actJS(c, C) {
      if (C.t === 'slash') return `  try {\n${jsEmbedDecl(c, '    ', C.efill)}\n    await _send({ embeds: [_eb] });\n  } catch (e) { console.error('embed:', e.message); }`;
      if (C.t === 'join') return `  if (${C.chJS}) {\n${jsEmbedDecl(c, '    ', (e) => fillJoinM(e, C.canal))}\n    try { await ${C.chJS}.send({ embeds: [_eb] }); } catch (e) { console.error('embed:', e.message); }\n  }`;
      return `  try {\n${jsEmbedDecl(c, '    ', fillAutorM)}\n    await m.reply({ embeds: [_eb] });\n  } catch (e) { console.error('embed:', e.message); }`;
    },
    actPY(c, C) {
      if (C.t === 'slash') return `try:\n${indentPy(pyEmbedDecl(c, '', C.efillPY))}\n    await (interaction.response.send_message(embed=eb) if not _replied else interaction.followup.send(embed=eb))\n    _replied = True\nexcept Exception as e:\n    print('embed:', e)`;
      if (C.t === 'join') return `if ${C.chPY}:\n${indentPy(pyEmbedDecl(c, '', (e) => fillJoinPY(e)))}\n    try:\n        await ${C.chPY}.send(embed=eb)\n    except Exception as e:\n        print('embed:', e)`;
      return `try:\n${indentPy(pyEmbedDecl(c, '', fillAutorPY))}\n    await m.reply(embed=eb)\nexcept Exception as e:\n    print('embed:', e)`;
    }
  },
  {
    id: 'prefijo', stack: 'both', builtin: true,
    name: { es: '!Comando', en: '!Command' },
    desc: { es: 'Comando clásico con prefijo (ej. !ping → pong).', en: 'Classic prefix command (e.g. !ping → pong).' },
    schema: [
      { key: 'prefijo', label: { es: 'Prefijo', en: 'Prefix' }, def: '!' },
      { key: 'comando', label: { es: 'Comando', en: 'Command' }, def: 'ping' },
      { key: 'cooldown', label: { es: 'Cooldown en segundos (0 = ninguno)', en: 'Cooldown in seconds (0 = none)' }, def: '0' },
      { key: 'respuesta', label: { es: 'Respuesta', en: 'Reply' }, def: 'pong 🏓' }
    ],
    js: (c, emb, acts, tag) => {
      const fire = `_fire_${tag}`;
      const pre = String(c.prefijo ?? '!');
      const cmd = String(c.comando || '').toLowerCase();
      const cd = parseCD(c.cooldown);
      const gate = cd ? `${fire}Ok` : fire;
      const cdLine = cd ? `  let ${gate} = ${fire};
  if (${fire}) { const _w = _cdOk(${J(pre + cmd + ':')} + m.author.id, ${cd * 1000}); if (_w) { ${gate} = false; m.reply(${J(L('⏳ Espera ', '⏳ Wait '))} + _w + 's').catch(() => {}); } }
` : '';
      const leg = emb ? `${jsEmbedDecl(emb, '    ', fillAutorM)}\n    try { await m.reply({ embeds: [_eb] }); } catch (e) { console.error('cmd:', e.message); }`
        : (String(c.respuesta || '').trim() ? `    try { await m.reply(${fillMsgM(J(c.respuesta))}); } catch (e) { console.error('cmd:', e.message); }` : '');
      const actCode = (acts || []).map(a => `  if (${gate}) {\n${indentJS(a.mod.actJS(a.node.config, msgCtx(a.aidx)), 4)}\n  }`).join('\n');
      return `client.on('messageCreate', async (m) => {
  if (m.author.bot) return;
  const ${fire} = m.content.startsWith(${J(pre)}) && (((m.content.slice(${pre.length}).trim().split(/\\s+/)[0]) || '').toLowerCase() === ${J(cmd)});
${cdLine}${leg ? `  if (${gate}) {\n${leg}\n  }\n` : ''}${actCode ? actCode + '\n' : ''}});`;
    },
    pyMsg: (c, emb, acts, tag) => {
      const fire = `_fire_${tag}`;
      const pre = String(c.prefijo ?? '!');
      const cmd = String(c.comando || '').toLowerCase();
      const cd = parseCD(c.cooldown);
      const gate = cd ? `${fire}Ok` : fire;
      const parts = [
        `_args_${tag} = m.content[len(${J(pre)}):].strip().split()`,
        `${fire} = m.content.startswith(${J(pre)}) and bool(_args_${tag}) and _args_${tag}[0].lower() == ${J(cmd)}`
      ];
      if (cd) parts.push(
        `${gate} = ${fire}`,
        `if ${fire}:`,
        `    _w = _cd_ok(${J(pre + cmd + ':')} + str(m.author.id), ${cd})`,
        `    if _w:`,
        `        ${gate} = False`,
        `        await m.reply(${J(L('⏳ Espera ', '⏳ Wait '))} + str(_w) + 's')`
      );
      if (emb) parts.push(`if ${gate}:\n${indentPy(`${pyEmbedDecl(emb, '', fillAutorPY)}\ntry:\n    await m.reply(embed=eb)\nexcept Exception as e:\n    print('cmd:', e)`)}`);
      else if (String(c.respuesta || '').trim()) parts.push(`if ${gate}:\n${indentPy(`try:\n    await m.reply(${fillMsgPY(J(c.respuesta))})\nexcept Exception as e:\n    print('cmd:', e)`)}`);
      (acts || []).forEach(a => parts.push(`if ${gate}:\n${indentPy(a.mod.actPY(a.node.config, msgCtxPY(a.aidx)))}`));
      return parts.join('\n');
    },
    pyJoin: null
  },
  {
    id: 'despedida', stack: 'both', builtin: true,
    name: { es: 'Despedida', en: 'Farewell' },
    desc: { es: 'Despide a quien sale del servidor.', en: 'Says goodbye to leaving members.' },
    schema: [
      { key: 'canal', label: { es: 'Nombre del canal', en: 'Channel name' }, def: 'general' },
      { key: 'mensaje', label: { es: 'Mensaje (usa {usuario})', en: 'Message (use {usuario})' }, def: 'Adiós {usuario} 👋' }
    ],
    js: (c, emb, acts, tag) => {
      const chActs = (acts || []).filter(a => ['embed', 'reply'].includes(a.mod.id));
      const otherActs = (acts || []).filter(a => !['embed', 'reply'].includes(a.mod.id));
      const chCode = chActs.map(a => indentJS(a.mod.actJS(a.node.config, joinCtx(a.aidx, tag, c.canal)), 4)).join('\n');
      const otherCode = otherActs.map(a => a.mod.actJS(a.node.config, joinCtx(a.aidx, tag, c.canal))).join('\n');
      return `client.on('guildMemberRemove', async (member) => {
  const ch = member.guild.channels.cache.find(x => x.name === ${J(c.canal)} && x.isTextBased());
  if (!ch) console.error('canal no encontrado: ' + ${J(c.canal)});
  else {
    const txt = ${fillJoinM(J(c.mensaje), c.canal)};
    try { await ch.send(txt); } catch (e) { console.error('bye:', e.message); }
${chCode ? chCode + '\n' : ''}  }
${otherCode ? otherCode + '\n' : ''}});`;
    },
    pyMsg: null, pyJoin: null,
    pyLeave: (c, emb, acts, tag) => {
      const chActs = (acts || []).filter(a => ['embed', 'reply'].includes(a.mod.id));
      const otherActs = (acts || []).filter(a => !['embed', 'reply'].includes(a.mod.id));
      const parts = [
        `_ch_${tag} = discord.utils.get(member.guild.text_channels, name=${J(c.canal)})`,
        `if not _ch_${tag}:`,
        `    print('canal no encontrado: ' + ${J(c.canal)})`,
        `else:`,
        `    txt = ${fillJoinPY(J(c.mensaje))}`,
        `    try:`,
        `        await _ch_${tag}.send(txt)`,
        `    except Exception as e:`,
        `        print('bye:', e)`
      ];
      chActs.forEach(a => parts.push(...`if _ch_${tag}:\n${indentPy(a.mod.actPY(a.node.config, joinCtx(a.aidx, tag, c.canal)))}`.split('\n')));
      otherActs.forEach(a => parts.push(...a.mod.actPY(a.node.config, joinCtx(a.aidx, tag, c.canal)).split('\n')));
      return parts.join('\n');
    }
  },
  {
    id: 'estado', stack: 'both', builtin: true,
    name: { es: 'Estado', en: 'Status' },
    desc: { es: 'Lo que el bot muestra que está haciendo.', en: 'What the bot shows it is doing.' },
    schema: [
      { key: 'texto', label: { es: 'Texto', en: 'Text' }, def: 'con módulos' },
      { key: 'tipo', label: { es: 'Tipo (jugando/viendo/escuchando)', en: 'Type (playing/watching/listening)' }, def: 'jugando' }
    ],
    js: (c) => {
      const map = { jugando: 'Playing', viendo: 'Watching', escuchando: 'Listening', compitiendo: 'Competing', playing: 'Playing', watching: 'Watching', listening: 'Listening', competing: 'Competing' };
      const at = map[String(c.tipo || '').toLowerCase()] || 'Playing';
      return `const { ActivityType } = require('discord.js');
client.once('ready', () => {
  try { client.user.setActivity(${J(c.texto)}, { type: ActivityType.${at} }); } catch (e) { console.error('status:', e.message); }
});`;
    },
    pyMsg: null, pyJoin: null,
    pyReady: (c) => {
      const map = { jugando: 'playing', viendo: 'watching', escuchando: 'listening', compitiendo: 'competing', playing: 'playing', watching: 'watching', listening: 'listening', competing: 'competing' };
      const at = map[String(c.tipo || '').toLowerCase()] || 'playing';
      return `try:
    await client.change_presence(activity=discord.Activity(type=discord.ActivityType.${at}, name=${J(c.texto)}))
except Exception as e:
    print('status:', e)`;
    }
  },
  {
    id: 'anuncio', stack: 'both', builtin: true,
    name: { es: 'Anuncio', en: 'Announcer' },
    desc: { es: 'Envía un mensaje a un canal cada X minutos.', en: 'Sends a message to a channel every X minutes.' },
    schema: [
      { key: 'canal', label: { es: 'Nombre del canal', en: 'Channel name' }, def: 'anuncios' },
      { key: 'mensaje', label: { es: 'Mensaje', en: 'Message' }, def: '📢 ¡Recordatorio!' },
      { key: 'minutos', label: { es: 'Cada cuántos minutos', en: 'Every how many minutes' }, def: '60' }
    ],
    js: (c) => {
      const min = Math.max(1, parseInt(c.minutos, 10) || 60);
      return `setInterval(async () => {
  for (const [, g] of client.guilds.cache) {
    const ch = g.channels.cache.find(x => x.name === ${J(c.canal)} && x.isTextBased());
    if (ch) { try { await ch.send(${J(c.mensaje)}); } catch (e) { console.error('anuncio:', e.message); } }
  }
}, ${min * 60000}); // cada ${min} min`;
    },
    pyMsg: null, pyJoin: null,
    pyLoop: (c, i) => {
      const min = Math.max(1, parseInt(c.minutos, 10) || 60);
      return `@tasks.loop(minutes=${min})
async def _anuncio_${i}():
    for g in client.guilds:
        ch = discord.utils.get(g.text_channels, name=${J(c.canal)})
        if ch:
            try:
                await ch.send(${J(c.mensaje)})
            except Exception as e:
                print('anuncio:', e)

@_anuncio_${i}.before_loop
async def _anuncio_${i}_wait():
    await client.wait_until_ready()

_anuncio_${i}.start()`;
    }
  },
  {
    id: 'api', stack: 'both', builtin: true,
    name: { es: 'API', en: 'API' },
    desc: { es: 'Llama a una API web y responde con el dato ({valor}).', en: 'Calls a web API and replies with the data ({valor}).' },
    schema: [
      { key: 'trigger', label: { es: 'Palabra clave', en: 'Keyword' }, def: 'precio' },
      { key: 'url', label: { es: 'URL de la API (GET/POST JSON)', en: 'API URL (GET/POST JSON)' }, def: 'https://api.coindesk.com/v1/bpi/currentprice.json' },
      { key: 'metodo', label: { es: 'Método (GET o POST)', en: 'Method (GET or POST)' }, def: 'GET' },
      { key: 'cuerpo', label: { es: 'Cuerpo POST en JSON (opcional)', en: 'POST body as JSON (optional)' }, def: '', multiline: true },
      { key: 'ruta', label: { es: 'Ruta del dato (ej. bpi.USD.rate)', en: 'Data path (e.g. bpi.USD.rate)' }, def: 'bpi.USD.rate' },
      { key: 'plantilla', label: { es: 'Respuesta (usa {valor} y {autor})', en: 'Reply (use {valor} and {autor})' }, def: '💰 BTC: {valor}' }
    ],
    js: (c) => {
      const method = String(c.metodo || 'GET').toUpperCase() === 'POST' ? 'POST' : 'GET';
      return `client.on('messageCreate', async (m) => {
  if (m.author.bot || !m.content.toLowerCase().includes(${J(c.trigger.toLowerCase())})) return;
  try {
    const _r = await fetch(${J(c.url)}, { method: ${J(method)}, headers: { 'Content-Type': 'application/json', 'User-Agent': 'CakeIBot' }${method === 'POST' && c.cuerpo ? `, body: ${J(c.cuerpo)}` : ''} });
    const _j = await _r.json();
    let _v = _j;
    for (const _k of ${J(c.ruta)}.split('.')) _v = (_v && typeof _v === 'object') ? _v[_k] : undefined;
    const _t = ${J(c.plantilla)}.split('{valor}').join(String(_v ?? '?')).split('{autor}').join('<@' + m.author.id + '>');
    await m.reply(_t.slice(0, 2000));
  } catch (e) { console.error('api:', e.message); try { await m.reply('⚠️ No pude consultar la API.'); } catch (_) {} }
});`;
    },
    pyMsg: (c) => {
      const method = String(c.metodo || 'GET').toUpperCase() === 'POST' ? 'POST' : 'GET';
      return `if (${J(c.trigger.toLowerCase())} in m.content.lower()):
        try:
            _j = await asyncio.to_thread(_api_call, ${J(c.url)}, ${J(method)}, ${J(method === 'POST' && c.cuerpo ? c.cuerpo : '')})
            _v = _j
            for _k in ${J(c.ruta)}.split('.'):
                _v = _v.get(_k) if isinstance(_v, dict) else None
            _t = ${J(c.plantilla)}.replace('{valor}', str(_v if _v is not None else '?')).replace('{autor}', m.author.mention)
            await m.reply(_t[:2000])
        except Exception as e:
            print('api:', e)
            try:
                await m.reply('⚠️ No pude consultar la API.')
            except Exception:
                pass`;
    },
    pyJoin: null
  },
  {
    id: 'archivo', stack: 'both', builtin: true,
    name: { es: 'Foto/Archivo', en: 'Photo/File' },
    desc: { es: 'Envía una imagen o archivo (URL o ruta local).', en: 'Sends a photo or file (URL or local path).' },
    schema: [
      { key: 'trigger', label: { es: 'Palabra clave', en: 'Keyword' }, def: 'foto' },
      { key: 'fuente', label: { es: 'URL o ruta del archivo', en: 'File URL or path' }, def: 'https://picsum.photos/600' },
      { key: 'texto', label: { es: 'Texto que acompaña (opcional)', en: 'Caption (optional)' }, def: '' }
    ],
    js: (c) => `client.on('messageCreate', async (m) => {
  if (m.author.bot || !m.content.toLowerCase().includes(${J(c.trigger.toLowerCase())})) return;
  const _src = ${J(c.fuente)};
  try {
    if (_src.startsWith('http')) {
      const { EmbedBuilder } = require('discord.js');
      await m.reply({ content: ${J(c.texto)}, embeds: [new EmbedBuilder().setImage(_src)] });
    } else {
      const { AttachmentBuilder } = require('discord.js');
      await m.reply({ content: ${J(c.texto)}, files: [new AttachmentBuilder(_src)] });
    }
  } catch (e) { console.error('file:', e.message); }
});`,
    pyMsg: (c) => `if (${J(c.trigger.toLowerCase())} in m.content.lower()):
        _src = ${J(c.fuente)}
        try:
            if _src.startswith('http'):
                _eb = discord.Embed()
                _eb.set_image(url=_src)
                await m.reply(content=${J(c.texto)}, embed=_eb)
            else:
                await m.reply(content=${J(c.texto)}, file=discord.File(_src))
        except Exception as e:
            print('file:', e)`,
    pyJoin: null
  },
  // ================= ACCIONES (van conectadas tras un disparador) =================
  {
    id: 'reply', kind: 'action', stack: 'both', builtin: true,
    name: { es: 'Responder texto', en: 'Reply text' },
    desc: { es: 'Envía un texto (vale {autor}, {opcion}…).', en: 'Sends a text (supports {autor}, {option}…).' },
    schema: [
      { key: 'texto', label: { es: 'Texto', en: 'Text' }, def: '', multiline: true }
    ],
    actJS(c, C) {
      if (!String(c.texto || '').trim()) return '';
      if (C.t === 'slash') return `  try { await _send(_fill(${J(c.texto)})); } catch (e) { console.error('reply:', e.message); }`;
      if (C.t === 'join') return `  try { if (${C.chJS}) await ${C.chJS}.send(${fillJoinM(J(c.texto), C.canal)}); } catch (e) { console.error('reply:', e.message); }`;
      return `  try { await m.reply(${fillMsgM(J(c.texto))}); } catch (e) { console.error('reply:', e.message); }`;
    },
    actPY(c, C) {
      if (!String(c.texto || '').trim()) return '';
      if (C.t === 'slash') return `try:\n    await (interaction.response.send_message(${C.fillPY(J(c.texto))}) if not _replied else interaction.followup.send(${C.fillPY(J(c.texto))}))\n    _replied = True\nexcept Exception as e:\n    print('reply:', e)`;
      if (C.t === 'join') return `try:\n    if ${C.chPY}:\n        await ${C.chPY}.send(${fillJoinPY(J(c.texto))})\nexcept Exception as e:\n    print('reply:', e)`;
      return `try:\n    await m.reply(${fillMsgPY(J(c.texto))})\nexcept Exception as e:\n    print('reply:', e)`;
    }
  },
  {
    id: 'kick', kind: 'action', stack: 'both', builtin: true,
    name: { es: 'Expulsar', en: 'Kick' },
    desc: { es: 'Expulsa al objetivo (/kick con flujo).', en: 'Kicks the target (flow /kick).' },
    schema: [
      { key: 'objetivo', label: { es: 'Objetivo (autor o mencionado)', en: 'Target (autor o mencionado)' }, def: 'mencionado' },
      { key: 'motivo', label: { es: 'Motivo (opcional)', en: 'Reason (optional)' }, def: '' }
    ],
    actJS(c, C) { return modActionJS('kick', c, C, 'KickMembers', (tm) => c.motivo ? `${tm}.kick(${J(c.motivo)})` : `${tm}.kick()`, '👢', L('expulsado', 'kicked')); },
    actPY(c, C) { return modActionPY('kick', c, C, 'kick_members', (tm) => c.motivo ? `${tm}.kick(reason=${J(c.motivo)})` : `${tm}.kick()`, '👢', L('expulsado', 'kicked')); }
  },
  {
    id: 'ban', kind: 'action', stack: 'both', builtin: true,
    name: { es: 'Banear', en: 'Ban' },
    desc: { es: 'Banea al objetivo.', en: 'Bans the target.' },
    schema: [
      { key: 'objetivo', label: { es: 'Objetivo (autor o mencionado)', en: 'Target (autor o mencionado)' }, def: 'mencionado' },
      { key: 'motivo', label: { es: 'Motivo (opcional)', en: 'Reason (optional)' }, def: '' },
      { key: 'borrar', label: { es: 'Borrar mensajes (días 0-7)', en: 'Delete messages (days 0-7)' }, def: '1' }
    ],
    actJS(c, C) {
      const d = Math.min(7, Math.max(0, parseInt(c.borrar, 10) || 0));
      const o = [];
      if (c.motivo) o.push(`reason: ${J(c.motivo)}`);
      if (d) o.push(`deleteMessageSeconds: ${d * 86400}`);
      return modActionJS('ban', c, C, 'BanMembers', (tm) => `${tm}.ban({ ${o.join(', ')} })`, '🔨', L('baneado', 'banned'));
    },
    actPY(c, C) {
      const d = Math.min(7, Math.max(0, parseInt(c.borrar, 10) || 0));
      const o = [];
      if (c.motivo) o.push(`reason=${J(c.motivo)}`);
      if (d) o.push(`delete_message_days=${d}`);
      return modActionPY('ban', c, C, 'ban_members', (tm) => `${tm}.ban(${o.join(', ')})`, '🔨', L('baneado', 'banned'));
    }
  },
  {
    id: 'timeout', kind: 'action', stack: 'both', builtin: true, needs: ['datetime'],
    name: { es: 'Aislar', en: 'Timeout' },
    desc: { es: 'Aísla al objetivo X minutos.', en: 'Times out the target for X minutes.' },
    schema: [
      { key: 'objetivo', label: { es: 'Objetivo (autor o mencionado)', en: 'Target (autor o mencionado)' }, def: 'mencionado' },
      { key: 'minutos', label: { es: 'Minutos', en: 'Minutes' }, def: '10' },
      { key: 'motivo', label: { es: 'Motivo (opcional)', en: 'Reason (optional)' }, def: '' }
    ],
    actJS(c, C) {
      const m_ = Math.max(1, parseInt(c.minutos, 10) || 10);
      return modActionJS('timeout', c, C, 'ModerateMembers', (tm) => c.motivo ? `${tm}.timeout(${m_ * 60000}, ${J(c.motivo)})` : `${tm}.timeout(${m_ * 60000})`, '⏳', L(`aislado ${m_} min`, `timed out ${m_} min`));
    },
    actPY(c, C) {
      const m_ = Math.max(1, parseInt(c.minutos, 10) || 10);
      return modActionPY('timeout', c, C, 'moderate_members', (tm) => c.motivo ? `${tm}.timeout(datetime.timedelta(minutes=${m_}), reason=${J(c.motivo)})` : `${tm}.timeout(datetime.timedelta(minutes=${m_}))`, '⏳', L(`aislado ${m_} min`, `timed out ${m_} min`));
    }
  },
  {
    id: 'addrole', kind: 'action', stack: 'both', builtin: true,
    name: { es: 'Dar rol', en: 'Add role' },
    desc: { es: 'Da un rol al objetivo.', en: 'Gives a role to the target.' },
    schema: [
      { key: 'objetivo', label: { es: 'Objetivo (autor o mencionado)', en: 'Target (autor o mencionado)' }, def: 'autor' },
      { key: 'rol', label: { es: 'Nombre del rol', en: 'Role name' }, def: '' }
    ],
    actJS(c, C) { return roleActionJS('addrole', c, C, 'add'); },
    actPY(c, C) { return roleActionPY('addrole', c, C, 'add'); }
  },
  {
    id: 'removerole', kind: 'action', stack: 'both', builtin: true,
    name: { es: 'Quitar rol', en: 'Remove role' },
    desc: { es: 'Quita un rol al objetivo.', en: 'Removes a role from the target.' },
    schema: [
      { key: 'objetivo', label: { es: 'Objetivo (autor o mencionado)', en: 'Target (autor o mencionado)' }, def: 'autor' },
      { key: 'rol', label: { es: 'Nombre del rol', en: 'Role name' }, def: '' }
    ],
    actJS(c, C) { return roleActionJS('removerole', c, C, 'remove'); },
    actPY(c, C) { return roleActionPY('removerole', c, C, 'remove'); }
  },
  {
    id: 'botones', kind: 'action', stack: 'both', builtin: true,
    name: { es: 'Botones y menú', en: 'Buttons & menu' },
    desc: { es: 'Envía botones o un menú desplegable y responde al usarlos.', en: 'Sends buttons or a dropdown and replies when used.' },
    schema: [
      { key: 'texto', label: { es: 'Texto del mensaje (opcional)', en: 'Message text (optional)' }, def: 'Elige una opción 👇' },
      { key: 'botones', label: { es: 'Botones (etiqueta | id | respuesta)', en: 'Buttons (label | id | reply)' }, def: 'Rojo | rojo | ¡Elegiste rojo! ❤️', multiline: true },
      { key: 'menu', label: { es: 'Menú (placeholder | id | opción1, opción2 | respuesta)', en: 'Menu (placeholder | id | option1, option2 | reply)' }, def: '', multiline: true }
    ],
    actJS(c, C) {
      const btns = parseButtons(c.botones), menus = parseMenus(c.menu);
      if (!btns.length && !menus.length) return '';
      const T = C.tag;
      const expr = String(c.texto || '').trim()
        ? (C.t === 'slash' ? `_fill(${J(c.texto)})` : (C.t === 'join' ? fillJoinM(J(c.texto), C.canal) : fillMsgM(J(c.texto))))
        : '';
      const L = [];
      L.push(`    const _rows_${T} = [];`);
      if (btns.length) {
        L.push(`    const _bl_${T} = [${btns.map(b => `{ l: ${J(b.label)}, i: ${J(b.id)} }`).join(', ')}];`);
        L.push(`    for (let k = 0; k < _bl_${T}.length; k += 5) {`);
        L.push(`      const _r_${T} = new ActionRowBuilder();`);
        L.push(`      _bl_${T}.slice(k, k + 5).forEach(b => _r_${T}.addComponents(new ButtonBuilder().setCustomId(b.i).setLabel(b.l).setStyle(ButtonStyle.Primary)));`);
        L.push(`      _rows_${T}.push(_r_${T});`);
        L.push(`    }`);
      }
      menus.forEach((mn, k) => {
        L.push(`    const _sel_${T}_${k} = new StringSelectMenuBuilder().setCustomId(${J(mn.id)})${mn.ph ? `.setPlaceholder(${J(mn.ph)})` : ''}.addOptions([${mn.opts.map(o => `{ label: ${J(String(o).slice(0, 100))}, value: ${J(String(o).slice(0, 100))} }`).join(', ')}]);`);
        L.push(`    _rows_${T}.push(new ActionRowBuilder().addComponents(_sel_${T}_${k}));`);
      });
      L.push(`    const _pl_${T} = { components: _rows_${T} };`);
      if (expr) L.push(`    _pl_${T}.content = ${expr};`);
      const send = C.t === 'slash' ? `_send(_pl_${T})`
        : (C.t === 'join' ? `${C.chJS}.send(_pl_${T})` : `m.reply(_pl_${T})`);
      L.push(`    await ${send};`);
      let body = L.join('\n');
      if (C.t === 'join') body = `    if (${C.chJS}) {\n${indentJS(body, 2)}\n    }`;
      return `  try {\n${body}\n  } catch (e) { console.error('botones:', e.message); }`;
    },
    actPY(c, C) {
      const btns = parseButtons(c.botones), menus = parseMenus(c.menu);
      if (!btns.length && !menus.length) return '';
      const fill = (s) => {
        if (C.t === 'slash') return (C.fillPY || ((x) => x))(J(s));
        if (C.t === 'join') return fillJoinPY(J(s));
        return fillMsgPY(J(s));
      };
      const args = String(c.texto || '').trim() ? fill(c.texto) : '';
      const send = C.t === 'slash'
        ? `await (interaction.response.send_message(${args ? args + ', ' : ''}view=_view) if not _replied else interaction.followup.send(${args ? args + ', ' : ''}view=_view))\n    _replied = True`
        : (C.t === 'join' ? `await ${C.chPY}.send(${args ? args + ', ' : ''}view=_view)` : `await m.reply(${args ? args + ', ' : ''}view=_view)`);
      const L = ['try:', '    _view = discord.ui.View()'];
      btns.forEach((b, k) => {
        L.push(`    _b${k} = discord.ui.Button(label=${J(b.label)}, custom_id=${J(b.id)}, style=discord.ButtonStyle.primary)`);
        L.push(`    async def _bc${k}(interaction):`);
        L.push(b.resp ? `        await interaction.response.send_message(${fill(b.resp)})` : '        await interaction.response.defer()');
        L.push(`    _b${k}.callback = _bc${k}`);
        L.push(`    _view.add_item(_b${k})`);
      });
      menus.forEach((mn, k) => {
        L.push(`    _s${k} = discord.ui.Select(placeholder=${J(mn.ph || ' ')}, custom_id=${J(mn.id)}, options=[${mn.opts.map(o => `discord.SelectOption(label=${J(String(o).slice(0, 100))}, value=${J(String(o).slice(0, 100))})`).join(', ')}])`);
        L.push(`    async def _sc${k}(interaction):`);
        if (mn.resp) {
          const r = `${fill(mn.resp)}.replace('{elegido}', ', '.join(interaction.data.get('values') or []))`;
          L.push(`        await interaction.response.send_message(${r})`);
        } else L.push('        await interaction.response.defer()');
        L.push(`    _s${k}.callback = _sc${k}`);
        L.push(`    _view.add_item(_s${k})`);
      });
      L.push(`    ${send}`);
      let body = L.join('\n');
      if (C.t === 'join') body = `    if ${C.chPY}:\n${indentPy(body, 4)}`;
      return `${body}\nexcept Exception as e:\n    print('botones:', e)`;
    }
  }
];

function allModules(stack) {
  return [...BUILTINS.filter(m => m.stack === 'both' || m.stack === stack),
    ...customMods.filter(m => m.stack === stack || m.stack === 'both')];
}
function findMod(stack, modId) {
  return allModules(stack).find(m => m.id === modId);
}
function defaultConfig(mod) {
  const c = {};
  (mod.schema || []).forEach(f => c[f.key] = f.def ?? '');
  return c;
}

// ---------- iconos de nodo (estilo n8n) ----------
const ICON = {
  responder: '💬', prefijo: '⌨️', slash: '⚡', bienvenida: '👋', despedida: '🛫',
  moderacion: '🛡️', consola: '🖥️', embed: '🧩', estado: '🟢', anuncio: '📣',
  api: '🌐', archivo: '📎', reply: '↩️', kick: '🚪', ban: '⛔',
  timeout: '⏱️', addrole: '➕', removerole: '➖', botones: '🔘'
};
const modIcon = (m) => (m && (m.icon || ICON[m.id])) || '◆';
// agrupación Disparadores / Acciones (para librería y picker)
function groupMods(mods) {
  return [['trigger', 'hybrid', 'libTrig'], ['action', null, 'libAct']]
    .map(([k1, k2, label]) => [t(label), mods.filter(m => modKind(m) === k1 || (k2 && modKind(m) === k2))])
    .filter(([, g]) => g.length);
}

// ---------- intro flow ----------
const ball = document.getElementById('ball');
const helloText = document.getElementById('hello-text');
function playIntro(lang) {
  LANG = lang; save(LS_LANG, lang); applyUI(); show('anim-screen');
  ball.classList.remove('falling', 'expand');
  helloText.classList.remove('show');
  helloText.textContent = STR[LANG].hello;
  void ball.offsetWidth;
  requestAnimationFrame(() => ball.classList.add('falling'));
}
ball.addEventListener('animationend', (e) => {
  if (e.animationName === 'fall') {
    ball.classList.add('expand');
    setTimeout(() => helloText.classList.add('show'), 250);
    setTimeout(() => show('stack-screen'), 2100);
  }
});
document.getElementById('btn-es').addEventListener('click', () => playIntro('es'));
document.getElementById('btn-en').addEventListener('click', () => playIntro('en'));
document.getElementById('btn-js').addEventListener('click', () => { pendingStack = 'js'; openBotModal(true); });
document.getElementById('btn-py').addEventListener('click', () => { pendingStack = 'py'; openBotModal(true); });

// ---------- dashboard ----------
let pendingStack = 'js';
const botModal = document.getElementById('bot-modal');
function openBotModal(hideStack) {
  document.getElementById('nb-js').classList.toggle('active', pendingStack === 'js');
  document.getElementById('nb-py').classList.toggle('active', pendingStack === 'py');
  // Si el stack ya viene elegido (pantalla JS/Python), no se pregunta otra vez
  document.getElementById('nb-stack-row').style.display = hideStack ? 'none' : 'flex';
  botModal.classList.add('open');
}
document.getElementById('nb-js').addEventListener('click', () => { pendingStack = 'js'; openBotModal(false); });
document.getElementById('nb-py').addEventListener('click', () => { pendingStack = 'py'; openBotModal(false); });
document.getElementById('btn-new-bot').addEventListener('click', () => { pendingStack = 'js'; openBotModal(false); });
document.getElementById('nb-cancel').addEventListener('click', () => botModal.classList.remove('open'));
document.getElementById('nb-create').addEventListener('click', () => {
  const name = document.getElementById('nb-name').value.trim();
  if (!name) { logLine(t('needName'), 'err'); return; }
  const token = document.getElementById('nb-token').value.trim();
  const p = { id: uid(), name, stack: pendingStack, token, botInfo: verifiedInfo && verifiedToken === token ? verifiedInfo : null, nodes: [], edges: [] };
  projects.push(p); persist();
  document.getElementById('nb-name').value = '';
  document.getElementById('nb-token').value = '';
  hidePreview();
  botModal.classList.remove('open');
  openProject(p.id);
});
document.getElementById('dash-back').addEventListener('click', () => show('stack-screen'));

// Verificación en vivo del token → preview con foto y nombre
let verifiedInfo = null, verifiedToken = '', verifyTimer = null;
function hidePreview() {
  document.getElementById('nb-preview').classList.add('hidden');
  document.getElementById('nb-error').classList.add('hidden');
  document.getElementById('nb-spin').classList.remove('on');
  verifiedInfo = null; verifiedToken = '';
}
document.getElementById('nb-token').addEventListener('input', (e) => {
  clearTimeout(verifyTimer);
  hidePreview();
  const token = e.target.value.trim();
  if (token.length < 20) return;
  document.getElementById('nb-preview').classList.remove('hidden');
  document.getElementById('nb-spin').classList.add('on');
  verifyTimer = setTimeout(async () => {
    const r = await fetchBotInfo(token);
    document.getElementById('nb-spin').classList.remove('on');
    if (r.ok) {
      verifiedInfo = r.info; verifiedToken = token;
      document.getElementById('nb-avatar').src = avatarURL(r.info, 128);
      document.getElementById('nb-botname').textContent = botName(r.info);
      document.getElementById('nb-botid').textContent = '@' + r.info.username + ' · ' + r.info.id;
    } else {
      document.getElementById('nb-preview').classList.add('hidden');
      const err = document.getElementById('nb-error');
      err.textContent = t('badToken');
      err.classList.remove('hidden');
    }
  }, 700);
});

function renderProjects() {
  const grid = document.getElementById('project-grid');
  grid.innerHTML = '';
  document.getElementById('dash-empty').style.display = projects.length ? 'none' : 'block';
  projects.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'card' + (isRunning(p.id) ? ' live' : '');
    card.style.animationDelay = (i * 0.06) + 's';
    card.innerHTML = `<div class="card-top"><img class="card-ava" alt="" style="display:none" /><strong></strong><span class="pill">${p.stack.toUpperCase()}</span></div>
      <div class="card-sub">${isRunning(p.id) ? '<span class="live-dot"></span>' : ''}${p.nodes.length} ✦ · ${isRunning(p.id) ? '▶' : (p.token ? '●' : '○')}</div>
      <div class="card-row">
        <button class="ghost-btn mini solid" data-a="open">${t('open')}</button>
        <div class="row2">
          <button class="ghost-btn mini" data-a="dup">${t('dup')}</button>
          <button class="ghost-btn mini danger" data-a="del">✕</button>
        </div>
      </div>`;
    card.querySelector('strong').textContent = p.name;
    if (p.botInfo && p.botInfo.avatar) {
      const im = card.querySelector('.card-ava');
      im.src = avatarURL(p.botInfo, 64); im.style.display = 'block';
    }
    card.querySelector('[data-a="open"]').addEventListener('click', () => openProject(p.id));
    card.querySelector('[data-a="dup"]').addEventListener('click', () => {
      const c = JSON.parse(JSON.stringify(p));
      c.id = uid(); c.name = p.name + ' 2';
      projects.push(c); persist(); renderProjects();
    });
    card.querySelector('[data-a="del"]').addEventListener('click', () => {
      if (current && current.id === p.id) { stopBot(false, p.id); current = null; }
      else stopBot(false, p.id);
      projects = projects.filter(x => x.id !== p.id);
      persist(); renderProjects();
    });
    grid.appendChild(card);
  });
}

// ---------- editor ----------
const canvas = document.getElementById('canvas');
const edgesSvg = document.getElementById('edges');
const vpEl = document.getElementById('vp');
const edgeTools = document.getElementById('edge-tools');
let selected = null, pendingEdge = null;

// ---- vista: pan + zoom (estilo n8n) ----
let zoom = 1, panX = 0, panY = 0;
const ZMIN = 0.35, ZMAX = 2.2;
function applyView() {
  vpEl.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
  const wrap = canvas.parentElement;
  const g = Math.max(8, 24 * zoom);
  wrap.style.backgroundSize = `${g}px ${g}px`;
  wrap.style.backgroundPosition = `${(panX % g + g) % g}px ${(panY % g + g) % g}px`;
  const zv = document.getElementById('z-val');
  if (zv) zv.textContent = Math.round(zoom * 100) + '%';
}
function toWorld(clientX, clientY) {
  const r = canvas.getBoundingClientRect();
  return { x: (clientX - r.left - panX) / zoom, y: (clientY - r.top - panY) / zoom };
}
function viewCenterWorld() {
  const r = canvas.getBoundingClientRect();
  return { x: (r.width / 2 - panX) / zoom, y: (r.height / 2 - panY) / zoom };
}
function zoomAt(clientX, clientY, factor) {
  const r = canvas.getBoundingClientRect();
  const mx = clientX - r.left, my = clientY - r.top;
  const nz = Math.min(ZMAX, Math.max(ZMIN, zoom * factor));
  if (nz === zoom) return;
  const wx = (mx - panX) / zoom, wy = (my - panY) / zoom;
  zoom = nz;
  panX = mx - wx * zoom; panY = my - wy * zoom;
  applyView(); drawEdges(); drawMini();
}
function zoomStep(f) {
  const r = canvas.getBoundingClientRect();
  zoomAt(r.left + r.width / 2, r.top + r.height / 2, f);
}
function fitView() {
  const r = canvas.getBoundingClientRect();
  const ns = current ? current.nodes : [];
  if (!ns.length) { zoom = 1; panX = 0; panY = 0; applyView(); drawEdges(); drawMini(); return; }
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  ns.forEach(n => {
    x0 = Math.min(x0, n.x - 14); y0 = Math.min(y0, n.y - 14);
    x1 = Math.max(x1, n.x + 214); y1 = Math.max(y1, n.y + 110);
  });
  const bw = x1 - x0, bh = y1 - y0;
  zoom = Math.min(ZMAX, Math.max(ZMIN, Math.min((r.width - 64) / bw, (r.height - 64) / bh)));
  panX = (r.width - bw * zoom) / 2 - x0 * zoom;
  panY = (r.height - bh * zoom) / 2 - y0 * zoom;
  applyView(); drawEdges(); drawMini();
}

// ---- deshacer / rehacer ----
let undoStack = [], redoStack = [];
const snap = () => JSON.stringify({ n: current ? current.nodes : [], e: current ? current.edges : [] });
function pushUndo(before) {
  if (!current || typeof before !== 'string') return;
  if (before === snap()) return;
  undoStack.push(before);
  if (undoStack.length > 80) undoStack.shift();
  redoStack.length = 0;
  updateUndoUI();
}
function restoreSnap(str) {
  const s = JSON.parse(str);
  current.nodes = s.n; current.edges = s.e;
  if (selected && !current.nodes.some(n => n.uid === selected)) selected = null;
  if (pendingEdge && !current.nodes.some(n => n.uid === pendingEdge)) pendingEdge = null;
  persist(); renderCanvas(); renderConfig(); updateMeta();
}
function undo() {
  if (!current || !undoStack.length) { toast(t('tNoUndo'), 'err'); return; }
  redoStack.push(snap());
  restoreSnap(undoStack.pop());
  updateUndoUI(); toast(t('tUndone'));
}
function redo() {
  if (!current || !redoStack.length) { toast(t('tNoRedo'), 'err'); return; }
  undoStack.push(snap());
  restoreSnap(redoStack.pop());
  updateUndoUI(); toast(t('tRedone'));
}
function updateUndoUI() {
  const u = document.getElementById('btn-undo'), r = document.getElementById('btn-redo');
  if (u) u.disabled = !undoStack.length;
  if (r) r.disabled = !redoStack.length;
}
function updateMeta() {
  const el = document.getElementById('flow-meta');
  if (!el) return;
  if (!current) { el.textContent = ''; return; }
  const f = t('meta');
  el.textContent = typeof f === 'function' ? f(current.nodes.length, current.edges.length) : '';
}

function openProject(id) {
  current = projects.find(p => p.id === id);
  if (!current) return;
  // multi-bot: al abrir no se detiene nada, solo se sincroniza el estado
  refreshRunning();
  selected = null; pendingEdge = null;
  undoStack = []; redoStack = []; updateUndoUI();
  zoom = 1; panX = 0; panY = 0; applyView();
  closePicker();
  renderTopbar();
  document.getElementById('logs-body').textContent = '';
  renderLibrary(); renderCanvas(); renderConfig();
  show('editor-screen');
  requestAnimationFrame(() => { if (current.nodes.length) fitView(); drawMini(); });
}

// Chip del bot en el topbar (foto + nombre) + ficha completa
function renderTopbar() {
  if (!current) return;
  document.getElementById('ed-name').textContent = (current.botInfo && botName(current.botInfo)) || current.name;
  const av = document.getElementById('ed-avatar');
  if (current.botInfo && current.botInfo.avatar) { av.src = avatarURL(current.botInfo, 64); av.style.display = 'block'; }
  else av.style.display = 'none';
  updateMeta();
}
const infoModal = document.getElementById('info-modal');
document.getElementById('ed-botchip').addEventListener('click', () => {
  if (!current) return;
  const info = current.botInfo;
  document.getElementById('ib-name').textContent = (info && botName(info)) || current.name;
  document.getElementById('ib-id').textContent = info ? ('@' + info.username + ' · ' + info.id) : '—';
  const av = document.getElementById('ib-avatar');
  if (info && info.avatar) { av.src = avatarURL(info, 256); av.style.display = 'block'; } else av.style.display = 'none';
  const bn = document.getElementById('ib-banner');
  const bu = bannerURL(info);
  if (bu) { bn.src = bu; bn.classList.remove('hidden'); } else bn.classList.add('hidden');
  document.getElementById('ib-token').value = current.token || '';
  document.getElementById('ib-error').classList.add('hidden');
  infoModal.classList.add('open');
});
document.getElementById('ib-cancel').addEventListener('click', () => infoModal.classList.remove('open'));
document.getElementById('ib-save').addEventListener('click', async () => {
  if (!current) return;
  const token = document.getElementById('ib-token').value.trim();
  current.token = token;
  const r = await fetchBotInfo(token);
  if (token && !r.ok) {
    const err = document.getElementById('ib-error');
    err.textContent = t('badToken');
    err.classList.remove('hidden');
  }
  current.botInfo = r.ok ? r.info : (verifiedToken === token ? verifiedInfo : current.botInfo);
  persist(); renderTopbar(); renderProjects();
  infoModal.classList.remove('open');
});
document.getElementById('ed-back').addEventListener('click', async () => { await refreshRunning(); renderProjects(); show('dash-screen'); });

// ---- biblioteca: iconos, grupos plegables, arrastre al lienzo ----
const libCollapsed = new Set();
function makeModItem(m, link) {
  const b = document.createElement('button');
  b.className = 'mod-item' + (modKind(m) === 'action' ? ' is-act' : '');
  b.type = 'button';
  b.innerHTML = `<span class="mi-ico"></span><span class="mi-txt"><strong></strong><span></span></span><span class="mi-plus">+</span>`;
  const nm = m.name[LANG] || m.name.es;
  b.querySelector('.mi-ico').textContent = modIcon(m);
  b.querySelector('strong').textContent = nm;
  b.querySelector('.mi-txt span').textContent = m.desc[LANG] || m.desc.es || '';
  // arrastre hasta el lienzo (click = añadir al centro)
  b.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    const sx = e.clientX, sy = e.clientY;
    let ghost = null;
    const move = (ev) => {
      if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 7) {
        ghost = document.createElement('div');
        ghost.className = 'drag-ghost';
        ghost.innerHTML = `<span class="g-i"></span><b class="g-n"></b>`;
        ghost.querySelector('.g-i').textContent = modIcon(m);
        ghost.querySelector('.g-n').textContent = nm;
        document.body.appendChild(ghost);
        b.classList.add('ghosting');
      }
      if (ghost) { ghost.style.left = ev.clientX + 'px'; ghost.style.top = ev.clientY + 'px'; }
    };
    const up = (ev) => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      if (ghost) {
        ghost.remove(); b.classList.remove('ghosting');
        b._suppress = true;
        setTimeout(() => { b._suppress = false; }, 0);
        const r = canvas.getBoundingClientRect();
        const inside = ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom;
        if (inside && current) addNode(m.id, toWorld(ev.clientX, ev.clientY), link);
      }
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  });
  b.addEventListener('click', () => {
    if (b._suppress || !current) return;
    addNode(m.id, null, link);
  });
  return b;
}
function renderLibrary() {
  if (!current) return;
  const q = (document.getElementById('mod-search').value || '').toLowerCase();
  const list = document.getElementById('module-list');
  list.innerHTML = '';
  const mods = allModules(current.stack)
    .filter(m => ((m.name[LANG] || m.name.es || '') + ' ' + (m.desc[LANG] || m.desc.es || '')).toLowerCase().includes(q));
  const cnt = document.getElementById('lib-count');
  if (cnt) cnt.textContent = String(mods.length);
  groupMods(mods).forEach(([label, group]) => {
    const h = document.createElement('p');
    const isCol = libCollapsed.has(label);
    h.className = 'lib-head' + (isCol ? ' collapsed' : '');
    h.textContent = `${label} · ${group.length}`;
    h.addEventListener('click', () => {
      if (libCollapsed.has(label)) libCollapsed.delete(label); else libCollapsed.add(label);
      renderLibrary();
    });
    list.appendChild(h);
    if (isCol) return;
    group.forEach(m => list.appendChild(makeModItem(m)));
  });
}
document.getElementById('mod-search').addEventListener('input', renderLibrary);

function addNode(modId, pos, link) {
  if (!current) return;
  const mod = findMod(current.stack, modId);
  if (!mod) return;
  const before = snap();
  let x, y;
  if (pos) { x = pos.x - 100; y = pos.y - 40; }
  else if (link && link.from) {
    const src = current.nodes.find(n => n.uid === link.from);
    const c = viewCenterWorld();
    x = src ? src.x + 250 : c.x - 100;
    y = src ? src.y : c.y - 40;
  } else {
    const c = viewCenterWorld();
    const k = current.nodes.length % 5;
    x = c.x - 100 + k * 26; y = c.y - 45 + k * 26;
  }
  const n = { uid: uid(), modId, x: Math.round(x), y: Math.round(y), config: defaultConfig(mod) };
  current.nodes.push(n);
  if (link && link.from) {
    if (link.to) current.edges = current.edges.filter(e => !(e.a === link.from && e.b === link.to));
    current.edges.push({ a: link.from, b: n.uid });
    if (link.to) current.edges.push({ a: n.uid, b: link.to });
  }
  pushUndo(before);
  selected = n.uid;
  if (picker && !picker.classList.contains('hidden')) closePicker();
  persist(); renderCanvas(); renderConfig(); updateMeta();
  const nm = mod.name[LANG] || mod.name.es;
  logLine(t('added')(nm), 'sys');
  toast(t('tAdd')(nm));
}
function deleteNode(uidv) {
  if (!current) return;
  const before = snap();
  current.nodes = current.nodes.filter(x => x.uid !== uidv);
  current.edges = current.edges.filter(e => e.a !== uidv && e.b !== uidv);
  if (selected === uidv) selected = null;
  pushUndo(before);
  persist(); renderCanvas(); renderConfig(); updateMeta();
  toast(t('tDel'));
}
function duplicateNode(n) {
  if (!current || !n) return;
  const before = snap();
  const c = JSON.parse(JSON.stringify(n));
  c.uid = uid(); c.x = n.x + 44; c.y = n.y + 44;
  current.nodes.push(c);
  pushUndo(before);
  selected = c.uid;
  persist(); renderCanvas(); renderConfig(); updateMeta();
  toast(t('tDup'));
}

// Modelo triggers → acciones (estilo n8n)
const CHAIN_SRC = [...CHAIN_MSG, ...CHAIN_JOIN];
const modKind = (mod) => mod.kind || (mod.id === 'embed' ? 'hybrid' : 'trigger');
function neighborsOut(uidv) {
  return current.edges.filter(e => e.a === uidv)
    .map(e => current.nodes.find(x => x.uid === e.b)).filter(Boolean);
}
// Cadena ordenada de salidas accionables (embeds + acciones) de un trigger
function chainOf(uidv) {
  return current.edges.filter(e => e.a === uidv)
    .map(e => current.nodes.find(x => x.uid === e.b)).filter(Boolean)
    .map(n => ({ node: n, mod: findMod(current.stack, n.modId), aidx: current.nodes.indexOf(n) }))
    .filter(x => x.mod && (modKind(x.mod) === 'action' || x.mod.id === 'embed'));
}
// Primer embed conectado (para subtítulo y respuesta principal msg/slash)
function connectedEmbedCfg(uidv) {
  const t = chainOf(uidv).find(x => x.mod.id === 'embed');
  return t ? t.node.config : null;
}
function hasIncomingTrigger(uidv) {
  return current.edges.filter(e => e.b === uidv).some(e => {
    const s = current.nodes.find(x => x.uid === e.a);
    const m = s && findMod(current.stack, s.modId);
    return m && CHAIN_SRC.includes(m.id);
  });
}
// Separa la cadena: emb principal (msg/slash) + resto de acciones en orden
function splitChain(n) {
  const chain = chainOf(n.uid);
  if (CHAIN_JOIN.includes(n.modId)) return { emb: null, acts: chain };
  const ei = chain.findIndex(x => x.mod.id === 'embed');
  if (ei < 0) return { emb: null, acts: chain };
  return { emb: chain[ei].node.config, acts: chain.filter((_, k) => k !== ei) };
}

function renderCanvas() {
  if (!current) return;
  if (pendingEdge && !current.nodes.some(n => n.uid === pendingEdge)) pendingEdge = null;
  vpEl.querySelectorAll('.node').forEach(n => n.remove());
  document.getElementById('canvas-hint').style.display = current.nodes.length ? 'none' : 'block';
  current.nodes.forEach(n => {
    const mod = findMod(current.stack, n.modId);
    const el = document.createElement('div');
    const kind = mod ? modKind(mod) : 'trigger';
    const idle = kind === 'action' && !current.edges.some(e => e.b === n.uid);
    el.className = 'node' + (selected === n.uid ? ' sel' : '') + (kind === 'action' ? ' act' : '') + (idle ? ' idle' : '');
    el.dataset.uid = n.uid;
    el.style.left = n.x + 'px'; el.style.top = n.y + 'px';
    el.innerHTML = `<div class="node-tools">
        <button type="button" data-a="cfg" title="⚙">⚙</button>
        <button type="button" data-a="dup" title="⧉">⧉</button>
        <button type="button" data-a="del" class="danger" title="✕">✕</button>
      </div>
      <div class="node-head"><span class="node-ico"></span><div class="node-title"></div><span class="kind"></span></div>
      <div class="node-sub"></div>
      <div class="node-dots"><span class="dot in" title="in"></span><span class="dot out" title="out"></span></div>`;
    el.querySelector('.node-ico').textContent = mod ? modIcon(mod) : '◆';
    el.querySelector('.node-title').textContent = mod ? (mod.name[LANG] || mod.name.es) : n.modId;
    el.querySelector('.kind').textContent = kind === 'action' ? t('kindAct') : t('kindTrig');
    const firstVal = mod ? Object.values(n.config || {}).find(v => String(v || '').trim()) : null;
    const embCfg = connectedEmbedCfg(n.uid);
    el.querySelector('.node-sub').textContent = idle ? t('idleAct')
      : embCfg ? ('→ ' + String(embCfg.titulo || 'Embed').slice(0, 24))
      : (firstVal ? String(firstVal).slice(0, 24) : '···');
    // botones flotantes del nodo
    el.querySelector('.node-tools').addEventListener('pointerdown', (e) => e.stopPropagation());
    el.querySelector('[data-a="cfg"]').addEventListener('click', (e) => {
      e.stopPropagation();
      selected = n.uid; renderCanvas(); renderConfig(); drawMini();
    });
    el.querySelector('[data-a="dup"]').addEventListener('click', (e) => { e.stopPropagation(); duplicateNode(n); });
    el.querySelector('[data-a="del"]').addEventListener('click', (e) => { e.stopPropagation(); deleteNode(n.uid); });
    // Mover nodo (coords de mundo: respeta pan/zoom)
    el.addEventListener('pointerdown', (e) => {
      if (e.target.classList.contains('dot') || e.target.closest('.node-tools')) return;
      const start = toWorld(e.clientX, e.clientY);
      const ox = n.x, oy = n.y;
      const before = snap();
      el._moved = false;
      el.setPointerCapture(e.pointerId);
      const move = (ev) => {
        const p = toWorld(ev.clientX, ev.clientY);
        n.x = ox + (p.x - start.x); n.y = oy + (p.y - start.y);
        el.style.left = n.x + 'px'; el.style.top = n.y + 'px';
        el._moved = true;
        drawEdges(); drawMini();
      };
      const up = () => {
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up);
        if (el._moved) { pushUndo(before); persist(); }
      };
      el.addEventListener('pointermove', move); el.addEventListener('pointerup', up);
    });
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('dot') || e.target.closest('.node-tools')) return;
      if (el._moved) { el._moved = false; return; }
      selected = n.uid; renderCanvas(); renderConfig(); drawMini();
    });
    // Punto de SALIDA: arrastrar hasta otro punto, o click para modo click-click
    el.querySelector('.dot.out').addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      pendingEdge = n.uid; markPending();
      const start = dotPos(n.uid, 'out');
      const NS = 'http://www.w3.org/2000/svg';
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('id', 'temp-edge');
      p.setAttribute('class', 'edge temp');
      edgesSvg.appendChild(p);
      const cr = canvas.getBoundingClientRect();
      const x0 = e.clientX, y0 = e.clientY;
      const move = (ev) => {
        const mx = ev.clientX - cr.left, my = ev.clientY - cr.top;
        p.setAttribute('d', `M${start.x},${start.y} C${(start.x + mx) / 2},${start.y} ${(start.x + mx) / 2},${my} ${mx},${my}`);
        canvas.querySelectorAll('.dot.in.target').forEach(d => d.classList.remove('target'));
        const el2 = document.elementFromPoint(ev.clientX, ev.clientY);
        const ind = el2 && el2.closest ? el2.closest('.dot.in') : null;
        if (ind) {
          const ne = ind.closest('.node');
          if (ne && ne.dataset.uid !== n.uid) ind.classList.add('target');
        }
      };
      const up = (ev) => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        window.removeEventListener('pointercancel', cancel);
        const moved = Math.hypot(ev.clientX - x0, ev.clientY - y0) > 6;
        const el2 = document.elementFromPoint(ev.clientX, ev.clientY);
        const ind = el2 && el2.closest ? el2.closest('.dot.in') : null;
        const ne = ind ? ind.closest('.node') : null;
        const temp = document.getElementById('temp-edge');
        if (temp) temp.remove();
        if (ne && ne.dataset.uid !== n.uid) {
          pendingEdge = null;
          tryConnect(n.uid, ne.dataset.uid);
        } else if (moved) {
          pendingEdge = null; markPending(); // soltado en vacío: cancela
        } else {
          markPending(); // click simple: queda pendiente para click-click
        }
      };
      const cancel = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        window.removeEventListener('pointercancel', cancel);
        const temp = document.getElementById('temp-edge');
        if (temp) temp.remove();
        pendingEdge = null; markPending();
      };
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', cancel);
    });
    // Punto de ENTRADA (modo click-click)
    const inDot = el.querySelector('.dot.in');
    inDot.addEventListener('pointerdown', (e) => e.stopPropagation());
    inDot.addEventListener('pointerup', (e) => {
      e.stopPropagation();
      if (pendingEdge && pendingEdge !== n.uid) {
        const from = pendingEdge;
        pendingEdge = null;
        tryConnect(from, n.uid);
      }
    });
    vpEl.appendChild(el);
  });
  drawEdges();
  if (pendingEdge) markPending();
}

function tryConnect(a, b) {
  if (!a || !b || a === b) { markPending(); return false; }
  if (current.edges.some(x => x.a === a && x.b === b)) { markPending(); renderCanvas(); return false; }
  const before = snap();
  current.edges.push({ a, b });
  pushUndo(before);
  markPending();
  persist(); renderCanvas(); updateMeta();
  return true;
}

function markPending() {
  canvas.querySelectorAll('.dot.hot').forEach(d => d.classList.remove('hot'));
  canvas.classList.toggle('linking', !!pendingEdge);
  if (pendingEdge) {
    const src = canvas.querySelector(`.node[data-uid="${pendingEdge}"] .dot.out`);
    if (src) src.classList.add('hot');
  }
}

function dotPos(uidv, cls) {
  const d = canvas.querySelector(`.node[data-uid="${uidv}"] .dot.${cls}`);
  if (!d) return null;
  const r = d.getBoundingClientRect(), cr = canvas.getBoundingClientRect();
  return { x: r.left + r.width / 2 - cr.left, y: r.top + r.height / 2 - cr.top };
}

function drawEdges() {
  if (!current) return;
  const temp = document.getElementById('temp-edge');
  edgesSvg.innerHTML = '';
  if (temp) edgesSvg.appendChild(temp);
  const r = canvas.getBoundingClientRect();
  edgesSvg.setAttribute('width', Math.max(r.width, 1));
  edgesSvg.setAttribute('height', Math.max(r.height, 1));
  current.edges = current.edges.filter(e => dotPos(e.a, 'out') && dotPos(e.b, 'in'));
  edgeTools.innerHTML = '';
  current.edges.forEach(e => {
    const a = dotPos(e.a, 'out'), b = dotPos(e.b, 'in');
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const mx = (a.x + b.x) / 2;
    line.setAttribute('d', `M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`);
    line.setAttribute('class', 'edge');
    line.addEventListener('click', () => {
      const before = snap();
      current.edges = current.edges.filter(x => x !== e);
      pushUndo(before);
      persist(); renderCanvas(); updateMeta();
    });
    edgesSvg.appendChild(line);
    // "+" en el medio de la conexión: inserta un nodo en medio
    const btn = document.createElement('button');
    btn.className = 'et-add';
    btn.type = 'button';
    btn.textContent = '+';
    btn.title = t('addN');
    btn.style.left = ((a.x + b.x) / 2) + 'px';
    btn.style.top = ((a.y + b.y) / 2 - 6) + 'px';
    btn.addEventListener('pointerdown', (ev) => ev.stopPropagation());
    btn.addEventListener('click', (ev) => { ev.stopPropagation(); openPicker(e.a, e.b); });
    const show = () => btn.classList.add('show');
    const hide = () => btn.classList.remove('show');
    line.addEventListener('pointerenter', show);
    line.addEventListener('pointerleave', () => setTimeout(() => {
      if (!btn.matches(':hover')) hide();
    }, 40));
    btn.addEventListener('pointerenter', show);
    btn.addEventListener('pointerleave', hide);
    edgeTools.appendChild(btn);
  });
}

// ---- pan (arrastrar el fondo) + zoom (rueda) ----
canvas.addEventListener('pointerdown', (e) => {
  if (e.target.closest('.node, .np, .cv-zoom, .cv-fab, .cv-mini, .et-add, .logs')) return;
  if (e.target.classList.contains('edge')) return;
  if (picker && !picker.classList.contains('hidden')) closePicker();
  const sx = e.clientX, sy = e.clientY, p0x = panX, p0y = panY;
  let moved = false;
  try { canvas.setPointerCapture(e.pointerId); } catch {}
  canvas.classList.add('panning');
  const move = (ev) => {
    const dx = ev.clientX - sx, dy = ev.clientY - sy;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
    panX = p0x + dx; panY = p0y + dy;
    applyView(); drawEdges(); drawMini();
  };
  const up = () => {
    canvas.removeEventListener('pointermove', move);
    canvas.removeEventListener('pointerup', up);
    canvas.classList.remove('panning');
    if (!moved) {
      pendingEdge = null; markPending();
      if (selected) { selected = null; renderCanvas(); renderConfig(); drawMini(); }
    }
  };
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerup', up);
});
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (e.ctrlKey || e.metaKey) zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.0022));
  else { panX -= e.deltaX; panY -= e.deltaY; applyView(); drawEdges(); drawMini(); }
}, { passive: false });
window.addEventListener('resize', () => { if (current) { drawEdges(); drawMini(); } });

// ---- minimapa ----
const mini = document.getElementById('minimap');
const mctx = mini ? mini.getContext('2d') : null;
function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function drawMini() {
  if (!mctx || !current) return;
  const mw = mini.width, mh = mini.height;
  mctx.clearRect(0, 0, mw, mh);
  const r = canvas.getBoundingClientRect();
  const vpR = { x: -panX / zoom, y: -panY / zoom, w: r.width / zoom, h: r.height / zoom };
  let x0 = vpR.x, y0 = vpR.y, x1 = vpR.x + vpR.w, y1 = vpR.y + vpR.h;
  current.nodes.forEach(n => {
    x0 = Math.min(x0, n.x - 12); y0 = Math.min(y0, n.y - 12);
    x1 = Math.max(x1, n.x + 212); y1 = Math.max(y1, n.y + 104);
  });
  const pad = 40;
  x0 -= pad; y0 -= pad; x1 += pad; y1 += pad;
  const s = Math.min(mw / Math.max(1, x1 - x0), mh / Math.max(1, y1 - y0));
  const ox = (mw - (x1 - x0) * s) / 2, oy = (mh - (y1 - y0) * s) / 2;
  const P = (x, y) => [(x - x0) * s + ox, (y - y0) * s + oy];
  mctx.strokeStyle = 'rgba(255,255,255,.4)';
  mctx.lineWidth = 1;
  current.edges.forEach(e => {
    const A = current.nodes.find(n => n.uid === e.a), B = current.nodes.find(n => n.uid === e.b);
    if (!A || !B) return;
    const [ax, ay] = P(A.x + 100, A.y + 52), [bx, by] = P(B.x + 100, B.y + 52);
    mctx.beginPath(); mctx.moveTo(ax, ay); mctx.lineTo(bx, by); mctx.stroke();
  });
  current.nodes.forEach(n => {
    const [x, y] = P(n.x, n.y);
    mctx.fillStyle = n.uid === selected ? 'rgba(255,255,255,.95)' : 'rgba(255,255,255,.5)';
    roundRectPath(mctx, x, y, Math.max(4, 200 * s), Math.max(3, 86 * s), 2);
    mctx.fill();
  });
  const [vx, vy] = P(vpR.x, vpR.y);
  mctx.fillStyle = 'rgba(255,255,255,.07)';
  mctx.fillRect(vx, vy, vpR.w * s, vpR.h * s);
  mctx.strokeStyle = '#fff';
  mctx.lineWidth = 1.5;
  mctx.strokeRect(vx, vy, vpR.w * s, vpR.h * s);
  mini._map = { x0, y0, s, ox, oy };
}
if (mini) {
  const jump = (ev) => {
    const m = mini._map;
    if (!m) return;
    const rc = mini.getBoundingClientRect();
    const wx = (ev.clientX - rc.left - m.ox) / m.s + m.x0;
    const wy = (ev.clientY - rc.top - m.oy) / m.s + m.y0;
    const r = canvas.getBoundingClientRect();
    panX = r.width / 2 - wx * zoom;
    panY = r.height / 2 - wy * zoom;
    applyView(); drawEdges(); drawMini();
  };
  mini.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    jump(e);
    const mv = (ev) => jump(ev);
    const up = () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', mv);
    window.addEventListener('pointerup', up);
  });
}

function renderConfig() {
  const panel = document.getElementById('config-panel');
  const closeBtn = document.getElementById('cfg-close');
  panel.innerHTML = '';
  const n = current ? current.nodes.find(x => x.uid === selected) : null;
  if (!n) {
    if (closeBtn) closeBtn.classList.remove('show');
    panel.innerHTML = `<div class="cfg-empty">
      <div class="ce-ico">⌘</div>
      <p>${t('cfgEmptyD')}</p>
      <p class="tip">${t('cfgTip')}</p>
    </div>`;
    return;
  }
  if (closeBtn) closeBtn.classList.add('show');
  const mod = findMod(current.stack, n.modId);
  const title = document.createElement('h5');
  const ico = document.createElement('span');
  ico.className = 'node-ico';
  ico.textContent = mod ? modIcon(mod) : '◆';
  const tn = document.createElement('span');
  tn.textContent = mod ? (mod.name[LANG] || mod.name.es) : n.modId;
  title.appendChild(ico); title.appendChild(tn);
  panel.appendChild(title);
  if (mod && (mod.desc[LANG] || mod.desc.es)) {
    const d = document.createElement('p');
    d.className = 'cfg-desc';
    d.textContent = mod.desc[LANG] || mod.desc.es;
    panel.appendChild(d);
  }
  // un snapshot de deshacer por sesión de foco (sin spam)
  let fieldSnap = null;
  const onFocus = () => { fieldSnap = snap(); };
  const markEdited = () => {
    if (fieldSnap) { pushUndo(fieldSnap); fieldSnap = null; }
    persist();
    const sub = canvas.querySelector(`.node[data-uid="${n.uid}"] .node-sub`);
    if (sub) {
      const v = Object.values(n.config || {}).find(x => String(x || '').trim());
      const embCfg = connectedEmbedCfg(n.uid);
      sub.textContent = embCfg ? ('→ ' + String(embCfg.titulo || 'Embed').slice(0, 24))
        : (v ? String(v).slice(0, 24) : '···');
    }
  };
  (mod.schema || []).forEach(f => {
    const lab = document.createElement('label');
    lab.className = 'fld';
    const sp = document.createElement('span');
    sp.textContent = f.label[LANG] || f.label.es || f.key;
    const inp = f.multiline ? document.createElement('textarea') : document.createElement('input');
    if (f.multiline) { inp.rows = 4; }
    else inp.type = 'text';
    if (f.ph) inp.placeholder = f.ph;
    inp.value = n.config[f.key] ?? '';
    inp.addEventListener('focus', onFocus);
    lab.appendChild(sp);
    if (f.color) {
      // Rueda de color + texto sincronizados
      const row = document.createElement('div');
      row.className = 'color-row';
      const pick = document.createElement('input');
      pick.type = 'color';
      pick.value = /^#[0-9a-fA-F]{6}$/.test(inp.value) ? inp.value : '#ffffff';
      pick.addEventListener('focus', onFocus);
      pick.addEventListener('input', () => {
        inp.value = pick.value; n.config[f.key] = pick.value;
        if (fieldSnap) { pushUndo(fieldSnap); fieldSnap = null; }
        persist();
      });
      inp.addEventListener('input', () => {
        n.config[f.key] = inp.value;
        if (/^#[0-9a-fA-F]{6}$/.test(inp.value)) pick.value = inp.value;
        markEdited();
      });
      row.appendChild(pick); row.appendChild(inp);
      lab.appendChild(row);
    } else {
      inp.addEventListener('input', () => { n.config[f.key] = inp.value; markEdited(); });
      lab.appendChild(inp);
    }
    panel.appendChild(lab);
  });
  const row = document.createElement('div');
  row.className = 'cfg-actions';
  const dup = document.createElement('button');
  dup.className = 'ghost-btn mini'; dup.type = 'button';
  dup.textContent = '⧉ ' + t('dup');
  dup.addEventListener('click', () => duplicateNode(n));
  const del = document.createElement('button');
  del.className = 'ghost-btn mini danger'; del.type = 'button';
  del.textContent = '✕ ' + t('del');
  del.addEventListener('click', () => deleteNode(n.uid));
  row.appendChild(dup); row.appendChild(del);
  panel.appendChild(row);
}
const cfgCloseBtn = document.getElementById('cfg-close');
if (cfgCloseBtn) {
  cfgCloseBtn.addEventListener('click', () => {
    selected = null; renderCanvas(); renderConfig(); drawMini();
  });
}

// ---------- picker de nodos (botón + y "+" de las conexiones) ----------
const picker = document.getElementById('node-picker');
const npQ = document.getElementById('np-q');
const npList = document.getElementById('np-list');
let pickerLink = null, npIdx = -1, npItems = [];
function openPicker(from, to) {
  if (!current) return;
  pickerLink = (from || to) ? { from: from || null, to: to || null } : null;
  picker.classList.remove('hidden');
  npQ.value = ''; npIdx = -1;
  renderPicker();
  npQ.focus();
}
function closePicker() {
  if (!picker) return;
  picker.classList.add('hidden');
  pickerLink = null;
}
function renderPicker() {
  if (!current) return;
  const q = (npQ.value || '').trim().toLowerCase();
  npList.innerHTML = '';
  npItems = [];
  const mods = allModules(current.stack)
    .filter(m => ((m.name[LANG] || m.name.es || '') + ' ' + (m.desc[LANG] || m.desc.es || '')).toLowerCase().includes(q));
  if (!mods.length) {
    const p = document.createElement('p');
    p.className = 'np-empty';
    p.textContent = t('noResults');
    npList.appendChild(p);
    return;
  }
  groupMods(mods).forEach(([label, group]) => {
    const h = document.createElement('p');
    h.className = 'lib-head';
    h.textContent = `${label} · ${group.length}`;
    npList.appendChild(h);
    group.forEach(m => {
      const item = makeModItem(m, pickerLink);
      npList.appendChild(item);
      npItems.push(item);
    });
  });
  npIdx = -1;
}
function npHighlight(i) {
  npItems.forEach(x => x.classList.remove('sel'));
  if (i >= 0 && i < npItems.length) {
    npIdx = i;
    npItems[i].classList.add('sel');
    npItems[i].scrollIntoView({ block: 'nearest' });
  } else npIdx = -1;
}
if (npQ) {
  npQ.addEventListener('input', renderPicker);
  npQ.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); npHighlight(Math.min(npIdx + 1, npItems.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); npHighlight(Math.max(npIdx - 1, 0)); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const item = npItems[npIdx] || npItems[0];
      if (item) item.click();
    } else if (e.key === 'Escape') { e.preventDefault(); closePicker(); }
  });
}
const npClose = document.getElementById('np-close');
if (npClose) npClose.addEventListener('click', closePicker);
const cvAdd = document.getElementById('cv-add');
if (cvAdd) cvAdd.addEventListener('click', () => {
  if (picker.classList.contains('hidden')) openPicker(); else closePicker();
});

// ---------- toolbar del editor ----------
const btnUndo = document.getElementById('btn-undo'), btnRedo = document.getElementById('btn-redo');
if (btnUndo) btnUndo.addEventListener('click', undo);
if (btnRedo) btnRedo.addEventListener('click', redo);
const zIn = document.getElementById('z-in'), zOut = document.getElementById('z-out'), zFit = document.getElementById('z-fit');
if (zIn) zIn.addEventListener('click', () => zoomStep(1.25));
if (zOut) zOut.addEventListener('click', () => zoomStep(1 / 1.25));
if (zFit) zFit.addEventListener('click', () => { fitView(); });
if (mini) mini.addEventListener('dblclick', () => fitView());

// ---------- atajos de teclado ----------
window.addEventListener('keydown', (e) => {
  const tag = (e.target.tagName || '').toLowerCase();
  const typing = tag === 'input' || tag === 'textarea' || !!e.target.isContentEditable;
  const mod = e.ctrlKey || e.metaKey;
  const k = (e.key || '').toLowerCase();
  if (mod && k === 'z' && !e.shiftKey) { if (typing) return; e.preventDefault(); undo(); return; }
  if (mod && (k === 'y' || (e.shiftKey && k === 'z'))) { if (typing) return; e.preventDefault(); redo(); return; }
  if (mod && k === 'd') {
    if (typing || !current || !selected) return;
    e.preventDefault();
    duplicateNode(current.nodes.find(x => x.uid === selected));
    return;
  }
  if (mod && (k === '+' || k === '=')) { e.preventDefault(); zoomStep(1.25); return; }
  if (mod && k === '-') { e.preventDefault(); zoomStep(1 / 1.25); return; }
  if (mod && k === '0') { e.preventDefault(); fitView(); return; }
  if (typing) return;
  if (e.key === 'Escape') {
    if (picker && !picker.classList.contains('hidden')) closePicker();
    else {
      pendingEdge = null; markPending();
      if (selected) { selected = null; renderCanvas(); renderConfig(); drawMini(); }
    }
    return;
  }
  if ((e.key === 'Delete' || e.key === 'Backspace') && current && selected) {
    e.preventDefault();
    deleteNode(selected);
  }
});


// ---------- custom modules: import / export / new ----------
document.getElementById('btn-import').addEventListener('click', () => document.getElementById('import-file').click());
document.getElementById('import-file').addEventListener('change', (e) => {
  const f = e.target.files[0];
  if (!f) return;
  const rd = new FileReader();
  rd.onload = () => {
    try {
      const m = JSON.parse(rd.result);
      if (!m.id || !m.name || !m.code || !m.stack) throw 0;
      m.schema = m.schema || []; m.builtin = false;
      customMods = customMods.filter(x => x.id !== m.id);
      customMods.push(m); save(LS_M, customMods); renderLibrary();
      logLine(t('added')(m.name[LANG] || m.name.es || m.id), 'sys');
    } catch { logLine(t('badImport'), 'err'); }
  };
  rd.readAsText(f);
  e.target.value = '';
});

const modModal = document.getElementById('mod-modal');
document.getElementById('btn-newmod').addEventListener('click', () => {
  document.getElementById('nm-code').value = current.stack === 'py'
    ? '# usa MOD_CONFIG.clave\nprint("hola desde mi módulo", MOD_CONFIG)'
    : '// usa MOD_CONFIG.clave\nconsole.log("hola desde mi módulo", MOD_CONFIG);';
  modModal.classList.add('open');
});
document.getElementById('nm-cancel').addEventListener('click', () => modModal.classList.remove('open'));
function readModForm() {
  const schema = document.getElementById('nm-vars').value.split('\n')
    .map(l => l.split('|').map(s => s.trim())).filter(p => p[0])
    .map(p => ({ key: p[0], label: { es: p[1] || p[0], en: p[1] || p[0] }, def: p[2] ?? '' }));
  return {
    id: 'custom-' + uid(), builtin: false, stack: current.stack,
    name: { es: document.getElementById('nm-name').value.trim() || 'Mi módulo', en: document.getElementById('nm-name').value.trim() || 'My module' },
    desc: { es: document.getElementById('nm-desc').value.trim(), en: document.getElementById('nm-desc').value.trim() },
    schema, code: document.getElementById('nm-code').value
  };
}
document.getElementById('nm-save').addEventListener('click', () => {
  const m = readModForm();
  customMods.push(m); save(LS_M, customMods);
  modModal.classList.remove('open'); renderLibrary();
});
document.getElementById('nm-export').addEventListener('click', () => {
  const m = readModForm();
  const blob = new Blob([JSON.stringify(m, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = m.id + '.cakemod.json';
  a.click();
  URL.revokeObjectURL(a.href);
});

// ---------- codegen ----------
function modCode(mod, cfg, stack, emb) {
  if (mod.builtin) return mod.js(cfg, emb);
  return stack === 'py'
    ? `MOD_CONFIG = ${J(cfg)}\n${mod.code}`
    : `const MOD_CONFIG = ${J(cfg)};\n${mod.code}`;
}
function buildCode() {
  const token = current.token || '';
  const CHAINABLE = [...CHAIN_MSG, ...CHAIN_JOIN];
  const parts = current.nodes.map((n, idx) => {
    const mod = findMod(current.stack, n.modId);
    if (!mod || modKind(mod) === 'action') return ''; // las acciones solo viven tras un trigger
    if (mod.id === 'embed' && hasIncomingTrigger(n.uid)) return ''; // lo emite su trigger
    const tag = 'n' + idx;
    if (CHAINABLE.includes(n.modId)) {
      const { emb, acts } = splitChain(n);
      return mod.js(n.config, emb, acts, tag);
    }
    return modCode(mod, n.config, current.stack, null);
  }).filter(Boolean);
  if (current.stack === 'py') {
    const msgs = [], joins = [], leaves = [], readys = [], slashs = [], loops = [], customs = [];
    let sIdx = 0, lIdx = 0, apiUsed = false, dtUsed = false, cdUsed = false;
    const scanNeeds = (mod) => (mod.needs || []).forEach(x => { if (x === 'datetime') dtUsed = true; });
    current.nodes.forEach((n, idx) => {
      const mod = findMod(current.stack, n.modId);
      if (!mod || modKind(mod) === 'action') return;
      if (mod.id === 'embed' && hasIncomingTrigger(n.uid)) return;
      scanNeeds(mod);
      if (parseCD(n.config.cooldown) > 0) cdUsed = true;
      const tag = 'n' + idx;
      if (!mod.builtin) {
        customs.push(`# --- ${mod.id} ---\nMOD_CONFIG = ${J(n.config)}\n${mod.code}`);
        return;
      }
      if (mod.id === 'api') apiUsed = true;
      if (CHAINABLE.includes(n.modId)) {
        const { emb, acts } = splitChain(n);
        acts.forEach(a => scanNeeds(a.mod));
        if (n.modId === 'slash' && mod.pySlash) { slashs.push(mod.pySlash(n.config, sIdx++, emb, acts, tag)); return; }
        if (mod.pyMsg) msgs.push(indentPy(mod.pyMsg(n.config, emb, acts, tag)));
        if (mod.pyJoin) joins.push(indentPy(mod.pyJoin(n.config, emb, acts, tag)));
        if (mod.pyLeave) leaves.push(indentPy(mod.pyLeave(n.config, emb, acts, tag)));
        return;
      }
      if (mod.pyMsg) msgs.push(indentPy(mod.pyMsg(n.config, null)));
      if (mod.pyJoin) joins.push(indentPy(mod.pyJoin(n.config)));
      if (mod.pyLeave) leaves.push(indentPy(mod.pyLeave(n.config)));
      if (mod.pyReady) readys.push(indentPy(mod.pyReady(n.config)));
      if (mod.pySlash) slashs.push(mod.pySlash(n.config, sIdx++, null));
      if (mod.pyLoop) loops.push(mod.pyLoop(n.config, lIdx++));
    });
    return `import discord
${apiUsed ? 'import asyncio\n' : ''}${dtUsed ? 'import datetime\n' : ''}${cdUsed ? 'import time\n' : ''}${slashs.length ? 'from discord import app_commands\n' : ''}${loops.length ? 'from discord.ext import tasks\n' : ''}intents = discord.Intents.default()
intents.message_content = True
intents.members = True
client = discord.Client(intents=intents)
${slashs.length ? 'tree = app_commands.CommandTree(client)\n' : ''}TOKEN = ${J(token)}
${cdUsed ? `_CD = {}

def _cd_ok(key, seconds):
    now = time.time()
    t = _CD.get(key, 0)
    if now < t:
        return int(t - now) + 1
    _CD[key] = now + seconds
    return 0

` : ''}${apiUsed ? `def _api_call(url, method, body):
    import urllib.request, json as _json
    _d = _json.dumps(_json.loads(body)).encode() if body else None
    _req = urllib.request.Request(url, data=_d, method=method, headers={'Content-Type': 'application/json', 'User-Agent': 'CakeIBot'})
    with urllib.request.urlopen(_req, timeout=15) as _r:
        return _json.loads(_r.read().decode())

` : ''}@client.event
async def on_ready():
    print(f'Bot en línea como {client.user}')
${slashs.length ? '    await tree.sync()\n    print("Slash sincronizados")\n' : ''}${readys.join('\n')}

@client.event
async def on_message(m):
    if m.author.bot:
        return
${msgs.length ? msgs.join('\n') : '    pass'}
${joins.length ? `@client.event
async def on_member_join(member):
${joins.join('\n')}
` : ''}${leaves.length ? `@client.event
async def on_member_remove(member):
${leaves.join('\n')}
` : ''}${slashs.length ? slashs.join('\n\n') + '\n\n' : ''}${loops.length ? loops.join('\n\n') + '\n\n' : ''}${customs.length ? customs.join('\n\n') + '\n\n' : ''}try:
    client.run(TOKEN)
except Exception as e:
    print('LOGIN_ERROR:', e)`;
  }
  // ---- globales: permisos, cooldown, autocomplete y componentes ----
  const slashDefs = [], cmdPerms = {}, acMap = {}, compResp = {};
  let cdUsed = false;
  current.nodes.forEach(n => {
    const mod = findMod(current.stack, n.modId);
    if (!mod) return;
    if (mod.builtin && mod.slashDefs) {
      const r = mod.slashDefs(n.config);
      slashDefs.push(r.def);
      if (r.perms.length) cmdPerms[r.def.name] = r.perms;
      const ac = parseAC(n.config.autocomplete);
      if (ac.length) acMap[r.def.name] = Object.fromEntries(ac.map(a => [a.opt, a.vals]));
    }
    if (parseCD(n.config.cooldown) > 0) cdUsed = true;
    if (mod.id === 'botones') {
      parseButtons(n.config.botones).forEach(b => { compResp['b:' + b.id] = b.resp; });
      parseMenus(n.config.menu).forEach(mn => { compResp['m:' + mn.id] = mn.resp; });
    }
  });
  const permsUsed = Object.keys(cmdPerms).length > 0;
  const acUsed = Object.keys(acMap).length > 0;
  const compUsed = Object.keys(compResp).length > 0;
  const cdBlock = cdUsed ? `const _cdMap = new Map();
const _cdOk = (key, ms) => { const now = Date.now(); const t = _cdMap.get(key) || 0; if (now < t) return Math.ceil((t - now) / 1000); _cdMap.set(key, now + ms); return 0; };
` : '';
  const acBlock = acUsed ? `const AUTOCOMPLETE = ${J(acMap)};
client.on('interactionCreate', async (i) => {
  if (!i.isAutocomplete()) return;
  try {
    const map = AUTOCOMPLETE[i.commandName];
    const f = i.options.getFocused(true) || {};
    if (!map) { await i.respond([]); return; }
    const cur = String(f.value ?? '').toLowerCase();
    const set = (map[f.name] || []).filter(v => String(v).toLowerCase().includes(cur)).slice(0, 25);
    await i.respond(set.map(v => ({ name: String(v).slice(0, 100), value: String(v).slice(0, 100) })));
  } catch (_) {}
});
` : '';
  const compBlock = compUsed ? `const COMPONENTS = ${J(compResp)};
const _compFill = (s, i, val) => {
  let o = s.split('{autor}').join('<@' + i.user.id + '>');
  o = o.split('{servidor}').join((i.guild && i.guild.name) || '');
  o = o.split('{canal}').join(i.channel ? '<#' + i.channel.id + '>' : '');
  o = o.split('{miembros}').join(String((i.guild && i.guild.memberCount) || ''));
  o = o.split('{elegido}').join(val || '');
  return o;
};
client.on('interactionCreate', async (i) => {
  if (i.isButton()) {
    const r = COMPONENTS['b:' + i.customId];
    if (r === undefined) return;
    try { await i.reply({ content: r ? _compFill(r, i, '') : ' ' }); } catch (e) { console.error('button:', e.message); }
    return;
  }
  if (i.isStringSelectMenu()) {
    const r = COMPONENTS['m:' + i.customId];
    if (r === undefined) return;
    const val = (i.values || []).join(', ');
    try { await i.reply({ content: r ? _compFill(r, i, val) : ' ' }); } catch (e) { console.error('select:', e.message); }
  }
});
` : '';
  return `const { Client, GatewayIntentBits${slashDefs.length ? ', REST, Routes' : ''}${permsUsed ? ', PermissionsBitField' : ''}${compUsed ? ', ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder' : ''} } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const TOKEN = ${J(token)};
${slashDefs.length ? `const SLASH_DEFS = ${J(slashDefs)};
` : ''}${permsUsed ? `const CMD_PERMS = ${J(cmdPerms)};
for (const _d of SLASH_DEFS) if (CMD_PERMS[_d.name]) _d.default_member_permissions = String(PermissionsBitField.resolve(CMD_PERMS[_d.name]));
` : ''}${cdBlock}
client.once('ready', async () => {
  console.log('Bot en línea como ' + client.user.tag);
${slashDefs.length ? `  try {
    const rest = new REST({ version: '10' }).setToken(TOKEN);
    await rest.put(Routes.applicationCommands(client.user.id), { body: SLASH_DEFS });
    console.log('Slash registrados: ' + SLASH_DEFS.length);
  } catch (e) { console.error('slash register:', e.message); }
` : ''}});

${acBlock}${compBlock}${parts.join('\n\n')}

client.login(TOKEN).catch(e => { console.error('LOGIN_ERROR: ' + e.message); process.exit(1); });`;
}

// ---------- runtime ----------
const logsBody = document.getElementById('logs-body');
function logLine(text, type = 'out') {
  const line = String(text).replace(/\s+$/, '');
  if (!line) return;
  const row = document.createElement('div');
  row.className = 'lg lg-' + (type === 'err' ? 'err' : type === 'sys' ? 'sys' : 'out');
  const ts = document.createElement('span');
  ts.className = 'lg-t';
  try { ts.textContent = new Date().toLocaleTimeString('es-ES', { hour12: false }); }
  catch { ts.textContent = ''; }
  row.appendChild(ts);
  row.appendChild(document.createTextNode((type === 'err' ? '✕ ' : type === 'sys' ? '· ' : '') + line));
  logsBody.appendChild(row);
  while (logsBody.children.length > 500) logsBody.firstChild.remove();
  logsBody.scrollTop = logsBody.scrollHeight;
}
document.getElementById('btn-copy-logs').addEventListener('click', async () => {
  const txt = logsBody.innerText || '';
  if (!txt.trim()) { toast(t('noLogs'), 'err'); return; }
  let ok = false;
  try { await navigator.clipboard.writeText(txt); ok = true; } catch {}
  if (!ok) {
    const ta = document.createElement('textarea');
    ta.value = txt;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { ok = document.execCommand('copy'); } catch {}
    ta.remove();
  }
  toast(ok ? t('copied') : t('badImport'), ok ? 'ok' : 'err');
});
if (window.cake) window.cake.onLog(m => {
  if (!current || m.id === current.id) logLine(m.text, m.type);
});

function setStatus(on) {
  const el = document.getElementById('ed-status');
  el.classList.toggle('on', on); el.classList.toggle('off', !on);
  el.querySelector('b').textContent = on ? t('online') : t('offline');
  document.getElementById('btn-run').querySelector('span').textContent = on ? t('stop') : t('start');
  document.getElementById('btn-run').classList.toggle('stop', on);
  // flujo "vivo": aristas animadas mientras el bot corre
  if (edgesSvg) edgesSvg.classList.toggle('run', on);
}
const isRunning = (id) => runningIds.has(id);
async function refreshRunning() {
  if (window.cake && window.cake.listBots) {
    try { runningIds = new Set(await window.cake.listBots()); } catch {}
  }
  if (current) setStatus(isRunning(current.id));
}
async function stopBot(silent, id) {
  const target = id || (current && current.id);
  if (window.cake && target) { try { await window.cake.stopBot(target); } catch {} }
  if (target) runningIds.delete(target);
  if (current && (!id || id === current.id)) setStatus(false);
  else if (!silent && !current) setStatus(false);
}
document.getElementById('btn-run').addEventListener('click', async () => {
  if (!current) return;
  if (isRunning(current.id)) { stopBot(false, current.id); refreshRunning(); return; }
  if (!current.token) { showLogs(true); logLine(t('needToken'), 'err'); return; }
  const code = buildCode();
  showLogs(true);
  if (window.cake) {
    const r = await window.cake.startBot({ id: current.id, name: current.name, stack: current.stack, code });
    if (r && r.ok) runningIds.add(current.id);
  } else {
    logLine('[demo] ' + code.split('\n').length + ' líneas generadas (sin runtime).', 'sys');
    runningIds.add(current.id);
  }
  setStatus(isRunning(current.id));
});
document.getElementById('btn-logs').addEventListener('click', () => showLogs(document.getElementById('logs').classList.contains('hidden')));
function showLogs(v) { document.getElementById('logs').classList.toggle('hidden', !v); }
document.getElementById('btn-clear-logs').addEventListener('click', () => logsBody.textContent = '');

// ---------- code viewer ----------
const codeModal = document.getElementById('code-modal');
document.getElementById('btn-export-code').addEventListener('click', () => {
  if (!current) return;
  document.getElementById('code-ext').textContent = current.stack === 'py' ? 'py' : 'js';
  document.getElementById('code-view').textContent = buildCode();
  codeModal.classList.add('open');
});
document.getElementById('code-close').addEventListener('click', () => codeModal.classList.remove('open'));

// Arranque inteligente: si ya hay bots, entra directo al dashboard;
// si ya se eligió idioma pero no hay bots, salta al stack. Sin repetir nada.
(function boot() {
  const savedLang = load(LS_LANG, null);
  if (savedLang === 'es' || savedLang === 'en') LANG = savedLang;
  applyUI();
  if (projects.length) { renderProjects(); show('dash-screen'); }
  else if (savedLang === 'es' || savedLang === 'en') show('stack-screen');
})();

// Seguridad: si el motor no avanza el reloj de animaciones (entornos sin
// compositor), las entradas con `fill: both` dejarían la interfaz en opacidad 0.
// Se desactivan las animaciones para que todo se muestre en su estado final.
function animGuard(checksLeft) {
  const frozen = !document.timeline || document.timeline.currentTime === 0;
  const html = document.documentElement;
  if (frozen) html.classList.add('anim-off');
  else html.classList.remove('anim-off');
  if (checksLeft > 0) setTimeout(() => animGuard(checksLeft - 1), 800);
}
setTimeout(() => animGuard(3), 700);
