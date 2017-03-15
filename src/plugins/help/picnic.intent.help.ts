import * as BotBuilder from 'botbuilder';

// This dialog is managed by this discrete steps
export default [
    help
];

//Use endDialog to send a message and finish the dialog (session will lost after do it)
function help(session: BotBuilder.Session, args: any, next: Function) {
    session.endDialog(session.gettext('Need help?, try asking me something like: What is the value of Awesome strock? and I give you the value'));
}
