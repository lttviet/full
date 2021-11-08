/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/tests/reset')

    const user1 = {
      name: 'abc def',
      username: 'abc',
      password: '123',
    }

    const user2 = {
      name: 'test user2',
      username: 'test',
      password: '123',
    }

    cy.request('POST', 'http://localhost:3001/api/users', user1)
    cy.request('POST', 'http://localhost:3001/api/users', user2)

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

    it('fails with wrong creds', function () {
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

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login('abc', '123')
    })

    it('can create blog', function () {
      cy.contains('create new blog').click()
      cy.get('[data-cy=title]').type('New blog')
      cy.get('[data-cy=url]').type('/newBlog')
      cy.get('[data-cy=createBlogBtn]').click()

      cy.contains('New blog')
    })

    describe('when multiple blogs exists', function () {
      beforeEach(function () {
        cy.createBlog('Blog 2', '/blog2', 0)
        cy.createBlog('Blog 3', '/blog3', 10)
      })

      it('can like a blog', function () {
        cy.contains('Blog 2').find('.viewBtn').click()
        cy.contains('Blog 2').parent().find('.blogLikes').as('likeSection')
        cy.get('@likeSection').contains('0')

        cy.get('@likeSection').find('.likeBtn').click()
        cy.get('@likeSection').contains('1')
      })

      it('can delete their blog', function () {
        cy.contains('Blog 2').find('.viewBtn').click()
        cy.contains('Blog 2').parent().find('.deleteBtn').click()

        cy.get('.blogTitle').should('not.contain', 'Blog 2')
      })

      it.only('another user can not delete blog', function () {
        cy.login('test', '123')
        cy.contains('Blog 2').find('.viewBtn').click()
        cy.get('.deleteBtn').should('not.exist')
      })
    })
  })
})
