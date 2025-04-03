<h1><img align="center" src="misc/art_assets/lily_icon/lily_icon_d.png" alt="bot-icon" width="75"/> Lily Bot | Discord.js</h1>

A discord bot created for my friends! :)
Current planned functionality includes music and games, though there's more to come.

Run 'npm install' to download the required node modules. From there you can use the included `run.bat` file to start the bot, once the required files are in place.
___
### Required files:
- `d.js-bot/ffmpeg.exe`
- `d.js-bot/.env`

The environment (`.env`) file should be of the following format:
```env
# Discord Bot Token
DISCORD_TOKEN="XX"

#Test Guild ID
TEST_GUILD="XX"

#Client ID
CLIENT_ID="XX"
```
FFmpeg can be downloaded [here](https://ffmpeg.org/download.html).
___
### Organization:
Commands are organized into the folders based on category:
```md
d.js-bot/app
└── commands
    ├── music
    │   ├── play.js
    │   └── etc...
    ├── test
    └── utility
```
The `d.js-bot/app/commands/test` folder is intended for development purposes. Commands within this folder will only be deployed to the guild with ID *TEST_GUILD* as specified in `.env`
