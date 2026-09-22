# larp-dc

set any game as your discord status without running it.

## requirements
- node.js
- discord running

## usage

run any script:
```bash
node gta6.js
```

keep the terminal open. status disappears when you close it.

## adding a new game

1. find the game's app ID from `https://discord.com/api/v9/applications/detectable`
2. find your discord IPC socket: `find /var/folders -name "discord-ipc-0" 2>/dev/null`
3. copy any existing script, update `APP_ID` and `SOCKET`

## games
| Script | Game |
|--------|------|
| `gta6.js` | Grand Theft Auto VI |
| `crimson-desert.js` | Crimson Desert |
| `nightreign.js` | ELDEN RING NIGHTREIGN |
