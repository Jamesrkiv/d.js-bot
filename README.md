<h1><img align="center" src="misc/art_assets/lily_icon/lily_icon_d.png" alt="drawing" width="75"/> Lily Bot | Discord.js</h1>

A discord bot created for my friends :)
\
What will it do? Who really knows...
\
\
Requires FFmpeg to be located at `d.js-bot/ffmpeg.exe`
\
\
The environment file `d.js-bot/.env` should be of the following format:
```env
# Discord Bot Token
DISCORD_TOKEN="XX"

#Test Guild ID
TEST_GUILD="XX"

#Client ID
CLIENT_ID="XX"
```
\
Commands are organized into the following folders:
```md
d.js-bot/app
└── commands
    ├── music
    ├── test
    └── utility
```
The `app/commands/test` folder is intended for development purposes. Commands within this folder will only be deployed to the guild with ID *testGuildId* as specified in `app/config.json`
