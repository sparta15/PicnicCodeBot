/**
 * A plugin just exports a "library" whose dialogs are the LUIS intents the plugin can understand
 */

import * as BotBuilder from 'botbuilder';

import greeting from './picnic.intent.greeting';
import goodbye from './picnic.intent.goodbye';

// create a plugin, the id must be unique in your bot
// One plugin can have several dialogs
let plugin = new BotBuilder.Library('greeting');

// Add the dialogs, one by one, that this plugin can manage
// The dialog name (1st param) is the intent name to identified.
// triggerAction function will match the dialog with the correct intent
// on LUIS
plugin.dialog('greeting', greeting).triggerAction({
    matches: 'picnic.intent.greeting'
});

plugin.dialog('goodbye', goodbye).triggerAction({
    matches: 'picnic.intent.goodbye'
});

export default plugin;
