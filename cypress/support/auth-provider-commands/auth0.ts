// cypress/support/auth-provider-commands/auth0.ts

function loginViaAuth0Ui(logName: string, password: string) {
    // App landing page redirects to Auth0.
    cy.visit('/')
  
    // Login on Auth0.
    cy.origin(
      Cypress.env('auth0_domain'),
      { args: { logName, password } },
      ({ logName, password }) => {
        cy.get('#outlined-adornment-username').type(logName)
        cy.get('#outlined-adornment-password').type(password, { log: false })
        cy.contains('Log In').click()
      }
    )
  
    // Ensure Auth0 has redirected us back to the RWA.
    cy.url().should('equal', 'https://pinnacle-recruiting.herokuapp.com/')
  }
  
  Cypress.Commands.add('loginToAuth0', (logName: string, password: string) => {
    const log = Cypress.log({
      displayName: 'AUTH0 LOGIN',
      message: [`🔐 Authenticating | ${logName}`],
      // @ts-ignore
      autoEnd: false,
    })
    log.snapshot('before')
  
    loginViaAuth0Ui(logName, password)
  
    log.snapshot('after')
    log.end()
  })