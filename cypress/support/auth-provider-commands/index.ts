export {}
declare global {
    namespace Cypress {
        interface Chainable {
            loginToAuth0(logName: string, password: string): Chainable<void>;
        }
    }
}