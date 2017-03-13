import * as BotBuilder from 'botbuilder';

// This dialog is managed by this discrete steps
export default [
    helloWorld
];

function helloWorld(session: BotBuilder.Session, args: any, next: Function) {
    session.endDialog(session.gettext('hello'));
}
