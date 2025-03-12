const { REST, Routes } = require('discord.js');
const { clientId, testGuildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
const testCommands = [];
// Grab all the command folders from the commands directory
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	if (folder === 'test') continue;
	// Grab all the command files from the commands directory
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Grab all the command files from the test directory
const commandsPathTest = path.join(foldersPath, 'test');
const commandFilesTest = fs.readdirSync(commandsPathTest).filter(file => file.endsWith('.js'));
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const testfile of commandFilesTest) {
	const filePathTest = path.join(commandsPathTest, testfile);
	const testCommand = require(filePathTest);
	if ('data' in testCommand && 'execute' in testCommand) {
		testCommands.push(testCommand.data.toJSON());
	}
	else {
		console.log(`[WARNING] The test command at ${filePathTest} is missing a required "data" or "execute" property.`);
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// Deploy commands
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands - GLOBAL`);
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		console.log('\x1b[32m%s\x1b[0m', `Successfully reloaded ${data.length} application (/) commands - GLOBAL`);
		console.log(`Started refreshing ${testCommands.length} application (/) commands - TEST`);
		const testData = await rest.put(
			Routes.applicationGuildCommands(clientId, testGuildId),
			{ body: testCommands },
		);
		console.log('\x1b[32m%s\x1b[0m', `Successfully reloaded ${testData.length} application (/) commands - TEST`);
	}
	catch (error) {
		console.error(error);
	}
})();