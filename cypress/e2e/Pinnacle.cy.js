// describe('Test Case#1', () => {
//   it('Recruiter Login', () => {
//     cy.Login("Nourah2001","Nourah@999")
//   })
// })


// describe('Test Case#2', () => {
//   it('Edit Position', () => {
//     cy.LoginToPosition("Nourah2001", "Nourah@999")
//     cy.viewport('macbook-11')
//     cy.contains('Go To Position List').click()
//     cy.contains('Go To Edit Position ').click({force: true})
//     cy.get('#outlined-required1').type('Web designer')
//    cy.get('#outlined-number').type(34900)
//    cy.contains('Save').click()
//   // cy.get('#outlined-number').type(273001)
//   })
// })

describe('Test Case#3', () => {
  it('New Job Vacancy', () => {
    cy.LoginToPosition("Nourah2001", "Nourah@999")
    cy.viewport('macbook-11')
    cy.contains('Go To Job Vacancy').click({force: true})
    cy.fixture('Candidates.xlsx').then(fileContent => {
      cy.get('input[type=file]').attachFile({
          fileContent: fileContent.toString(),
          fileName: 'Candidates.xlsx',
          mimeType:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      // const datePickerValue = '2021-01-03';
      // cy.chooseDatePicker('[data-testid="my-datepicker"]', datePickerValue);
      
      
  });


//   //   cy.contains('Go To Edit Position ').click({force: true})
//   //  cy.get('#outlined-number').type(3300)
//   //  cy.get('#outlined-required1').type('Web designer')
//   //  cy.contains('Save').click({force: true})
  })
})

