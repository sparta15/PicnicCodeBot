/**
 * A plugin just exports a "library" whose dialogs are the LUIS intents the plugin can understand
 */

import * as BotBuilder from 'botbuilder';

import stock from './picnic.intent.stock';

// create a plugin, the id must be unique in your bot
let plugin = new BotBuilder.Library('stock');

// Add the dialogs, one by one, that this plugin can manage
// The dialog name (1st param) is the intent name as defined in LUIS
plugin.dialog('stock', stock).triggerAction({
    matches: 'picnic.intent.consultPrice'
});

export default plugin;
