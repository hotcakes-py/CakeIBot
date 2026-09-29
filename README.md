# CakeIBot

Constructor de bots por flujos. Armas tu bot conectando bloquecitos en un canvas estilo nodos y el panel te genera el código solo, sin picar nada a mano

Funciona con JavaScript (discord.js) y Python (discord.py), tu eliges el lenguaje cuando creas el bot

## Cómo correrlo

Necesitas Node.js instalado y luego:

```bash
npm install
npm start
```

Y listo se abre el panel

## Cómo se usa

1. Creas un bot con el botón + Nuevo, le pones nombre lenguaje y el token de Discord
2. Agregas módulos desde la librería de la izquierda (o con el botón + del canvas)
3. Conectas la salida ● de un disparador a la entrada ● de una acción o un embed
4. Configuras cada bloque en el panel de la derecha
5. Le das a Encender y ves lo que pasa en los Logs

Los proyectos se guardan solos en el panel, no hay que exportar nada

## Módulos

**Disparadores** (inician el flujo): Responder, !Comando, Comando /, Bienvenida, Despedida, Moderación, Consola, Estado, Anuncio, API y Foto/Archivo

**Acciones** (van conectadas tras un disparador): Responder texto, Expulsar, Banear, Aislar, Dar rol, Quitar rol y Botones y menú

El Comando / aparte soporta subcomandos y grupos, autocomplete, permisos y cooldown por usuario. En las respuestas puedes usar variables como {autor} {usuario} {servidor} {subcomando} y en los menús {elegido}

También puedes crear tus propios módulos con + Módulo y compartirlos como .json con quien quieras

## Notas

- El token del bot se guarda en tu máquina nada más, no sale de ahí
- Si un comando no aparece en Discord espera unos minutos que a veces tarda en sincronizar
- Los botones y menús solo funcionan mientras el bot esté encendido obvio
