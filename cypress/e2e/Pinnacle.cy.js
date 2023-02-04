describe('Test Case#1', () => {
  it('Recruiter Login', () => {
    cy.Login("Nourah2001","Nourah@999")
  })
})


describe('Test Case#2', () => {
  it('Edit Position', () => {
    cy.LoginToPosition("Nourah2001","Nourah@999")
    // cy.get("TextField")
    cy.contains('[data-testid="PositionList"]').click()
   // cy.contains(ListItemButton).click()
    // cy.get('[data-testid="PositionName"]',{withinSubject:null}).should('exist');
    // cy.get('#outlined-required').should('exist')
    // cy.get('[id=outlined-required]').type('@33339')
  })
})


