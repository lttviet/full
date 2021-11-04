/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/tests/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('[data-cy=loginForm]')
  })
})
