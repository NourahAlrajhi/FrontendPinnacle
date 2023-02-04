Cypress.Commands.add('Login', (logName, password) => { 
    cy.visit("https://pinnacle-recruiting.herokuapp.com/")
    cy.get('#outlined-adornment-username').type('Nourah2001')
    cy.get('#outlined-adornment-password').type('Nourah@999')
    cy.contains('Log In').click()
 })


 Cypress.Commands.add('LoginToPosition', (logName, password) => { 
    cy.visit("https://pinnacle-recruiting.herokuapp.com/")
    cy.get('#outlined-adornment-username').type('Nourah2001')
    cy.get('#outlined-adornment-password').type('Nourah@999')
    cy.contains('Log In').click()
 })

