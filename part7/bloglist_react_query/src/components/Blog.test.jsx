import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { beforeEach } from "vitest";

describe('<Blog />', () => {
  let container

  const blog = {
    title: "Testing blog",
    author: "nickleezx",
    url: "https://nowhere.com",
    likes: 1,
    user: {
      id: '1'
    }
  }

  const updateLikes = vi.fn()

  beforeEach(() => {
    container = render(<Blog blog={blog} userId={'1'} updateLikes={updateLikes}/>).container
  })

  test('Only title and author of blog is visible on render', () => {
    const title = screen.getByText('Testing blog nickleezx')
    expect(title).toBeDefined()
  })

  test('Likes and url is visible when button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('https://nowhere.com')
    const likes = screen.getByText('1')
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('updateLikes function is called twice when "like" button is clicked twice', async () => {
    const user = userEvent.setup()
    const showButton = container.querySelectorAll('button')[0]
    const likeButton = container.querySelectorAll('button')[1]
    await user.click(showButton)
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateLikes.mock.calls).toHaveLength(2)
  })


})