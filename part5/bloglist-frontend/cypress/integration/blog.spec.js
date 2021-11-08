/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/tests/reset')

    const user = {
      name: 'abc def',
      username: 'abc',
      password: '123',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('[data-cy=loginForm]')
  })

  describe('Login', function () {
    it('succeeds with correct creds', function () {
      cy.get('[data-cy=username]').type('abc')
      cy.get('[data-cy=password]').type('123')
      cy.get('[data-cy=loginBtn]').click()

      cy.contains('abc logged in')
    })

    it.only('fails with wrong creds', function () {
      cy.get('[data-cy=username]').type('abc')
      cy.get('[data-cy=password]').type('wrong')
      cy.get('[data-cy=loginBtn]').click()

      cy.get('[data-cy=notification]')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-top-style', 'solid')
        .and('have.css', 'border-right-style', 'solid')
        .and('have.css', 'border-bottom-style', 'solid')
        .and('have.css', 'border-left-style', 'solid')

      cy.get('html').should('not.contain', 'abc logged in')
    })
  })
})
