import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import { beforeEach } from "vitest";

describe('<BlogForm />', () => {
  let container
  const createBlog = vi.fn()

  beforeEach(() => {
    container = render(<BlogForm createBlog={createBlog}/>).container
  })

  test('Submitting a form correctly calls eventHandler and passes form contents as props', async () => {
    
    const user = userEvent.setup()
    const button = container.querySelector('button')
    const inputs = container.querySelectorAll('input')

    const titleInput = inputs[0]
    const authorInput = inputs[1]
    const urlInput = inputs[2]

    await user.type(titleInput, "new title")
    await user.type(authorInput, "nickleezx")
    await user.type(urlInput, "www.123.com")
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({title: 'new title', author: 'nickleezx', url: 'www.123.com'})

  })
})