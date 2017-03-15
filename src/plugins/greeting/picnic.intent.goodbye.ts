import * as BotBuilder from 'botbuilder';

// This dialog is managed by this discrete steps
export default [
    goodbye
];

//Use endDialog to send a message and finish the dialog (session will lost after do it)
function goodbye(session: BotBuilder.Session, args: any, next: Function) {
    session.endDialog(session.gettext('Bye'));
}
