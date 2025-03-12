The config file `app/config.json` should be of the following format:
```json
{
  "token": "string",
  "clientId": "string",
  "testGuildId": "string"
}
```
\
Commands are organized into the following folders:
```md
d.js-bot/app
└── commands
    ├── test
    └── utility
```
The `app/commands/test` folder is intended for development purposes. Commands within this folder will only be deployed to the guild with ID *testGuildId* as specified in `app/config.json`
