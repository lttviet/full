import '@testing-library/jest-dom/extend-expect'
import { act, fireEvent, render } from '@testing-library/react'
import React from 'react'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'

jest.mock('../services/blogs')

describe('<BlogForm />', () => {
  test('calls event handler with correct details', async () => {
    blogService.create.mockResolvedValue({
      title: 'testing title',
      url: '/test',
    })
    const handleNewBlog = jest.fn()

    const component = render(
      <BlogForm handleNewBlog={handleNewBlog} />,
    )

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'testing title' },
    })
    fireEvent.change(url, {
      target: { value: '/test' },
    })

    await act(async () => {
      fireEvent.submit(form)
    })

    expect(blogService.create.mock.calls).toHaveLength(1)
    expect(handleNewBlog.mock.calls).toHaveLength(1)
    expect(handleNewBlog.mock.calls[0][0]).toEqual({
      title: 'testing title',
      url: '/test',
    })
  })
})
