/**
 * A plugin just exports a "library" whose dialogs are the LUIS intents the plugin can understand
 */

import * as BotBuilder from 'botbuilder';

import help from './picnic.intent.help';

// create a plugin, the id must be unique in your bot
let plugin = new BotBuilder.Library('help');

// Add the dialogs, one by one, that this plugin can manage
// The dialog name (1st param) is the name to identified
plugin.dialog('help', help).triggerAction({
    matches: 'picnic.intent.help'
});

export default plugin;
