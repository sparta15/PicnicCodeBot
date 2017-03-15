/**
 * A plugin just exports a "library" whose dialogs are the LUIS intents the plugin can understand
 */

import * as BotBuilder from 'botbuilder';

import stock from './picnic.intent.stock';
import buy from './picnic.intent.buy';

// create a plugin, the id must be unique in your bot
let plugin = new BotBuilder.Library('trading');

// Add the dialogs, one by one, that this plugin can manage
// The dialog name (1st param) is the intent name as defined in LUIS
plugin.dialog('stock', stock).triggerAction({
    matches: 'picnic.intent.consultPrice'
});

plugin.dialog('buy', buy).triggerAction({
    matches: 'picnic.intent.buy'
})

export default plugin;
