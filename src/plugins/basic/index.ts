/**
 * A plugin just exports a "library" whose dialogs are the LUIS intents the plugin can understand
 */

import { BotBuilder } from '@telefonica/bot-core';

import helloworld from './picnic.intent.greeting';

// create a plugin, the id must be unique in your bot
let plugin = new BotBuilder.Library('helloworld');

// Add the dialogs, one by one, that this plugin can manage
// The dialog name (1st param) is the intent name as defined in LUIS
plugin.dialog('picnic.intent.greeting', helloworld);

export default plugin;
