/**
 * A plugin just exports a "library" whose dialogs are the LUIS intents the plugin can understand
 */

import * as BotBuilder from 'botbuilder';

import add from './picnic.intent.addStock';

// create a plugin, the id must be unique in your bot
let plugin = new BotBuilder.Library('portfolio');

// Add the dialogs, one by one, that this plugin can manage
// The dialog name (1st param) is the intent name as defined in LUIS
plugin.dialog('add', add).triggerAction({
    matches: 'picnic.intent.addStock'
});

export default plugin;
