// describe('Test Case#1', () => {
//   it('Recruiter Login', () => {
//     cy.Login("Nourah2001","Nourah@999")
//   })
// })


describe('Test Case#2', () => {
  it('Edit Position', () => {
    cy.LoginToPosition("Nourah2001","Nourah@999")
    cy.contains('Go To Position List').click()
cy.contains('LongMenu').click()
  })
})


