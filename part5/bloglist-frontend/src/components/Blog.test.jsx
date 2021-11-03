import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  let handleLike;

  beforeEach(() => {
    const blog = {
      title: 'Hello World',
      url: '/hello',
      author: {
        name: 'tester123',
      },
      likes: 100,
    }

    handleLike = jest.fn()
    const handleDelete = jest.fn()

    component = render(
      <Blog
        blog={blog}
        addedByLoggedInUser
        handleLike={handleLike}
        handleDelete={handleDelete}
      />,
    )
  })

  test('displays title only initially', () => {
    const div = component.container.querySelector('.blogTitle')
    expect(div).toHaveTextContent(
      'Hello World',
    )
  })

  test('displays author, url and likes when view button is clicked', () => {
    const viewBtn = component.container.querySelector('.viewBtn')
    fireEvent.click(viewBtn)

    const urlDiv = component.container.querySelector('.blogUrl')
    expect(urlDiv).toHaveTextContent(
      '/hello',
    )

    const likesDiv = component.container.querySelector('.blogLikes')
    expect(likesDiv).toHaveTextContent(
      '100',
    )

    const authorDiv = component.container.querySelector('.blogAuthor')
    expect(authorDiv).toHaveTextContent(
      'tester123',
    )
  })

  test('clicks likes button will trigger event handler', () => {
    const viewBtn = component.container.querySelector('.viewBtn')
    fireEvent.click(viewBtn)

    const likeBtn = component.container.querySelector('.likeBtn')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
