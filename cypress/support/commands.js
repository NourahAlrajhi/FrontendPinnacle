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

 Cypress.Commands.add(
    'chooseDatePicker',
    (selector, value) => {
      cy.get('body')
        .then(($body) => {
          const mobilePickerSelector = `${selector} input[readonly]`;
          const isMobile = $body.find(mobilePickerSelector).length > 0;
          if (isMobile) {
            // The MobileDatePicker component has readonly inputs and needs to
            // be opened and clicked on edit so its inputs can be edited
            cy.get(mobilePickerSelector)
              .click();
            cy.get('[role="dialog"] [aria-label="calendar view is open, go to text input view"]')
              .click();
            cy.get(`[role="dialog"] ${selector}`)
              .find('input')
              .clear()
              .type(value);
            cy.contains('[role="dialog"] button', 'OK')
              .click();
          } else {
            cy.get(selector)
              .find('input')
              .clear()
              .type(value);
          }
        });
    },
  );
